import { html } from 'lit-element'
import { InputText } from './InputText'

class InputTel extends InputText {
  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <input type="tel" id="native">
      ${this.ifLabelAfter}
              `
  }
}
window.customElements.define('nn-input-tel', InputTel)
