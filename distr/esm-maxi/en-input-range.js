import {c as css,h as html,L as LitElement}from'./lit-element-97ae09cb.js';import {L as LabelsMixin}from'./LabelsMixin-c00a1c1e.js';import {S as StyleableMixin}from'./StyleableMixin-6a125586.js';import {T as ThemeableMixin}from'./ThemeableMixin-af62e1ed.js';import {N as NativeReflectorMixin}from'./NativeReflectorMixin-c4e18588.js';import {I as InputMixin}from'./InputMixin-83f5b637.js';import {F as FormElementMixin}from'./FormElementMixin-78f38eb0.js';class EnInputRange extends ThemeableMixin('en-input-range')(FormElementMixin(StyleableMixin(LabelsMixin(InputMixin(NativeReflectorMixin(LitElement)))))) {
  static get styles () {
    return [
      super.styles || [],
      css`
        /* :host {
          display: flex;
          height: 30px;
        } */
      `
    ]
  }

  static get properties () {
    return {
      shownValue: {
        type: String,
        attribute: false
      }
    }
  }

  firstUpdated () {
    super.firstUpdated();
    this.shownValue = this.shadowRoot.querySelector('#native').value;
  }

  render () {
    return html`
      ${this.customStyle}
      <slot @slotchange="${this.slotChanged}" id="range-amount-before" name="range-amount-before"></slot>
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input @change=${this.updateShownValue} type="range" id="native" real-time-event="input">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
      <slot @slotchange="${this.slotChanged}" id="range-amount-after" name="range-amount-after"></slot>
    `
  }

  _updateSpanInSlot (slot, value) {
    if (slot) {
      const slotContents = slot.assignedElements()[0];
      if (slotContents) {
        const amountSpan = slotContents.querySelector('span#range-amount');
        if (amountSpan) {
          amountSpan.innerHTML = Number(value);
        }
      }
    }
  }

  updateShownValue (e) {
    let slot;
    this.shownValue = e.srcElement.value;

    slot = this.shadowRoot.querySelector('slot#range-amount-before');
    this._updateSpanInSlot(slot, this.shownValue);

    slot = this.shadowRoot.querySelector('slot#range-amount-after');
    this._updateSpanInSlot(slot, this.shownValue);
  }

  slotChanged (e) {
    this._updateSpanInSlot(e.srcElement, this.shownValue);
  }
}
window.customElements.define('en-input-range', EnInputRange);