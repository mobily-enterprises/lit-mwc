import { LitElement, html, css } from 'lit-element'

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
         position: absolute;
         top: 5px;
         right: 5px;
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
        <button id="close" @click="${this.close}">&#x274C;</button>
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
