import { html } from 'lit-element'
import { InputText } from './InputText'

class InputSearch extends InputText {
  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <input type="search" id="native">
      ${this.ifLabelAfter}
    `
  }
}
window.customElements.define('nn-input-tel', InputSearch)
