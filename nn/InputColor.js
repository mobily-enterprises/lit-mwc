import { html } from 'lit-element'
import { InputText } from './InputText'

class InputColor extends InputText {
  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <input type="color" id="native">
      ${this.ifLabelAfter}
              `
  }
}
window.customElements.define('nn-input-color', InputColor)
