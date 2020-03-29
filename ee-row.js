import { LitElement, html, css } from 'lit-element'
import { StyleableMixin } from './mixins/StyleableMixin'
import { ThemeableMixin } from './mixins/ThemeableMixin'

export class EeRow extends ThemeableMixin('ee-row')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      css`
        :host {
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: 100%;
          border: 1px solid transparent;
          border-bottom: var(--ee-row-border-bottom, 1px solid #777);
        }

        :host(:last-child) {
          border-color: transparent;
        }

        :host([header]) {
          height: var(--ee-row-header-height, 2em);
          box-sizing: border-box;
          font-weight: bold;
          border-bottom: var(--ee-row-header-border-bottom, 2px solid #777);
        }

        :host(:hover:not([header])) {
          border: 1px solid var(--ee-row-hover-border-color, #ddd);
          background: var(--ee-row-hover-background, #eee) !important;
        }

        :host([frozen]) {
          position: sticky;
          top: 0;
          background: var(--ee-row-background, white);
        }

        :host([frozen][footer]) {
          bottom: 0;
          top: unset;
          border-top: var(--ee-row-border-bottom, 1px solid #777);
        }

        :host([size=small]) ::slotted(ee-cell) {
          flex-basis: 100%;
        }

        :host([size=medium]) ::slotted(ee-cell),
        :host([size=large]) ::slotted(ee-cell) {
          flex-basis: 0;
        }

        :host([size=medium]) ::slotted(ee-cell[extra]),
        :host([size=small]) ::slotted(ee-cell[extra])
         {
          display:none !important;
        }

        :host([size=small]) ::slotted(ee-cell[header]) {
          display: none !important;
        }
      `
    ]
  }

  static get properties () {
    return {
    }
  }

  constructor () {
    super()
    this.SOMETHING = false
  }

  connectedCallback () {
    super.connectedCallback()
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      <slot></slot>
    `
  }
}
customElements.define('ee-row', EeRow)
