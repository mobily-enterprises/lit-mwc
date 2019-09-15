import { html, css } from 'lit-element'

export const LabelsMixin = (base) => {
  return class Base extends base {
    constructor () {
      super()
      this.labelPosition = 'before'
    }

    static get properties () {
      return {
        label: { type: String },
        labelPosition: {
          type: String,
          attribute: 'label-position'
        }
      }
    }

    get labelTemplate () {
      return html`
        <label id="label" for="native">
          <div id="label-text">${this.label}</div>
          <slot id="label-slot" name="label"></slot>
        </label>
      `
    }

    get ifLabelBefore () {
      if (this.labelPosition === 'after') return ''
      return this.labelTemplate
    }

    get ifLabelAfter () {
      if (this.labelPosition === 'before') return ''
      return this.labelTemplate
    }
  }
}

LabelsMixin.defaultStyles = css`
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

  label div#label-text, , ::slotted(*) {
    align-self: center;
    width: var(--nn-input-label-width, auto);
  }

  input:invalid + label {
    background-color: var(--nn-label-background-invalid, #dd9999);
  }
`
