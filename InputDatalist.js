import { LitElement, html, css } from 'lit-element'
import { ifDefined } from "lit-html/directives/if-defined";
import { InputMixin } from './InputMixin.js'
import { CommonMixin } from './CommonMixin.js'
import { baseProperties, inputIDLProperties, alwaysSkipAttributes } from './common.js'
export class InputDatalist extends InputMixin(CommonMixin(LitElement)) {
  static get styles () {
    return css`
        :host {
          display: flex;
          height: 30px;
        }

        input {
          display: inline-flex;
          border-radius: var(--nn-input-border-radius, 0 4px 4px 0);
          border: var(--nn-input-border, 1px solid #dddddd);
          color: var(--nn-input-color, inherit);
          background-color: var(--nn-input-background, initial);
          -webkit-appearance: none;
          width: 100%;
          float: right;
          font-size: 1em;
          padding-left: 10px;
          margin-left: 4px;
        }

        input:invalid {
          background-color: pink;
          border: var(--nn-input-border-invalid, 1px solid #bb7777);
        }

        label {
          display: inline-flex;
          font-size: 1em;
          border: var(--nn-label-border, 1px solid #dddddd);
          color: var(--nn-label-color, inherit);
          background-color: var(--nn-label-background, #eeeeee);
          border-radius: var(--nn-label-border-radius, 4px 0 0 4px );
          padding-left: 4px;
          padding-right: 4px;
          min-width: fit-content;
          margin-right: -5px;
          white-space: nowrap;

        }

        label div#label-text {
          align-self: center;
          width: var(--nn-input-label-width, auto);
        }

        input:invalid + label {
          background-color: var(--nn-label-background-invalid, #dd9999);
        }

      `
  }

  static get properties () {
    return {
    }
  }

  get skipAttributes () {
    return [
      ...alwaysSkipAttributes,
      'form', 'type', 'list'
    ]
  }

  get reflectProperties () {
    return [
      ...baseProperties,
      ...inputIDLProperties
    ]
  }

  render () {
    return html`
                ${this.customStyle}

                ${this.labelBeforeTemplate}
                <slot @slotchange="${this.addSlotToSelect}"></slot>

                <input type="text" id="_native" list="_datalist" >
                  <datalist id="_datalist">

                  </datalist>
                ${this.labelAfterTemplate}
              `
  }
  
  addSlotToSelect (e) {
    const select = this.shadowRoot.querySelector('#_datalist')
    for (const option of e.srcElement.assignedElements()) {
      select.appendChild(option)
    }
  }
}
customElements.define('nn-input-datalist', InputDatalist)
