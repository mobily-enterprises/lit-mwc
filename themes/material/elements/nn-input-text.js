import { css } from 'lit-element'
import { AddHasValueAttributeMixin } from '../../../mixins/AddHasValueAttributeMixin'
import { inputLabel, inputField, floatingLabel, errorMessage } from '../style-patterns.js'

export const NnInputText = (base) => {
  return class Base extends AddHasValueAttributeMixin(base) {
    // Style depends on CSS being able to find label as sibling of the #native element.
    // CSS can select next siblings, but not previous. These property values guarantee the label and validation are rendered after #native in the shadowDOM
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

    connectedCallback () {
      super.connectedCallback()
      const slot = document.createElement('slot')
      slot.setAttribute('id', 'icons')
      slot.setAttribute('name', 'icons')
      slot.addEventListener('slotchange', this._observeSlot)
      this.shadowRoot.appendChild(slot)
    }

    _observeSlot (e) {
      const slot = e.target
      console.log(slot.assignedElements())
      if (slot.assignedElements().length) {
        this.toggleAttribute('has-icons', true)
      }
    }

    static get styles () {
      return [
        super.styles || [],
        inputField,
        inputLabel,
        floatingLabel,
        errorMessage,
        css`
          :host([has-icons]) {
            padding: 0 40px;
          }

          :host ::slotted([leading-icon]), :host ::slotted([trailing-icon]) {
            position: absolute;
            left: 0;
            padding: 16px 8px;
            height: 24px;
            width: 24px;
          }

          ::slotted([trailing-icon]) {
            left: unset;
            right: 0;
          }
        `
      ]
    }
  }
}
