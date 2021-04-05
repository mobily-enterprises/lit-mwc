// FormElementMixin
// ================
//

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

    /**
     * Returning `true` for the formAssociated property allows the element to be
     * detected and participate as a form control element in native forms. It is
     * also necessary to add the lifecycle hooks related to that behavior.
    */
    static get formAssociated () { return true }

    constructor () {
      super()
      // Check if the `attachInternals` method is available and call it to enable
      // the ElementInternals API.
      if (this.attachInternals) {
        this.internals = this.attachInternals()
      }
    }

    firstUpdated () {
      super.firstUpdated()
      if (this.internals) {
        // Update form with current value on firstUpdate
        this._updateAssociatedForm()
        this.native.addEventListener('input', (e) => {
          // Update form value at every input change
          this._updateAssociatedForm()
        })
      }
    }

    connectedCallback () {
      super.connectedCallback()
      this.assignFormProperty()
    }

    _updateAssociatedForm () {
      this.internals.setFormValue(this.value)
    }

    assignFormProperty () {
      // if (this.tagName === 'NN-FORM' || this.tagName === 'EN-FORM') return
      let el = this
      while ((el = el.parentElement) && (el.tagName !== 'FORM' && el.tagName !== 'NN-FORM' && el.tagName !== 'EN-FORM' && !el.hasAttribute('as-form'))) { } // eslint-disable-line no-empty
      this.form = el
    }
  }
}
