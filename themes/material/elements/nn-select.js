import { css } from 'lit-element'
import { AddHasValueAttributeMixin } from 'tpe/mixins/AddHasValueAttributeMixin'
import { fixedLabel, inputLabel } from '../shared-rules'

export const NnSelect = (base) => {
  return class Base extends AddHasValueAttributeMixin(base) {
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
    }

    connectedCallback () {
      super.connectedCallback()
      this.onclick = () => { this.native.click() }
    }

    static get styles () {
      return [
        super.styles || [],
        inputLabel,
        fixedLabel,
        css`
          :host {
            position: relative;
            height: var(--nn-form-element-height);
            padding: 12px;
            margin: 10px;
            padding-top: 15px;
            width: fit-content;
          }

          select {
            display: inline-flex;
            border: unset;
            border-radius: var(--nn-select-border-radius, 4px 4px 0 0);
            border-bottom: var(--nn-select-border, var(--nn-theme-border));
            color: var(--nn-select-color, inherit);
            background-color: var(--nn-select-background, var(--nn-input-background));
            width: 100%;
            font-size: 1em;
            padding: 0 15px;
            height: var(--nn-form-element-height);
            -webkit-appearance: none;
          }

          select:focus, select:active {
            outline: none
          }

          select:invalid {
            background-color: var(--nn-error-color);
            color: var(--nn-error-text);
            border-color: var(--nn-error-text);
          }

          :invalid {
            border: unset;
            border-bottom: var(--nn-input-border, var(--nn-theme-border));
          }

          select:invalid + label, select:invalid ~ label {
            background-color: none;
            --nn-label-color: darkred;
          }

          /* label {
            position: absolute;
            font-size: 1em;
            border: var(--nn-label-border, none);
            color: var(--nn-label-color,  var(--nn-primary-color-light));
            background-color: var(--nn-label-background, transparent);
            border-radius: var(--nn-label-border-radius, var(--nn-theme-border-radius));
            padding-left: 8px;
            padding-right: 8px;
            min-width: fit-content;
            white-space: nowrap;
            top: 50%;
            transform: translateY(-50%);
            will-change: transform, background-color;
            transition: all 0.3s ease-in-out;
          } */

          select:required ~ label::after {
            content: '*';
            padding-left: 2px;
            position: relative;
          }

          /* If label issue is solved */

          /* If label issue is solved */
          /* :host([has-value]) label, input:focus ~ label  { */
          /* label, input:focus ~ label  {
            transform: translateY(-155%);
            font-size: 80%;
            transition: all 0.3s ease-in-out;
          } */

          /* span.error-message {
            position: absolute;
            top: calc(100% - 5px);
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
          } */

          :host::after {
            content: '';
            border: 5px solid transparent;
            border-top-color: var(--nn-primary-color);
            position: absolute;
            right: 12px;
            bottom: 50%;
          }
        `
      ]
    }
  }
}
