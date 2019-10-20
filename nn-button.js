import { LitElement, html } from 'lit-element'
import { NativeReflectorMixin } from './mixins/NativeReflectorMixin.js'
import { FormElementMixin } from './mixins/FormElementMixin.js'
import { StyleableMixin } from './mixins/StyleableMixin.js'
import { ThemeableMixin } from './mixins/ThemeableMixin.js'
import { buttonElement } from './htmlApi.js'

class NnButton extends ThemeableMixin('nn-button')(FormElementMixin(StyleableMixin(NativeReflectorMixin(LitElement)))) {
  static get styles () {
    return [
      super.styles || []
    ]
  }

  static get properties () {
    return {
      stylesheet: { type: String },
      customCSS: { type: Object },
      raised: { type: Boolean, reflect: true }
    }
  }

  get skipAttributes () {
    return [...super.skipAttributes, 'form']
  }

  get reflectProperties () {
    return [...super.reflectProperties, ...buttonElement]
  }

  render () {
    return html`
      ${this.customStyle}
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
