import { LitElement, html, css } from 'lit-element'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { InputMixin } from '../mixins/InputMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'

export class Meter extends FormElementMixin(InputMixin(NativeReflectorMixin(LitElement))) {
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
customElements.define('nn-meter', Meter)