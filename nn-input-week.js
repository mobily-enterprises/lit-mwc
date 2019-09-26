import { html } from 'lit-element'
import { NnInputText } from './nn-nput-text'

class NnInputWeek extends NnInputText {
  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="password" id="native">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
window.customElements.define('nn-input-week', NnInputWeek)
