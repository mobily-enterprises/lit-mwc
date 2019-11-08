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
