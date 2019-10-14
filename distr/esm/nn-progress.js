import {L as LitElement,c as css,h as html}from'./lit-element-97ae09cb.js';import {T as ThemeableMixin}from'./ThemeableMixin-af62e1ed.js';import {N as NativeReflectorMixin}from'./NativeReflectorMixin-c4e18588.js';import {I as InputMixin}from'./InputMixin-83f5b637.js';import {F as FormElementMixin}from'./FormElementMixin-78f38eb0.js';class NnProgress extends ThemeableMixin('nn-progress')(FormElementMixin(InputMixin(NativeReflectorMixin(LitElement)))) {
  static get styles () {
    return [
      super.styles || [],
      css`
      `
    ]
  }

  static get properties () {
    return {
    }
  }

  get reflectProperties () {
    return [
      ...super.reflectProperties,
      ...['max', 'position', 'value', 'labels']
    ]
  }

  render () {
    return html`
      ${this.customStyle}
      <progress id="native" real-time-event="input"></progress>
    `
  }
}
customElements.define('nn-progress', NnProgress);export{NnProgress};