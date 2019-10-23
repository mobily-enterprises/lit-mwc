import { html } from 'lit-element'

export const SyntheticValidatorMixin = (base) => {
  return class Base extends base {
    static get properties () {
      return {
        validationMessagePosition: {
          type: String,
          attribute: 'validation-message-position'
        },
        shownValidationMessage: {
          type: String,
          attribute: false
        },
        validity: {
          type: Object,
          attribute: false
        },
        validator: { type: Function }
      }
    }

    constructor () {
      super()
      this.shownValidationMessage = ''
      this.validator = () => ''
      this.validationMessagePosition = 'before'
      this.validity = { valid: true, _customValidationMessage: '' }
    }

    setCustomValidity (m) {
      if (m === '') {
        this.validity = {
          valid: true,
          _customValidationMessage: ''
        }
        this.toggleAttribute('valid', true)
        if (m === '') this.shownValidationMessage = ''
      } else {
        this.validity = {
          valid: false,
          customError: true,
          _customValidationMessage: m
        }
        this.toggleAttribute('valid', false)
      }
    }

    reportValidity () {
      // Run custom validator. Note that custom validator
      // will only ever run on filed without an existing customError.
      // This is because
      if (!this.validity.customError) {
        const ownErrorMessage = this.validator()
        if (ownErrorMessage) this.setCustomValidity(ownErrorMessage)
      }

      // Hide the error message by default
      this.shownValidationMessage = ''

      if (!this.validity.valid) {
        this.toggleAttribute('valid', false)
        this.shownValidationMessage = this.validity._customValidationMessage
        this.dispatchEvent(new CustomEvent('invalid', {
          cancelable: true,
          bubbles: false,
          composed: true
        }))
        return false
      } else {
        this.toggleAttribute('valid', true)
        return true
      }
    }

    checkValidity () {
      if (!this.native.validity.customError) {
        const ownErrorMessage = this.validator()
        if (ownErrorMessage) this.setCustomValidity(ownErrorMessage)
      }

      if (!this.validity.valid) {
        this.dispatchEvent(new CustomEvent('invalid', {
          cancelable: true,
          bubbles: false,
          composed: true
        }))
        return false
      }
      return true
    }

    get ifValidationMessageBefore () {
      if (this.validationMessagePosition === 'after') return ''
      return this.validationMessageTemplate
    }

    get ifValidationMessageAfter () {
      if (this.validationMessagePosition === 'before') return ''
      return this.validationMessageTemplate
    }

    get validationMessageTemplate () {
      return html`
        <span class="error-message">
          ${this.shownValidationMessage}
        </span>
      `
    }
  }
}
