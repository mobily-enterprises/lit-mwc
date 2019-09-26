import { LitElement, html, css } from 'lit-element'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { InputMixin } from '../mixins/InputMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'
import { ThemeableMixin } from '../mixins/ThemeableMixin.js'

export class NnProgress extends ThemeableMixin('nn/Progress')(FormElementMixin(InputMixin(NativeReflectorMixin(LitElement)))) {
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

  static get properties () {
    return {
    }
  }

  get reflectProperties () {
    return [
      ...super.reflectProperties,
      ...['max', 'position', 'value', 'labels']
    ]
  }

  render () {
    return html`
      ${this.customStyle}
      <progress id="native"></progress>
    `
  }
}
customElements.define('nn-progress', NnProgress)
