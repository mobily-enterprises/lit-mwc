import { LitElement, html, css } from 'lit-element'
import { NativeReflectorMixin } from './mixins/NativeReflectorMixin.js'
import { InputMixin } from './mixins/InputMixin.js'
import { FormElementMixin } from './mixins/FormElementMixin.js'
import { LabelsMixin } from './mixins/LabelsMixin.js'
import { StyleableMixin } from './mixins/StyleableMixin.js'
import { ThemeableMixin } from './mixins/ThemeableMixin.js'
import { textAreaElement } from './htmlApi.js'

export class NnTextArea extends ThemeableMixin('nn-textarea')(StyleableMixin(FormElementMixin(LabelsMixin(InputMixin(NativeReflectorMixin(LitElement)))))) {
  static get styles () {
    return [
      super.styles || [],
      css`
      `
    ]
  }

  get reflectProperties () {
    return [...super.reflectProperties, ...textAreaElement]
  }

  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <textarea name="" id="native" real-time-event="input"></textarea>
      ${this.ifLabelAfter}
    `
  }
}
customElements.define('nn-textarea', NnTextArea)
