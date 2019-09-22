import { html } from 'lit-element'
import { NnForm } from '../nn/Form.js'

/* globals customElements CustomEvent */
class EnForm extends NnForm {
  get reflectProperties () {
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

      validateOnLoad: {
        type: Boolean,
        attribute: 'validate-on-load'
      },

      validateOnRender: {
        type: Boolean,
        attribute: 'validate-on-render'
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
  }

  async firstUpdated () {
    super.firstUpdated()

    if (this.validateOnRender) {
      // Wait for all children to be ready to rock and roll
      const elements = this._gatherFormElements()
      for (const el of elements) {
        // TODO: What about React, Vue, etc.? Uniform API across element libraries?
        if (typeof el.updateComplete !== 'undefined') {
          await el.updateComplete
        }
      }
      // Check validity
      this.checkValidity()
    }
  }

  setFormElementValues (v) {
    const elements = this._gatherFormElements('setForm')
    for (const el of elements) {
      if (typeof v[el.name] !== 'undefined') el[this._getElementValueProp(el)] = v[el.name]
    }
  }

  extrapolateErrors (o) {
    return o
  }

  createSubmitObject (elements) {
    const r = {}
    for (const el of elements) {
      r[el.name] = el[this._getElementValueProp(el)]
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
    if (this.fetchingElement) {
      if (typeof this.fetchingElement === 'string') return this.querySelector(`#${this.fetchingElement}`)
      else return this.fetchingElement
    } else {
      return window
    }
  }

  async submit () {
    // No validity = no sending
    if (!this.checkValidity()) return

    // Gather the element
    const elements = this._gatherFormElements('json-creator')

    // HOOK: Make up the submit object based on the passed elements
    const submitObject = this.createSubmitObject(elements)

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
    const formElements = this._gatherFormElements('submitter')
    this._disableElements(formElements)

    // fetch() wants a stingified body
    fetchOptions.body = JSON.stringify(fetchOptions.body)

    // Attempt the submission
    let networkError = false
    let response
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
      this._enableElements(formElements)

      // Emit event to make it possible to tell the user via UI about the problem
      const event = new CustomEvent('form-error', { detail: { type: 'network' }, bubbles: true, composed: true })
      this.dispatchEvent(event)

      // Response hook
      this.response(null, response)
    //
    // CASE #2: HTTP error.
    // Invalidate the problem fields
    } else if (!response.ok) {
      //
      // Try and get the errors object from the reponse's json
      const originalErrs = await response.json()
      const errs = this.extrapolateErrors(originalErrs) || {}

      // Emit event to make it possible to tell the user via UI about the problem
      const event = new CustomEvent('form-error', { detail: { type: 'http', response, errs }, bubbles: true, composed: true })
      this.dispatchEvent(event)

      // Re-enable the elements
      // This must happen before setCustomValidity() and reportValidity()
      this._enableElements(formElements)

      // Set error messages
      if (errs.errors && errs.errors.length) {
        const elements = this._gatherFormElements('errorSetter')
        const elHash = {}
        for (const el of elements) {
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
      this.response(originalErrs, response)
    // CASE #3: NO error. Set fields to their
    // new values
    } else {
      // Convert the result to JSON
      const v = await response.json()

      // HOOK Set the form values, in case the server processed some values
      // Note: this is only ever called if set-form-after-submit was
      // passed to the form.
      if (this.setFormAfterSubmit) this.setFormElementValues(v)

      // Re-enable the elements
      this._enableElements(formElements)

      // Emit event to make it possible to tell the user via UI about the problem
      const event = new CustomEvent('form-ok', { detail: { response }, bubbles: true, composed: true })
      this.dispatchEvent(event)

      // Response hook
      this.response(v, response)
    }
  }

  async updated (changedProperties) {
    super.updated()

    // If no-autoload is set to true, or there is no autoload or no recordId,
    // simply give up: nothing to do
    if (this.getAttribute('no-autoload') || !changedProperties.has('recordId')) return

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
      const formElements = this._gatherFormElements('loader')
      this._disableElements(formElements)

      // Fetch the data and trasform it to json
      try {
        const el = this._fetchEl()
        response = await el.fetch(action + '/' + this.recordId)
      } catch (e) {
        // eslint-disable-line
      }
      const v = await response.json()

      // Set values
      this.setFormElementValues(v)

      // Re-enabled all disabled fields
      this._enableElements(formElements)

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
