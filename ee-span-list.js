import { LitElement, html, css } from 'lit-element'
import { StyleableMixin } from './mixins/StyleableMixin'
import { ThemeableMixin } from './mixins/ThemeableMixin'

class EeSpanList extends ThemeableMixin('ee-span-list')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      super.styles || [],
      css`
        :host {
          display: block;
        }

        #list {
          display: inline-block
        }
      `
    ]
  }

  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <div id="list"></div>
      <textarea @input="${this._inputReceived}" rows="1" id="ta" spellcheck="false" autocomplete="false" autocapitalize="off" autocorrect="off" tabindex="1" dir="ltr" role="combobox" aria-autocomplete="list"></textarea>
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }

  get validity () {
    return {
      valid: true
    }
  }

  _inputReceived (e) {
    this.autocompleteValue = this.shadowRoot.querySelector('#ta').value
  }

  /* API */
  pickedElement (el) {
    const list = this.shadowRoot.querySelector('#list')
    const span = document.createElement('span')
    const ta = this.shadowRoot.querySelector('#ta')
    span.appendChild(el)
    list.appendChild(span)
    ta.value = ''
  }
}

window.customElements.define('ee-span-list', EeSpanList)
