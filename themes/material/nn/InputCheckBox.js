import { html, css } from 'lit-element'

export const InputCheckBox = (base) => {
  return class Base extends base {
    static get properties () {
      return {
        validationMessagePosition: { type: String, attribute: false, noAccessor: true },
        labelPosition: { type: String, noAccessor: true, attribute: false}
      }
    }

    constructor () {
      super()
      this.labelPosition = 'after'
      this.validationMessagePosition = 'after'
      this.label=''
    }
    
    static get styles () {
      return [
        ...super.styles,
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
            background-color: var(--error-color);
            color: var(--error-text);
            border-color: var(--error-text);
          }

          :invalid {
            border: unset;
            border-bottom: var(--nn-input-border, var(--theme-border));
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
            border: 2px solid var(--boundaries-color);
            border-radius: 3px;
            transition: background-color 0.3s ease-in-out;
          }

          input:checked ~ label::before {
            border-color: var(--primary-color);
            background-color:  var(--primary-color);
            transition: background-color 0.3s ease-in-out;
          }

          input:hover ~ label::before {
            filter: brightness(115%);
            transition: filter 0.3s ease-in-out;
          }

          input:focus ~ label::before {
            box-shadow: var(--theme-box-shadow2);
            background-color: var(--primary-color-light);
            filter: brightness(115%);
          }

          input:not([checked]):hover ~ label::before {
            filter: brightness(130%);
            background-color: var(--primary-color-light);
            transition: background-color 0.3s ease-in-out;
          }

          label::after { /* Checkmark */
            content: "";
            position: absolute;
            opacity: 0;
            will-change: transform, opacity;
            transition: opacity 0.3s ease-out;
          }

          input:checked ~ label::after { 
            display: block;
            left: 6px;
            top: 2px;
            width: 5px;
            height: 10px;
            opacity: 1;
            border: solid white;
            border-radius: 2px;
            border-width: 0 3px 3px 0;
            -webkit-transform: rotate(405deg);
            -ms-transform: rotate(405deg);
            transform: rotate(405deg);
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
