import { css } from 'lit-element'
import { inputField, errorMessage } from '../style-patterns.js'

export const EeAutocompleteInputSpans = (base) => {
  return class Base extends base {
    static get styles () {
      return [
        ...super.styles || [],
        inputField,
        errorMessage,
        css`
          textarea {
            box-sizing: border-box;
            font-family: var(--nn-font-family, 'sans-serif');
            padding-top: 12px;
            resize: none;
            width: 100%;
            font-size: 1em;
          }

          #list {
            border-bottom: 1px solid var(--nn-boundaries-color);
            padding-bottom: 10px;
            margin-bottom: 10px;
          }

          #list > span {
            padding: 2px 6px;
            border: 1px solid #ddd;
            border-radius: 1em;
            margin: 2px;
            display: inline-block;
          }

          #list > span:hover {
            border-color: var(--nn-primary-color);
            box-shadow: var(--nn-theme-box-shadow1);
          }

        `
      ]
    }
  }
}
