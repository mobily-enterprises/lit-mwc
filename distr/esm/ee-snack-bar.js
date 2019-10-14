import {L as LitElement,c as css,h as html}from'./lit-element-97ae09cb.js';import {S as StyleableMixin}from'./StyleableMixin-6a125586.js';import {T as ThemeableMixin}from'./ThemeableMixin-af62e1ed.js';class EeSnackBar extends ThemeableMixin('ee-snack-bar')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      css`
        :host {
          display: block;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 12px;
          background-color: var(--app-primary-color);
          color: var(--app-light-text-color);
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          text-align: center;
          will-change: transform;
          transform: translate3d(0, 100%, 0);
          transition-property: visibility, transform;
          transition-duration: 0.2s;
          visibility: hidden;
        }

        :host([active]) {
          visibility: visible;
          transform: translate3d(0, 0, 0);
        }

        :host([theme="success"]) {
          background-color: green;
          color: white;
        }

        :host([theme="info"]) {
          background-color: gray;
          color: white;
        }

        :host([theme="error"]) {
          background-color: red;
          color: white;
        }
        @media (min-width: 460px) {
          :host {
            width: 320px;
            margin: auto;
          }
        }
      `
    ]
  }

  render () {
    return html`
      ${this.message}
    `
  }

  static get properties () {
    return {
      active: { type: Boolean, reflect: true },
      message: { type: String }
    }
  }

  _eventListener (e) {
    const theme = e.detail.theme || 'info';
    this.setAttribute('theme', theme);
    this.message = e.detail.message;
    this.show();
  }

  connectedCallback () {
    super.connectedCallback();
    document.addEventListener('snack-bar', this.boundEventListener);
  }

  disconnectedCallback () {
    super.disconnectedCallBack();
    document.removeEventListener('snack-bar', this.boundEventListener);
  }

  constructor () {
    super();
    this.active = false;
    this.boundEventListener = this._eventListener.bind(this);
    this.intervalId = null;
  }

  show () {
    this.active = true;
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => { this.active = false; }, 3000);
  }
}

window.customElements.define('ee-snack-bar', EeSnackBar);