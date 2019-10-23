import { html } from 'lit-element'
import { NnInputText } from './nn-input-text'

class NnInputColor extends NnInputText {
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="color" id="native">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
window.customElements.define('nn-input-color', NnInputColor)
