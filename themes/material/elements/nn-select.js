import { css } from 'lit-element'
import { AddHasValueAttributeMixin } from 'tpe/mixins/AddHasValueAttributeMixin'

export const NnSelect = (base) => {
  return class Base extends AddHasValueAttributeMixin(base) {
    constructor () {
      super()
      this.labelPosition = 'after'
      this.validationMessagePosition = 'after'
    }

    connectedCallback () {
      super.connectedCallback()
      this.onclick = () => { this.native.click() }
    }

    static get styles () {
      return [
        super.styles || [],
        css`
          :host {
            position: relative;
            height: var(--form-element-height);
            padding: 12px;
            padding-top: 15px;
            width: fit-content;
          }

          select {
            display: inline-flex;
            border: unset;
            border-radius: var(--nn-select-border-radius, 4px 4px 0 0);
            border-bottom: var(--nn-select-border, var(--theme-border));
            color: var(--nn-select-color, inherit);
            background-color: var(--nn-select-background, var(--input-background));
            width: 100%;
            font-size: 1em;
            padding: 0 15px;
            margin-left: 4px;
            height: var(--form-element-height);
            -webkit-appearance: none;
          }

          select:focus, select:active {
            outline: none
          }

          select:invalid {
            background-color: var(--error-color);
            color: var(--error-text);
            border-color: var(--error-text);
          }

          :invalid {
            border: unset;
            border-bottom: var(--nn-input-border, var(--theme-border));
          }

          select:invalid + label, select:invalid ~ label {
            background-color: none;
            --nn-label-color: darkred;
          }

          label {
            position: absolute;
            font-size: 1em;
            border: var(--nn-label-border, none);
            color: var(--nn-label-color,  var(--primary-color-light));
            background-color: var(--nn-label-background, transparent);
            border-radius: var(--nn-label-border-radius, var(--theme-border-radius));
            padding-left: 8px;
            padding-right: 8px;
            min-width: fit-content;
            white-space: nowrap;
            top: 50%;
            transform: translateY(-50%);
            will-change: transform, background-color;
            transition: all 0.3s ease-in-out;
          }

          select:required ~ label::after {
            content: '*';
            padding-left: 2px;
            position: relative;
          }

          label::before {
            position: absolute;
            content: '';
            transform: translateY(-100%);
            transition: all 0.4s ease-in-out;
            opacity: 0;
            user-select: none;
            pointer-events: none;
            z-index: -1;
            will-change: transform;
            transition: all 0.35s ease-in-out;
          }

          /* If label issue is solved */
          /* :host([has-value]) label::before, select:focus ~ label::before { */
          label::before, select:focus ~ label::before {
            left: 0;
            content: '';
            transform: translateY(0);
            background-color: var(--floating-label-background, white);
            border-radius: var(--nn-label-border-radius, 0 0 12px 0);
            opacity: 1;
            width: 100%;
            height: 100%;
            transition: all 0.35s ease-in-out;
          }

          /* If label issue is solved */
          /* :host([has-value]) label, input:focus ~ label  { */
          label, input:focus ~ label  {
            transform: translateY(-155%);
            font-size: 80%;
            transition: all 0.3s ease-in-out;
          }

          span.error-message {
            position: absolute;
            top: calc(100% - 5px);
            /* transform: translateY(0px); */
            left: 16px;
            font-size: 80%;
            white-space:nowrap;
            opacity: 0;
            will-change: transform, opacity;
            transition: all 0.3s ease-in-out;
          }

          select:invalid ~ span.error-message {
            transform: translateY(-6px);
            opacity: 1;
            transition: all 0.3s ease-in-out;
          }

          :host::after {
            content: '';
            /* border: 2px solid var(--primary-color); */
            border: 5px solid transparent;
            border-top-color: var(--primary-color);
            position: absolute;
            right: 12px;
            bottom: 50%;
            /* transform: translateY(40%); */
          }
        `
      ]
    }
  }
}
