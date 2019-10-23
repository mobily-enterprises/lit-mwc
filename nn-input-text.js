
// This element is a thin wrap to `<input type=text`>.
//
// ## Designers
//
// This is a simple text input element. Use it instead of `<input type="text">`.
// Default themes:
//
// * [Material](../material-theme/nn-input-text.html)
//
//
// <<[partials/validation.md]
//
// ## Developers
//
// ### Mixins
// <<[mixin-descr/NativeReflectorMixin.md]
// <<[mixin-descr/InputMixin.md]
// <<[mixin-descr/FormElementMixin.md]
// <<[mixin-descr/LabelsMixin.md]

import { LitElement, html, css } from 'lit-element'
import { NativeReflectorMixin } from './mixins/NativeReflectorMixin.js'
import { InputMixin } from './mixins/InputMixin.js'
import { FormElementMixin } from './mixins/FormElementMixin.js'
import { SyntheticValidatorMixin } from './mixins/SyntheticValidatorMixin.js'
import { LabelsMixin } from './mixins/LabelsMixin.js'
import { StyleableMixin } from './mixins/StyleableMixin.js'
import { ThemeableMixin } from './mixins/ThemeableMixin.js'

export class NnInputText extends ThemeableMixin('nn-input-text')(FormElementMixin(SyntheticValidatorMixin(StyleableMixin(LabelsMixin(InputMixin(NativeReflectorMixin(LitElement))))))) {
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="text" id="native" real-time-event="input">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
      <slot id="datalist-slot" name="datalist"></slot>
    `
  }

  firstUpdated () {
    super.firstUpdated()

    const slot = this.shadowRoot.querySelector('#datalist-slot')
    const slotFirstAssignedElement = slot && slot.assignedElements()[0]
    const datalistOptions = slotFirstAssignedElement && slotFirstAssignedElement.children
    if (datalistOptions && datalistOptions.length) {
      const datalistElement = document.createElement('datalist')
      datalistElement.setAttribute('id', '_datalist')
      this.setAttribute('list', '_datalist')
      for (const el of datalistOptions) {
        const optionElement = document.createElement('option')
        optionElement.setAttribute('value', el.getAttribute('value'))
        datalistElement.appendChild(optionElement)
      }
      this.shadowRoot.appendChild(datalistElement)
    }
  }
}
customElements.define('nn-input-text', NnInputText)
