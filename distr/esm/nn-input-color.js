import { html } from './node_modules/lit-element/lit-element.js';
import { NnInputText } from './nn-input-text.js';

class NnInputColor extends NnInputText {
  render() {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <input type="color" id="native">
      ${this.ifLabelAfter}
    `;
  }

}

window.customElements.define('nn-input-color', NnInputColor);