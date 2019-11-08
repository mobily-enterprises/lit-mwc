import { LitElement, html, css } from 'lit-element'
import { StyleableMixin } from './mixins/StyleableMixin'
import { ThemeableMixin } from './mixins/ThemeableMixin'

export class EeCell extends ThemeableMixin('ee-cell')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      css`
        :host {
          /* display: flex; */
          /* flex-direction: column; */
          flex-grow: 1;
          flex-shrink: 1;
        }

        :host([s1]) {
          flex-grow: 1;
        }
        :host([s2]) {
          flex-grow: 2;
        }
        :host([s3]) {
          flex-grow: 3;
        }
        :host([s4]) {
          flex-grow: 4;
        }
        :host([s5]) {
          flex-grow: 5;
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
customElements.define('ee-cell', EeCell)
