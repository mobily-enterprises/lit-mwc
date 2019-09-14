import { html } from 'lit-element'
import { InputText } from './InputText'

class InputTime extends InputText {
  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <input type="time" id="native">
      ${this.ifLabelAfter}
              `
  }
}
window.customElements.define('nn-input-time', InputTime)
