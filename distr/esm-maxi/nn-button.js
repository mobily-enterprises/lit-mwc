import {L as LitElement,h as html}from'./lit-element-97ae09cb.js';import {S as StyleableMixin}from'./StyleableMixin-6a125586.js';import {T as ThemeableMixin}from'./ThemeableMixin-af62e1ed.js';import {N as NativeReflectorMixin}from'./NativeReflectorMixin-c4e18588.js';import {F as FormElementMixin}from'./FormElementMixin-78f38eb0.js';class NnButton extends ThemeableMixin('nn-button')(FormElementMixin(StyleableMixin(NativeReflectorMixin(LitElement)))) {
  static get styles () {
    return [
      super.styles || []
    ]
  }

  static get properties () {
    return {
      stylesheet: { type: String },
      customCSS: { type: Object },
      raised: { type: Boolean, reflect: true }
    }
  }

  get skipAttributes () {
    return [
      ...super.skipAttributes,
      'form'
    ]
  }

  get reflectProperties () {
    return [
      ...super.reflectProperties,
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement (-form -checkValidity)
      ...['accessKey', 'autofocus', 'disabled', 'formAction', 'formEnctype', 'formMethod', 'formNoValidate', 'formTarget', 'labels', 'menu ', 'name', 'tabIndex', 'type', 'willValidate', 'validationMessage', 'validity', 'value', 'reportValidity', 'setCustomValidity']
    ]
  }

  render () {
    return html`
      ${this.customStyle}
      <button @click="${this._clicked}" id="native">
        <slot></slot>
      </button>
    `
  }

  _clicked () {
    if (this.getAttribute('type') === 'submit') this.form.submit();
  }
}
customElements.define('nn-button', NnButton);