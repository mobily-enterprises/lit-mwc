import { css } from '../../../node_modules/lit-element/lit-element.js';

const NnInputWeek = base => {
  return class Base extends base {
    static get styles() {
      return [...(super.styles || []), css`
        `];
    }

  };
};

var nnInputWeek = {
  NnInputWeek: NnInputWeek
};
export { nnInputWeek as $nnInputWeek, NnInputWeek };