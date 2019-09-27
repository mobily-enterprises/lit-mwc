import { css } from 'lit-element'
import { AddHasValueAttributeMixin } from 'tpe/mixins/AddHasValueAttributeMixin'
import { inputLabel, inputField, floatingLabel, errorMessage } from '../shared-rules'

export const NnInputText = (base) => {
  return class Base extends AddHasValueAttributeMixin(base) {
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
        super.styles || [],
        inputField,
        inputLabel,
        floatingLabel,
        errorMessage,
        css`
        `
      ]
    }
  }
}
