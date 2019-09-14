import { html, TemplateResult } from 'lit-element'

export const StyleableMixin = (base) => {
  return class Base extends base {
    static get properties () {
      return {
        stylesheet: {
          type: String,
          attribute: 'element-style'
        },
        elementStyle: {
          type: TemplateResult
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
