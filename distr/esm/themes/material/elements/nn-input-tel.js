import { css } from '../../../node_modules/lit-element/lit-element.js';

const NnInputTel = base => {
  return class Base extends base {
    static get styles() {
      return [...(super.styles || []), css`
        `];
    }

  };
};

var nnInputTel = {
  NnInputTel: NnInputTel
};
export { nnInputTel as $nnInputTel, NnInputTel };