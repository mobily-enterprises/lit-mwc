import { html } from 'lit-element'
import { NnInputText } from './nn-input-text'

class NnInputSearch extends NnInputText {
  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <input type="search" id="native">
      ${this.ifLabelAfter}
    `
  }
}
window.customElements.define('nn-input-tel', NnInputSearch)
