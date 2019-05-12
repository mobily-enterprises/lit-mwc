import { LitElement, html } from 'lit-element'
import { CommonMixin } from './CommonMixin.js'
import { HTMLBasePropsAndMethods, HTMLFormElementPropsAndMethods, defaultReflectedAttributes } from './common.js'

class InputCheckbox extends CommonMixin(LitElement) {
  static get properties () {
    return {}
  }

  get reflectedProperties () {
    return [
      ...HTMLBasePropsAndMethods,
      ...HTMLFormElementPropsAndMethods,
      // Method `select()` and IDL attribute `checked` -- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
      'select', 'checked'
    ]
  }

  get reflectedAttributes () {
    // IDL attribute `checked` https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
    return [
      ...defaultReflectedAttributes,
      'checked'
    ]
  }

  render () {
    return html`<input type="checkbox" id="_native">
                  <slot></slot>
               `
  }
}
customElements.define('nn-input-checkbox', InputCheckbox)
