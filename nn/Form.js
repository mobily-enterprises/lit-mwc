import { LitElement, html } from 'lit-element'
import { NativeReflectorMixin } from './NativeReflectorMixin.js'

/* globals fetch customElements CustomEvent */
class Form extends NativeReflectorMixin(LitElement) {
  static get properties () {
    return {

      recordId: {
        type: String,
        attribute: 'record-id'
      },

      setFormAfterSubmit: {
        type: Boolean,
        attribute: 'set-form-after-submit'
      },

      // This will allow users to redefine methods declaratively
      createSubmitObject: Function,
      presubmit: Function,
      response: Function,
      setFormElementValues: Function,
      extrapolateErrors: Function
    }
  }

  get reflectProperties () {
    return ['checkValidity', 'reportValidity', 'requestAutocomplete', 'elements', 'length', 'name', 'method', 'target', 'action', 'encoding', 'enctype', 'acceptCharset', 'autocomplete', 'noValidate'] // 'submit' deleted
  }

  get skipAttributes () {
    return []
  }

  reset () {
    if (!this.native) return

    this.native.reset()

    const elements = this._gatherFormElements('reset')
    for (const el of elements) {
      // Get the original value
      const valueProp = this._getElementValueProp(el)
      const originalValue = el.getAttribute(valueProp)

      // Assign it to the value prop, with quirks...

      // CHECKBOXES
      // Boolean elements are treated as booleans
      if (this._booleanElement(el)) {
        el[valueProp] = originalValue !== null

      // SELECT
      // Selectable elements (with prop selectedIndex)
      // are set with selectedIndex = 0
      } else if (typeof el.selectedIndex !== 'undefined' || el.getAttribute('as-select') !== null) {
        if (!originalValue) el.selectedIndex = 0
        else el[valueProp] = originalValue

      // Any other case
      } else {
        el[valueProp] = originalValue
      }
    }
  }

  _booleanElement (el) {
    if (el.type === 'checkbox') return true
    if (el.getAttribute('as-boolean') !== null) return true
    return false
  }

  _getElementValueProp (el) {
    if (el.type === 'checkbox') return 'checked'
    if (el.getAttribute('value-prop')) return el.getAttribute('value-prop')
    return 'value'
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

  _gatherFormElements (callerName) {
    let r = this.querySelectorAll('[name]')
    if (callerName === 'submitter' || callerName === 'loader') {
      r = [...r, ...this.querySelectorAll('[form-element]')]
    }
    return r
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

  async submit () {
    // Gather the element
    const elements = this._gatherFormElements('json-creator')

    // HOOK: Make up the submit object based on the passed elements
    const submitObject = this.createSubmitObject(elements)

    // The method will depend on the presence or absence of recordId
    const method = this.recordId ? 'PUT' : 'POST'

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
      response = await fetch(fetchOptions.url, fetchOptions)
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
          if (el && el.native) {
            el.native.setCustomValidity(err.message)
            el.native.reportValidity()
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
        response = await fetch(action + '/' + this.recordId)
      } catch (e) {
        // eslint-disable-line
      }
      const v = await response.json()

      // Set values
      this.setFormElementValues(v)

      // Re-enabled all disabled fields
      this._enableElements(formElements)
    }
  }

  render () {
    return html`<form id="_native">
                  <slot></slot>
                </form>`
  }
}
customElements.define('nn-form', Form)
