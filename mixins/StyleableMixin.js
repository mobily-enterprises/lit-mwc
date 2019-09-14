import { html } from 'lit-element'

export const StyleableMixin = (base) => {
  return class Base extends base {
    static get properties () {
      return {
        /* This is for non-developers consumers, using attribute */
        stylesheet: {
          type: String
        },
        /* This is for developers, assigning property */
        elementStyle: {
          type: Object,
          attribute: false
        }
      }
    }

    get customStyle () {
      return html`
          ${this.stylesheet ? html`<link rel="stylesheet" href="${this.stylesheet}">` : ''}
          ${this.elementStyle ? html`${this.elementStyle}` : ''}
        `
    }
  }
}
