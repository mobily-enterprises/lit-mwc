export const FormElementMixin = (base) => {
  return class Base extends base {
    static get properties () {
      return {
        nativeErrorMessages: { type: String, attribute: 'native-error-messages' },
        shownValidationMessage: { type: String, attribute: false },
        validator: { type: Function },
        validationMessages: { type: Object, attribute: 'validition-messages' }
      }
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
    }

    get skipAttributes () {
      return [
        ...super.skipAttributes,
        ...['form']
      ]
    }

    connectedCallback () {
      super.connectedCallback()
      this.assignFormProperty()
    }

    assignFormProperty () {
      if (this.tagName === 'NN-FORM') return
      let el = this
      while ((el = el.parentElement) && (el.tagName !== 'FORM' && el.tagName !== 'NN-FORM')) { } // eslint-disable-line no-empty
      this.form = el
    }

    checkValidity () {
      // Clear up any hanging error message
      this.setCustomValidity('')
      this.shownValidationMessage = ''

      // If the original checkValidity() fails, the @invalid event will be
      // fired anyway
      if (!this.native.checkValidity()) return

      // Check own validator. If error message, will set it with setCustomValidity()
      // and will run reportValidity() which will fire the @invalid event
      const ownErrorMessage = this.validator()
      if (ownErrorMessage) {
        this.setCustomValidity(ownErrorMessage)
        this.reportValidity()
      }
    }

    firstUpdated () {
      super.firstUpdated()
      this.native.oninput = (e) => {
        this.checkValidity()
      }

      this.native.oninvalid = (e) => {
        // For some reason user wants native error messages: this ends here
        if (this.nativeErrorMessages) return

        // Prevent displaying of ugly native error messages
        e.preventDefault()

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
