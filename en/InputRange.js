import { html } from 'lit-element'
import { InputText } from '../nn/InputText'

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
      <slot @slotchange="${this.slotChanged}" id="range-amount-before" name="range-amount-before"></slot>
      ${this.ifLabelBefore}
      <input @change=${this.updateShownValue} type="range" id="native">
      ${this.ifLabelAfter}
      <slot @slotchange="${this.slotChanged}" id="range-amount-after" name="range-amount-after"></slot>
    `
  }

  _updateSpanInSlot (slot, value) {
    if (slot) {
      const slotContents = slot.assignedElements()[0]
      if (slotContents) {
        const amountSpan = slotContents.querySelector('span#range-amount')
        if (amountSpan) {
          amountSpan.innerHTML = Number(value)
        }
      }
    }
  }

  updateShownValue (e) {
    let slot
    this.shownValue = e.srcElement.value

    slot = this.shadowRoot.querySelector('slot#range-amount-before')
    this._updateSpanInSlot(slot, this.shownValue)

    slot = this.shadowRoot.querySelector('slot#range-amount-after')
    this._updateSpanInSlot(slot, this.shownValue)
  }

  slotChanged (e) {
    this._updateSpanInSlot(e.srcElement, this.shownValue)
  }
}
window.customElements.define('en-input-range', InputRange)
