import { html } from 'lit-element'
import { InputText } from './InputText'

class InputTime extends InputText {
  render () {
    return html`
                ${this.customStyle}

                ${this.labelBeforeTemplate}

                <input type="time" id="_native">

                ${this.labelAfterTemplate}
              `
  }
}
window.customElements.define('nn-input-time', InputTime)