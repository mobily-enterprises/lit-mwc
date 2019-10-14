import {h as html,L as LitElement}from'./lit-element-97ae09cb.js';import {T as ThemeableMixin}from'./ThemeableMixin-af62e1ed.js';import {N as NativeReflectorMixin}from'./NativeReflectorMixin-c4e18588.js';import {I as InputMixin}from'./InputMixin-83f5b637.js';import {F as FormElementMixin}from'./FormElementMixin-78f38eb0.js';class NnInputButton extends ThemeableMixin('nn-input-button')(FormElementMixin(InputMixin(NativeReflectorMixin(LitElement)))) {
  static get properties () {
    return {}
  }

  render () {
    return html`
      <input type="button" id="native">
        <slot></slot>
     `
  }
}
customElements.define('nn-input-button', NnInputButton);