import{LitElement,html}from"./node_modules/lit-element/lit-element.js";import{NativeReflectorMixin}from"./mixins/NativeReflectorMixin.js";import{InputMixin}from"./mixins/InputMixin.js";import{FormElementMixin}from"./mixins/FormElementMixin.js";import{LabelsMixin}from"./mixins/LabelsMixin.js";import{StyleableMixin}from"./mixins/StyleableMixin.js";import{ThemeableMixin}from"./mixins/ThemeableMixin.js";class NnInputText extends ThemeableMixin("nn-input-text")(FormElementMixin(StyleableMixin(LabelsMixin(InputMixin(NativeReflectorMixin(LitElement)))))){render(){return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="text" id="native" real-time-event="input">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `}}customElements.define("nn-input-text",NnInputText);var nnInputText={NnInputText:NnInputText};export{nnInputText as $nnInputText,NnInputText};