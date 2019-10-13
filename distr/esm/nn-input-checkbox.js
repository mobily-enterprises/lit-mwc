import { LitElement, css, html } from './node_modules/lit-element/lit-element.js';
import { NativeReflectorMixin } from './mixins/NativeReflectorMixin.js';
import { InputMixin } from './mixins/InputMixin.js';
import { FormElementMixin } from './mixins/FormElementMixin.js';
import { LabelsMixin } from './mixins/LabelsMixin.js';
import { StyleableMixin } from './mixins/StyleableMixin.js';
import { ThemeableMixin } from './mixins/ThemeableMixin.js';

class NnInputCheckbox extends ThemeableMixin('nn-input-checkbox')(FormElementMixin(LabelsMixin(StyleableMixin(InputMixin(NativeReflectorMixin(LitElement)))))) {
  static get styles() {
    return [super.styles || [], css`
      `];
  }

  get bootProperties() {
    return [super.bootProperties, 'checked'];
  }

  render() {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <input type="checkbox" as-checkbox value-source="checked" id="native"  real-time-event="checked">
      ${this.ifLabelAfter}
    `;
  }

}

customElements.define('nn-input-checkbox', NnInputCheckbox);