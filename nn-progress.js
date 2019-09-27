import { LitElement, html, css } from 'lit-element'
import { NativeReflectorMixin } from './mixins/NativeReflectorMixin.js'
import { InputMixin } from './mixins/InputMixin.js'
import { FormElementMixin } from './mixins/FormElementMixin.js'
import { ThemeableMixin } from './mixins/ThemeableMixin.js'

export class NnProgress extends ThemeableMixin('nn-progress')(FormElementMixin(InputMixin(NativeReflectorMixin(LitElement)))) {
  static get styles () {
    return [
      super.styles || [],
      css`
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
      <progress id="native" real-time-event="input"></progress>
    `
  }
}
customElements.define('nn-progress', NnProgress)
