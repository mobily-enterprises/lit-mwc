import { LitElement, html, css } from 'lit-element'
import { StyleableMixin } from './mixins/StyleableMixin'
import { ThemeableMixin } from './mixins/ThemeableMixin'

// https://css-tricks.com/snippets/css/a-guide-to-flexbox/
// https://dev.to/drews256/ridiculously-easy-row-and-column-layouts-with-flexbox-1k01

export class EeTable extends ThemeableMixin('ee-table')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      css`
        :host {
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
customElements.define('ee-table', EeTable)
