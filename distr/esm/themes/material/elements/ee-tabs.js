import { css } from '../../../node_modules/lit-element/lit-element.js';

const EeTabs = base => {
  return class Base extends base {
    static get styles() {
      return [...(super.styles || []), css`
        `];
    }

  };
};

var eeTabs = {
  EeTabs: EeTabs
};
export { eeTabs as $eeTabs, EeTabs };