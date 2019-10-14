import {c as css,h as html}from'./lit-element-97ae09cb.js';const FormElementMixin = (base) => {
  return class Base extends base {
    get reflectProperties () {
      return super.reflectProperties.filter(attr => attr !== 'checkValidity' && attr !== 'reportValidity' && attr !== 'setCustomValidity')
    }

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

    // Submit on enter with forms with only one element
    _eventListener (e) {
      if (e.keyCode === 13 && [...this.form.elements].length === 1) {
        this.form.submit();
      }
    }

    connectedCallback () {
      super.connectedCallback();
      this.assignFormProperty();
      this.addEventListener('keydown', this._boundKeyEventListener);
    }

    disconnectedCallback () {
      super.disconnectedCallBack();
      this.removeEventListener('keydown', this._boundKeyEventListener);
    }

    constructor () {
      super();
      this.validator = () => '';
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
      ];
      this.validationMessages = {};
      this.validationMessagePosition = 'before';

      this._boundKeyEventListener = this._eventListener.bind(this);
      this._showPrettyError = false;
    }

    get skipAttributes () {
      return [
        ...super.skipAttributes,
        ...['form']
      ]
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

    assignFormProperty () {
      if (this.tagName === 'NN-FORM' || this.tagName === 'EN-FORM') return
      let el = this;
      while ((el = el.parentElement) && (el.tagName !== 'FORM' && el.tagName !== 'NN-FORM' && el.tagName !== 'EN-FORM')) { } // eslint-disable-line no-empty
      this.form = el;
    }

    setCustomValidity (m) {
      return this.native.setCustomValidity(m)
    }

    reportValidity () {
      // Run custom validator. Note that custom validator
      // will only ever run on filed without an existing customError.
      // This is because
      if (!this.native.validity.customError) {
        const ownErrorMessage = this.validator();
        if (ownErrorMessage) this.setCustomValidity(ownErrorMessage);
      }

      // Hide the fancy error message by default
      this.shownValidationMessage = '';

      // Run reportValidity which will display the native
      // error messages.
      // Suppress the pretty error messages
      if (this.nativeErrorMessages) {
        this._showPrettyError = false;
        return this.native.reportValidity()
      } else {
        // Since pretty errors will be shown, it will actually
        // return checkValidity() which will not show the
        // error messages
        this._showPrettyError = true;
        return this.native.checkValidity()
      }
    }

    checkValidity () {
      if (!this.native.validity.customError) {
        const ownErrorMessage = this.validator();
        if (ownErrorMessage) this.setCustomValidity(ownErrorMessage);
      }

      this._showPrettyError = false;
      return this.native.checkValidity()
    }

    firstUpdated () {
      super.firstUpdated();
      this.native.oninput = (e) => {
        this.setCustomValidity('');
        this.reportValidity();
      };

      this.native.oninvalid = (e) => {
        // No pretty error to be shown (probably running checkValidity())
        if (!this._showPrettyError) return

        const validity = e.target.validity;

        // Find which one flag in validity is raised
        let found;
        for (const k of this.nativeValidationKeys) {
          if (validity[k]) {
            found = k;
            break
          }
        }

        // Assign shownValidationMessage
        // Allow translating with specific function
        const translator = this.validationMessages[found];
        if (translator) {
          this.shownValidationMessage = (typeof translator === 'function')
            ? translator(e.target.validationMessage)
            : translator;
        } else {
          this.shownValidationMessage = e.target.validationMessage;
        }
      };
    }
  }
};export{FormElementMixin as F};