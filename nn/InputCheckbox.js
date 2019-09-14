import { LitElement, html, css } from 'lit-element'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'
import { LabelsMixin } from '../mixins/LabelsMixin.js'
import { StyleableMixin } from '../mixins/StyleableMixin.js'
import { baseProperties, defaultBootProperties, inputIDLProperties, alwaysSkipAttributes } from '../common.js'

class InputCheckbox extends FormElementMixin(LabelsMixin(StyleableMixin(NativeReflectorMixin(LitElement)))) {
  static get styles () {
    return css`
      label {
        display: inline-flex;
        font-size: 1em;
        border: var(--nn-label-border, 1px solid #dddddd);
        color: var(--nn-label-color, inherit);
        background-color: var(--nn-label-background, #eeeeee);
        border-radius: var(--nn-label-border-radius, 4px 0 0 4px );
        padding-left: 4px;
        padding-right: 4px;
        min-width: fit-content;
        margin-right: -5px;
        white-space: nowrap;
      }

      label div#label-text, , ::slotted(*) {
        align-self: center;
        width: var(--nn-input-label-width, auto);
      }

      input:invalid + label {
        background-color: var(--nn-label-background-invalid, #dd9999);
      }
    `
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
      <input type="checkbox" id="native">
      ${this.ifLabelAfter}
               `
  }
}
customElements.define('nn-input-checkbox', InputCheckbox)
