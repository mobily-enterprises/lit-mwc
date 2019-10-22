import { LitElement, html } from 'lit-element'
import './nn/InputText.js'
import './nn/InputRange.js'
import './en/InputRange.js'
import './nn/Select.js'
import { BaseStyle } from './styles/DefaultTheme'

class TestElement extends LitElement {
  static get properties () {
    return {
      path: { type: String }
    }
  }

  static get styles () {
    return BaseStyle
  }

  constructor () {
    super()
    this.path = './styles/input-style.css'
    this.myStyle = html`input { background-color: blue; color: white}`
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      <nn-input-text elementStyle.="${this.myStyle}" label2="Eheh" .value="${'THIS NEEDS TO SHOW'}" stylesheet="${this.path}">
        <span slot="label">Label text in span</span>
      </nn-input-text>

       <h2>Range in element</h2>
       <en-input-range .value=${'10'} id="input-range" label="Range" min=10 max=100>
         <div slot="range-amount-before">AMOUNT BEFORE: <span id="range-amount"></span></div>
         <div slot="range-amount-after">AMOUNT AFTER: <span id="range-amount"></span></div>
       </en-input-range>


       <nn-input label="test"></nn-input>

    `
  }
}
customElements.define('test-element', TestElement)
