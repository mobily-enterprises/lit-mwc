import { LitElement, html, css } from 'lit-element'
import { StyleableMixin } from './mixins/StyleableMixin'
import { ThemeableMixin } from './mixins/ThemeableMixin'
const close = html`<svg class="icon" height="24" viewBox="0 0 24 24" width="24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>`

export class EeDrawer extends ThemeableMixin('ee-drawer')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      css`
        :host {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
        }

        :host([opened]) {
          width: 100vw;
          height: 100vh;
        }

        div.container {
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          will-change: transform;
          transform: translateX(-100%);
          overflow-x: hidden;
          transition: transform 0.3s ease-out;
          background-color: var(--drawer-background, initial);
        }

        :host([opened]) div.container {
          will-change: transform;
          transform: translateX(0);
        }

        :host([modal][opened]) div.container {
          box-shadow: var(--drawer-shadow, 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.14), 0 0 0 100vw rgba(0, 0, 0, 0.15)) 
        }

        #close {
          -webkit-appearance: none;
          color: white;
          fill: white;
          position: absolute;
          top: 5px;
          right: 5px;
          z-index: 10;
          background: transparent;
          border: none;
        }

        button#close:focus, button#close:active {
            outline: none !important;
          }

        button#close:active {
          filter: brightness(50%)
        }


        .container > nav  {
          box-sizing: border-box;
          width: 100%;
          min-width: 300px;
          height: 100%;
          padding: 24px;
          background: var(--app-drawer-background-color);
          position: relative;
          overflow: scroll;
          padding-bottom: 64px;
        }

        .container > nav ::slotted(a),
        .container > nav ::slotted(.drawer-item) {
          display: block;
          text-decoration: none;
          color: var(--app-drawer-text-color);
          line-height: 40px;
          padding: 0 24px;
          cursor: pointer;
        }

        .container  > nav ::slotted(a[selected]),
        .container  > nav ::slotted(.drawer-item[selected]) {
          color: var(--app-drawer-selected-color);
          font-weight: bolder;
          border-left: 3px solid var(--app-drawer-selected-color);
          background-color: rgba(255,255,255, 0.1);
        }

        .container  > nav ::slotted(a:hover),
        .container  > nav ::slotted(.drawer-item:hover) {
          background-color: rgba(255,255,255, 0.05);
        }

        .container  > nav ::slotted(* .head) {
          color: white;
          width: 100%;
          border-bottom: 1px solid white;
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
      closeButton: { type: Boolean, attribute: 'close-button' }
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
      <div class="container">
        ${this.closeButton ? html`<button id="close" @click="${this.close}">${close}</button>` : ''}
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
