import {L as LitElement,c as css,h as html}from'./lit-element-97ae09cb.js';import {L as LabelsMixin}from'./LabelsMixin-c00a1c1e.js';import {S as StyleableMixin}from'./StyleableMixin-6a125586.js';import {T as ThemeableMixin}from'./ThemeableMixin-af62e1ed.js';import {N as NativeReflectorMixin}from'./NativeReflectorMixin-c4e18588.js';import {I as InputMixin}from'./InputMixin-83f5b637.js';import {F as FormElementMixin}from'./FormElementMixin-78f38eb0.js';class NnInputFile extends ThemeableMixin('nn-input-file')(FormElementMixin(StyleableMixin(LabelsMixin(InputMixin(NativeReflectorMixin(LitElement)))))) {
  static get styles () {
    return [
      super.styles || [],
      css`
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
      `
    ]
  }

  static get properties () {
    return {
      fileName: { type: String },
      manyFilesText: {
        type: String,
        attribute: 'many-files-text'
      }
    }
  }

  constructor () {
    super();
    this.manyFilesText = 'Many';
  }

  render () {
    // From https://stackoverflow.com/a/25825731/829771
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="file" id="native" @change="${this.fileNameChanged}" hidden>
      ${this.ifValidationMessageAfter}
      ${this.fileName}
      ${this.ifLabelAfter}
    `
  }

  fileNameChanged (e) {
    const native = this.shadowRoot.querySelector('#native');
    this.fileName = native.files.length > 1 ? this.manyFilesText : native.value;
  }
}
customElements.define('nn-input-file', NnInputFile);export{NnInputFile};