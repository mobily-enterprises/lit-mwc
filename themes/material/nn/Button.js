import { html, css } from 'lit-element'

export const Button = (base) => {
  return class Base extends base {
    static get styles () {
      return [ ...super.styles,  
        css`
          button {
            height: var(--button-height, 30px);
            -webkit-appearance: none;
            background-color: var(--button-background, var(--primary-color));
            border-radius: var(--nn-button-border-radius, var(--theme-border-radius));
            border: var(--nn-button-border, transparent);
            text-transform: uppercase;
            color: var(--nn-button-color, var(--text-on-dark));
            border-image: none;
          }

          :host([raised]) button {
            box-shadow: var(--theme-box-shadow1);
            transition: box-shadow 0.2s ease-out;
          }

          button:active, button:focus {
            outline: none;            
          }

          button:active {
            border-color: rgba(255, 255, 255, 0.5);
            background-color: var(--button-background, var(--primary-color-light));
            transition: box-shadow 0.2s ease-out;
          }

          :host([raised]) button:active {
            box-shadow: none;
            border-color: rgba(0, 0, 0, 0.1);
            border-style: inset;
            border-color: var(--primary-color);
            border-image: none;
            transition: box-shadow 0.2s ease-out;
          }
        `
      ]
    }
  }
}
