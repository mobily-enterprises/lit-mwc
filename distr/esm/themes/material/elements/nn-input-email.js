import { css } from '../../../node_modules/lit-element/lit-element.js';

const NnInputEmail = base => {
  return class Base extends base {
    static get styles() {
      return [...(super.styles || []), css`
        `];
    }

  };
};

var nnInputEmail = {
  NnInputEmail: NnInputEmail
};
export { nnInputEmail as $nnInputEmail, NnInputEmail };