import { LitElement, html, css } from 'lit-element'
import { LabelsMixin } from './mixins/LabelsMixin.js'
import { StyleableMixin } from './mixins/StyleableMixin'
import { ThemeableMixin } from './mixins/ThemeableMixin'

class EeAutocompleteInputSpans extends ThemeableMixin('ee-autocomplete-input-spans')(LabelsMixin(StyleableMixin(LitElement))) {
  static get properties () {
    return {
      name: {
        type: String
      },
      valueAsIds: {
        type: Boolean,
        attribute: 'value-as-ids'
      },
      validationMessagePosition: {
        type: String,
        attribute: 'validation-message-position'
      },
      shownValidationMessage: {
        type: String,
        attribute: false
      },
      validator: { type: Function }
    }
  }

  constructor () {
    super()
    this.labelForElement = 'ni'
    this.valueAsIds = false
    this.removeIcon = '<svg class="icon" height="15" viewBox="0 0 24 24" width="15"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>'
    this.itemElement = ''
    this.itemElementConfig = {}
    this.itemElementAttributes = {}
    this.shownValidationMessage = ''
    this.validator = () => ''
    this.validationMessagePosition = 'before'
  }

  static get styles () {
    return [
      super.styles || [],
      css`
        :host {
          display: inline;
        }
        :host(:focus) {
          outline: none;
        }

        #list > span {
          position: relative;
          display: inline-block;
        }

        #list > span > *:not(button) {
          position: relative;
          display: inline-block;
          padding: 3px 6px;
          padding-right: 24px;
          border: 1px solid #ddd;
          border-radius: 1em;
          margin: 2px;
          vertical-align: middle;
          line-height: 1em;
        }

        #list > span > *:not(button)[invalid] {
          background-color: pink;
          border-color: red;
        }

        #list > span:active > *:not(button), #list > span:focus > *:not(button), #list > span:hover > *:not(button) {
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          background-color: #eee;
          outline: none;
        }
        #list > span:active > *:not(button), #list > span:focus > *:not(button) {
          border-color: var(--nn-primary-color, #ccc);
        }

        #list > span button.remove {
          appearance: none;
          -moz-appearance: none;
          -webkit-appearance: none;
          fill: #999;
          border: none;
          padding: 0;
          display: inline-block;
          position: absolute;
          top: 55%;
          right: 4px;
          transform: translateY(-50%);
          background: none;
          z-index:0;
        }

        #list > *:focus, #list > span *:active {
          outline: none;
        }

        #list > span button.remove svg {
          z-index: -1;
        }

        #list > span button.remove:hover {
          fill: #555;
        }

        input {
          box-sizing: border-box;
          display: inline-block;
          outline: none;
          vertical-align: middle;
          height: 1.5em;
          border: none;
          font-size: 0.9em;
          width: 120px;
        }

        input:focus, input:hover {
          outline: none
        }

        span.error-message {
          color: red;
        }

        :invalid {
          background-color: pink;
          border: var(--nn-input-border-invalid, 1px solid #bb7777);
        }
      `
    ]
  }

  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <div id="list" @click="${this._listClicked}">
        <input @keydown="${this._handleKeyEvents}" @input="${this._inputReceived}" rows="1" id="ta" spellcheck="false" autocomplete="false" autocapitalize="off" autocorrect="off" dir="ltr" role="combobox" aria-autocomplete="list">
      </div>
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
      <input id="ni" type="hidden" name="${this.name}">
    `
  }

  connectedCallback () {
    super.connectedCallback()
    this.addEventListener('click', this.focus)
  }

  disconnectedCallback () {
    super.connectedCallback()
    this.removeEventListener('click', this.focus)
  }

  firstUpdated () {
    this._updateNativeInputValue()
  }

  focus () {
    this.shadowRoot.querySelector('#ta').focus()
  }

  _listClicked (e) {
    e.stopPropagation()
  }

  get value () {
    const r = []
    const list = this.shadowRoot.querySelector('#list')
    for (const span of list.children) {
      if (span.id === 'ta') continue
      if (this.valueAsIds) {
        r.push(span.firstChild.idValue)
      } else {
        // Won't push invalid spans to the final value
        if (span.getAttribute('invalid') === null) r.push(span.firstChild.textValue)
      }
    }
    return r.join(',')
  }

  set value (v) {
    const list = this.shadowRoot.querySelector('#list')

    // Remove all children
    while (list.firstChild) {
      if (list.firstChild.id === 'ta') break
      list.removeChild(list.firstChild)
    }

    // Assign all children using pickedElement
    if (Array.isArray(v)) {
      for (const o of v) {
        this.pickedElement(o)
      }
    } else if (typeof v === 'object' && v !== null) {
      for (const k of Object.keys(v)) {
        const $o = v[k]
        this.pickedElement($o)
      }
    } else if (typeof v === 'string') {
      for (const s of v.split(',')) {
        this.pickedElement(s)
      }
    }

    // Sets the native input
    this._updateNativeInputValue()
  }

  /* CONSTRAINTS API */
  get validity () {
    return {
      valid: this.shownValidationMessage === ''
    }
  }

  checkValidity () {
    this.shownValidationMessage = ''

    const ownErrorMessage = this.validator()
    if (ownErrorMessage) {
      this.setCustomValidity(ownErrorMessage)
      return false
    }
    return true
  }

  setCustomValidity (validationMessage) {
    this.shownValidationMessage = validationMessage
  }

  reportValidity () {
  }

  get ifValidationMessageBefore () {
    if (this.validationMessagePosition === 'after') return ''
    return this.validationMessageTemplate
  }

  get ifValidationMessageAfter () {
    if (this.validationMessagePosition === 'before') return ''
    return this.validationMessageTemplate
  }

  get validationMessageTemplate () {
    return html`
      <span class="error-message">
        ${this.shownValidationMessage}
      </span>
    `
  }

  get autocompleteValue () {
    const ta = this.shadowRoot.querySelector('#ta')
    if (ta) return ta.value
    return ''
  }

  /* END OF CONSTRAINTS API */

  // Run this when there are no suggestions and the user hits Tab or Enter in #ta
  _pickCurrentValue () {
    if (this.valueAsIds) return
    this.pickedElement(this.shadowRoot.querySelector('#ta').value, true)
  }

  _askToRemove (e) {
    const target = e.currentTarget
    this._removeItem(target.parentElement)
  }

  _updateNativeInputValue () {
    const ni = this.shadowRoot.querySelector('#ni')
    ni.value = this.value
  }

  _removeItem (target) {
    const previous = target.previousElementSibling
    previous.focus()
    target.remove()
    this._updateNativeInputValue()
  }

  _createRemoveBtn () {
    const el = document.createElement('button')
    el.innerHTML = this.removeIcon
    el.onclick = this._askToRemove.bind(this)
    el.classList.add('remove')
    return el
  }

  _handleKeyEvents (e) {
    const target = e.currentTarget

    switch (e.key) {
    case 'ArrowLeft':
      if (target.previousElementSibling) {
        e.preventDefault()
        target.previousElementSibling.focus()
      }
      break

    case 'ArrowRight':
      if (target.id !== 'ta') {
        e.preventDefault()
        target.nextElementSibling
          ? target.nextElementSibling.focus()
          : target.parentElement.firstElementChild.focus()
      }
      break

    case 'ArrowDown':
      if (this.parentElement.suggestions.length) {
        e.preventDefault()
        this.parentElement.focusNext()
      }
      break
    case 'Backspace':
    case 'Delete':
      if (target.id === 'ta' && target.parentElement.children.length > 1 && !target.value) {
        this._removeItem(target.previousElementSibling)
      } else if (target.id !== 'ta') {
        this._removeItem(target)
      }
      break
    case 'Escape':
      if (target.id === 'ta') {
        this.dispatchEvent(new CustomEvent('dismiss-suggestions'))
      }
      break
    case 'Tab':
    case 'Enter':
      if (!this.autocompleteValue) break
      if (!this.parentElement.suggestions.length) {
        e.preventDefault()
        this._pickCurrentValue()
      } else {
        e.preventDefault()
        this.parentElement.pickFirst()
      }
    }

    /*
    if (e.key === 'ArrowLeft') {
      target.previousElementSibling ? target.previousElementSibling.focus() : target.parentElement.lastElementChild.focus()
    } else if (e.key === 'ArrowRight') {
      target.nextElementSibling ? target.nextElementSibling.focus() : target.parentElement.firstElementChild.focus()
    } if (e.key === 'ArrowDown' && this.parentElement.suggestions.length) {
      e.preventDefault()
      this.parentElement.focusNext()
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      if (target.id === 'ta' && target.parentElement.children.length > 1 && !target.value) this._removeItem(target.previousElementSibling)
      else if (target.id !== 'ta') this._removeItem(target)
    } else if (target.id === 'ta' && e.key === 'Escape') {
      this.dispatchEvent(new CustomEvent('dismiss-suggestions'))
    } else if (target.id === 'ta' && (e.key === 'Tab' || e.key === 'Enter')) {
      if (!this.parentElement.suggestions.length) {
        this._pickCurrentValue()
      } else {
        e.preventDefault()
        this.parentElement.pickFirst()
      }
    }
    */
  }

  /* API */
  get multiInputApi () { return true }

  pickedElement (data, force) {
    const parentEl = document.createElement(this.itemElement)
    const el = new parentEl.constructor.PickedElement()

    el.config = { ...el.config, ...this.itemElementConfig }
    for (const k of Object.keys(this.itemElementAttributes)) el.setAttribute(k, this.itemElementAttributes[k])

    // Convert string into data if necessary
    if (typeof data === 'string') {
      if (!data.length) return
      data = parentEl.stringToData(data)
      if (!data.valid) {
        if (!force) return
        el.setAttribute('invalid', '')
      }
    }
    el.data = data

    const list = this.shadowRoot.querySelector('#list')
    const span = document.createElement('span')
    // -1 means that it will not in the list of tabs, but
    // it will be focusable (spans aren't by default)
    span.setAttribute('tabindex', -1)
    const ta = this.shadowRoot.querySelector('#ta')
    const removeBtn = this._createRemoveBtn()

    span.onkeydown = this._handleKeyEvents.bind(this)
    // Span will be not in the list of tabs
    // Necessary since this is a button and it IS
    // in tab list by default
    removeBtn.setAttribute('tabindex', -1)
    span.appendChild(el)
    span.appendChild(removeBtn)

    list.insertBefore(span, ta)
    ta.value = ''

    this._updateNativeInputValue()
  }

  get textInputValue () {
    const targetElementTextArea = this.shadowRoot.querySelector('#ta')
    return targetElementTextArea
      ? targetElementTextArea.value
      : ''
  }

  setPickedElement (itemElement, itemElementConfig, itemElementAttributes) {
    this.itemElement = itemElement
    this.itemElementConfig = itemElementConfig
    this.itemElementAttributes = itemElementAttributes
  }
}

window.customElements.define('ee-autocomplete-input-spans', EeAutocompleteInputSpans)
