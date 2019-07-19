import { LitElement, html, css } from 'lit-element'
import { CommonMixin } from './CommonMixin.js'
import { InputMixin } from './InputMixin.js'
import { baseProperties, inputIDLProperties, alwaysSkipAttributes } from './common.js'

class InputCheckbox extends InputMixin(CommonMixin(LitElement)) {

  static get styles () {
    return css`

    `
  }

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
    return html`
                ${this.customStyle}

                <input type="checkbox" id="_native">
                <span></span>
                ${this.labelTemplate}
               `
  }
}
customElements.define('nn-input-checkbox', InputCheckbox)
