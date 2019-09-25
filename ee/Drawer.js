import { LitElement, html, css } from 'lit-element'
import { StyleableMixin } from '../mixins/StyleableMixin'
import { ThemeableMixin } from '../mixins/ThemeableMixin'
const close = html`<svg class="icon" height="24" viewBox="0 0 24 24" width="24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>`

export class Drawer extends ThemeableMixin('ee/Drawer')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      super.styles || [],
      css`
       :host {
         display: block
       }

       div.backdrop {
        height: 100vh;
        background-color: transparent;
        pointer-events:fill;
        z-index: 0;
        position: fixed;
        opacity: 0;
        transition: opacity 0.5s ease-out, width 0.6s step-end ;
        width: 0;
       }

       div.container {
         height: 100vh; /* 100% Full-height */
         position: fixed; /* Stay in place */
         z-index: 1; /* Stay on top */
         top: 0; /* Stay at the top */
         left: 0;
         will-change: transform;
         transform: translateX(-100%);
         overflow-x: hidden; /* Disable horizontal scroll */
         transition: transform 0.3s ease-out; /* 0.5 second transition effect to slide in the sidenav */
         background-color: var(--drawer-background, initial);
       }

       :host([opened]) div.container {
         will-change: transform;
         transform: translateX(0);
         box-shadow: var(--drawer-shadow, 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.14))
       }

       :host([opened]) div.backdrop {
        background-color: rgba(0, 0, 0, 0.25);
        opacity: 1;
        transition: opacity 0.4s ease-out;
        width: 100vw;
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
      opened: { type: Boolean, reflect: true }
    }
  }

  render () {
    return html`
      <div class="backdrop" @click="${this.close}"></div>
      <div class="container">
        <button id="close" @click="${this.close}">${close}</button>
        <slot></slot>
      </div>
    `
  }

  open () {
    this.opened = true
  }

  close () {
    this.opened = false
  }
}

window.customElements.define('nn-drawer', Drawer)
