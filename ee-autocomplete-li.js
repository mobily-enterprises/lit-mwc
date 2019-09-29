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
    this.config = {
      path: 'name'
    }
  }

  render () {
    return html`
    <li>${this.data[this.config.path]}</li>
    `
  }

  /* API */

  get textValue () {
    return this.data[this.config.path]
  }

  static get PickedElement () {
    return EeAutocompleteLiView
  }
}
customElements.define('ee-autocomplete-li', EeAutocompleteLi)

class EeAutocompleteLiView extends LitElement {
  static get styles () {
    return [
      super.styles || [],
      css`
        :host {
          display: inline-block;
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
    this.config = {
      path: 'name'
    }
  }

/*
  OUT OF RENDER
  ${this.suggestions.map(suggestion => html`
    <li>${suggestion[this.suggestionsPath]}</li>
  `)}
  */
  render () {
    return html`
      -${this.data[this.config.path]}-
    `
  }
}
customElements.define('ee-autocomplete-li-view', EeAutocompleteLiView)
