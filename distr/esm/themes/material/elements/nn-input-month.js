import { css } from '../../../node_modules/lit-element/lit-element.js';

const NnInputMonth = base => {
  return class Base extends base {
    static get styles() {
      return [...(super.styles || []), css`
        `];
    }

  };
};

var nnInputMonth = {
  NnInputMonth: NnInputMonth
};
export { nnInputMonth as $nnInputMonth, NnInputMonth };