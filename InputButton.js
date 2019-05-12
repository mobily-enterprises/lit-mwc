import { LitElement, html } from 'lit-element'
import { CommonMixin } from './CommonMixin.js'
import { HTMLBasePropsAndMethods, HTMLFormElementPropsAndMethods, defaultReflectedAttributes } from './common.js'

class InputButton extends CommonMixin(LitElement) {
  static get properties () {
    return {}
  }

  get reflectedProperties () {
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement
    return [
      ...HTMLBasePropsAndMethods,
      ...HTMLFormElementPropsAndMethods
      // Methods: NONE https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/button
    ]
  }
  get reflectedAttributes () {
    return [ ...defaultReflectedAttributes ]
  }

  render () {
    return html`<input type="button" id="_native">
                  <slot></slot>
               `
  }
}
customElements.define('nn-input-button', InputButton)
