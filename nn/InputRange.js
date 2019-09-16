import { html } from 'lit-element'
import { InputText } from './InputText'

class InputRange extends InputText {
  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <input type="range" id="native">
      ${this.ifLabelAfter}              `
  }
}
window.customElements.define('nn-input-range', InputRange)
