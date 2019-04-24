import { LitElement, html } from 'lit-element'
import { CommonMixin } from './CommonMixin.js'
import { defaultReflectedProperties, defaultReflectedAttributes } from './common.js'

class InputText extends CommonMixin(LitElement) {

  static get properties() {
    return {}
  }

  get reflectedProperties() {
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text
    return [ ...defaultReflectedProperties, 'select', 'setRangeText', 'setSelectionRange' ]
  }

  get reflectedAttributes() {
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text
    return [ ...defaultReflectedAttributes, 'maxlength', 'minlength', 'pattern', 'placeholder', 'readonly', 'size', 'spellcheck', 'autocorrect', 'mozactionhint' ]
  }

  render() {
    return html`<input type="text" id="_el">
                  <slot></slot>
               `
  }
}
customElements.define('nn-input-text', InputText)
