import { html } from 'lit-element'
import { NnForm } from './nn-form.js'
import { ThemeableMixin } from './mixins/ThemeableMixin'

/* globals customElements CustomEvent */
class EnForm extends ThemeableMixin('en-form')(NnForm) {
  get reflectProperties () {
    // The `submit` and `elements` properties have been redefined
    return super.reflectProperties.filter(attr => attr !== 'submit')
  }

  static get properties () {
    return {

      fetchingElement: {
        type: String,
        attribute: 'fetching-element'
      },

      recordId: {
        type: String,
        attribute: 'record-id'
      },

      setFormAfterSubmit: {
        type: Boolean,
        attribute: 'set-form-after-submit'
      },

      resetFormAfterSubmit: {
        type: Boolean,
        attribute: 'reset-form-after-submit'
      },

      validateOnLoad: {
        type: Boolean,
        attribute: 'validate-on-load'
      },

      validateOnRender: {
        type: Boolean,
        attribute: 'validate-on-render'
      },

      submitCheckboxesAsNative: {
        type: Boolean,
        attribute: 'submit-checkboxes-as-native'

      },
      noAutoload: {
        type: Boolean,
        attribute: 'no-autoload'
      },

      // This will allow users to redefine methods declaratively
      createSubmitObject: Function,
      presubmit: Function,
      response: Function,
      setFormElementValues: Function,
      extrapolateErrors: Function

    }
  }

  constructor () {
    super()
    this.validateOnLoad = false
    this.validateOnRender = false
    this.fetchingElement = null
    this.submitCheckboxesAsNative = false
    this._boundRealtimeSubmitter = this._realTimeSubmitter.bind(this)
    this.inflight = false
    this.attemptedFlight = false
  }

  async _allChildrenCompleted () {
    // Wait for all children to be ready to rock and roll
    for (const el of this.elements) {
      // TODO: What about React, Vue, etc.? Uniform API across element libraries?
      if (typeof el.updateComplete !== 'undefined') {
        await el.updateComplete
      }
    }
  }

  _realTimeSubmitter (e) {
    this.submit(e.target)
  }

  connectedCallback () {
    super.connectedCallback()
    this._allChildrenCompleted().then(() => {
      for (const el of this.elements) {
        const realTime = el.getAttribute('real-time') !== null
        const realTimeEvent = el.getAttribute('real-time-event')
        if (!realTime || !realTimeEvent) continue
        this.addEventListener(realTimeEvent, this._boundRealtimeSubmitter)
      }
    })
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    for (const el of this.elements) {
      const realTime = el.getAttribute('real-time')
      if (realTime === null) continue
      const realTimeEvent = el.getAttribute('real-time-event')
      if (!realTimeEvent) continue

      this.removeEventListener(realTimeEvent, this._boundRealtimeSubmitter)
    }
  }

  async firstUpdated () {
    super.firstUpdated()

    if (this.validateOnRender) {
      await this._allChildrenCompleted()
      // Check validity
      this.checkValidity()
    }

    /*
    const form = this
    this.addEventListener('change', (e) => {
      const el = form.elements.find(el => el === e.target)
      const eventNameForElement = el.getAttribute('real-time-event')
      if (el && el.realTime) form.submit(el)
    })
    */
  }

  setFormElementValues (o) {
    for (const k in o) {
      this.setFormElementValue(k, o[k])
    }
  }

  setRecordObject (o) {
    o = { ...o }
    const elHash = {}
    for (const el of this.elements) elHash[el.name] = el

    for (const k of Object.keys(elHash)) {
      o[k] = this.getFormElementValue(k)
    }
    return o
  }

  extrapolateErrors (o) {
    return o
  }

  createSubmitObject (elements) {
    const r = {}
    for (const el of elements) {
      // Radio will only happen once thanks to checking for undefined
      if (typeof r[el.name] !== 'undefined') continue

      // Checkboxes are special: they might be handled as native ones,
      // (NOTHING set if unchecked, and their value set if checked) or
      // as booleans (true for checked, or false for unchecked)
      if (this._checkboxElement(el)) {
        if (this.submitCheckboxesAsNative) {
          // As native checkboxes.
          const val = this.getFormElementValue(el.name)
          if (val) r[el.name] = val
        } else {
          // As more app-friendly boolean value
          r[el.name] = !!this.getFormElementValue(el.name)
        }
      } else {
        r[el.name] = this.getFormElementValue(el.name)
      }
    }
    return r
  }

  presubmit () {}

  response () {}

  _disableElements (elements) {
    for (const el of elements) {
      if (!el.disabled) el.setAttribute('disabled', true)
    }
  }

  _enableElements (elements) {
    for (const el of elements) el.removeAttribute('disabled')
  }

  _fetchEl () {
    // Tries to figure out what the fetching element is.
    // if fetching-element was passed, then it's either considered an ID
    // or the element itself.
    // Otherwise it will look for an ee-network or with an element with class
    // .network. Finally, it will use `window`
    if (this.fetchingElement) {
      if (typeof this.fetchingElement === 'string') return this.querySelector(`#${this.fetchingElement}`)
      else return this.fetchingElement
    } else {
      let maybeNetwork = this.querySelector('ee-network')
      if (!maybeNetwork) maybeNetwork = this.querySelector('.network')
      return maybeNetwork || window
    }
  }

  async submit (specificElement) {
    // Clear all custom validities if they are set
    // Native elements will NEED this, or any invalid state
    // will persist even if validation passes
    for (const el of this.elements) el.setCustomValidity('')

    // No validity = no sending
    let submitObject
    if (specificElement) {
      if (!specificElement.checkValidity()) return
      submitObject = this.createSubmitObject([specificElement])
    } else {
      if (!this.checkValidity()) return
      submitObject = this.createSubmitObject(this.elements)
    }

    if (this.inFlight) {
      this.attemptedFlight = specificElement
      return
    }
    this.inFlight = true

    // The element's method can only be null, POST or PUT.
    // If not null, and not "PUT", it's set to "POST"
    let elementMethod = this.getAttribute('method')
    if (elementMethod && elementMethod.toUpperCase() !== 'PUT') {
      elementMethod = 'POST'
    }

    // The 'method' attribute will have priority no matter what.
    // If `method` is not set, then it will depend on recordId (PUT if present,
    // POST if not)
    const method = elementMethod === null
      ? this.recordId ? 'PUT' : 'POST'
      : elementMethod

    // Set the url, which will also depend on recordId
    const action = this.getAttribute('action')
    if (!action) throw new Error('The submitted form has no action URL set')
    const url = action + (this.recordId ? `/${this.recordId}` : '')

    const fetchOptions = {
      url,
      method,
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow', // manual, *follow, error
      body: submitObject // body data type must match "Content-Type" header
    }

    // HOOK: Allow devs to customise the request about to be sent to the server
    this.presubmit(fetchOptions)

    // Disable the elements
    if (!specificElement) this._disableElements(this.elements)

    // fetch() wants a stingified body
    fetchOptions.body = JSON.stringify(fetchOptions.body)

    // Attempt the submission
    let networkError = false
    let response
    let errs
    try {
      const el = this._fetchEl()
      response = await el.fetch(fetchOptions.url, fetchOptions)
    } catch (e) {
      console.log('ERROR!', e)
      networkError = true
    }

    // CASE #1: network error.
    if (networkError) {
      console.log('Network error!')

      // Re-enable the elements
      if (!specificElement) this._enableElements(this.elements)

      // Emit event to make it possible to tell the user via UI about the problem
      const event = new CustomEvent('form-error', { detail: { type: 'network' }, bubbles: true, composed: true })
      this.dispatchEvent(event)

      // Response hook
      this.response(response, null)
    //
    // CASE #2: HTTP error.
    // Invalidate the problem fields
    } else if (!response.ok) {
      //
      // Try and get the errors object from the reponse's json
      const originalErrs = await response.json()
      errs = this.extrapolateErrors(originalErrs) || {}

      // Emit event to make it possible to tell the user via UI about the problem
      const event = new CustomEvent('form-error', { detail: { type: 'http', response, errs }, bubbles: true, composed: true })
      this.dispatchEvent(event)

      // Re-enable the elements
      // This must happen before setCustomValidity() and reportValidity()
      if (!specificElement) this._enableElements(this.elements)

      // Set error messages
      if (errs.errors && errs.errors.length) {
        const elHash = {}
        for (const el of this.elements) {
          elHash[el.name] = el
        }
        for (const err of errs.errors) {
          const el = elHash[err.field]
          if (el) {
            el.setCustomValidity(err.message)
            el.reportValidity()
          }
        }
      }

      // Response hook
      this.response(response, errs)
    // CASE #3: NO error. Set fields to their
    // new values
    } else {
      // Convert the result to JSON
      const v = await response.json()

      // HOOK Set the form values, in case the server processed some values
      // Note: this is only ever called if set-form-after-submit was
      // passed to the form.
      if (this.setFormAfterSubmit) {
        if (!this.attemptedFlight) this.setFormElementValues(v)
      }

      if (this.resetFormAfterSubmit) this.reset()

      // Re-enable the elements
      this._enableElements(this.elements)

      // Emit event to make it possible to tell the user via UI about the problem
      const event = new CustomEvent('form-ok', { detail: { response }, bubbles: true, composed: true })
      this.dispatchEvent(event)

      // Response hook
      this.response(response, v)
    }
    this.inFlight = false
    if (this.attemptedFlight) {
      const oldEl = this.attemptedFlight
      this.attemptedFlight = false
      this.submit(oldEl)
    }
  }

  async updated (changedProperties) {
    super.updated()

    // If no-autoload is set to true, or there is no autoload or no recordId,
    // simply give up: nothing to do
    if (this.noAutoload || !changedProperties.has('recordId')) return

    // Record ID must be "something"
    if (typeof this.recordId === 'undefined' || this.recordId === null) return

    // Work out the action's URL, adding the record ID  at the end
    // (It will be a get)
    // If there is a result, fetch the element values
    const action = this.getAttribute('action')
    let response
    if (action) {
      // This will make sure that the element is actually visible
      // before doing the fetch
      await this.updateComplete

      // Disable elements
      this._disableElements(this.elements)

      // Fetch the data and trasform it to json
      let v
      try {
        const el = this._fetchEl()
        response = await el.fetch(action + '/' + this.recordId)
        v = await response.json()
      } catch (e) {
        console.error('WARNING: Fetching element failed to fetch')
        v = {}
      }

      // Set values
      this.setFormElementValues(v)

      // Re-enabled all disabled fields
      this._enableElements(this.elements)

      // Run checkValidity if validateOnRender is on
      if (this.validateOnLoad) {
        this.checkValidity()
      }
    }
  }

  render () {
    return html`
      ${this.customStyle}
      <form id="native">
        <slot></slot>
      </form>
    `
  }
}
customElements.define('en-form', EnForm)
