import { html } from 'lit-element'
import { InputText } from './InputText'

class InputSearch extends InputText {
  render () {
    return html`
      ${this.customStyle}
      ${this.labelBeforeTemplate}
      <input type="search" id="native">
      ${this.labelAfterTemplate}
              `
  }
}
window.customElements.define('nn-input-tel', InputSearch)
