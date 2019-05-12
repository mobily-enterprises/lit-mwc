import { LitElement, html } from 'lit-element'
import { CommonMixin } from './CommonMixin.js'
import { basePropsAndMethods, inputIDLProperties } from './common.js'

class InputCheckbox extends CommonMixin(LitElement) {
  static get properties () {
    return {}
  }

  get reflectedProperties () {
    return [
      ...basePropsAndMethods,
      ...inputIDLProperties
    ]
  }

  /*
  get reflectedAttributes () {
    // IDL attribute `checked` https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
    return [
      ...inputIDLAttributes
    ]
  }
  */

  render () {
    return html`<input type="checkbox" id="_native">
                  <slot></slot>
               `
  }
}
customElements.define('nn-input-checkbox', InputCheckbox)
