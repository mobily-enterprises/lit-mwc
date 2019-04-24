import { LitElement, html } from 'lit-element'
import { CommonMixin } from './CommonMixin.js'
import { defaultReflectedProperties } from './common.js'

class Form extends CommonMixin(LitElement) {

  static get properties() {
    return {
      action: {
        type: String
      }
    }
  }

  get reflectedProperties() {
    return ['submit', 'reset', 'checkValidity', 'reportValidity', 'requestAutocomplete', 'elements', 'length', 'name', 'method', 'target', 'action', 'encoding', 'enctype', 'acceptCharset', 'autocomplete', 'noValidate']
  }

  get reflectedAttributes() {
    return ['blur', 'click', 'focus', 'name', 'accept-charset', 'action', 'autocapitalize', 'autocomplete', 'enctype', 'method', 'novalidate', 'target', ]
  }

  render() {
    return html`<form id="_el">
                  <slot></slot>
                </form>`
  }
}
customElements.define('nn-form', Form)
