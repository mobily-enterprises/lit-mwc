import { html, css, LitElement } from 'lit-element'
import { NativeReflectorMixin } from './mixins/NativeReflectorMixin.js'
import { InputMixin } from './mixins/InputMixin.js'
import { FormElementMixin } from './mixins/FormElementMixin.js'
import { LabelsMixin } from './mixins/LabelsMixin.js'
import { StyleableMixin } from './mixins/StyleableMixin.js'
import { ThemeableMixin } from './mixins/ThemeableMixin.js'

class NnInputRange extends ThemeableMixin('nn-input-range')(FormElementMixin(StyleableMixin(LabelsMixin(InputMixin(NativeReflectorMixin(LitElement)))))) {
  static get styles () {
    return [
      super.styles || [],
      css`
        /* :host {
          display: flex;
          height: 30px;
        } */
      `
    ]
  }

  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="range" id="native" real-time-event="input">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
window.customElements.define('nn-input-range', NnInputRange)
