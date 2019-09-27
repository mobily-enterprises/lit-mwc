import { LitElement, html, css } from 'lit-element'
import { StyleableMixin } from './mixins/StyleableMixin.js'
import { ThemeableMixin } from './mixins/ThemeableMixin.js'
import './nn-select'

export class EeAutocomplete extends ThemeableMixin('ee-autocomplete')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      super.styles || [],
      css`
        :host {
          display: block;
        }

        #suggestions {
          background-color: white;
          position: absolute;
          z-index: 1000;
          max-height: 480px;
          overflow-y: scroll;
          top: 54px;
          box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.2), 0 0 2px 2px rgba(0, 0, 0, 0.05);
        }

        [hidden] {
          display: none !important;
        }
      `
    ]
  }

  static get properties () {
    return {
      method: {
        type: String
      },
      url: {
        type: String
      },
      mustMatch: {
        type: Boolean,
        attribute: 'must-match'
      },
      informational: {
        type: Boolean
      },
      target: {
        type: String
      },
      suggestionsPath: {
        type: String,
        attribute: 'suggestions-path'
      },
      suggestions: {
        type: Array,
        attribute: false
      }
    }
  }

  constructor () {
    super()
    this.method = 'get'
    this.url = ''
    this.target = ''
    this.suggestionsPath = 'name'
    this.suggestions = []
  }

  connectedCallback () {
    super.connectedCallback()

    if (this.target) {
      if (typeof this.target === 'string') this.targetElement = this.querySelector(`#${this.target}`)
      else this.targetElement = this.target
    } else {
      this.targetElement = this.children[0]
    }
    console.log('Target element:', this.targetElement)
  }

  render () {
    return html`
      <slot></slot>
      <nn-select id="suggestions" hidden>
        ${this.suggestions.map(suggestion => html`
          <option>${suggestion}</option>
        `)}
      </nn-select>
    `
  }
}
customElements.define('ee-autocomplete', EeAutocomplete)
