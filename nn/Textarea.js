import { LitElement, html, css } from 'lit-element'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'
import { LabelsMixin } from '../mixins/LabelsMixin.js'
import { baseProperties, inputIDLProperties, alwaysSkipAttributes } from '../common.js'
export class Textarea extends FormElementMixin(LabelsMixin(NativeReflectorMixin(LitElement))) {
  static get styles () {
    return css`
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

        label {
          display: inline-flex;
          font-size: 1em;
          border: var(--nn-label-border, 1px solid #dddddd);
          color: var(--nn-label-color, inherit);
          background-color: var(--nn-label-background, #eeeeee);
          border-radius: var(--nn-label-border-radius, 4px 0 0 4px );
          padding-left: 4px;
          padding-right: 4px;
          min-width: fit-content;
          margin-right: -5px;
          white-space: nowrap;

        }

        label div#label-text {
          align-self: center;
          width: var(--nn-textarea-label-width, auto);
        }

        textarea:invalid + label {
          background-color: var(--nn-label-background-invalid, #dd9999);
        }

      `
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
      ${this.labelBeforeTemplate}
      <textarea name="" id="native"></textarea>
      ${this.labelAfterTemplate}
    `
  }
}
customElements.define('nn-textarea', Textarea)
