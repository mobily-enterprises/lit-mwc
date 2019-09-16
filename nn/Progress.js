import { LitElement, html, css } from 'lit-element'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'
import { baseProperties, inputIDLProperties, progressIDLProperties, alwaysSkipAttributes } from '../common.js'

export class Progress extends FormElementMixin(NativeReflectorMixin(LitElement)) {
  static get styles () {
    return [
      css`
        :host {
          display: flex;
          height: 30px;
        }

        meter:invalid {
          background-color: pink;
          border: var(--nn-select-border-invalid, 1px solid #bb7777);
        }
      `
    ]
  }

  static get properties () {
    return {
    }
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
      ...inputIDLProperties,
      ...progressIDLProperties
    ]
  }

  render () {
    return html`
      ${this.customStyle}
      <progress id="native"></progress>
    `
  }
}
customElements.define('nn-progress', Progress)
