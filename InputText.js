import { LitElement, html } from 'lit-element'
import { InputMixin } from './InputMixin.js';
import { CommonMixin } from './CommonMixin.js'
import { defaultReflectedProperties, defaultReflectedAttributes } from './common.js'

class InputText extends InputMixin(CommonMixin(LitElement)) {

  static get properties() {
    return {}
  }

  get reflectedProperties() {
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text
    return [ ...defaultReflectedProperties, 'select', 'setRangeText', 'setSelectionRange' ]
  }

  get reflectedAttributes() {
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text
    return [ ...defaultReflectedAttributes, 'maxlength', 'minlength', 'pattern', 'placeholder', 'readonly', 'size', 'spellcheck', 'autocorrect', 'mozactionhint' ]
  }

  render() {
    return html`${ this.labelBeforeTemplate }
  
                <input type="text" id="_el">
                
                ${ this.labelAfterTemplate }
              `
  }
}
customElements.define('nn-input-text', InputText)
