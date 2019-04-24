import { LitElement, html } from 'lit-element'
import { InputMixin } from './InputMixin.js';
import { CommonMixin } from './CommonMixin.js'
import { htmlDefaultReflectedProperties, inputDefaultReflectedAttributes } from './common.js'

class InputText extends InputMixin(CommonMixin(LitElement)) {

  static get properties() {
    return {}
  }

  get reflectedProperties() {
    return [ ...htmlDefaultReflectedProperties, 'value' ]
  }

  get reflectedAttributes() {
    return [ ...inputDefaultReflectedAttributes, 'maxlength', 'minlength', 'pattern', 'placeholder', 'readonly', 'size', 'spellcheck', 'value', 'autocorrect', 'mozactionhint' ]
  }

  render() {
    return html`${ this.labelBeforeTemplate }
  
                <input type="text" id="_el">
                
                ${ this.labelAfterTemplate }
              `
  }
}
customElements.define('nn-input-text', InputText)
