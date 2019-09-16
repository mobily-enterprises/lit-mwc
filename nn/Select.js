import { LitElement, html, css } from 'lit-element'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'
import { LabelsMixin } from '../mixins/LabelsMixin.js'
import { baseProperties, inputIDLProperties, selectIDLProperties, alwaysSkipAttributes } from '../common.js'

export class Select extends FormElementMixin(LabelsMixin(NativeReflectorMixin(LitElement))) {
  static get styles () {
    return [
      LabelsMixin.defaultStyles,
      css`
        :host {
          display: flex;
          height: 30px;
        }

        select {
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
        }

        select:invalid {
          background-color: pink;
          border: var(--nn-select-border-invalid, 1px solid #bb7777);
        }
      `
    ]
  }

  static get properties () {
    return {
    }
  }

  get skipAttributes () {
    return [
      ...alwaysSkipAttributes,
      'form', 'type'
    ]
  }

  get reflectProperties () {
    return [
      ...baseProperties,
      ...inputIDLProperties,
      ...selectIDLProperties
    ]
  }

  constructor () {
    super()
    this.options = []
  }

  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <slot @slotchange="${this.addSlotToSelect}"></slot>
      <select id="native"></select>
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
customElements.define('nn-select', Select)
