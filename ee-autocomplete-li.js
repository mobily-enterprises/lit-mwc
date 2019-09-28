import { LitElement, html, css } from 'lit-element'
import { StyleableMixin } from './mixins/StyleableMixin.js'
import { ThemeableMixin } from './mixins/ThemeableMixin.js'

export class EeAutocompleteLi extends ThemeableMixin('ee-autocomplete-li')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      super.styles || [],
      css`
        :host {
          display: block;
        }
      `
    ]
  }

  static get properties () {
    return {
      data: {
        type: Object,
        attribute: false
      },
      config: {
        type: Object,
        attribute: false
      }
    }
  }

  constructor () {
    super()
    debugger
    this.config = {
      path: 'name2'
    }
  }

/*
  OUT OF RENDER
  ${this.suggestions.map(suggestion => html`
    <li>${suggestion[this.suggestionsPath]}</li>
  `)}
  */
  render () {
    debugger
    return html`
      <li>${this.data[this.config.path]}</li>
    `
  }

  updated () {
    super.updated()
  }
}
customElements.define('ee-autocomplete-li', EeAutocompleteLi)
