import { html } from 'lit-element'
import { InputText } from './InputText'

class InputPassword extends InputText {
  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <input type="password" id="native">
      ${this.ifLabelAfter}
    `
  }
}
window.customElements.define('nn-input-password', InputPassword)
