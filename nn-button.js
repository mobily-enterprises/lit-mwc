import { LitElement, html } from 'lit-element'
import { NativeReflectorMixin } from './mixins/NativeReflectorMixin.js'
import { FormElementMixin } from './mixins/FormElementMixin.js'
import { NativeValidatorMixin } from './mixins/NativeValidatorMixin.js'
import { StyleableMixin } from './mixins/StyleableMixin.js'
import { ThemeableMixin } from './mixins/ThemeableMixin.js'
import { buttonElement } from './htmlApi.js'

class NnButton extends ThemeableMixin('nn-button')(FormElementMixin(NativeValidatorMixin(StyleableMixin(NativeReflectorMixin(LitElement))))) {
  get skipAttributes () {
    return [...super.skipAttributes, 'form']
  }

  get reflectProperties () {
    return [...super.reflectProperties, ...buttonElement]
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      <button @click="${this._clicked}" id="native">
        <slot></slot>
      </button>
    `
  }

  _clicked () {
    if (this.getAttribute('type') === 'submit') this.form.submit()
  }
}
customElements.define('nn-button', NnButton)
