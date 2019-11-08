import { LitElement, html, css } from 'lit-element'
import { StyleableMixin } from './mixins/StyleableMixin'
import { ThemeableMixin } from './mixins/ThemeableMixin'

export class EeRow extends ThemeableMixin('ee-cell')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      css`
        :host {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: 100%;
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
          display:none;
        }

        :host([size=small]) ::slotted(ee-cell[header]) {
          display: none;
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
