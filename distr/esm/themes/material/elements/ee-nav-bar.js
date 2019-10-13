import { css } from '../../../node_modules/lit-element/lit-element.js';

const EeNavBar = base => {
  return class Base extends base {
    static get styles() {
      return [...(super.styles || []), css`
        `];
    }

  };
};

var eeNavBar = {
  EeNavBar: EeNavBar
};
export { eeNavBar as $eeNavBar, EeNavBar };