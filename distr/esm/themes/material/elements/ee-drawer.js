import { css } from '../../../node_modules/lit-element/lit-element.js';

const EeDrawer = base => {
  return class Base extends base {
    static get styles() {
      return [...(super.styles || []), css`
        `];
    }

  };
};

var eeDrawer = {
  EeDrawer: EeDrawer
};
export { eeDrawer as $eeDrawer, EeDrawer };