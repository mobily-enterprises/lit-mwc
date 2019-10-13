import { css } from '../../../node_modules/lit-element/lit-element.js';

const EeNetwork = base => {
  return class Base extends base {
    static get styles() {
      return [...(super.styles || []), css`
        `];
    }

  };
};

var eeNetwork = {
  EeNetwork: EeNetwork
};
export { eeNetwork as $eeNetwork, EeNetwork };