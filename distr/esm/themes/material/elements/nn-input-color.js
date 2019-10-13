import { css } from '../../../node_modules/lit-element/lit-element.js';

const NnInputColor = base => {
  return class Base extends base {
    static get styles() {
      return [...(super.styles || []), css`
        `];
    }

  };
};

var nnInputColor = {
  NnInputColor: NnInputColor
};
export { nnInputColor as $nnInputColor, NnInputColor };