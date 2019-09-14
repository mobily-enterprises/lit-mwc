import { html } from 'lit-element'
import { InputText } from './InputText'

class InputTel extends InputText {
  render () {
    return html`
      ${this.customStyle}
      ${this.labelBeforeTemplate}
      <input type="tel" id="native">
      ${this.labelAfterTemplate}
              `
  }
}
window.customElements.define('nn-input-tel', InputTel)
