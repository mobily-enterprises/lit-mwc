import { LitElement, html } from 'lit-element'
import { CommonMixin } from './CommonMixin.js'
import { defaultReflectedProperties, defaultReflectedAttributes } from './common.js'

class Button extends CommonMixin(LitElement) {

  static get properties() {
    return {}
  }

  get reflectedProperties() {
    return [ ...defaultReflectedProperties ]
  }

  get reflectedAttributes() {
    return [ ...defaultReflectedAttributes, 'autofocus', 'autocomplete', 'disabled', 'form', 'formaction', 'formenctype', 'formmethod', 'formnovalidate', 'formtarget', 'name', 'type', 'value' ]
  }

  render() {
    return html`<button id="_el">
                  <slot></slot>
                </button>`
  }
}
customElements.define('nn-button', Button)
