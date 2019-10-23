import { html, css } from 'lit-element'

export const NativeValidatorMixin = (base) => {
  return class Base extends base {
    static get properties () {
      return {
        nativeErrorMessages: {
          type: Boolean,
          attribute: 'native-error-messages'
        },
        shownValidationMessage: {
          type: String,
          attribute: false
        },
        validator: { type: Function },
        validationMessages: {
          type: Object,
          attribute: 'validition-messages'
        },
        validationMessagePosition: {
          type: String,
          attribute: 'validation-message-position'
        }
      }
    }

    static get styles () {
      return [
        super.styles || [],
        css`

          span.error-message {
            color: red;
          }

          :invalid {
            background-color: pink;
            border: var(--nn-input-border-invalid, 1px solid #bb7777);
          }
        `
      ]
    }

    constructor () {
      super()
      this.validator = () => ''
      this.nativeValidationKeys = [
        'badInput',
        'customError',
        'patternMismatch',
        'rangeOverflow',
        'rangeUnderflow',
        'stepMismatch',
        'valueMissing',
        'tooLong',
        'tooShort',
        'typeMismatch'
      ]
      this.validationMessages = {}
      this.validationMessagePosition = 'before'

      this._boundKeyEventListener = this._eventListener.bind(this)
      this._showPrettyError = false
    }

    get skipProperties () {
      return [...super.skipProperties, 'checkValidity', 'reportValidity', 'setCustomValidity']
    }

    get validationMessageTemplate () {
      return html`
        <span class="error-message">
          ${this.shownValidationMessage}
        </span>
      `
    }

    get ifValidationMessageBefore () {
      if (this.validationMessagePosition === 'after') return ''
      return this.validationMessageTemplate
    }

    get ifValidationMessageAfter () {
      if (this.validationMessagePosition === 'before') return ''
      return this.validationMessageTemplate
    }

    setCustomValidity (m) {
      return this.native.setCustomValidity(m)
    }

    reportValidity () {
      // Run custom validator. Note that custom validator
      // will only ever run on filed without an existing customError.
      // This is because
      if (!this.native.validity.customError) {
        const ownErrorMessage = this.validator()
        if (ownErrorMessage) this.setCustomValidity(ownErrorMessage)
      }

      // Hide the fancy error message by default
      this.shownValidationMessage = ''

      // Run reportValidity which will display the native
      // error messages.
      // Suppress the pretty error messages
      if (this.nativeErrorMessages) {
        this._showPrettyError = false
        return this.native.reportValidity()
      } else {
        // Since pretty errors will be shown, it will actually
        // return checkValidity() which will not show the
        // error messages
        this._showPrettyError = true
        return this.native.checkValidity()
      }
    }

    checkValidity () {
      if (!this.native.validity.customError) {
        const ownErrorMessage = this.validator()
        if (ownErrorMessage) this.setCustomValidity(ownErrorMessage)
      }

      this._showPrettyError = false
      return this.native.checkValidity()
    }

    firstUpdated () {
      super.firstUpdated()
      this.native.oninput = (e) => {
        this.setCustomValidity('')
        this.reportValidity()
      }

      this.native.oninvalid = (e) => {
        // No pretty error to be shown (probably running checkValidity())
        if (!this._showPrettyError) return

        const validity = e.target.validity

        // Find which one flag in validity is raised
        let found
        for (const k of this.nativeValidationKeys) {
          if (validity[k]) {
            found = k
            break
          }
        }

        // Assign shownValidationMessage
        // Allow translating with specific function
        const translator = this.validationMessages[found]
        if (translator) {
          this.shownValidationMessage = (typeof translator === 'function')
            ? translator(e.target.validationMessage)
            : translator
        } else {
          this.shownValidationMessage = e.target.validationMessage
        }
      }
    }
  }
}
