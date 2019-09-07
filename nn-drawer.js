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
         width: 0; /* 0 width - change this with JavaScript */
         position: fixed; /* Stay in place */
         z-index: 1; /* Stay on top */
         top: 0; /* Stay at the top */
         left: 0;
         overflow-x: hidden; /* Disable horizontal scroll */
         padding-top: 60px; /* Place content 60px from the top */
         transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
       }
     `
    ]
  }

  render () {
    return html`
      <div class="container">
        <slot></slot>
      </div>
    `
  }

  open () {
    this.shadowRoot.querySelector('div.container').style.width = '250px'
  }

  close () {
    this.shadowRoot.querySelector('div.container').style.width = '0'
  }
}

window.customElements.define('nn-drawer', NnDrawer)
