import { LitElement, html } from 'lit-element'
import { CommonMixin } from './CommonMixin.js'
import { defaultReflectedProperties } from './common.js'

class Form extends CommonMixin(LitElement) {

  static get properties () {
    return {
      recordId: {
        type: String,
      },

      // This will allow users to redefine methods declaratively
      createSubmitObject: Function,
      presubmit: Function,
      setFormElementValues: Function
    }
  }

  get reflectedProperties () {
    return [/*'submit',*/ 'reset', 'checkValidity', 'reportValidity', 'requestAutocomplete', 'elements', 'length', 'name', 'method', 'target', 'action', 'encoding', 'enctype', 'acceptCharset', 'autocomplete', 'noValidate']
  }

  get reflectedAttributes () {
    return ['blur', 'click', 'focus', 'name', 'accept-charset', 'action', 'autocapitalize', 'autocomplete', 'enctype', 'method', 'novalidate', 'target' ]
  }

  setFormElementValues (v) {
    var elements = this.gatherFormElements()
    for (let el of elements) {
      el.value = v[el.name]
    }
  }

  gatherFormElements () {
    return [...this.querySelectorAll('[name]')]
  }

  createSubmitObject (elements) {
    var r = {}
    for (let el of elements) {
      r[el.name] = el.value
    }
    return r
  }

  presubmit () {}

  async submit () {

    // Gather the element
    var elements = this.gatherFormElements()

    // Make up the submit object based on the passed elements
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
      headers: { "Content-Type": "application/json" },
      redirect: "follow", // manual, *follow, error
      body: JSON.stringify(submitObject) // body data type must match "Content-Type" header
    }

    this.presubmit(fetchOptions)

    try {
      var fetched = await fetch(fetchOptions.url, fetchOptions)
    } catch (e) {
    }
    var v = await fetched.json()
    this.setFormElementValues(v)
  }

  async updated (changedProperties) {
    // Load the data

    // If no-autoload is set to true, or there is no autoload or no recordId,
    // simply give up: nothing to do
    if (this.getAttribute('no-autoload') || !changedProperties.has('recordId')) return

    // Work out the action's URL, adding the record ID  at the end
    // (It will be a get)
    // If there is a result, fetch the element values
    var action = this.getAttribute('action')
    var recordId = changedProperties.get('recordId')
    var fetched
    if (action) {
      try {
        fetched = await fetch(action + '/' + this.recordId)
      } catch (e) {
      }
      var v = await fetched.json()
      this.setFormElementValues(v)
    }
  }

  render () {
    return html`<form id="_el">
                  <slot></slot>
                </form>`
  }
}
customElements.define('nn-form', Form)
