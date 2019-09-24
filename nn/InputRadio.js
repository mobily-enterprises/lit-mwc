import { LitElement, html, css } from 'lit-element'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { InputMixin } from '../mixins/InputMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'
import { LabelsMixin } from '../mixins/LabelsMixin.js'
import { StyleableMixin } from '../mixins/StyleableMixin.js'
import { ThemeableMixin } from '../mixins/ThemeableMixin.js'

class InputRadio extends ThemeableMixin('nn/InputRadio')(FormElementMixin(LabelsMixin(StyleableMixin(InputMixin(NativeReflectorMixin(LitElement)))))) {
  static get styles () {
    return [
      super.styles || [],
      css`
      `
    ]
  }

  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <input as-radio value-source="checked" @change="${this._excludeOthers}" type="radio" id="native">
      ${this.ifLabelAfter}
    `
  }

  _excludeOthers (e) {
    // All other elements with the same name, marked as `as-radio`
    const others = [...this.form.elements()].filter(el =>
      el !== this &&
      el.getAttribute('name') &&
      el.getAttribute('name') === this.getAttribute('name') &&
      el.getAttribute('as-radio') !== null
    )
    for (const el of others) {
      const prop = el.getAttribute('value-source') || 'checked'
      el[prop] = false
    }
  }
}
customElements.define('nn-input-radio', InputRadio)
