import { html, css } from 'lit-element'
// import { MaterialBase } from '../CommonStyle.js';

export const InputText = (base) => {
  return class Base extends base {

    _observeInput (e) {
      const target = e.currentTarget
      this.toggleAttribute('hasInput', !!target.value.length)
    }

    firstUpdated () {
      super.firstUpdated()
      this.native.addEventListener('input', this._observeInput)
    }

    static get styles () {
      return [ ...super.styles,
        css`
        :host {
          position: relative;
          height: var(--form-element-height);
          padding: 5px 12px;
          width: fit-content
        }

        input {
          display: inline-flex;
          border-radius: var(--nn-input-border-radius, 4px 4px 0 0);
          border: unset;
          border-bottom: var(--nn-input-border, var(--theme-border));
          color: var(--nn-input-color, inherit);
          background-color: var(--nn-input-background, var(--input-background));
          width: 100%;
          float: right;
          font-size: 1em;
          padding-left: 10px;
          margin-left: 4px;
          height: var(--form-element-height)
        }

        input:focus, input:active {
          outline: none
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
        
        :host([hasInput]) label {
          transform: translateY(-150%);
          background-color: white;
          border-radius: var(--nn-label-border-radius, 0 0 4px 0);
          transition: all 0.3s ease-in-out;
        }

        :host span.error-message {
          position: absolute;
          top: 100%;
          font-size: 80%;
        }
        `
      ]
    }
  }
}
