import { LitElement, html, css } from 'lit-element'
import { InputMixin } from './InputMixin.js';
import { CommonMixin } from './CommonMixin.js'
import { defaultReflectedProperties, defaultReflectedAttributes } from './common.js'
class InputText extends LitElement {
  static get styles () { 
      return css`
        input {
          height: 36px;
          border-radius: var(--nn-input-border-radius, initial);
          border: var(--nn-input-border, 1px solid #dddddd);
          background-color: #ccffcc;
          -webkit-appearance: none;
        }
        
      `
    }

  static get properties() {
    return {
      myStyle: { type: String }
    }
  }

  get reflectedProperties() {
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text
    return [ ...defaultReflectedProperties, 'select', 'setRangeText', 'setSelectionRange' ]
  }

  get reflectedAttributes() {
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text
    return [ ...defaultReflectedAttributes, 'maxlength', 'minlength', 'pattern', 'placeholder', 'readonly', 'size', 'spellcheck', 'autocorrect', 'mozactionhint' ]
  }

  constructor() {
    super();
    this.myStyle = ''
  }

  render() {
    return html`
                ${ this.myStyle ? html`<link rel="stylesheet" href="${this.myStyle}">` : '' }

                ${ this.labelBeforeTemplate }
  
                <input type="text" id="_el">
                
                ${ this.labelAfterTemplate }
              `
  }
}
customElements.define('nn-input-text', InputText)
