import{LitElement,css,html}from"./node_modules/lit-element/lit-element.js";import{StyleableMixin}from"./mixins/StyleableMixin.js";import{ThemeableMixin}from"./mixins/ThemeableMixin.js";class EeFab extends ThemeableMixin("ee-fab")(StyleableMixin(LitElement)){static get styles(){return css`
      :host {
        display: block;
      }
    `}render(){return html`
    `}}customElements.define("ee-fab",EeFab);var eeFab={EeFab:EeFab};export{eeFab as $eeFab,EeFab};