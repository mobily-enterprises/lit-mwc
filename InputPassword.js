import { LitElement, html, css } from 'lit-element'
import './InputText'

export class InputPassword extends InputText {
  render () {
    return html`
                ${this.customStyle}

                ${this.labelBeforeTemplate}

                <input type="password" id="_native">

                ${this.labelAfterTemplate}
              `
  }
}
window.customElements.define('nn-input-password', InputPassword)