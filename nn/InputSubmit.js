import { LitElement, html } from 'lit-element'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { InputMixin } from '../mixins/InputMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'

class InputSubmit extends FormElementMixin(InputMixin(NativeReflectorMixin(LitElement))) {
  render () {
    return html`
      ${this.customStyle}
      <input @click="${this._formSubmit}" type="submit" id="native">
    `
  }

  _formSubmit (e) {
    if (this.form) {
      this.form.submit()
    }
  }
}
customElements.define('nn-input-submit', InputSubmit)
