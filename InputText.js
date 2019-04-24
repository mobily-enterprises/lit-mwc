import { LitElement, html } from 'lit-element'
import { CommonMixin } from './CommonMixin.js'
import { htmlDefaultReflectedProperties, inputDefaultReflectedAttributes } from './common.js'

class InputText extends CommonMixin(LitElement) {

  static get properties() {
    return {}
  }

  get reflectedProperties() {
    return [ ...htmlDefaultReflectedProperties, 'value' ]
  }

  get reflectedAttributes() {
    return [ ...inputDefaultReflectedAttributes, 'maxlength', 'minlength', 'pattern', 'placeholder', 'readonly', 'size', 'spellcheck', 'value', 'autocorrect', 'mozactionhint' ]
  }

  render() {
    return html`<input type="text" id="_el">
                  <slot></slot>
               `
  }
}
customElements.define('nn-input-text', InputText)
