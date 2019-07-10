import { LitElement, css, html } from 'lit-element'
import './my-contained.js'

export class MyContainer extends LitElement {
  static get styles () {
    return css`
      :host {
        display: block;
      }
    `
  }

  static get properties () {
    return {
      exampleArray: { type: Array }
    }
  }

  constructor () {
    super()
    this.exampleArray = ['One', 'Two', 'Three']
  }

  render () {
    return html`
      <my-contained ></my-contained>
      <my-contained attr="${`outside_map`}"></my-contained>
      ${this.exampleArray.map((item) => {
        return html`
          <my-contained attr="${`in_map`}" .text="${item}"> </my-contained>
        `
      })}
    `
  }
}
customElements.define('my-container', MyContainer)
