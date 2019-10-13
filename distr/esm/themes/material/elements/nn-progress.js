import { css } from '../../../node_modules/lit-element/lit-element.js';

const NnProgress = base => {
  return class Base extends base {
    static get styles() {
      return [...(super.styles || []), css`
        `];
    }

  };
};

var nnProgress = {
  NnProgress: NnProgress
};
export { nnProgress as $nnProgress, NnProgress };