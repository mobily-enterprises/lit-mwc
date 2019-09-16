export const FormElementMixin = (base) => {
  return class Base extends base {
    static get properties () {
      return {
        nativeErrorMessages: { type: String, attribute: 'native-error-messages' }
      }
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

    firstUpdated () {
      super.firstUpdated()
      this.native.oninvalid = () => {
        if (!this.nativeErrorMessages) event.preventDefault()
      }
    }
  }
}
