import { css } from '../../../node_modules/lit-element/lit-element.js';

const NnInputNumber = base => {
  return class Base extends base {
    static get styles() {
      return [...(super.styles || []), css`
        `];
    }

  };
};

var nnInputNumber = {
  NnInputNumber: NnInputNumber
};
export { nnInputNumber as $nnInputNumber, NnInputNumber };