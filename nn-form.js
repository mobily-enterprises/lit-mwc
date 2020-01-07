import { LitElement, html } from 'lit-element'
import { NativeReflectorMixin } from './mixins/NativeReflectorMixin.js'
import { StyleableMixin } from './mixins/StyleableMixin.js'
import { ThemeableMixin } from './mixins/ThemeableMixin.js'
import { formElement } from './htmlApi.js'

/* globals customElements */
export class NnForm extends StyleableMixin(NativeReflectorMixin(LitElement))) {
  get reflectProperties () {
    return [...super.reflectProperties, ...formElement]
  }

  get skipProperties () {
    return [...super.skipProperties, 'elements', 'checkValidity', 'reportValidity', 'reset']
  }

  reportValidity () {
    // Check validity in form
    let valid = true

    for (const el of this.elements) {
      if (typeof el.reportValidity === 'function') {
        // Native element may have customValidity set
        // by a server response. Clear any existing custom
        // errors and report validity
        el.setCustomValidity('')
        if (!el.reportValidity()) {
          valid = false
        }
      }
    }
    return valid
  }

  checkValidity () {
    // Check validity in form
    let valid = true
    // if (!this.native.checkValidity()) valid = false

    for (const el of this.elements) {
      if (typeof el.checkValidity === 'function') {
        // Native element may have customValidity set
        // by a server response. Clear any existing custom
        // errors and report validity
        el.setCustomValidity('')
        if (!el.checkValidity()) {
          valid = false
        }
      }
    }
    return valid
  }

  reset () {
    if (!this.native) return

    this.native.reset()

    // TODO: Adjust this for radios in a nice sensible way
    for (const el of this.elements) {
      const valueSource = this._getElementValueSource(el)

      if (this._radioElement(el)) {
        el[valueSource] = el.getAttribute(valueSource) !== null
      } else if (this._checkboxElement(el)) {
        el[valueSource] = el.getAttribute(valueSource) !== null
      } else {
        el[valueSource] = el.getAttribute(valueSource)
      }
    }
  }

  _selectElement (el) {
    if (typeof el.selectedIndex !== 'undefined' || el.getAttribute('as-select') !== null) return true
    return false
  }

  _checkboxElement (el) {
    if (el.type === 'checkbox') return true
    if (el.getAttribute('as-checkbox') !== null) return true
    return false
  }

  _radioElement (el) {
    if (el.type === 'radio') return true
    if (el.getAttribute('as-radio') !== null) return true
    return false
  }

  _getElementValueSource (el) {
    if (el.type === 'checkbox' || el.type === 'radio') return 'checked'
    if (el.getAttribute('value-source')) return el.getAttribute('value-source')
    return 'value'
  }

  get elements () {
    // A tags (links) can have "name", filter them out
    return [...this.querySelectorAll('[name]')].filter(el => el.tagName !== 'A')
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      <form id="native">
        <slot></slot>
      </form>
    `
  }
}
customElements.define('nn-form', NnForm)
