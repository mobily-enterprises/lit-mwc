import { LitElement, html, css } from 'lit-element'
import { StyleableMixin } from './mixins/StyleableMixin.js'
import { ThemeableMixin } from './mixins/ThemeableMixin.js'
import './ee-autocomplete-item-li'

export class EeAutocomplete extends StyleableMixin(LitElement)) {
  static get styles () {
    return [
      super.styles,
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
          top: 90%;
          box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.2), 0 0 2px 2px rgba(0, 0, 0, 0.05);
        }

        #suggestions[populated] {
          width: 100%;
          padding: 10px;
        }

        #suggestions > *[selected], #suggestions > *:focus, #suggestions > *:hover  {
          background-color: #eee;
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
      targetForId: {
        type: String,
        attribute: 'target-for-id'
      },
      picked: {
        type: Boolean,
        reflect: true
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
    this.target = null
    this.targetForId = null
    this.suggestions = []
    this.itemElement = 'ee-autocomplete-item-li'
    this.itemElementConfig = {}
    this.itemElementAttributes = {}

    this._boundInputEvent = this._inputEvent.bind(this)
    this._boundKeydownEvent = this._keydownEvent.bind(this)
  }

  // If if's not set, return the first child
  // If it's set:
  //   If it's a string, return the #element
  //   If it's an object, return it directly (assumption that it's an element)
  _findTarget (target) {
    if (target !== null) {
      if (typeof target === 'string') return this.querySelector(`#${target}`)
      else if (typeof target === 'object') return target
    } else {
      return this.children[0]
    }
    return null
  }

  // If if's not set, don't do anything
  // If it's set:
  //   If it's an empty string, look for the first [name] element without no-submit,
  //   If it's a string, return the #element
  //   If it's an object, return it  directly (assumption that it's an element)
  _findTargetForId (target) {
    if (target !== 'null') {
      if (typeof target === 'string') {
        return target === ''
          ? this.querySelector('[name]:not([no-submit])')
          : this.querySelector(`#${target}`)
      } else if (typeof target === 'object') return target
    }
    return null
  }

  connectedCallback () {
    super.connectedCallback()

    this.targetElement = this._findTarget(this.target)
    this.targetForId = this._findTargetForId(this.targetForId)

    // The target for Id is the true source of the value
    // in case of ID submission. So, two things must happen:
    // 1) If it has a value already (it might have been set by a data load before the autocomplete), then picked is true
    // 2) Its value needs to be observed, so that if a value is set at any point, picked becomes true
    if (this.targetForId) {
      this.picked = !!this.targetForId.getAttribute('value')

      const thisObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'value') {
            this.picked = !!this.targetForId.getAttribute('value')
          }
        })
      })
      thisObserver.observe(this.targetForId, { attributes: true })
    }

    if (!this.targetElement) {
      console.error('Target element not found')
      return
    }

    this.targetElement.addEventListener('input', this._boundInputEvent)
    this.targetElement.addEventListener('keydown', this._boundKeydownEvent)

    // API USE: If the target input element implements multiInputApi,
    // then set the basic parameters for all
    // picked items (element name, config and attributes)
    if (this.targetElement.multiInputApi) {
      this.targetElement.setPickedElement(this.itemElement, this.itemElementConfig, this.itemElementAttributes)
    }

    // Setup ARIA attributes on target
    this.targetElement.setAttribute('aria-autocomplete', 'list')
    this.targetElement.setAttribute('aria-controls', 'suggestions')
    this.targetElement.toggleAttribute('aria-activedescendant', true)
    // Setup ARIA attributes on ee-autocomplete
    this.setAttribute('role', 'combobox')
    this.setAttribute('aria-owns', 'suggestions')
  }

  disconnectedCallback () {
    if (!this.targetElement) return

    this.targetElement.removeEventListener('input', this._boundInputEvent)
    this.targetElement.removeEventListener('keydown', this._boundKeydownEvent)
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      <slot></slot>
      <div @click="${this._picked}" id="suggestions" role="listbox" @keydown=${this._handleKeyEvents}></div>
    `
  }

  _keydownEvent (e) {
    switch (e.key) {
    case 'Escape':
      this._dismissSuggestions()
      break
    case 'KeyDown':
      if (this.suggestions.length) {
        const suggestionsDiv = this.shadowRoot.querySelector('#suggestions')
        suggestionsDiv.firstChild.focus()
      }
    }
  }

  pickFirst () {
    const suggestionsDiv = this.shadowRoot.querySelector('#suggestions')
    suggestionsDiv.querySelector('[selected]').click()
  }

  focusNext () {
    if (!this.suggestions.length) return
    const suggestionsDiv = this.shadowRoot.querySelector('#suggestions')
    let selected = suggestionsDiv.querySelector('[selected]') || suggestionsDiv.firstElementChild
    if (this.suggestions.length > 1) {
      selected.toggleAttribute('selected', false)
      selected = selected.nextElementSibling || selected.previousElementSibling
    }
    if (selected) selected.focus()
  }

  _picked (e) {
    if (this.informational || !this.targetElement) return

    if (this.targetElement.multiInputApi) {
      this.targetElement.pickedElement(e.target.data)
    } else {
      this.targetElement.value = e.target.textValue
      if (this.targetForId) {
        this.targetForId.value = e.target.idValue
        this.picked = true
      }
    }
    this._dismissSuggestions()
    this.targetElement.focus()

    // Dispatch input event since input happened
    const inputEvent = new CustomEvent('input', { composed: true, bubbles: true, cancelable: false, detail: { synthetic: true } })
    this.targetElement.dispatchEvent(inputEvent)
  }

  async updated (cp) {
    if (!cp.has('suggestions')) return

    const suggestionsDiv = this.shadowRoot.querySelector('#suggestions')

    while (suggestionsDiv.firstChild) { suggestionsDiv.removeChild(suggestionsDiv.firstChild) }

    if (this._autocompleteInFlight) return

    if (this.targetElement.multiInputApi) {
      if (this.targetElement.textInputValue === '') {
        suggestionsDiv.toggleAttribute('populated', false)
        return
      }
    }

    for (const suggestion of this.suggestions) {
      const el = document.createElement(this.itemElement)
      el.config = { ...el.config, ...this.itemElementConfig }
      for (const k of Object.keys(this.itemElementAttributes)) el.setAttribute(k, this.itemElementAttributes[k])
      el.data = suggestion
      el.onkeydown = this._handleKeyEvents.bind(this)
      // Make span focusable AND in the tab list
      el.setAttribute('tabindex', 0)
      suggestionsDiv.appendChild(el)
    }

    // Only 1 response and it's a plain text input? Autocomplete if text fully matches
    // beginning of the only result
    if (
      this.suggestions.length === 1 &&
      !this.targetElement.multiInputApi &&
      typeof this.targetElement.setSelectionRange === 'function'
    ) {
      const firstOption = suggestionsDiv.firstChild
      const textValue = firstOption.textValue
      if (textValue.toUpperCase().startsWith(this.targetElement.value.toUpperCase())) {
        const oldValue = this.targetElement.value
        this.targetElement.value = textValue
        this.targetElement.setSelectionRange(oldValue.length, textValue.length)
        if (this.targetForId) {
          this.targetForId.value = firstOption.idValue
          this.picked = true
        }
      }
    }

    if (!this.suggestions.length) {
      suggestionsDiv.toggleAttribute('populated', false)
    }

    if (this.suggestions.length) {
      suggestionsDiv.toggleAttribute('populated', true)
      suggestionsDiv.firstChild.toggleAttribute('selected', true)
    }
  }

  _dismissSuggestions () {
    const suggestionsDiv = this.shadowRoot.querySelector('#suggestions')
    suggestionsDiv.toggleAttribute('populated', false)
    this.suggestions = []
  }

  _handleKeyEvents (e) {
    const target = e.currentTarget

    if (!this.suggestions.length || !target.parentElement) return

    switch (e.key) {
    case 'ArrowUp':
      e.preventDefault()
      target.previousElementSibling
        ? target.previousElementSibling.focus()
        : target.parentElement.lastElementChild.focus()
      break
    case 'ArrowDown':
      e.preventDefault()
      target.nextElementSibling
        ? target.nextElementSibling.focus()
        : target.parentElement.firstElementChild.focus()
      break
    case 'Tab':
    case 'Enter':
      this._picked(e)
      e.preventDefault()
      this.targetElement.focus()
      break
    case 'Escape':
      this._dismissSuggestions()
      this.targetElement.focus()
      break
    }
  }

  async _inputEvent (e) {
    // This is a synthetic event triggered by autocomplete itself
    // once a selection was made: ignore
    if (e.detail && e.detail.synthetic) return

    // Nothing can nor should happen without a target
    const target = this.targetElement
    if (!target) return

    // There is more input: a new query will be made,
    // so the list is now stale
    this._dismissSuggestions()

    // If the target element is not valid, don't take off at all
    // TAKEN OUT as autocomplete might be necessary to actually make
    // it valid
    // if (!target.validity.valid) {
    //  this.suggestions = []
    //  return
    // }

    // Check if it's inflight. If so, queue up an autocomplete
    // with the same 'e'
    if (this._autocompleteInFlight) {
      this._attemptedAutocompleteFlight = e
      return
    }
    this._autocompleteInFlight = true

    if (this.targetForId) {
      this.targetForId.value = ''
      this.picked = false
    }

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
