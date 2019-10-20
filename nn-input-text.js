
// This element is a thin wrap to `<input type=text`>.
//
// ## Designers
//
// This is a simple text input element. Use it instead of `<input type="text">`.
// Default themes:
//
// * [Material](../material-theme/nn-input-text.html)
//
//
// <<[partials/validation.md]
//
// ## Developers
//
// ### Mixins
// <<[mixin-descr/NativeReflectorMixin.md]
// <<[mixin-descr/InputMixin.md]
// <<[mixin-descr/FormElementMixin.md]
// <<[mixin-descr/LabelsMixin.md]

import { LitElement, html } from 'lit-element'
import { NativeReflectorMixin } from './mixins/NativeReflectorMixin.js'
import { InputMixin } from './mixins/InputMixin.js'
import { FormElementMixin } from './mixins/FormElementMixin.js'
import { LabelsMixin } from './mixins/LabelsMixin.js'
import { StyleableMixin } from './mixins/StyleableMixin.js'
import { ThemeableMixin } from './mixins/ThemeableMixin.js'

export class NnInputText extends ThemeableMixin('nn-input-text')(FormElementMixin(StyleableMixin(LabelsMixin(InputMixin(NativeReflectorMixin(LitElement)))))) {
  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="text" id="native" real-time-event="input">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
customElements.define('nn-input-text', NnInputText)
