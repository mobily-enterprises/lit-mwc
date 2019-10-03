import { LitElement, html, css } from 'lit-element'

export class MyToolbar extends LitElement {
  static get styles () {
    return [
      css`
        :host {
          display: flex;
          width: 100%;
          align-items: center;
          position: relative;
          height: 64px;
          padding: 0 5px;
          pointer-events: none;
          font-size: var(--toolbar-font-size, 20px);
        }

        :host ::slotted(*) {
          pointer-events: auto;
        }

        :host ::slotted(.icon) {
          font-size: 0;
        }

        :host ::slotted([main-title]),
        :host ::slotted([condensed-title]) {
          pointer-events: none;
          display: flex;
          margin: auto
        }

        :host ::slotted([bottom-item]) {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
        }

        :host ::slotted([top-item]) {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
        }

        :host ::slotted([spacer]) {
          margin-left: 64px;
        }
      `
    ]
  }

  render () {
    return html`
      <slot></slot>
    `
  }
}
customElements.define('ee-toolbar', MyToolbar)
