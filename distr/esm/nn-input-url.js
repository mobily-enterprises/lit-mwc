import{html}from"./node_modules/lit-element/lit-element.js";import{NnInputText}from"./nn-input-text.js";class NnInputUrl extends NnInputText{render(){return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="password" id="native">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `}}window.customElements.define("nn-input-url",NnInputUrl);