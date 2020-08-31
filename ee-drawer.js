import { LitElement, html, css } from 'lit-element'
import { StyleableMixin } from './mixins/StyleableMixin'
import { ThemeableMixin } from './mixins/ThemeableMixin'
// const close = html`<svg class="icon" height="24" viewBox="0 0 24 24" width="24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>`
const chevronLeft = html`<svg class="icon" height="24" viewBox="0 0 24 24" width="24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>`

export class EeDrawer extends ThemeableMixin('ee-drawer')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      css`
        :host {
          --ee-drawer-width: 300px;
          --ee-drawer-background-color: #393939;
          display: block;
          position: fixed;
          top: 0;
          left: calc(-1 * var(--ee-drawer-width));
          z-index: 1;
          width: calc(10px + var(--ee-drawer-width));
          height: 100vh;
        }

        :host([opened]) {
          left: 0;
          width: 100vw;
        }

        div.nav-wrapper {
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          will-change: transform;
          overflow-x: hidden;
          transform: translateX(-100%);
          transition: transform 0.3s ease-out;
          background-color: var(--ee-drawer-background-color);
        }

        :host([opened]) div.nav-wrapper {
          will-change: transform;
          transform: translateX(0);
        }

        :host([modal][opened]) div.nav-wrapper {
          box-shadow: var(--ee-drawer-shadow, 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.14), 0 0 0 100vw rgba(0, 0, 0, 0.15))
        }

        #close {
          -webkit-appearance: none;
          color: var(--ee-drawer-background-color);
          fill: var(--ee-drawer-background-color);
          position: absolute;
          top: 5px;
          right: 5px;
          z-index: 10;
          background-color: var(--ee-drawer-background-color);
          border: none;
          cursor: pointer;
          right: 0;
          height: 99%;
          box-sizing: border-box;
          padding: 0 2px;
        }

        #close svg {
          height: 20px;
          width: 20px;
        }

        #close:focus, #close:active {
          outline: none !important;
        }

        #close:active, #close:hover,
        :host([mobile]) #close {
          filter: brightness(120%);
          fill: var(--ee-drawer-selected-color, white);
          color: var(--ee-drawer-selected-color, white);
        }

        .nav-wrapper > nav  {
          box-sizing: border-box;
          width: 100%;
          min-width: var(--ee-drawer-width, 300px);
          max-width: var(--ee-drawer-width, 300px);
          height: 100%;
          padding: 30px 24px;
          background-color: var(--ee-drawer-background-color);
          position: relative;
          overflow: auto;
          padding-bottom: 64px;
        }

        .nav-wrapper > nav ::slotted(a),
        .nav-wrapper > nav ::slotted(.drawer-item) {
          display: block;
          text-decoration: none;
          color: var(--ee-drawer-color, #ddd);
          line-height: 32px;
          padding: 0 24px;
          cursor: pointer;
          font-size: 0.9em;
        }

        .nav-wrapper  > nav ::slotted(a[selected]),
        .nav-wrapper  > nav ::slotted(.drawer-item[selected]) {
          color: var(--ee-drawer-selected-color);
          font-weight: bolder;
          border-left: 3px solid var(--ee-drawer-selected-color, white);
          background-color: rgba(255,255,255, 0.1);
        }

        .nav-wrapper  > nav ::slotted(a:hover),
        .nav-wrapper  > nav ::slotted(.drawer-item:hover) {
          background-color: rgba(255,255,255, 0.05);
        }

        .nav-wrapper  > nav ::slotted(.head) {
          color: var(--ee-drawer-color, white);
          box-sizing: border-box
          width: 100%;
          border-bottom: 1px solid var(--ee-drawer-selected-color, white);
          padding: 6px 70% 6px 0;
          font-size: 1.15em;
          margin: 10px auto;
        }
      `
    ]
  }

  static get properties () {
    return {
      opened: { type: Boolean, reflect: true },
      modal: { type: Boolean },
      closeButton: { type: Boolean, attribute: 'close-button' },
      mobile: { type: Boolean, reflect: true }
    }
  }

  constructor () {
    super()
    this.modal = false
    this.closeButton = true
    this.opened = false
  }

  connectedCallback () {
    super.connectedCallback()
    this.addEventListener('click', this._handleOutsideClick)
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      <div class="nav-wrapper">
        ${this.closeButton ? html`<button id="close" @click="${this.close}">${chevronLeft}</button>` : ''}
        <nav>
          <slot></slot>
        </nav>
      </div>
    `
  }

  open () {
    this.opened = true
  }

  _handleOutsideClick (e) {
    if (e.target.nodeName === 'EE-DRAWER') this.close()
  }

  close () {
    this.opened = false
  }
}
customElements.define('ee-drawer', EeDrawer)
