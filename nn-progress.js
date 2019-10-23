import { LitElement, html } from 'lit-element'
import { NativeReflectorMixin } from './mixins/NativeReflectorMixin.js'
import { StyleableMixin } from './mixins/StyleableMixin.js'
import { LabelsMixin } from './mixins/LabelsMixin.js'
import { ThemeableMixin } from './mixins/ThemeableMixin.js'
import { progressElement } from './htmlApi'

export class NnProgress extends ThemeableMixin('nn-progress')(StyleableMixin(LabelsMixin(NativeReflectorMixin(LitElement)))) {
  static get properties () {
    return {
    }
  }

  get reflectProperties () {
    return [...super.reflectProperties, ...progressElement]
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <progress id="native" real-time-event="input"></progress>
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
customElements.define('nn-progress', NnProgress)
