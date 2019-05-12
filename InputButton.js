import { LitElement, html } from 'lit-element'
import { CommonMixin } from './CommonMixin.js'
import { basePropsAndMethods, inputIDLProperties } from './common.js'

class InputButton extends CommonMixin(LitElement) {
  static get properties () {
    return {}
  }

  get reflectedProperties () {
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement
    return [
      ...basePropsAndMethods,
      ...inputIDLProperties
    ]
  }
  /*
  get reflectedAttributes () {
    return [ ...inputIDLAttributes ]
  }
  */

  render () {
    return html`<input type="button" id="_native">
                  <slot></slot>
               `
  }
}
customElements.define('nn-input-button', InputButton)
