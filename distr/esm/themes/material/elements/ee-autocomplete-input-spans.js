import { css } from '../../../node_modules/lit-element/lit-element.js';
import { inputField } from '../style-patterns.js';

const EeAutocompleteInputSpans = base => {
  return class Base extends base {
    static get styles() {
      return [...(super.styles || []), inputField, css`
        `];
    }

  };
};

var eeAutocompleteInputSpans = {
  EeAutocompleteInputSpans: EeAutocompleteInputSpans
};
export { eeAutocompleteInputSpans as $eeAutocompleteInputSpans, EeAutocompleteInputSpans };