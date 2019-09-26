import { html } from 'lit-element'
import { NnInputText } from './nn-input-text'

class NnInputColor extends NnInputText {
  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <input type="color" id="native">
      ${this.ifLabelAfter}
    `
  }
}
window.customElements.define('nn-input-color', NnInputColor)