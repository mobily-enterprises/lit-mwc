import { LitElement, html } from 'lit-element'
import { CommonMixin } from './CommonMixin.js'


class Button extends CommonMixin(LitElement) {

  static get properties() {
    return {}
  }

  render() {
    return html`<button id="_el">
                  <slot></slot>
                </button>`
  }
}
customElements.define('nn-button', Button)
