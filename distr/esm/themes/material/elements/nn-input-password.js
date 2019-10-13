import { css } from '../../../node_modules/lit-element/lit-element.js';

const NnInputPassword = base => {
  return class Base extends base {
    static get styles() {
      return [...(super.styles || []), css`
        `];
    }

  };
};

var nnInputPassword = {
  NnInputPassword: NnInputPassword
};
export { nnInputPassword as $nnInputPassword, NnInputPassword };