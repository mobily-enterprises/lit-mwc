import { html, css } from 'lit-element'

export const InputRadio = (base) => {
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

          label::before { /* Background box */
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 15px;
            width: 15px;
            border: 2px solid var(--boundaries-color);
            border-radius: 50%;
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
            left: 5px;
            top: 5px;
            width: 9px;
            height: 9px;
            opacity: 1;
            background-color: white;
            /* border: solid white; */
            border-radius: 50%;
            /* border-width: 0 3px 3px 0; */
            -webkit-transform: scale(50%,50%);
            -ms-transform: scale(50%,50%);
            transform: scale(50%,50%);
            transition: transform 0.3s ease-in-out, opacity 0.3s ease-in;
          }
        `
      ]
    }
  }
}
