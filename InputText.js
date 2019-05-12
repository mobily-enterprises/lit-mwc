import { LitElement, html, css } from 'lit-element'
import { InputMixin } from './InputMixin.js'
import { CommonMixin } from './CommonMixin.js'
import { HTMLBasePropsAndMethods, HTMLFormElementPropsAndMethods, defaultReflectedAttributes } from './common.js'
class InputText extends InputMixin(CommonMixin(LitElement)) {
  static get styles () {
    return css`
        input {
          display: inline-flex;
          height: 30px;
          border-radius: var(--nn-input-border-radius, 0 4px 4px 0);
          border: var(--nn-input-border, 1px solid #dddddd);
          background-color: var(--nn-input-border, initial);
          -webkit-appearance: none;
        }

        input:invalid {
          background-color: pink;
          border: var(--nn-input-border-invalid, 1px solid #bb7777);
        }

        label {
          display: inline-block;
          vertical-align: middle;
          height: 26px;
          font-size: 0.8em;
          border: var(--nn-label-border, 1px solid #dddddd);
          background-color: var(--nn-label-background, #eeeeee);
          border-radius: var(--nn-label-border-radius, 4px 0 0 4px );
          padding-top: 6px;
          padding-left: 4px;
          padding-right: 4px;
          max-width: fit-content;
          margin-right: -5px;
        }

        input:invalid + label {
          background-color: var(--nn-label-background-invalid, #dd9999);
        }

      `
  }

  static get properties () {
    return {
    }
  }

  get reflectedProperties () {
    return [
      ...HTMLBasePropsAndMethods,
      ...HTMLFormElementPropsAndMethods,
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text
      'select', 'setSelectionRange', 'setRangeText' ]
  }

  get reflectedAttributes () {
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text
    return [ ...defaultReflectedAttributes, 'maxlength', 'minlength', 'pattern', 'placeholder', 'readonly', 'size', 'spellcheck', 'autocorrect', 'mozactionhint' ]
  }

  render () {
    return html`
                ${this.customStyle}

                ${this.labelBeforeTemplate}

                <input type="text" id="_native">

                ${this.labelAfterTemplate}
              `
  }
}
customElements.define('nn-input-text', InputText)
