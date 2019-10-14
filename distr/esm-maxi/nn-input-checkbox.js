import {L as LitElement,c as css,h as html}from'./lit-element-97ae09cb.js';import {L as LabelsMixin}from'./LabelsMixin-c00a1c1e.js';import {S as StyleableMixin}from'./StyleableMixin-6a125586.js';import {T as ThemeableMixin}from'./ThemeableMixin-af62e1ed.js';import {N as NativeReflectorMixin}from'./NativeReflectorMixin-c4e18588.js';import {I as InputMixin}from'./InputMixin-83f5b637.js';import {F as FormElementMixin}from'./FormElementMixin-78f38eb0.js';class NnInputCheckbox extends ThemeableMixin('nn-input-checkbox')(FormElementMixin(LabelsMixin(StyleableMixin(InputMixin(NativeReflectorMixin(LitElement)))))) {
  static get styles () {
    return [
      super.styles || [],
      css`
      `
    ]
  }

  get bootProperties () {
    return [
      super.bootProperties,
      'checked'
    ]
  }

  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <input type="checkbox" as-checkbox value-source="checked" id="native"  real-time-event="checked">
      ${this.ifLabelAfter}
    `
  }
}
customElements.define('nn-input-checkbox', NnInputCheckbox);