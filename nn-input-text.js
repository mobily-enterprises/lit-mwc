import { LitElement, html, css } from 'lit-element'
import { NativeReflectorMixin } from './mixins/NativeReflectorMixin.js'
import { InputMixin } from './mixins/InputMixin.js'
import { FormElementMixin } from './mixins/FormElementMixin.js'
import { LabelsMixin } from './mixins/LabelsMixin.js'
import { StyleableMixin } from './mixins/StyleableMixin.js'
import { ThemeableMixin } from './mixins/ThemeableMixin.js'

export class NnInputText extends ThemeableMixin('nn-input-text')(StyleableMixin(FormElementMixin(StyleableMixin(LabelsMixin(InputMixin(NativeReflectorMixin(LitElement))))))) {
  static get styles () {
    return [
      super.styles || [] // I don't think we need this. LitElement doesn't implement the styles getter.
    ]
  }

  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="text" id="native">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
customElements.define('nn-input-text', NnInputText)
