import { css } from 'lit-element'
import { inputField, inputLabel, floatingLabel, errorMessage } from '../style-patterns.js'

export const NnTextArea = (base) => {
  return class Base extends base {
    // Style depends on CSS being able to find label as sibling of the #native element.
    // CSS can select next siblings, but not previous.  This guarantees label is rendered after #native in the shadowDOM
    static get properties () {
      return {
        labelPosition: { type: String, attribute: false },
        validationMessage: { type: String, attribute: false }
      }
    }

    constructor () {
      super()
      this.labelPosition = 'after'
      this.validationMessagePosition = 'after'
    }

    static get styles () {
      return [
        super.styles,
        inputField,
        inputLabel,
        floatingLabel,
        errorMessage,
        css`
          :host {
            --mat-form-element-height: 80px;
          }
          /* Following material design guidelines, non-resizeable textarea */
          textarea {
            font-family: var(--mat-font-family);
            padding-top: 12px;
            min-height: 80px;
            max-height: 80px;
            resize: none;
          }

          :host([has-value]) label,
          #native:focus ~ label,
          #native:placeholder-shown ~ label {
            transform: translateY(-200%);
          }
        `
      ]
    }
  }
}
