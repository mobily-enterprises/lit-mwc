import { html } from 'lit-element'
import { InputText } from './InputText'

class InputDateTimeLocal extends InputText {
  render () {
    return html`
      ${this.customStyle}
      ${this.labelBeforeTemplate}
      <input type="datetime-local" id="native">
      ${this.labelAfterTemplate}
    `
  }
}
window.customElements.define('nn-input-datetime-local', InputDateTimeLocal)
