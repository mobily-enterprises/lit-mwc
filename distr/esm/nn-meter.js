import { LitElement, css, html } from './node_modules/lit-element/lit-element.js';
import { NativeReflectorMixin } from './mixins/NativeReflectorMixin.js';
import { InputMixin } from './mixins/InputMixin.js';
import { FormElementMixin } from './mixins/FormElementMixin.js';
import { ThemeableMixin } from './mixins/ThemeableMixin.js';

class NnMeter extends ThemeableMixin('nn-meter')(FormElementMixin(InputMixin(NativeReflectorMixin(LitElement)))) {
  static get styles() {
    return [super.styles || [], css`
      `];
  }

  get reflectProperties() {
    return [...super.reflectProperties, ...['high', 'low', 'max', 'min', 'optimum', 'value', 'labels']];
  }

  render() {
    return html`
      ${this.customStyle}
      <meter id="native" real-time-event="input"></meter>
    `;
  }

}

customElements.define('nn-meter', NnMeter);
var nnMeter = {
  NnMeter: NnMeter
};
export { nnMeter as $nnMeter, NnMeter };