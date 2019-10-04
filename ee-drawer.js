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
          width: 30px;
          height: 100vh;
        }

        :host([opened]) {
          width: 100vw;
          height: 100vh;
        }

        div.container {
          height: 100vh;
          position: fixed;
          /* z-index: 2; */
          top: 0;
          left: 0;
          will-change: transform;
          transform: translateX(-100%);
          overflow-x: hidden;
          transition: transform 0.3s ease-out;
          background-color: var(--drawer-background, initial);
        }

        div.container::after {
          content:'';
          position: absolute;
          left: 100%;
          top: 0;
          height: 100%;
          width: 40px;
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
    this.xPos = 0
    this.yPos = 0
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('focus', this.focus)
    this.addEventListener('click', this._handleOutsideClick)
    this.addEventListener('mousedown', this._handleDragStart)
  }
  
  firstUpdated () {
    this.container = this.shadowRoot.querySelector('div.container')
  }
  render () {
    return html`
      <div class="container">
        ${this.closeButton ? html`<button id="close" @click="${this.close}">${close}</button>` : ''}
        <slot></slot>
      </div>
    `
  }

  open () {
    this.opened = true
  }

  _handleOutsideClick (e) {
    if (e.target.nodeName === 'EE-DRAWER') this.close()
  }

  _handleDragStart (e) {
    if (!e.target.nodeName === 'EE-DRAWER') return
    console.log('hold')
    e = e || window.event
    e.preventDefault()
    // get the mouse cursor position at startup:
    this.xPos = e.clientX
    document.onmouseup = this._stopDrag.bind(this)
    // call a function whenever the cursor moves:
    document.onmousemove = this._track.bind(this)
  }

  _track (e) {
    e = e || window.event
    e.preventDefault()
    const delta = Math.abs(this.xPos - e.clientX)
    if (delta > 25) {
      this.container.style.transitionDelay = '0'
      this.container.style.transform = `translateX(calc(-100% + ${delta *2}px))`
    }
  }
  
  _stopDrag (e) {
    document.onmouseup  = null 
    document.onmousemove = null 
    debugger
    const delta = e.clientX - this.xPos
    console.log(delta)
    if ( !this.opened && delta > 0 && delta > 100) {
      console.log(delta)
      this.open()
    } else if ( delta < -50 ) {
      this.close()
    }
    this.container.style = undefined
    this.xPos = e.clientX
  }

  close () {
    this.opened = false
    this.xPos = 0
  }

  focus () {
    console.log('I have focus')
  }
}
window.customElements.define('ee-drawer', EeDrawer)
