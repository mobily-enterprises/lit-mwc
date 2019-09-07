import { LitElement, html, css } from 'lit-element'
const close = html`<svg class="icon" height="24" viewBox="0 0 24 24" width="24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>`

export class NnDrawer extends LitElement {
  static get styles () {
    return [
      css`
       :host {
         display: block
       }

       div.container {
         height: 100vh; /* 100% Full-height */
         position: fixed; /* Stay in place */
         z-index: 1; /* Stay on top */
         top: 0; /* Stay at the top */
         left: 0;
         transform: translateX(-100%);
         overflow-x: hidden; /* Disable horizontal scroll */
         transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
       }

       :host([opened]) div.container {
         transform: translateX(0);
       }

       #close {
         color: white;
         fill: white;
         position: absolute;
         top: 5px;
         right: 5px;
         z-index: 10;
         background: transparent;

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

window.customElements.define('nn-drawer', NnDrawer)
