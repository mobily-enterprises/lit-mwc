import{css}from"../../../node_modules/lit-element/lit-element.js";const EnForm=base=>{return class Base extends base{static get styles(){return[...(super.styles||[]),css`
          :invalid {
            border: unset;
            border-bottom: var(--nn-input-border, var(--nn-theme-border));
          }
        `]}}};var enForm={EnForm:EnForm};export{enForm as $enForm,EnForm};