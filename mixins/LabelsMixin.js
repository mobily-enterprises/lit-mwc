import { html } from 'lit-element'

export const LabelsMixin = (base) => {
  return class Base extends base {
    static get properties () {
      return {
        label: { type: String },
        labelBefore: {
          type: Boolean,
          attribute: 'label-before'
        },
        labelAfter: {
          type: Boolean,
          attribute: 'label-after'
        }
      }
    }

    get labelTemplate () {
      return html`
        <label id="label" for="native">
          <div id="label-text">${this.label}</div>
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
