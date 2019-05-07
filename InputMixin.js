import { html } from "lit-element";

export const InputMixin = (base) => {
  return class Base extends base {
    
    static get properties() {
      return {
        stylesheet: { type: String },
        label: { type: String },
        labelBefore: { type: Boolean },
        labelAfter: { type: Boolean },
        invalid: { type: String }
      }
    }

    get customStyle() {
      return html`
          ${ this.stylesheet ? html`<link rel="stylesheet" href="${this.stylesheet}">` : '' }
        `
    }

    get labelTextTemplate() {
      return  html`
                <label for="_el">
                  ${this.label}
                  <slot name="label"></slot>
                </label>
              `
    }

    get labelTemplate() {
      return  html`
                <label for="_el">
                  ${this.label}
                  <slot name="label"></slot>
                </label>
              `
    }
    
    get labelBeforeTemplate() {
      return html`
        ${ (this.label || this.labelBefore) ? this.labelTemplate : '' }
      `
    }

    get labelAfterTemplate() {
      return html`
        ${ this.labelAfter ? this.labelTemplate : '' }
      `
    }
  }
}