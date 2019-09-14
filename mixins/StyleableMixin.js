import { html } from 'lit-element'

export const StyleableMixin = (base) => {
  return class Base extends base {
    static get properties () {
      return {
        stylesheet: {
          type: String
        },
        customCSS: {
          type: Object,
          attribute: 'custom-css'
        }
      }
    }

    get customStyle () {
      return html`
          ${this.stylesheet ? html`<link rel="stylesheet" href="${this.stylesheet}">` : ''}
          ${this.customCSS ? html`${this.customCSS}` : ''}
        `
    }
  }
}
