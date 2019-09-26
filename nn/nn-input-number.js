import { html } from 'lit-element'
import { NnInputText } from './InputText'

class NnInputNumber extends NnInputText {
  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <input type="password" id="native">
      ${this.ifLabelAfter}
    `
  }
}
window.customElements.define('nn-input-number', NnInputNumber)
