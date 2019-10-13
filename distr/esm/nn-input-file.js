import { LitElement, css, html } from './node_modules/lit-element/lit-element.js';
import { NativeReflectorMixin } from './mixins/NativeReflectorMixin.js';
import { InputMixin } from './mixins/InputMixin.js';
import { FormElementMixin } from './mixins/FormElementMixin.js';
import { LabelsMixin } from './mixins/LabelsMixin.js';
import { StyleableMixin } from './mixins/StyleableMixin.js';
import { ThemeableMixin } from './mixins/ThemeableMixin.js';

class NnInputFile extends ThemeableMixin('nn-input-file')(FormElementMixin(StyleableMixin(LabelsMixin(InputMixin(NativeReflectorMixin(LitElement)))))) {
  static get styles() {
    return [super.styles || [], css`
        /* :host {
          display: flex;
          height: 30px;
        } */

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
      `];
  }

  static get properties() {
    return {
      fileName: {
        type: String
      },
      manyFilesText: {
        type: String,
        attribute: 'many-files-text'
      }
    };
  }

  constructor() {
    super();
    this.manyFilesText = 'Many';
  }

  render() {
    // From https://stackoverflow.com/a/25825731/829771
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="file" id="native" @change="${this.fileNameChanged}" hidden>
      ${this.ifValidationMessageAfter}
      ${this.fileName}
      ${this.ifLabelAfter}
    `;
  }

  fileNameChanged(e) {
    const native = this.shadowRoot.querySelector('#native');
    this.fileName = native.files.length > 1 ? this.manyFilesText : native.value;
  }

}

customElements.define('nn-input-file', NnInputFile);
var nnInputFile = {
  NnInputFile: NnInputFile
};
export { nnInputFile as $nnInputFile, NnInputFile };