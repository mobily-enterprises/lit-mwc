import { css } from '../../../node_modules/lit-element/lit-element.js';

const NnInputDatalist = base => {
  return class Base extends base {
    static get styles() {
      return [...(super.styles || []), css`
        `];
    }

  };
};

var nnInputDatalist = {
  NnInputDatalist: NnInputDatalist
};
export { nnInputDatalist as $nnInputDatalist, NnInputDatalist };