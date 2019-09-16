import { LitElement, html, css } from 'lit-element'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'
import { LabelsMixin } from '../mixins/LabelsMixin.js'
import { StyleableMixin } from '../mixins/StyleableMixin.js'
import { defaultBootProperties, baseProperties, inputIDLProperties, alwaysSkipAttributes } from '../common.js'

export class InputFile extends FormElementMixin(StyleableMixin(LabelsMixin(NativeReflectorMixin(LitElement)))) {
  static get styles () {
    return [
      LabelsMixin.defaultStyles,
      css`
        :host {
          display: flex;
          height: 30px;
        }

        input:invalid {
          background-color: pink;
          border: var(--nn-input-border-invalid, 1px solid #bb7777);
        }

        /* From https://zellwk.com/blog/hide-content-accessibly/ */
        [hidden] {
          border: 0;
          clip: rect(0 0 0 0);
          height: auto; /* new - was 1px */
          margin: 0; /* new - was -1px */
          overflow: hidden;
          padding: 0;
          position: absolute;
          width: 1px;
          white-space: nowrap; /* 1 */
        }
      `
    ]
  }

  static get properties () {
    return {
      invalid: { type: String },
      fileName: { type: String },
      manyFilesText: {
        type: String,
        attribute: 'many-files-text'
      }
    }
  }

  constructor () {
    super()
    this.manyFilesText = 'Many'
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
      ...inputIDLProperties
    ]
  }

  get bootProperties () {
    return [
      ...defaultBootProperties
    ]
  }

  render () {
    // From https://stackoverflow.com/a/25825731/829771
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <input type="file" id="native" @change="${this.fileNameChanged}" hidden>
      ${this.fileName}
      ${this.ifLabelAfter}
    `
  }

  fileNameChanged (e) {
    const native = this.shadowRoot.querySelector('#native')
    this.fileName = native.files.length > 1 ? this.manyFilesText : native.value
  }
}
customElements.define('nn-input-file', InputFile)
