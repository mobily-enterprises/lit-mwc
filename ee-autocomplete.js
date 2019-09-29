import { LitElement, html, css } from 'lit-element'
import { StyleableMixin } from './mixins/StyleableMixin.js'
import { ThemeableMixin } from './mixins/ThemeableMixin.js'
import './ee-autocomplete-item-li'

export class EeAutocomplete extends ThemeableMixin('ee-autocomplete')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      super.styles || [],
      css`
        :host {
          display: block;
          position: relative;
        }

        #suggestions {
          box-sizing: border-box;
          background-color: white;
          position: absolute;
          z-index: 1000;
          max-height: 480px;
          overflow-y: scroll;
          top: 54px;
          box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.2), 0 0 2px 2px rgba(0, 0, 0, 0.05);
        }

        #suggestions[populated] {
          width: 100%;
          padding: 10px;
        }

        [hidden] {
          display: none !important;
        }
      `
    ]
  }

  static get properties () {
    return {
      url: {
        type: String
      },
      informational: {
        type: Boolean
      },
      target: {
        type: String
      },
      suggestions: {
        type: Array,
        attribute: false
      },
      itemElement: {
        type: String,
        attribute: 'item-element'
      },
      itemElementConfig: {
        type: Object,
        attribute: 'item-element-config'
      },
      itemElementAttributes: {
        type: Object,
        attribute: 'item-element-attributes'
      }

    }
  }

  constructor () {
    super()
    this.url = ''
    this.target = ''
    this.suggestions = []
    this.itemElement = 'ee-autocomplete-item-li'
    this.itemElementConfig = {}
    this.itemElementAttributes = {}

    this._boundInputEvent = this._inputEvent.bind(this)
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

    if (!this.targetElement) {
      console.error('Target element not found')
      return
    }

    this.targetElement.addEventListener('input', this._boundInputEvent)
  }

  disconnectedCallback () {
    if (!this.targetElement) return

    this.targetElement.removeEventListener('input', this._boundInputEvent)
  }

  render () {
    return html`
      <slot></slot>
      <div @click="${this._picked}" id="suggestions"></div>
    `
  }

  _picked (e) {
    if (this.informational) return
    if (typeof this.targetElement.pickedElement === 'function') {
      const parentEl = document.createElement(this.itemElement)
      const el = new parentEl.constructor.PickedElement()

      el.config = { ...el.config, ...this.itemElementConfig }
      for (const k of Object.keys(this.itemElementAttributes)) el.setAttribute(k, this.itemElementAttributes[k])
      el.data = e.target.data

      this.targetElement.pickedElement(el)
    } else {
      this.targetElement.value = e.target.textValue
    }
    this.suggestions = []
    console.log(e.target.data)
  }

  async updated (cp) {
    if (!cp.has('suggestions')) return
    const suggestionsDiv = this.shadowRoot.querySelector('#suggestions')
    suggestionsDiv.toggleAttribute('populated', !!this.suggestions.length)
    while (suggestionsDiv.firstChild) { suggestionsDiv.removeChild(suggestionsDiv.firstChild) }

    for (const suggestion of this.suggestions) {
      const el = document.createElement(this.itemElement)
      el.config = { ...el.config, ...this.itemElementConfig }
      for (const k of Object.keys(this.itemElementAttributes)) el.setAttribute(k, this.itemElementAttributes[k])
      el.data = suggestion
      suggestionsDiv.appendChild(el)
    }
  }

  async _inputEvent (e) {
    // Nothing can nor should happen without a target
    const target = this.targetElement
    if (!target) return

    // If the target element is not valid, don't take off at all
    if (!target.validity.valid) {
      this.suggestions = []
      return
    }

    // Check if it's inflight. If so, queue up an autocomplete
    // with the same 'e'
    if (this._autocompleteInFlight) {
      this._attemptedAutocompleteFlight = e
      return
    }
    this._autocompleteInFlight = true

    // Set the url, which will also depend on recordId
    const value = target.autocompleteValue || target.value
    const url = this.url + value

    const fetchOptions = {
      method: 'GET',
      redirect: 'follow' // manual, *follow, error
    }

    // Attempt the submission
    let networkError = false
    let response
    try {
      response = await fetch(url, fetchOptions)
    } catch (e) {
      console.log('ERROR!', e)
      networkError = true
    }

    // CASE #1: network error.
    if (networkError) {
      console.log('Network error!')

      // Emit event to make it possible to tell the user via UI about the problem
      const event = new CustomEvent('autocomplete-error', { detail: { type: 'network' }, bubbles: true, composed: true })
      this.dispatchEvent(event)

    //
    // CASE #2: HTTP error.
    // Invalidate the problem fields
    } else if (!response.ok) {
      console.log('Fetch error!')

      const errs = await response.json()
      // Emit event to make it possible to tell the user via UI about the problem
      const event = new CustomEvent('autocomplete-error', { detail: { type: 'http', response, errs }, bubbles: true, composed: true })
      this.dispatchEvent(event)

    // CASE #3: NO error. Set fields to their
    // new values
    } else {
      // Convert the result to JSON
      const v = await response.json()

      // Emit event to make it possible to tell the user via UI about the problem
      const event = new CustomEvent('form-ok', { detail: { response }, bubbles: true, composed: true })
      this.dispatchEvent(event)

      this.suggestions = v
    }

    this._autocompleteInFlight = false
    if (this._attemptedAutocompleteFlight) {
      const oldE = this._attemptedAutocompleteFlight
      this._attemptedAutocompleteFlight = false
      this._inputEvent(oldE)
    }
  }
}
customElements.define('ee-autocomplete', EeAutocomplete)
