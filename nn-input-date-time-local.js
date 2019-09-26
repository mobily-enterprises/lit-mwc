import { html } from 'lit-element'
import { NnInputText } from './nn-input-text'

class NnInputDateTimeLocal extends NnInputText {
  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <input type="datetime-local" id="native">
      ${this.ifLabelAfter}
    `
  }
}
window.customElements.define('nn-input-datetime-local', NnInputDateTimeLocal)
