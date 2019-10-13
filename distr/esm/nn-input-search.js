import{html}from"./node_modules/lit-element/lit-element.js";import{NnInputText}from"./nn-input-text.js";class NnInputSearch extends NnInputText{render(){return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <input type="search" id="native">
      ${this.ifLabelAfter}
    `}}window.customElements.define("nn-input-tel",NnInputSearch);