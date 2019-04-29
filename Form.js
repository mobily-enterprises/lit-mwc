import { LitElement, html } from 'lit-element'
import { CommonMixin } from './CommonMixin.js'
import { defaultReflectedProperties } from './common.js'

class Form extends CommonMixin(LitElement) {

  static get properties () {
    return {
      recordId: {
        type: String
      }
    }
  }

  get reflectedProperties () {
    return ['submit', 'reset', 'checkValidity', 'reportValidity', 'requestAutocomplete', 'elements', 'length', 'name', 'method', 'target', 'action', 'encoding', 'enctype', 'acceptCharset', 'autocomplete', 'noValidate']
  }

  get reflectedAttributes () {
    return ['blur', 'click', 'focus', 'name', 'accept-charset', 'action', 'autocapitalize', 'autocomplete', 'enctype', 'method', 'novalidate', 'target' ]
  }

  getFormElements () {
     return [ ...this.querySelectorAll('[name]') ]
  }

  setFormElementValues (v) {
    for (let prop in v) {
      var el = this.querySelector(`[name=${prop}]`) || this.querySelector(`[nn-name=${prop}]`)
      if (el) el.value = v[prop]
    }
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
