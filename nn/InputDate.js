import { html } from 'lit-element'
import { InputText } from './InputText'

class InputDate extends InputText {
  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <input type="date" id="native">
      ${this.ifLabelAfter}
    `
  }
}
window.customElements.define('nn-input-date', InputDate)
