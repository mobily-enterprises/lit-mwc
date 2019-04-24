import { LitElement, html } from 'lit-element'
import { CommonMixin } from './CommonMixin.js'
import { htmlDefaultReflectedProperties } from './common.js'

class Form extends CommonMixin(LitElement) {

  static get properties() {
    return {
      action: {
        type: String
      }
    }
  }

  get reflectedProperties() {
    return []
  }

  get reflectedAttributes() {
    return []
  }

  render() {
    return html`<form id="_el">
                  <slot></slot>
                </form>`
  }
}
customElements.define('nn-form', Form)
