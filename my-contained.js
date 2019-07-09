import { LitElement, css, html } from 'lit-element';

export class MyContained extends LitElement {

  static get styles () {
    return css`
      :host {
        display: block;
        border: 1px solid black;
        padding: 10px;
      }
    `;
  }

  static get properties() {
    return {
      text: { type: String }
    };
  }

  constructor() {
    super();
    this.text = 'Default Text'
  }

  render() {
    return html`
      <h3>I'm contained</h3>
      <h4>${this.text}</h4>
    `;
  }

  firstUpdated() {
    console.log(this.shadowRoot);
    
  }

  setAttribute (subAttr, attrValue) {
    console.log( this.shadowRoot);
    super.setAttribute(subAttr, attrValue)
  }
}
customElements.define('my-contained', MyContained);