import { html } from 'lit-element'
import { InputText } from './InputText'

class InputDateTimeLocal extends InputText {
  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <input type="datetime-local" id="native">
      ${this.ifLabelAfter}
    `
  }
}
window.customElements.define('nn-input-datetime-local', InputDateTimeLocal)
