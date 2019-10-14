import {h as html}from'./lit-element-97ae09cb.js';import'./LabelsMixin-c00a1c1e.js';import'./StyleableMixin-6a125586.js';import {T as ThemeableMixin}from'./ThemeableMixin-af62e1ed.js';import'./NativeReflectorMixin-c4e18588.js';import'./InputMixin-83f5b637.js';import'./FormElementMixin-78f38eb0.js';import {NnInputText}from'./nn-input-text.js';class NnInputDate extends ThemeableMixin('nn-input-date')(NnInputText) {
  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="date" id="native">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
window.customElements.define('nn-input-date', NnInputDate);