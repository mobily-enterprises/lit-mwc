import{html}from"./node_modules/lit-element/lit-element.js";import{NnInputText}from"./nn-input-text.js";class NnInputPassword extends NnInputText{render(){return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <input type="password" id="native">
      ${this.ifLabelAfter}
    `}}window.customElements.define("nn-input-password",NnInputPassword);