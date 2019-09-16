import { LitElement, html, css } from 'lit-element'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { InputMixin } from '../mixins/InputMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'
import { LabelsMixin } from '../mixins/LabelsMixin.js'
import { StyleableMixin } from '../mixins/StyleableMixin.js'

export class InputText extends FormElementMixin(StyleableMixin(LabelsMixin(InputMixin(NativeReflectorMixin(LitElement))))) {
  static get styles () {
    return [
      LabelsMixin.defaultStyles,
      css`
        :host {
          display: flex;
          height: 30px;
        }

        input {
          display: inline-flex;
          border-radius: var(--nn-input-border-radius, 0 4px 4px 0);
          border: var(--nn-input-border, 1px solid #dddddd);
          color: var(--nn-input-color, inherit);
          background-color: var(--nn-input-background, initial);
          -webkit-appearance: none;
          width: 100%;
          float: right;
          font-size: 1em;
          padding-left: 10px;
          margin-left: 4px;
        }

        input:invalid {
          background-color: pink;
          border: var(--nn-input-border-invalid, 1px solid #bb7777);
        }
      `
    ]
  }

  static get properties () {
    return {
      invalid: { type: String } // TODO: Raphael, do we need this...?
    }
  }

  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <input type="text" id="native">
      ${this.ifLabelAfter}
    `
  }
}
customElements.define('nn-input-text', InputText)
