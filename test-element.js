import { LitElement, html, css } from 'lit-element';
import './InputText.js';
import { DefaultTheme } from './BaseStyle.js';

class TestElement extends LitElement {

  static get styles () {
    return DefaultTheme
  }
  
  render() {
    return html`
      <nn-input-text .my-style="./input-style.css"></nn-input-text>
    `;
  }
}
customElements.define('test-element', TestElement);