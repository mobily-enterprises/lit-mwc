import { LitElement, css, html } from './node_modules/lit-element/lit-element.js';
import { NativeReflectorMixin } from './mixins/NativeReflectorMixin.js';
import { InputMixin } from './mixins/InputMixin.js';
import { FormElementMixin } from './mixins/FormElementMixin.js';
import { LabelsMixin } from './mixins/LabelsMixin.js';
import { StyleableMixin } from './mixins/StyleableMixin.js';
import { ThemeableMixin } from './mixins/ThemeableMixin.js';

class NnTextArea extends ThemeableMixin('nn-textarea')(StyleableMixin(FormElementMixin(LabelsMixin(InputMixin(NativeReflectorMixin(LitElement)))))) {
  static get styles() {
    return [super.styles || [], css`
      `];
  }

  get reflectProperties() {
    return [...super.reflectProperties, // From https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement -checkValidity -form
    ...['type', 'value', 'textLength', 'defaultValue', 'placeholder', 'rows', 'cols', 'autofocus', 'name', 'disabled', 'labels', 'maxLength', 'accessKey', 'readOnly', 'required', 'tabIndex', 'selectionStart', 'selectionEnd', 'selectionDirection', 'validity', 'willValidate', 'validationMessage', 'autocomplete ', 'autocapitalize ', 'inputMode ', 'wrap', 'blur', 'focus', 'select', 'setRangeText', 'setSelectionRange', 'reportValidity', 'setCustomValidity']];
  }

  render() {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <textarea name="" id="native" real-time-event="input"></textarea>
      ${this.ifLabelAfter}
    `;
  }

}

customElements.define('nn-textarea', NnTextArea);
var nnTextarea = {
  NnTextArea: NnTextArea
};
export { nnTextarea as $nnTextarea, NnTextArea };