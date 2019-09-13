import { html } from 'lit-element'
import { InputText } from './InputText'

class InputTel extends InputText {
  render () {
    return html`
      ${this.customStyle}
      ${this.labelBeforeTemplate}
      <input type="tel" id="_native">
      ${this.labelAfterTemplate}
              `
  }
}
window.customElements.define('nn-input-tel', InputTel)
