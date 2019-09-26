import { css } from 'lit-element'

export const NnButton = (base) => {
  return class Base extends base {
    static get styles () {
      return [
        ...super.styles || [],
        css`
          :host {
            display: inline-block;
            width: fit-content;
            padding: 10px;
          }

          button {
            height: var(--button-height, 30px);
            -webkit-appearance: none;
            background-color: var(--button-background, var(--primary-color));
            border-radius: var(--nn-button-border-radius, 4px);
            border: var(--nn-button-border, var(--theme-border));
            border-color: transparent;
            text-transform: uppercase;
            color: var(--nn-button-color, var(--text-on-dark));
            border-image: none;
          }

          button:hover {
            filter: brightness(130%);
          }

          button:active, button:focus {
            outline: none;
          }

          button:focus {
            border-color: rgba(255, 255, 255, 0.7);
            border-color: var(--primary-color);
            box-shadow: var(--theme-box-shadow2);
            filter: brightness(115%);
          }

          button:active {
            transition: all 0.2s ease-out;
            border-style: inset;
            border-color: var(--primary-color);
          }

          :host([text]:not([outlined])) button,
          :host([text]:not([raised])) button {
            background-color: transparent;
            color: var(--nn-button-color, var(--primary-color));
          }

          :host([text]:not([outlined])) button:focus,
          :host([text]:not([raised])) button:focus {
            background-color: transparent;
            color: var(--nn-button-color, var(--primary-color));
            box-shadow: var(--theme-box-shadow2);
          }

          :host([text]:not([outlined])) button:active,
          :host([text]:not([raised])) button:active {
            border-style: solid;
            border-width: 1px;
            border-color: transparent;
          }

          :host([text]:not([outlined])) button:hover,
          :host([text]:not([raised])) button:hover {
            background-color: var(--primary-color-light);
            color: var(--primary-color-dark)
          }

          :host([outlined]:not([text])) button,
          :host([outlined]:not([raised])) button {
            background-color: transparent;
            color: var(--nn-button-color, var(--primary-color));
            border: var(--nn-button-border, var(--theme-border));
          }

          :host([outlined]:not([text])) button:hover,
          :host([outlined]:not([raised])) button:hover {
            background-color: var(--primary-color-light);
            color: var(--primary-color-dark)
          }

          :host([raised]:not([text])) button,
          :host([raised]:not([outlined])) button {
            box-shadow: var(--theme-box-shadow3);
            transition: box-shadow 0.2s ease-out;
          }

          :host([raised]:not([text])) button:active,
          :host([raised]:not([outlined])) button:active {
            box-shadow: none;
            transition: box-shadow 0.2s ease-out;
            filter: brightness(90%);
          }
        `
      ]
    }
  }
}
