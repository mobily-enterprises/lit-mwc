import { html, css } from 'lit-element'

export const Textarea = (base) => {
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
    }
    
    static get styles () {
      super.styles || [],
      css`
        :host {
          position: relative;
          height: var(--form-element-height);
          padding: 12px;
          width: fit-content;
        }

        textarea {
          display: inline-flex;
          border-radius: var(--nn-input-border-radius, 4px 4px 0 0);
          border: unset;
          border-bottom: var(--nn-input-border, var(--theme-border));
          color: var(--nn-input-color, inherit);
          background-color: var(--nn-input-background, var(--input-background));
          width: 100%;
          font-size: 1em;
          padding-left: 10px;
          margin-left: 4px;
          height: var(--form-element-height)
        }

        textarea:focus, textarea:active {
          outline: none
        }

        textarea:invalid {
          background-color: var(--error-color);
          color: var(--error-text);
          border-color: var(--error-text);
        }

        :invalid {
          border: unset;
          border-bottom: var(--nn-input-border, var(--theme-border));
        }

        textarea:invalid + label, textarea:invalid ~ label {
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

        textarea:required ~ label::after {
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

        :host([has-value]) label::before, textarea:focus ~ label::before {
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

        :host([has-value]) label, textarea:focus ~ label  {
          transform: translateY(-155%);
          font-size: 80%;
          transition: all 0.3s ease-in-out;
          margin-left: -2px;
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

        textarea:invalid ~ span.error-message {
          transform: translateY(-6px);
          opacity: 1;
          transition: all 0.3s ease-in-out;
        }
      `
    }
  }
}
