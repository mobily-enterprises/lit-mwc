export const FormElementMixin = (base) => {
  return class Base extends base {
    get skipAttributes () {
      return [
        ...super.skipAttributes, 'form'
      ]
    }

    get skipProperties () {
      return [...super.skipProperties, 'form']
    }

    connectedCallback () {
      super.connectedCallback()
      this.assignFormProperty()
    }

    assignFormProperty () {
      // if (this.tagName === 'NN-FORM' || this.tagName === 'EN-FORM') return
      let el = this
      while ((el = el.parentElement) && (el.tagName !== 'FORM' && el.tagName !== 'NN-FORM' && el.tagName !== 'EN-FORM' && !el.hasAttribute('as-form'))) { } // eslint-disable-line no-empty
      this.form = el
    }
  }
}
