import { html } from 'lit-element'
import { InputText } from './InputText'

class InputRange extends InputText {
  static get properties () {
    return {
      shownValue: {
        type: String,
        attribute: false
      }
    }
  }

  firstUpdated () {
    super.firstUpdated()
    this.shownValue = this.shadowRoot.querySelector('#native').value
  }

  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <input @change=${this.updateShownValue} type="range" id="native">
      <span>VALUE: -${this.shownValue}-</span>
      ${this.ifLabelAfter}
              `
  }

  updateShownValue (e) {
    this.shownValue = e.srcElement.value
  }
}
window.customElements.define('en-input-range', InputRange)
