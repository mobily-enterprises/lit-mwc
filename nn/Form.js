import { LitElement, html } from 'lit-element'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { StyleableMixin } from '../mixins/StyleableMixin.js'

/* globals customElements */
export class NnForm extends StyleableMixin(NativeReflectorMixin(LitElement)) {
  get reflectProperties () {
    return [
      ...super.reflectProperties,
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement -checkValidity -reset
      ...['elements', 'length', 'name', 'method', 'target', 'action', 'encoding', 'enctype', 'acceptCharset', 'autocomplete', 'noValidate', 'reportValidity', 'requestAutocomplete', 'submit']
    ]
  }

  checkValidity () {
    // Check validity in form
    let valid = true
    if (!this.native.checkValidity()) valid = false

    for (const el of this._gatherFormElements()) {
      if (typeof el.checkValidity === 'function') {
        if (!el.checkValidity()) valid = false
      }
    }
    return valid
  }

  reset () {
    if (!this.native) return

    this.native.reset()

    const elements = this._gatherFormElements()
    for (const el of elements) {
      // Get the original value
      const valueProp = this._getElementValueProp(el)
      const originalValue = el.getAttribute(valueProp)

      // Assign it to the value prop, with quirks...

      // CHECKBOXES
      // Boolean elements are treated as booleans
      if (this._booleanElement(el)) {
        el[valueProp] = originalValue !== null

      // SELECT
      // Selectable elements (with prop selectedIndex)
      } else if (this._selectElement(el)) {
        if (!originalValue) el.selectedIndex = 0
        else el[valueProp] = originalValue

      // Any other case
      } else {
        el[valueProp] = originalValue
      }
    }
  }

  _selectElement (el) {
    if (typeof el.selectedIndex !== 'undefined' || el.getAttribute('as-select') !== null) return true
    return false
  }

  _booleanElement (el) {
    if (el.type === 'checkbox') return true
    if (el.getAttribute('as-boolean') !== null) return true
    return false
  }

  _getElementValueProp (el) {
    if (el.type === 'checkbox') return 'checked'
    if (el.getAttribute('value-prop')) return el.getAttribute('value-prop')
    return 'value'
  }

  _gatherFormElements (nonValueFormElement = false) {
    let r = this.querySelectorAll('[name]')
    if (nonValueFormElement) {
      r = [...r, ...this.querySelectorAll('[non-value-form-element]')]
    }
    return r
  }

  render () {
    return html`
      ${this.customStyle}
      <form id="native">
        <slot></slot>
      </form>
    `
  }
}
customElements.define('nn-form', NnForm)
