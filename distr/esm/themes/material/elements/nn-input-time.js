import { css } from '../../../node_modules/lit-element/lit-element.js';

const NnInputTime = base => {
  return class Base extends base {
    static get styles() {
      return [...(super.styles || []), css`
        `];
    }

  };
};

var nnInputTime = {
  NnInputTime: NnInputTime
};
export { nnInputTime as $nnInputTime, NnInputTime };