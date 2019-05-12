import { LitElement, html } from 'lit-element'
import { CommonMixin } from './CommonMixin.js'
import { basePropsAndMethods, buttonIDLProperties, buttonIDLAttributes } from './common.js'

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

  get reflectedAttributes () {
    return [
      ...buttonIDLAttributes
    ]
  }

  render () {
    return html`<button @click="${this._clicked}" id="_native">
                  <slot></slot>
                </button>`
  }

  _clicked () {
    debugger
    if (this.getAttribute('type') === 'submit') this.form.submit()
  }
}
customElements.define('nn-button', Button)
