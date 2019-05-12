import { LitElement, html } from 'lit-element'
import { CommonMixin } from './CommonMixin.js'
import { baseProperties, inputIDLProperties, alwaysSkipAttributes } from './common.js'

class InputButton extends CommonMixin(LitElement) {
  static get properties () {
    return {}
  }

  get skipAttributes () {
    return [
      ...alwaysSkipAttributes,
      'form', 'type'
    ]
  }

  get reflectProperties () {
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
