import { html, TemplateResult } from 'lit-element'

export const InputMixin = (base) => {
  return class Base extends base {
    static get properties () {
      return {
        stylesheet: { type: String },
        customCSS: { type: TemplateResult },
        label: { type: String },
        labelBefore: {
          type: Boolean,
          attribute: 'label-before'
        },
        labelAfter: {
          type: Boolean,
          attribute: 'label-after'
        },
        invalid: { type: String }
      }
    }

    get customStyle () {
      return html`
          ${this.stylesheet ? html`<link rel="stylesheet" href="${this.stylesheet}">` : ''}
          ${this.customCSS ? html`${this.customCSS}` : ''}
        `
    }

    get labelTemplate () {
      return html`
                <label id="label" for="_native">
                  <span id="label-text">${this.label}</span>
                  <slot id="label-slot" name="label"></slot>
                </label>
              `
    }

    get labelBeforeTemplate () {
      return html`
        ${(this.label || this.labelBefore) ? this.labelTemplate : ''}
      `
    }

    get labelAfterTemplate () {
      return html`
        ${this.labelAfter ? this.labelTemplate : ''}
      `
    }
  }
}
