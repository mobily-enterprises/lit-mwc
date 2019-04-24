import { LitElement, html } from 'lit-element'
import { CommonMixin } from './CommonMixin.js'
import { defaultReflectedProperties, defaultReflectedAttributes } from './common.js'

class InputButton extends CommonMixin(LitElement) {

  static get properties() {
    return {}
  }

  get reflectedProperties() {
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement
    return [ ...defaultReflectedProperties, 'checkValidity', 'reportValidity', 'setCustomValidity' ]
  }
  get reflectedAttributes() {
    return [ ...defaultReflectedAttributes ]
  }

  render() {
    return html`<input type="button" id="_el">
                  <slot></slot>
               `
  }
}
customElements.define('nn-input-button', InputButton)
