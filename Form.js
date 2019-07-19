import { LitElement, html } from 'lit-element'
import { CommonMixin } from './CommonMixin.js'

/* globals fetch customElements CustomEvent */
class Form extends CommonMixin(LitElement) {
  static get properties () {
    return {

      recordId: {
        type: String,
        attribute: 'record-id'
      },

      // This will allow users to redefine methods declaratively
      createSubmitObject: Function,
      presubmit: Function,
      setFormElementValues: Function,
      extrapolateErrors: Function
    }
  }

  get reflectProperties () {
    return ['reset', 'checkValidity', 'reportValidity', 'requestAutocomplete', 'elements', 'length', 'name', 'method', 'target', 'action', 'encoding', 'enctype', 'acceptCharset', 'autocomplete', 'noValidate'] // 'submit' deleted
  }

  get reflectedAttributes () {
    return ['blur', 'click', 'focus', 'name', 'accept-charset', 'action', 'autocapitalize', 'autocomplete', 'enctype', 'method', 'novalidate', 'target']
  }

  setFormElementValues (v) {
    var elements = this._gatherFormElements('setForm')
    for (let el of elements) {
      if (typeof el.checked !== 'undefined') el.checked = !!v[el.name]
      else el.value = v[el.name]
    }
  }

  extrapolateErrors (o) {
    return o
  }

  _gatherFormElements (callerName) {
    var r = this.querySelectorAll('[name]')
    if (callerName === 'submitter' || callerName === 'loader') {
      r = [...r, ...this.querySelectorAll('[form-element]')]
    }
    return r
  }

  createSubmitObject (elements) {
    var r = {}
    for (let el of elements) {
      r[el.name] = typeof el.checked !== 'undefined' ? !!el.checked : el.value
    }
    return r
  }

  presubmit () {}

  _disableElements (elements) {
    for (let el of elements) {
      if (!el.disabled) el.setAttribute('disabled', true)
    }
  }

  _enableElements (elements) {
    for (let el of elements) el.removeAttribute('disabled')
  }

  async submit () {
    // Gather the element
    var elements = this._gatherFormElements('json-creator')

    // HOOK: Make up the submit object based on the passed elements
    var submitObject = this.createSubmitObject(elements)

    // The method will depend on the presence or absence of recordId
    var method = this.recordId ? 'PUT' : 'POST'

    // Set the url, which will also depend on recordId
    var action = this.getAttribute('action')
    if (!action) throw new Error('The submitted form has no action URL set')
    var url = action + (this.recordId ? `/${this.recordId}` : '')

    var fetchOptions = {
      url,
      method,
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow', // manual, *follow, error
      body: submitObject // body data type must match "Content-Type" header
    }

    // HOOK: Allow devs to customise the request about to be sent to the server
    this.presubmit(fetchOptions)

    // Disable the elements
    var formElements = this._gatherFormElements('submitter')
    this._disableElements(formElements)

    // fetch() wants a stingified body
    fetchOptions.body = JSON.stringify(fetchOptions.body)

    // Attempt the submission
    var networkError = false
    try {
      var response = await fetch(fetchOptions.url, fetchOptions)
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
      let event = new CustomEvent('form-error', { detail: { type: 'network' }, bubbles: true, composed: true })
      this.dispatchEvent(event)
    //
    // CASE #2: HTTP error.
    // Invalidate the problem fields
    } else if (!response.ok) {
      //
      // Try and get the errors object from the reponse's json
      let errs = await response.json()
      errs = this.extrapolateErrors(errs) || {}

      // Emit event to make it possible to tell the user via UI about the problem
      let event = new CustomEvent('form-error', { detail: { type: 'http', response, errs }, bubbles: true, composed: true })
      this.dispatchEvent(event)

      // Re-enable the elements
      // This must happen before setCustomValidity() and reportValidity()
      this._enableElements(formElements)

      // Set error messages
      if (errs.errors && errs.errors.length) {
        let elements = this._gatherFormElements('errorSetter')
        var elHash = {}
        for (let el of elements) {
          elHash[el.name] = el
        }
        for (let err of errs.errors) {
          let el = elHash[err.field]
          if (el && el.native) {
            el.native.setCustomValidity(err.message)
            el.native.reportValidity()
          }
        }
      }

    // CASE #3: NO error. Set fields to their
    // new values
    } else {
      // Convert the result to JSON
      var v = await response.json()

      // HOOK Set the form values, in case the server processed some values
      this.setFormElementValues(v)

      // Re-enable the elements
      this._enableElements(formElements)

      // Emit event to make it possible to tell the user via UI about the problem
      let event = new CustomEvent('form-ok', { detail: { response }, bubbles: true, composed: true })
      this.dispatchEvent(event)
    }
  }

  async updated (changedProperties) {
    // Load the data

    super.updated()

    // If no-autoload is set to true, or there is no autoload or no recordId,
    // simply give up: nothing to do
    if (this.getAttribute('no-autoload') || !changedProperties.has('recordId')) return

    // Work out the action's URL, adding the record ID  at the end
    // (It will be a get)
    // If there is a result, fetch the element values
    var action = this.getAttribute('action')
    var response
    if (action) {
      // This will make sure that the element is actually visible
      // before doing the fetch
      await this.updateComplete

      // Disable elements
      var formElements = this._gatherFormElements('loader')
      this._disableElements(formElements)

      // Fetch the data and trasform it to json
      try {
        response = await fetch(action + '/' + this.recordId)
      } catch (e) {
      }
      var v = await response.json()

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
