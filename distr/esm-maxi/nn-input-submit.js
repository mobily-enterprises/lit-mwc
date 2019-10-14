import {L as LitElement,h as html}from'./lit-element-97ae09cb.js';import {T as ThemeableMixin}from'./ThemeableMixin-af62e1ed.js';import {N as NativeReflectorMixin}from'./NativeReflectorMixin-c4e18588.js';import {I as InputMixin}from'./InputMixin-83f5b637.js';import {F as FormElementMixin}from'./FormElementMixin-78f38eb0.js';class NnInputSubmit extends ThemeableMixin('nn-input-submit')(FormElementMixin(InputMixin(NativeReflectorMixin(LitElement)))) {
  render () {
    return html`
      ${this.customStyle}
      <input @click="${this._formSubmit}" type="submit" id="native">
    `
  }

  _formSubmit (e) {
    if (this.form) {
      this.form.submit();
    }
  }
}
customElements.define('nn-input-submit', NnInputSubmit);