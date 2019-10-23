import { LitElement, html, css } from 'lit-element'
import { NativeReflectorMixin } from './mixins/NativeReflectorMixin.js'
import { InputMixin } from './mixins/InputMixin.js'
import { FormElementMixin } from './mixins/FormElementMixin.js'
import { NativeValidatorMixin } from './mixins/NativeValidatorMixin.js'
import { LabelsMixin } from './mixins/LabelsMixin.js'
import { StyleableMixin } from './mixins/StyleableMixin.js'
import { ThemeableMixin } from './mixins/ThemeableMixin.js'

class NnInputCheckbox extends ThemeableMixin('nn-input-checkbox')(FormElementMixin(NativeValidatorMixin(LabelsMixin(StyleableMixin(InputMixin(NativeReflectorMixin(LitElement))))))) {
  static get styles () {
    return [
      super.styles || [],
      css`
      `
    ]
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <input type="checkbox" as-checkbox value-source="checked" id="native"  real-time-event="checked">
      ${this.ifLabelAfter}
    `
  }
}
customElements.define('nn-input-checkbox', NnInputCheckbox)
