import {L as LitElement,c as css,h as html}from'./lit-element-97ae09cb.js';import {T as ThemeableMixin}from'./ThemeableMixin-af62e1ed.js';import {N as NativeReflectorMixin}from'./NativeReflectorMixin-c4e18588.js';import {I as InputMixin}from'./InputMixin-83f5b637.js';import {F as FormElementMixin}from'./FormElementMixin-78f38eb0.js';class NnMeter extends ThemeableMixin('nn-meter')(FormElementMixin(InputMixin(NativeReflectorMixin(LitElement)))) {
  static get styles () {
    return [
      super.styles || [],
      css`
      `
    ]
  }

  get reflectProperties () {
    return [
      ...super.reflectProperties,
      ...['high', 'low', 'max', 'min', 'optimum', 'value', 'labels']
    ]
  }

  render () {
    return html`
      ${this.customStyle}
      <meter id="native" real-time-event="input"></meter>
    `
  }
}
customElements.define('nn-meter', NnMeter);export{NnMeter};