import { LitElement, html } from 'lit-element'
import { CommonMixin } from './CommonMixin.js'

class InputCheckbox extends CommonMixin(LitElement) {

  static get properties() {
    return {}
  }

  render() {
    return html`<input type="checkbox" id="_el">
                  <slot></slot>
                </button>`
  }
}
customElements.define('nn-input-checkbox', InputCheckbox)
