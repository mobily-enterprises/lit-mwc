import { LitElement, html, css } from 'lit-element';
import './InputText.js';
import { DefaultTheme } from './BaseStyle.js';

class TestElement extends LitElement {
   static get properties() {
     return {
       path: { type: String }
     };
   }
  static get styles () {
    return DefaultTheme
  }

  constructor() {
    super()
    this.path="./input-style.css"
  }
  
  render() {
    return html`
      <nn-input-text .myStyle="${this.path}"></nn-input-text>
    `;
  }
}
customElements.define('test-element', TestElement);