import { html } from 'lit-element'
import { NnInputText } from './nn-input-text'
import { ThemeableMixin } from './mixins/ThemeableMixin'

class NnInputDateTimeLocal extends ThemeableMixin('nn-input-date')(NnInputText) {
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
