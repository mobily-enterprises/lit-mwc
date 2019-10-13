import{css}from"../../../node_modules/lit-element/lit-element.js";import{AddHasValueAttributeMixin}from"../../../mixins/AddHasValueAttributeMixin.js";import{inputField,inputLabel,fixedLabel}from"../style-patterns.js";const NnSelect=base=>{return class Base extends AddHasValueAttributeMixin(base){// Style depends on CSS being able to find label as sibling of the #native element.
// CSS can select next siblings, but not previous.  This guarantees label is rendered after #native in the shadowDOM
static get properties(){return{labelPosition:{type:String,attribute:!1},validationMessage:{type:String,attribute:!1}}}constructor(){super();this.labelPosition="after";this.validationMessagePosition="after"}connectedCallback(){super.connectedCallback();this.onclick=()=>{this.native.click()}}static get styles(){return[super.styles||[],inputField,inputLabel,fixedLabel,css`
          :host::after {
            position: absolute;
            content: '';
            border: 4px solid transparent;
            border-top-color: var(--nn-boundaries-color-color);
            right: 20px;
            bottom: 50%;
            user-select: none;
          }
        `]}}};var nnSelect={NnSelect:NnSelect};export{nnSelect as $nnSelect,NnSelect};