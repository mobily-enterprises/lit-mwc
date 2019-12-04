import { css } from 'lit-element'

export const EeTabs = (base) => {
  return class Base extends base {
    static get styles () {
      return [
        super.styles,
        css`
        :host {
          --ee-tabs-selected-color: var(--mat-primary-color);
          --ee-tabs-color: var(--mat-primary-text);
        }

        :host nav > ::slotted(*:hover) {
          box-shadow: var(--mat-theme-box-shadow4)
        }
        `
      ]
    }
  }
}
