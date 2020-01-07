import { css } from 'lit-element'
import { inputField } from '../style-patterns.js'
import { EeAutocompleteInputSpansBase } from 'tpe/ee-autocomplete-input-spans.js'

export class EeAutocompleteInputSpans extends EeAutocompleteInputSpansBase {
  static get styles () {
    return [
      super.styles,
      inputField,
      css`
      `
    ]
  }
}
window.customElements.define('ee-autocomplete-input-spans', EeAutocompleteInputSpans)
