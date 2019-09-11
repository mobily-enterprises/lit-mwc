import { LitElement, html } from 'lit-element'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { defaultBootProperties, baseProperties, inputIDLProperties, alwaysSkipAttributes } from '../common.js'

class InputButton extends NativeReflectorMixin(LitElement) {
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

  get bootProperties () {
    return [
      ...defaultBootProperties
    ]
  }

  render () {
    return html`<input type="button" id="_native">
                  <slot></slot>
               `
  }
}
customElements.define('nn-input-button', InputButton)
