import { LitElement, html } from 'lit-element'
import { CommonMixin } from './CommonMixin.js'

class InputButton extends CommonMixin(LitElement) {

  static get properties() {
    return {}
  }

  get reflectedProperties() {
    return inputDefaultReflectedMethods
  }

  render() {
    return html`<input type="button" id="_el">
                  <slot></slot>
                </button>`
  }
}
customElements.define('nn-input-button', InputButton)
