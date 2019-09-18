import { LitElement, html, css } from 'lit-element'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { InputMixin } from '../mixins/InputMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'

export class Progress extends FormElementMixin(InputMixin(NativeReflectorMixin(LitElement))) {
  static get styles () {
    return [
      super.styles || [],
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

  get reflectProperties () {
    return [
      ...super.reflectProperties,
      ...['max', 'position', 'value', 'labels']
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
