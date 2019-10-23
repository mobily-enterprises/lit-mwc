import { LitElement, html, css } from 'lit-element'
import { NativeReflectorMixin } from './mixins/NativeReflectorMixin.js'
import { ThemeableMixin } from './mixins/ThemeableMixin.js'
import { StyleableMixin } from './mixins/StyleableMixin.js'
import { LabelsMixin } from './mixins/LabelsMixin.js'
import { meterElement } from './htmlApi'

export class NnMeter extends ThemeableMixin('nn-meter')(StyleableMixin(LabelsMixin(NativeReflectorMixin(LitElement)))) {
  static get styles () {
    return [
      super.styles || [],
      css`
      `
    ]
  }

  get reflectProperties () {
    return [...super.reflectProperties, ...meterElement]
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <meter id="native" real-time-event="input"></meter>
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
customElements.define('nn-meter', NnMeter)
