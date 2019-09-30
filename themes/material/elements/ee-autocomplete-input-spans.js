import { css } from 'lit-element'
import { inputField } from '../style-patterns.js'

export const EeAutocompleteInputSpans = (base) => {
  return class Base extends base {
    static get styles () {
      return [
        ...super.styles || [],
        inputField,
        // errorMessage,
        css`
          /* textarea {
            display: inline-block;
            box-sizing: border-box;
            font-family: var(--nn-font-family, 'sans-serif');
            padding-top: 12px;
            resize: none;
            min-width: 150px;
            font-size: 1em;
          }

          #list > span {
            padding: 2px 6px;
            border: 1px solid #ddd;
            border-radius: 1em;
            margin: 2px;
          }

          #list > span:hover {
            border-color: var(--nn-primary-color);
            box-shadow: var(--nn-theme-box-shadow1);
          } */

        `
      ]
    }
  }
}
