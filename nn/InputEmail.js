import { html } from 'lit-element'
import { InputText } from './InputText'

class InputEmail extends InputText {
  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="email" id="native">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
window.customElements.define('nn-input-email', InputEmail)
