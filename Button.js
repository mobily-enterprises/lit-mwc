import { LitElement, html, css } from 'lit-element'
import { CommonMixin } from './CommonMixin.js'
import { baseProperties, buttonIDLProperties, alwaysSkipAttributes } from './common.js'

class Button extends CommonMixin(LitElement) {
  static get styles () {
    return css`
      button {
        height: var(--button-height, 30px);
        background-color: var(--button-background, white);
        border-radius: var(--button-border-radius, 3px);
        text-transform: uppercase;
      }

      button[raised] {
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 
                    0 1px 5px 0 rgba(0, 0, 0, 0.12), 
                    0 3px 1px -2px rgba(0, 0, 0, 0.2);
      }
    `
  }
  static get properties () {
    return {
      stylesheet: { type: String },
    }
  }

  get customStyle () {
    return html`
        ${this.stylesheet ? html`<link rel="stylesheet" href="${this.stylesheet}">` : ''}
      `
  }

  get skipAttributes () {
    return [
      ...alwaysSkipAttributes,
      'form'
    ]
  }

  get reflectProperties () {
    return [
      ...baseProperties,
      ...buttonIDLProperties
    ]
  }

  render () {
    return html`${this.customStyle}

                <button @click="${this._clicked}" id="_native">
                  <slot></slot>
                </button>`
  }

  _clicked () {
    if (this.getAttribute('type') === 'submit') this.form.submit()
  }
}
customElements.define('nn-button', Button)
