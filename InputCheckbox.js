import { LitElement, html } from 'lit-element'
import { CommonMixin } from './CommonMixin.js'
import { baseProperties, inputIDLProperties } from './common.js'

class InputCheckbox extends CommonMixin(LitElement) {
  static get properties () {
    return {}
  }

  get skipAttributes () {
    return ['form', 'type']
  }

  get reflectProperties () {
    return [
      ...baseProperties,
      ...inputIDLProperties
    ]
  }

  render () {
    return html`<input type="checkbox" id="_native">
                  <slot></slot>
               `
  }
}
customElements.define('nn-input-checkbox', InputCheckbox)
