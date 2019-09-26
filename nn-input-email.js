import { html } from 'lit-element'
import { NnInputText } from './nn-input-text'

class NnInputEmail extends NnInputText {
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
window.customElements.define('nn-input-email', NnInputEmail)
