import { LitElement, html, css } from 'lit-element'
import { InputMixin } from './InputMixin.js'
import { CommonMixin } from './CommonMixin.js'
import { baseProperties, inputIDLProperties, alwaysSkipAttributes } from './common.js'
export class Select extends InputMixin(CommonMixin(LitElement)) {
  static get styles () {
    return css`
        :host {
          display: flex;
          height: 30px;
        }

        select {
          display: inline-flex;
          border-radius: var(--nn-select-border-radius, 0 4px 4px 0);
          border: var(--nn-select-border, 1px solid #dddddd);
          color: var(--nn-select-color, inherit);
          background-color: var(--nn-select-background, initial);
          -webkit-appearance: select;
          width: 100%;
          float: right;
          font-size: 1em;
          padding-left: 10px;
          margin-left: 4px;
        }

        select:invalid {
          background-color: pink;
          border: var(--nn-select-border-invalid, 1px solid #bb7777);
        }

        select option {
          text-transform: capitalize;
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
          width: var(--nn-select-label-width, auto);
        }

        select:invalid + label {
          background-color: var(--nn-label-background-invalid, #dd9999);
        }

      `
  }

  static get properties () {
    return {
      options: { type: Array },
      empty: { type: String }
    }
  }

  get skipAttributes () {
    return [
      ...alwaysSkipAttributes,
      'form', 'type'
    ]
  }

  get reflectProperties () {
    return [
      ...baseProperties,
      ...inputIDLProperties
    ]
  }

  constructor() {
    super()
    this.options = []
  }

  render () {
    return html`
                ${this.customStyle}

                ${this.labelBeforeTemplate}
                
                <select id="_native">
                  ${this.empty 
                    ? html` <option slot="options" disabled selected> ${this.empty} </option> `
                    : ''
                  }
                  ${this.options.map( (opt) => {
                    return html`
                      <option value="${opt}">${opt}</option>
                    `
                  })}
                </select>

                ${this.labelAfterTemplate}
              `
  }
}
customElements.define('nn-select', Select)

// THE MAP BASED OPTIONS IS A TEMPORARY SOLUTION.
// THIS DIDN'T WORK. COULD NOT FIGURE OUT THE REASON. SLOT IS NOT CREATED INSIDE <select>. WE NEED TO INVESTIGATE
// 
// <select id="_native">
// <slot></slot>  // OR // <slot name="options"></slot>
// </select>
//