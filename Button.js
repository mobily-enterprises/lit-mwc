import { LitElement, html } from 'lit-element'
import { CommonMixin } from './CommonMixin.js'
import { inputDefaultReflectedMethods } from './common.js'

class Button extends CommonMixin(LitElement) {

  static get properties() {
    return {}
  }

  get reflectedProperties() {
    return inputDefaultReflectedMethods
  }

  render() {
    return html`<button id="_el">
                  <slot></slot>
                </button>`
  }
}
customElements.define('nn-button', Button)
