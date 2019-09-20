import { LitElement, html } from 'lit-element'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'
import { StyleableMixin } from '../mixins/StyleableMixin.js'
import { ThemeableMixin } from '../mixins/ThemeableMixin.js'

class Button extends ThemeableMixin('nn/Button')(FormElementMixin(StyleableMixin(NativeReflectorMixin(LitElement)))) {
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
    return [
      ...super.skipAttributes,
      'form'
    ]
  }

  get reflectProperties () {
    return [
      ...super.reflectProperties,
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement (-form -checkValidity)
      ...['accessKey', 'autofocus', 'disabled', 'formAction', 'formEnctype', 'formMethod', 'formNoValidate', 'formTarget', 'labels', 'menu ', 'name', 'tabIndex', 'type', 'willValidate', 'validationMessage', 'validity', 'value', 'reportValidity', 'setCustomValidity']
    ]
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
customElements.define('nn-button', Button)
