import { css } from '../../../node_modules/lit-element/lit-element.js';

const NnMeter = base => {
  return class Base extends base {
    static get styles() {
      return [...(super.styles || []), css`
        `];
    }

  };
};

var nnMeter = {
  NnMeter: NnMeter
};
export { nnMeter as $nnMeter, NnMeter };