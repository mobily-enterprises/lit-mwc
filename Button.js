import { LitElement, html } from 'lit-element'
import { CommonMixin } from './CommonMixin.js'
import { basePropsAndMethods, buttonIDLProperties } from './common.js'

class Button extends CommonMixin(LitElement) {
  static get properties () {
    return {}
  }

  get reflectedProperties () {
    return [
      ...basePropsAndMethods,
      ...buttonIDLProperties
    ]
  }

  render () {
    return html`<button @click="${this._clicked}" id="_native">
                  <slot></slot>
                </button>`
  }

  _clicked () {
    if (this.getAttribute('type') === 'submit') this.form.submit()
  }
}
customElements.define('nn-button', Button)
