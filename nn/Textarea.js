import { LitElement, html, css } from 'lit-element'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { InputMixin } from '../mixins/InputMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'
import { LabelsMixin } from '../mixins/LabelsMixin.js'

export class Textarea extends FormElementMixin(LabelsMixin(InputMixin(NativeReflectorMixin(LitElement)))) {
  static get styles () {
    return [
      super.styles || [],
      css`
        /* :host {
          display: flex;
          height: 30px;
        } */

        /* textarea {
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
        } */
      `
    ]
  }

  get reflectProperties () {
    return [
      ...super.reflectProperties,
      // From https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement -checkValidity
      ...['form', 'type', 'value', 'textLength', 'defaultValue', 'placeholder', 'rows', 'cols', 'autofocus', 'name', 'disabled', 'labels', 'maxLength', 'accessKey', 'readOnly', 'required', 'tabIndex', 'selectionStart', 'selectionEnd', 'selectionDirection', 'validity', 'willValidate', 'validationMessage', 'autocomplete ', 'autocapitalize ', 'inputMode ', 'wrap', 'blur', 'focus', 'select', 'setRangeText', 'setSelectionRange', 'reportValidity', 'setCustomValidity']
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
