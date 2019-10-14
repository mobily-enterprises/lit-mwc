import {L as LitElement,c as css,h as html}from'./lit-element-97ae09cb.js';import {L as LabelsMixin}from'./LabelsMixin-c00a1c1e.js';import {S as StyleableMixin}from'./StyleableMixin-6a125586.js';import {T as ThemeableMixin}from'./ThemeableMixin-af62e1ed.js';import {N as NativeReflectorMixin}from'./NativeReflectorMixin-c4e18588.js';import {I as InputMixin}from'./InputMixin-83f5b637.js';import {F as FormElementMixin}from'./FormElementMixin-78f38eb0.js';class NnInputDatalist extends ThemeableMixin('nn-input-datalist')(FormElementMixin(LabelsMixin(StyleableMixin(InputMixin(NativeReflectorMixin(LitElement)))))) {
  static get styles () {
    return [
      super.styles || [],
      css`
      `
    ]
  }

  get skipAttributes () {
    return [
      ...super.skipAttributes,
      'list'
    ]
  }

  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <slot @slotchange="${this.addSlotToSelect}"></slot>
      <input type="text" id="native" list="_datalist" real-time-event="input">
      <datalist id="_datalist">
      </datalist>
      ${this.ifLabelAfter}
    `
  }

  addSlotToSelect (e) {
    const select = this.shadowRoot.querySelector('#_datalist');
    for (const option of e.srcElement.assignedElements()) {
      select.appendChild(option);
    }
  }
}
customElements.define('nn-input-datalist', NnInputDatalist);export{NnInputDatalist};