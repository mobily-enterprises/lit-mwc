import { LitElement, html, css } from 'lit-element'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { InputMixin } from '../mixins/InputMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'

export class Meter extends FormElementMixin(InputMixin(NativeReflectorMixin(LitElement))) {
  static get styles () {
    return [
      css`
        :host {
          display: flex;
          height: 30px;
        }

        meter:invalid {
          background-color: pink;
          border: var(--nn-select-border-invalid, 1px solid #bb7777);
        }
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
