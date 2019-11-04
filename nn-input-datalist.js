import { LitElement, html } from 'lit-element'
import { NativeReflectorMixin } from './mixins/NativeReflectorMixin.js'
import { InputMixin } from './mixins/InputMixin.js'
import { FormElementMixin } from './mixins/FormElementMixin.js'
import { NativeValidatorMixin } from './mixins/NativeValidatorMixin.js'
import { LabelsMixin } from './mixins/LabelsMixin.js'
import { StyleableMixin } from './mixins/StyleableMixin.js'
import { ThemeableMixin } from './mixins/ThemeableMixin.js'

export class NnInputDatalist extends ThemeableMixin('nn-input-datalist')(FormElementMixin(NativeValidatorMixin(LabelsMixin(StyleableMixin(InputMixin(NativeReflectorMixin(LitElement))))))) {
  get skipAttributes () {
    return [
      ...super.skipAttributes,
      'list'
    ]
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      <slot @slotchange="${this.addSlotToSelect}"></slot>
      ${this.ifValidationMessageBefore}
      <input type="text" id="native" list="_datalist" real-time-event="input">
      ${this.ifValidationMessageAfter}
      <datalist id="_datalist">
      </datalist>
      ${this.ifLabelAfter}
    `
  }

  addSlotToSelect (e) {
    const select = this.shadowRoot.querySelector('#_datalist')
    for (const option of e.srcElement.assignedElements()) {
      select.appendChild(option)
    }
  }
}
customElements.define('nn-input-datalist', NnInputDatalist)
