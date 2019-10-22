import { LitElement, html, css } from 'lit-element'
import { NativeReflectorMixin } from './mixins/NativeReflectorMixin.js'
import { InputMixin } from './mixins/InputMixin.js'
import { FormElementMixin } from './mixins/FormElementMixin.js'
import { LabelsMixin } from './mixins/LabelsMixin.js'
import { ThemeableMixin } from './mixins/ThemeableMixin.js'
import { selectElement } from './htmlApi.js'

export class NnSelect extends ThemeableMixin('nn-select')(FormElementMixin(LabelsMixin(InputMixin(NativeReflectorMixin(LitElement))))) {
  static get styles () {
    return [
      super.styles || [],
      css`
        /* :host {
          display: flex;
          height: 30px;
        } */

        /* select {
          display: inline-flex;
          border-radius: var(--nn-select-border-radius, 0 4px 4px 0);
          border: var(--nn-select-border, 1px solid #dddddd);
          color: var(--nn-select-color, inherit);
          background-color: var(--nn-select-background, initial);
          -webkit-appearance: select;
          width: 100%;
          float: right;
          font-size: 1em;
          padding-left: 10px;
          margin-left: 4px;
        } */
      `
    ]
  }

  get reflectProperties () {
    return [...super.reflectProperties, ...selectElement]
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <slot @slotchange="${this.addSlotToSelect}"></slot>
      <select id="native" real-time-event="selected"></select>
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }

  addSlotToSelect (e) {
    const select = this.shadowRoot.querySelector('#native')
    for (const option of e.srcElement.assignedElements()) {
      select.appendChild(option)
    }
  }
}
customElements.define('nn-select', NnSelect)
