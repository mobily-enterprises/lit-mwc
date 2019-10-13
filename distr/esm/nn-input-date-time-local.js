import{html}from"./node_modules/lit-element/lit-element.js";import{NnInputText}from"./nn-input-text.js";import{ThemeableMixin}from"./mixins/ThemeableMixin.js";class NnInputDateTimeLocal extends ThemeableMixin("nn-input-date")(NnInputText){render(){return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      <input type="datetime-local" id="native">
      ${this.ifLabelAfter}
    `}}window.customElements.define("nn-input-datetime-local",NnInputDateTimeLocal);