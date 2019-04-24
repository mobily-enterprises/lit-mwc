import { LitElement, html } from 'lit-element'
import { CommonMixin } from './CommonMixin.js'
import { htmlDefaultReflectedProperties, inputDefaultReflectedAttributes } from './common.js'

class InputCheckbox extends CommonMixin(LitElement) {

  static get properties() {
    return {}
  }

  get reflectedProperties() {
    return [ ...htmlDefaultReflectedProperties, 'value' ]
  }

  get reflectedAttributes() {
    return [ ...inputDefaultReflectedAttributes, 'checked', 'value' ]
  }

  render() {
    return html`<input type="checkbox" id="_el">
                  <slot></slot>
                </button>`
  }
}
customElements.define('nn-input-checkbox', InputCheckbox)
