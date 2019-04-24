import { LitElement, html } from 'lit-element'
import { CommonMixin } from './CommonMixin.js'
import { htmlDefaultReflectedProperties, inputDefaultReflectedAttributes } from './common.js'

class InputButton extends CommonMixin(LitElement) {

  static get properties() {
    return {}
  }

  get reflectedProperties() {
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement
    return [ ...htmlDefaultReflectedProperties, 'checkValidity', 'reportValidity', 'setCustomValidity', 'value' ]
  }

  render() {
    return html`<input type="button" id="_el">
                  <slot></slot>
               `
  }
}
customElements.define('nn-input-button', InputButton)
