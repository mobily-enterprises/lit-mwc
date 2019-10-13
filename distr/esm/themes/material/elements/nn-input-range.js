import { css } from '../../../node_modules/lit-element/lit-element.js';

const NnInputRange = base => {
  return class Base extends base {
    static get styles() {
      return [...(super.styles || []), css`
        `];
    }

  };
};

var nnInputRange = {
  NnInputRange: NnInputRange
};
export { nnInputRange as $nnInputRange, NnInputRange };