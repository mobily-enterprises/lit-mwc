import { css } from '../../../node_modules/lit-element/lit-element.js';

const NnInputUrl = base => {
  return class Base extends base {
    static get styles() {
      return [...(super.styles || []), css`
        `];
    }

  };
};

var nnInputUrl = {
  NnInputUrl: NnInputUrl
};
export { nnInputUrl as $nnInputUrl, NnInputUrl };