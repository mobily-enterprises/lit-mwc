import { css } from '../../../node_modules/lit-element/lit-element.js';

const NnInputSubmit = base => {
  return class Base extends base {
    static get styles() {
      return [...(super.styles || []), css`
        `];
    }

  };
};

var nnInputSubmit = {
  NnInputSubmit: NnInputSubmit
};
export { nnInputSubmit as $nnInputSubmit, NnInputSubmit };