import { css } from '../../../node_modules/lit-element/lit-element.js';

const EeAutocomplete = base => {
  return class Base extends base {
    static get styles() {
      return [...(super.styles || []), css`
        `];
    }

  };
};

var eeAutocomplete = {
  EeAutocomplete: EeAutocomplete
};
export { eeAutocomplete as $eeAutocomplete, EeAutocomplete };