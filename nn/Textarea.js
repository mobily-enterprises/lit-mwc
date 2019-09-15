import { LitElement, html, css } from 'lit-element'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'
import { LabelsMixin } from '../mixins/LabelsMixin.js'
import { baseProperties, inputIDLProperties, alwaysSkipAttributes } from '../common.js'

export class Textarea extends FormElementMixin(LabelsMixin(NativeReflectorMixin(LitElement))) {
  static get styles () {
    return [
      LabelsMixin.defaultStyles,
      css`
        :host {
          display: flex;
          height: 30px;
        }

        textarea {
          display: inline-flex;
          border-radius: var(--nn-textarea-border-radius, 0 4px 4px 0);
          border: var(--nn-textarea-border, 1px solid #dddddd);
          color: var(--nn-textarea-color, inherit);
          background-color: var(--nn-textarea-background, initial);
          -webkit-appearance: none;
          float: right;
          width: 100%;
          font-size: 1em;
          padding-left: 10px;
          margin-left: 4px;
        }

        textarea:invalid {
          background-color: pink;
          border: var(--nn-textarea-border-invalid, 1px solid #bb7777);
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
      ...inputIDLProperties
    ]
  }

  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <textarea name="" id="native"></textarea>
      ${this.ifLabelAfter}
    `
  }
}
customElements.define('nn-textarea', Textarea)
