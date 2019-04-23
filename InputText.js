import { LitElement, html } from 'lit-element'
import { CommonMixin } from './CommonMixin.js'

class InputText extends CommonMixin(LitElement) {

  static get properties() {
    return {}
  }

  get reflectedProperties() {
    return ['value']
  }

  render() {
    return html`<input type="text" id="_el">
                  <slot></slot>
                </button>`
  }
}
customElements.define('nn-input-text', InputText)
