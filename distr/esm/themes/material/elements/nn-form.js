import { css } from '../../../node_modules/lit-element/lit-element.js';

const NnForm = base => {
  return class Base extends base {
    static get styles() {
      return [...(super.styles || []), css`
          ::slotted(*) fieldset, ::slotted(fieldset) {
            border-radius: 5px;
            border-style: solid;
            padding: 16px;
          }

          ::slotted(*) legend, ::slotted(legend) {
            padding-inline-start: 10px !important;
            padding-inline-end: 10px !important;
          }
        `];
    }

  };
};

var nnForm = {
  NnForm: NnForm
};
export { nnForm as $nnForm, NnForm };