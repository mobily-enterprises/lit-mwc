import { css } from '../../../node_modules/lit-element/lit-element.js';

const EeSnackBar = base => {
  return class Base extends base {
    static get styles() {
      return [...(super.styles || []), css`
        `];
    }

  };
};

var eeSnackBar = {
  EeSnackBar: EeSnackBar
};
export { eeSnackBar as $eeSnackBar, EeSnackBar };