import { LitElement, html, css } from 'lit-element'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'
import { LabelsMixin } from '../mixins/LabelsMixin.js'
import { StyleableMixin } from '../mixins/StyleableMixin.js'
import { baseProperties, defaultBootProperties, inputIDLProperties, alwaysSkipAttributes } from '../common.js'

class InputRadio extends FormElementMixin(LabelsMixin(StyleableMixin(NativeReflectorMixin(LitElement)))) {
  static get styles () {
    return [
      LabelsMixin.defaultStyles,
      css`
      `
    ]
  }

  static get properties () {
    return {}
  }

  get skipAttributes () {
    return [
      ...alwaysSkipAttributes,
      'form', 'type'
    ]
  }

  get reflectProperties () {
    return [
      ...baseProperties,
      ...inputIDLProperties
    ]
  }

  get bootProperties () {
    return [
      ...defaultBootProperties,
      'checked'
    ]
  }

  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <input type="radio" id="native">
      ${this.ifLabelAfter}
               `
  }
}
customElements.define('nn-input-radio', InputRadio)
