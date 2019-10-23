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

    // Submit on enter with forms with only one element
    _eventListener (e) {
      if (e.keyCode === 13 && [...this.form.elements].length === 1) {
        if (this.form) this.form.submit()
      }
    }

    connectedCallback () {
      super.connectedCallback()
      this.assignFormProperty()
      this.addEventListener('keydown', this._boundKeyEventListener)
    }

    disconnectedCallback () {
      super.disconnectedCallBack()
      this.removeEventListener('keydown', this._boundKeyEventListener)
    }

    assignFormProperty () {
      // if (this.tagName === 'NN-FORM' || this.tagName === 'EN-FORM') return
      let el = this
      while ((el = el.parentElement) && (el.tagName !== 'FORM' && el.tagName !== 'NN-FORM' && el.tagName !== 'EN-FORM')) { } // eslint-disable-line no-empty
      this.form = el
    }
  }
}
