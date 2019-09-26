import { css } from 'lit-element'

export const NnForm = (base) => {
  return class Base extends base {
    static get styles () {
      return [
        ...super.styles || [],
        css`
          ::slotted(*) fieldset, ::slotted(fieldset) {
            border-radius: 5px;
            border-style: solid;
            padding: 16px;
          }

          ::slotted(*) legend, ::slotted(legend) {
            padding-inline-start: 10px !important;
            padding-inline-end: 10px !important;
          }
        `
      ]
    }
  }
}
