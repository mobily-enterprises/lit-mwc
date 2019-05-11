import { LitElement, html } from 'lit-element'
import { CommonMixin } from './CommonMixin.js'

/* globals fetch customElements */
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
      setFormElementValues: Function
    }
  }

  get reflectedProperties () {
    return ['reset', 'checkValidity', 'reportValidity', 'requestAutocomplete', 'elements', 'length', 'name', 'method', 'target', 'action', 'encoding', 'enctype', 'acceptCharset', 'autocomplete', 'noValidate'] // 'submit' deleted
  }

  get reflectedAttributes () {
    return ['blur', 'click', 'focus', 'name', 'accept-charset', 'action', 'autocapitalize', 'autocomplete', 'enctype', 'method', 'novalidate', 'target']
  }

  setFormElementValues (v) {
    var elements = this._gatherFormElements('setForm')
    for (let el of elements) {
      el.value = v[el.name]
    }
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
      r[el.name] = el.value
    }
    return r
  }

  presubmit () {}

  _disableElements (elements) {
    for (let el of elements) {
      if (!el.disabled) el.disabled = true
    }
  }

  _enableElements (elements) {
    for (let el of elements) el.disabled = false
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
      body: JSON.stringify(submitObject) // body data type must match "Content-Type" header
    }

    // HOOK: Allow devs to customise the request about to be sent to the server
    this.presubmit(fetchOptions)

    // Disable the elements
    var formElements = this._gatherFormElements('submitter')
    this._disableElements(formElements)

    // Attempt the submission
    try {
      var fetched = await fetch(fetchOptions.url, fetchOptions)
    } catch (e) {
    }

    // Convert the result to JSON
    var v = await fetched.json()

    // HOOK Set the form values, in case the server processed some values
    this.setFormElementValues(v)

    // Re-enable the elements
    this._enableElements(formElements)
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
    var fetched
    if (action) {
      // This will make sure that the element is actually visible
      // before doing the fetch
      await this.updateComplete

      // Disable elements
      var formElements = this._gatherFormElements('loader')
      this._disableElements(formElements)

      // Fetch the data and trasform it to json
      try {
        fetched = await fetch(action + '/' + this.recordId)
      } catch (e) {
      }
      var v = await fetched.json()

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
