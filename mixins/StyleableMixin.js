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

    static get styles () {
      return [
        super.styles || []
      ]
    }

    firstUpdated () {
      super.firstUpdated()

      const styleSlot = this.shadowRoot.querySelector('#style-slot')
      if (styleSlot) {
        for (const styleElement of styleSlot.assignedElements()) {
          if (styleElement.tagName === 'STYLE') {
            this.shadowRoot.appendChild(styleElement)
          }
        }
      }
    }

    get customStyle () {
      return html`
          ${this.stylesheet ? html`<link rel="stylesheet" href="${this.stylesheet}">` : ''}
          ${this.elementStyle ? html`${this.elementStyle}` : ''}
          <slot name="style" id="style-slot"></slot>
        `
    }
  }
}
