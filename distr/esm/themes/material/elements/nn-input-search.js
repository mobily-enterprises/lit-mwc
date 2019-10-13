import { css } from '../../../node_modules/lit-element/lit-element.js';

const NnInputSearch = base => {
  return class Base extends base {
    static get styles() {
      return [...(super.styles || []), css`
        `];
    }

  };
};

var nnInputSearch = {
  NnInputSearch: NnInputSearch
};
export { nnInputSearch as $nnInputSearch, NnInputSearch };