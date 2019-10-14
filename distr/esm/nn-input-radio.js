import {L as LitElement,c as css,h as html}from'./lit-element-97ae09cb.js';import {L as LabelsMixin}from'./LabelsMixin-c00a1c1e.js';import {S as StyleableMixin}from'./StyleableMixin-6a125586.js';import {T as ThemeableMixin}from'./ThemeableMixin-af62e1ed.js';import {N as NativeReflectorMixin}from'./NativeReflectorMixin-c4e18588.js';import {I as InputMixin}from'./InputMixin-83f5b637.js';import {F as FormElementMixin}from'./FormElementMixin-78f38eb0.js';class NnInputRadio extends ThemeableMixin('nn-input-radio')(FormElementMixin(LabelsMixin(StyleableMixin(InputMixin(NativeReflectorMixin(LitElement)))))) {
  static get styles () {
    return [
      super.styles || [],
      css`
      `
    ]
  }

  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <input as-radio value-source="checked" @change="${this._excludeOthers}" type="radio" id="native"  real-time-event="input">
      ${this.ifLabelAfter}
    `
  }

  _excludeOthers (e) {
    // All other elements with the same name, marked as `as-radio`
    const others = [...this.form.elements].filter(el =>
      el !== this &&
      el.getAttribute('name') &&
      el.getAttribute('name') === this.getAttribute('name') &&
      el.getAttribute('as-radio') !== null
    );
    for (const el of others) {
      const prop = el.getAttribute('value-source') || 'checked';
      el[prop] = false;
    }
  }
}
customElements.define('nn-input-radio', NnInputRadio);