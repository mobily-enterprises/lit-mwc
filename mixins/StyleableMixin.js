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

      // Add the equivalent of
      // <slot name="style" id="style-slot"></slot>
      // To the shadow DOM
      const styleSlot = document.createElement('slot')
      styleSlot.setAttribute('name', 'style')
      styleSlot.setAttribute('id', 'style-slot')
      this.shadowRoot.appendChild(styleSlot)

      // If an element has one or more <any-tag slot="style"> in its
      // light DOM, the newly added styleSlot will have
      // them  as an assigned element.
      // Clone over all of the ones where any-tag is `style`.
      // So, any <style slot="style"> will be cloned over
      for (const styleElement of styleSlot.assignedElements()) {
        if (styleElement.tagName === 'STYLE') {
          this.shadowRoot.appendChild(styleElement)
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
