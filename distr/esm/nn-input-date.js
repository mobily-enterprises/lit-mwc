import { html } from './node_modules/lit-element/lit-element.js';
import { NnInputText } from './nn-input-text.js';
import { ThemeableMixin } from './mixins/ThemeableMixin.js';

class NnInputDate extends ThemeableMixin('nn-input-date')(NnInputText) {
  render() {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="date" id="native">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `;
  }

}

window.customElements.define('nn-input-date', NnInputDate);