import { css } from 'lit-element'

export const NnInputRadio = (base) => {
  return class Base extends base {
    // Style depends on CSS being able to find label as sibling of the #native element.
    // CSS can select next siblings, but not previous.  This guarantees label is rendered after #native in the shadowDOM

static get properties () {
      return {
        labelPosition: { type: String, attribute: false },
        validationMessage: { type: String, attribute: false }
      }
    }

    constructor () {
      super()
      this.labelPosition = 'after'
      this.validationMessagePosition = 'after'
      this.label = ''
    }

    static get styles () {
      return [
        ...super.styles || [],
        css`
          :host {
            display: block;
            position: relative;
            padding-left: 24px;
            margin-bottom: 12px;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }

          input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
          }

          input:invalid {
            background-color: var(--nn-error-color);
            color: var(--nn-error-text);
            border-color: var(--nn-error-text);
          }

          :invalid {
            border: unset;
            border-bottom: var(--nn-input-border, var(--nn-theme-border));
          }

          input:invalid + label, input:invalid ~ label {
            background-color: none;
            --nn-label-color: darkred;
          }

          label::before { /* Background box */
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 15px;
            width: 15px;
            border: 2px solid var(--nn-boundaries-color);
            border-radius: 50%;
            transition: background-color 0.3s ease-in-out;
          }

          input:checked ~ label::before {
            border-color: var(--nn-primary-color);
            background-color: transparent;
            transition: background-color 0.3s ease-in-out;
          }

          input:hover ~ label::before {
            filter: brightness(115%);
            transition: filter 0.3s ease-in-out;
          }

          input:focus ~ label::before {
            box-shadow: var(--nn-theme-box-shadow2);
            background-color: var(--nn-primary-color-light);
            filter: brightness(115%);
          }

          input:not([checked]):hover ~ label::before {
            filter: brightness(130%);
            background-color: var(--nn-primary-color-light);
            transition: background-color 0.3s ease-in-out;
          }

          label::after { /* Checkmark */
            content: "";
            position: absolute;
            opacity: 0;
            width: 19px;
            height: 19px;
            will-change: transform, opacity;
            transition: opacity 0.3s ease-out;
          }

          input:checked ~ label::after {
            display: block;
            left: 0;
            top: 0;
            opacity: 1;
            background-color:  var(--nn-primary-color);
            /* border: solid white; */
            border-radius: 50%;
            /* border-width: 0 3px 3px 0; */
            -webkit-transform: scale(0.5);
            -ms-transform: scale(0.5);
            transform: scale(0.5);
            transition: transform 0.3s ease-in-out, opacity 0.3s ease-in;
          }

          span.error-message {
            position: absolute;
            top: calc(100% - 3px);
            /* transform: translateY(0px); */
            left: 16px;
            font-size: 80%;
            white-space:nowrap;
            opacity: 0;
            will-change: transform, opacity;
            transition: all 0.3s ease-in-out;
          }

          input:invalid ~ span.error-message {
            transform: translateY(-6px);
            opacity: 1;
            transition: all 0.3s ease-in-out;
          }
        `
      ]
    }
  }
}
