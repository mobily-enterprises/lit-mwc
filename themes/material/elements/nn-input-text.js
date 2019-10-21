import { css } from 'lit-element'
import { AddHasValueAttributeMixin } from '../../../mixins/AddHasValueAttributeMixin'
import { inputLabel, inputField, floatingLabel, errorMessage } from '../style-patterns.js'

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

    firstUpdated () {
      super.firstUpdated()
      const slot = document.createElement('slot')
      slot.addEventListener('slotchange', this._observeSlot.bind(this))
      this.shadowRoot.appendChild(slot)
    }

    _observeSlot (e) {
      const slot = e.target
      const slotted = slot.assignedElements()
      if (slot.assignedElements().length) {
        this.toggleAttribute('has-leading', slotted.filter(i => i.hasAttribute('leading')).length)
        this.toggleAttribute('has-trailing', slotted.filter(i => i.hasAttribute('trailing')).length)
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
          :host([has-leading]) #native {
            padding-left: 36px;
          }

          :host([has-trailing]) #native {
            padding-right: 36px;
          }

          ::slotted([leading]),
          ::slotted([trailing]) {
            position: absolute;
            top: 16px;
            left: 16px;
            height: 24px;
            width: 24px;
          }

          ::slotted([trailing]) {
            left: unset;
            right: 16px;
          }

        `
      ]
    }
  }
}
