import { LitElement, html } from 'lit-element'
import { CommonMixin } from './CommonMixin.js'
import { defaultReflectedProperties, defaultReflectedAttributes } from './common.js'

class InputCheckbox extends CommonMixin(LitElement) {

  static get properties() {
    return {}
  }

  get reflectedProperties() {
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
    return [ ...defaultReflectedProperties, 'checked', 'select' ]
  }

  get reflectedAttributes() {
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
    return [ ...defaultReflectedAttributes, 'checked' ]
  }

  render() {
    return html`<input type="checkbox" id="_el">
                  <slot></slot>
               `
  }
}
customElements.define('nn-input-checkbox', InputCheckbox)
