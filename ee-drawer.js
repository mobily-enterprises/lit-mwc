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
          box-sizing: border-box;
          top: 0;
          left: 0;
          z-index: 1;
          width: 10px;
          height: 100vh;
        }
        :host([opened]) {
          width: 100vw;
          height: 100vh;
        }

        div.container {
          height: 100vh;
          position: absolute;
          top: 0;
          left: 0;
          will-change: transform;
          transform: translateX(-100%);
          overflow-x: hidden;
          transition: transform 0.3s ease-out;
          background-color: var(--ee-drawer-background-color, #393939);
        }

        :host([opened]) div.container {
          will-change: transform;
          transform: translateX(0);
        }

        :host([modal][opened]) div.container {
          box-shadow: var(--ee-drawer-shadow, 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.14), 0 0 0 100vw rgba(0, 0, 0, 0.15))
        }

        #close {
          -webkit-appearance: none;
          color: var(--ee-drawer-background-color, #393939);
          fill: var(--ee-drawer-background-color, #393939);
          position: absolute;
          top: 5px;
          right: 5px;
          z-index: 10;
          background-color: var(--ee-drawer-background-color, #393939);
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

        #close:active, #close:hover {
          filter: brightness(120%);
          fill: var(--ee-drawer-selected-color, white);
          color: var(--ee-drawer-selected-color, white);
        }

        .container > nav  {
          box-sizing: border-box;
          width: 100%;
          min-width: 300px;
          height: 100%;
          padding: 30px 24px;
          background: var(--ee-drawer-background-color);
          position: relative;
          overflow: auto;
          padding-bottom: 64px;
        }

        .container > nav ::slotted(a),
        .container > nav ::slotted(.drawer-item) {
          display: block;
          text-decoration: none;
          color: var(--ee-drawer-color, #ddd);
          line-height: 32px;
          padding: 0 24px;
          cursor: pointer;
          font-size: 0.9em;
        }

        .container  > nav ::slotted(a[selected]),
        .container  > nav ::slotted(.drawer-item[selected]) {
          color: var(--ee-drawer-selected-color);
          font-weight: bolder;
          border-left: 3px solid var(--ee-drawer-selected-color, white);
          background-color: rgba(255,255,255, 0.1);
        }

        .container  > nav ::slotted(a:hover),
        .container  > nav ::slotted(.drawer-item:hover) {
          background-color: rgba(255,255,255, 0.05);
        }

        .container  > nav ::slotted(.head) {
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
      closeThreshold: { type: Number },
      openThreshold: { type: Number }
    }
  }

  constructor () {
    super()
    this.modal = false
    this.closeButton = true
    this.opened = false
    this.closeThreshold = 0.25
    this.openThreshold = 0.8
  }

  connectedCallback () {
    super.connectedCallback()
    this.addEventListener('click', this._handleOutsideClick)
    this.addEventListener('touchstart', this._handleDragStart)
    // this.addEventListener('mousedown', this._handleDragStart)
    this.addEventListener('touchmove', this._handleDrag)
    // this.addEventListener('mousemove', this._handleDrag)
    this.addEventListener('touchend', this._handleDragEnd)
    // this.addEventListener('mouseup', this._handleDragEnd)
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  
    this.removeEventListener('click', this._handleOutsideClick)
    this.removeEventListener('touchstart', this._handleDragStart)
    // this.removeEventListener('mousedown', this._handleDragStart)
    this.removeEventListener('touchmove', this._handleDrag)
    // this.removeEventListener('mousemove', this._handleDrag)
    this.removeEventListener('touchend', this._handleDragEnd)
    // this.removeEventListener('mouseup', this._handleDragEnd)
  }

  firstUpdated() {
    this.container = this.shadowRoot.querySelector('div.container')
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      <div class="container">
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

  _handleDragStart (e) {
    e.preventDefault() 
    this.dragStart = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX
    if (!this.opened) this.style.width = '100vw'
    return false
  }

  _handleDrag (e) {
    if (e.type === 'touchmove') e.preventDefault()
    
    const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX
    let offset = x - this.dragStart
    const w = this.container.getBoundingClientRect().width
    if (offset < - w + 0.8 * w ) {
      this.close()
      return;
    }
    if (offset > w - this.closeThreshold * w) {
      this.open()
      this.container.style.transform = ''
      return;
    }
    requestAnimationFrame(() => {
      this.container.style.transform = `translateX(calc(-100% + ${offset}px))`
    })
    return false
  }

  _handleDragEnd (e) {
    this.dragStart = undefined
    e.preventDefault()
    requestAnimationFrame(() => {
      this.container.style.transform = ''
    })
    this.style.width = ''
    return false
  }

}
customElements.define('ee-drawer', EeDrawer)
