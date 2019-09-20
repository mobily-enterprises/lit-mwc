import { LitElement, html, css } from 'lit-element'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { InputMixin } from '../mixins/InputMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'
import { LabelsMixin } from '../mixins/LabelsMixin.js'
import { StyleableMixin } from '../mixins/StyleableMixin.js'
import { ThemeableMixin } from '../mixins/ThemeableMixin.js'

class InputRadio extends ThemeableMixin('nn/InputRadio')(FormElementMixin(LabelsMixin(StyleableMixin(InputMixin(NativeReflectorMixin(LitElement)))))) {
  static get styles () {
    return [
      super.styles || [],
      css`
      `
    ]
  }

  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <input type="radio" id="native">
      ${this.ifLabelAfter}
    `
  }
}
customElements.define('nn-input-radio', InputRadio)
