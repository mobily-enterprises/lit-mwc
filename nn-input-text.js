// This element is a thin wrap to `<input type=text`>.
//
// ## Designers
//
// This is a simple text input element. Use it instead of `<input type="text">`.
//
// <<INC[partials/validation.md]
//
//
// Default themes:
//
// * [Material](../material-theme/nn-input-text.html)
//
//
// ## Developers
//
// ### Mixins
// <<INC[mixin-descr-dev/NativeReflectorMixin.md]
// <<INC[mixin-descr-dev/InputMixin.md]
// <<INC[mixin-descr-dev/LabelsMixin.md]
// <<INC[mixin-descr-dev/StyleableMixin.md]
// <<INC[mixin-descr-dev/NativeValidatorMixin.md]
// <<INC[mixin-descr-dev/FormElementMixin.md]
import { LitElement, html } from 'lit-element'
import { NativeReflectorMixin } from './mixins/NativeReflectorMixin.js'
import { InputMixin } from './mixins/InputMixin.js'
import { FormElementMixin } from './mixins/FormElementMixin.js'
import { NativeValidatorMixin } from './mixins/NativeValidatorMixin.js'
import { LabelsMixin } from './mixins/LabelsMixin.js'
import { StyleableMixin } from './mixins/StyleableMixin.js'
import { ThemeableMixin } from './mixins/ThemeableMixin.js'

export class NnInputText extends ThemeableMixin('nn-input-text')(FormElementMixin(NativeValidatorMixin(StyleableMixin(LabelsMixin(InputMixin(NativeReflectorMixin(LitElement))))))) {
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="text" id="native" real-time-event="input">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
      <slot id="datalist-slot" name="datalist"></slot>
    `
  }

  static get properties () {
    return {
      enterOnSubmit: { type: Boolean, attribute: 'enter-on-submit' }
    }
  }

  constructor () {
    super()
    this._boundKeyEventListener = this._eventListener.bind(this)
  }

  // Submit on enter with forms with only one element
  _eventListener (e) {
    if (e.keyCode === 13 && ([...this.form.elements].length === 1 || this.enterOnSubmit)) {
      if (this.form) this.form.submit()
    }
  }

  connectedCallback () {
    super.connectedCallback()
    this.addEventListener('keydown', this._boundKeyEventListener)
  }

  disconnectedCallback () {
    super.disconnectedCallBack()
    this.removeEventListener('keydown', this._boundKeyEventListener)
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
