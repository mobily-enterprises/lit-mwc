import { LitElement, html } from 'lit-element'
import './nn/InputText.js'
import './nn/Select.js'
import { DefaultTheme } from './styles/BaseStyle.js'

class TestElement extends LitElement {
  static get properties () {
    return {
      path: { type: String }
    }
  }

  static get styles () {
    return DefaultTheme
  }

  constructor () {
    super()
    this.path = './styles/input-style.css'
  }

  render () {
    return html`
      <nn-input-text id="debug" custom-css='{"color":"red"}' label2="Eheh" labelBefore .value="${'THIS_NEEDS_TO_SHOW'}" extra-boot-properties="value" .stylesheet="${this.path}">
        <label slot="label">Test label</label>
      </nn-input-text>

      <nn-select class="field" id="recorrente" name="recorrente" label="Recorrente">
         <option disabled selected> -- não recorrente -- </option>
         <option value="diariamente">Diariamente</option>
         <option value="Semanalmente">Semanalmente</option>
         <option value="Mensalmente">Mensalmente</option>
       </nn-select>

       <nn-input label="test"></nn-input>

    `
  }
}
customElements.define('test-element', TestElement)
