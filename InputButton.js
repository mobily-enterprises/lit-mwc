import { LitElement, html } from 'lit-element'
import { CommonMixin } from './CommonMixin.js'
import { baseProperties, inputIDLProperties } from './common.js'

class InputButton extends CommonMixin(LitElement) {
  static get properties () {
    return {}
  }

  get skipAttributes () {
    return ['form', 'type']
  }

  get reflectedProperties () {
    return [
      ...baseProperties,
      ...inputIDLProperties
    ]
  }

  render () {
    return html`<input type="button" id="_native">
                  <slot></slot>
               `
  }
}
customElements.define('nn-input-button', InputButton)
