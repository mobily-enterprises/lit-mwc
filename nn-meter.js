import { LitElement, html, css } from 'lit-element'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { InputMixin } from '../mixins/InputMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'
import { ThemeableMixin } from '../mixins/ThemeableMixin.js'

export class NnMeter extends ThemeableMixin('nn-meter')(FormElementMixin(InputMixin(NativeReflectorMixin(LitElement)))) {
  static get styles () {
    return [
      super.styles || [],
      css`
      `
    ]
  }

  get reflectProperties () {
    return [
      ...super.reflectProperties,
      ...['high', 'low', 'max', 'min', 'optimum', 'value', 'labels']
    ]
  }

  render () {
    return html`
      ${this.customStyle}
      <meter id="native"></meter>
    `
  }
}
customElements.define('nn-meter', NnMeter)
