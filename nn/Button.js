import { LitElement, html, css } from 'lit-element'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'
import { baseProperties, buttonIDLProperties, alwaysSkipAttributes } from '../common.js'

class Button extends FormElementMixin(NativeReflectorMixin(LitElement)) {
  static get styles () {
    return css`
      button {
        height: var(--button-height, 30px);
        background-color: var(--button-background, white);
        border-radius: var(--button-border-radius, 3px);
        text-transform: uppercase;
        color: inherit;
      }

      :host([raised]) button {
        box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1), 0 1px 4px 0 rgba(0, 0, 0, 0.16);
        transition: box-shadow 0.2s ease-out;
      }

      button:active, button:focus {
        outline: none;
      }

      :host([raised]) button:active {
        box-shadow: none;
        border-color: rgba(0, 0, 0, 0.1)
        border-image: none;
        transition: box-shadow 0.2s ease-out;

      }

    `
  }

  static get properties () {
    return {
      stylesheet: { type: String },
      customCSS: { type: Object },
      raised: { type: Boolean, reflect: true }
    }
  }

  get customStyle () {
    return html`
        ${this.stylesheet ? html`<link rel="stylesheet" href="${this.stylesheet}">` : ''}
        ${this.customCSS ? html`${this.customCSS}` : ''}
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
