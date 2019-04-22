    import { LitElement, html } from 'lit-element'
    import { InputMixin } from './InputMixin.js'
    import { inputProperties } from './common.js'

    class InputButton extends InputMixin(LitElement) {

      static get properties() {
        var props = { ...inputProperties }

        return props
      }

      render() {
        return html`<input type="button" id="_el">
                      <slot></slot>
                    </button>`
      }
    }
    customElements.define('nn-input-button', InputButton)
