import { html } from 'lit-element'
import { InputText } from './InputText'

class InputDate extends InputText {
  render () {
    return html`
                ${this.customStyle}

                ${this.labelBeforeTemplate}

                <input type="date" id="_native">

                ${this.labelAfterTemplate}
              `
  }
}
window.customElements.define('nn-input-date', InputDate)