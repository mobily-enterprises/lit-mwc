import { css } from '../../../node_modules/lit-element/lit-element.js';

const EnInputRange = base => {
  return class Base extends base {
    static get styles() {
      return [...(super.styles || []), css`
        `];
    }

  };
};

var enInputRange = {
  EnInputRange: EnInputRange
};
export { enInputRange as $enInputRange, EnInputRange };