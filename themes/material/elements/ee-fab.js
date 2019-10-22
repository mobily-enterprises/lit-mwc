import { css } from 'lit-element'

export const EeFab = (base) => {
  return class Base extends base {
    static get styles () {
      return [
        ...super.styles || [],
        css`
        button:focus, button:active {
        outline:0 ;
      }

      button:active {
       filter: brightness(1.15)
      }

      button[disabled] {
        box-shadow: none;
        opacity: 0.5;
        pointer-events: none;
      }

      button.icon:active {
        background: #cccccc;
        border: unset;
        border-radius: 50%;
      }

      button {
        cursor: pointer;
        height: 56px;
        width: 56px;
        margin: 6px;
        border-radius: 50%;
        box-shadow: 4px 2px 10px 0 rgba(0,0,0,0.12);
        padding-top: 5px;
        fill: var(--ee-fab-color, var(--app-primary-color));
        background-color: var(--ee-fab-background, var(--app-secondary-color));
        color: var(--ee-fab-color, var(--app-primary-color));
      }

      :host([mini]) button {
        height: 40px;
        width: 40px; 
      }

      button[data-descr]::after {
        content: '';
        right: 0;
        display: inline-block;
        opacity: 0;
        position: absolute;
        width: 0;
      }

      button[data-descr]:hover::after,
      button[data-descr]:focus::after {
        content: attr(data-descr);
        width: fit-content;
        opacity: 1;
        background-color: var(--ee-fab-background, var(--app-secondary-color));
        color: var(--ee-fab-color, var(--app-primary-color));
        text-align: center;
        padding: 5px 0;
        border-radius: 6px;
        z-index: 1;
        top: 50%;
        transform: translateY(-50%);
        right: 105%;
        font-size: 1em;
        transition: all 0.3s ease-in-out;
      }

       button svg {
        width: var(--icon-width, 30px);
        height: var(--icon-height, 30px);
       }
        `
      ]
    }
  }
}
