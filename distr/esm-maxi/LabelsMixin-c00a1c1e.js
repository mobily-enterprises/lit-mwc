import {c as css,h as html}from'./lit-element-97ae09cb.js';const LabelsMixin = (base) => {
  return class Base extends base {
    static get styles () {
      return [
        super.styles || [],
        css`
          label div#label-text, ::slotted(*) {
            align-self: center;
            width: var(--nn-input-label-width, auto);
          }

        `
      ]
    }

    static get properties () {
      return {
        label: { type: String },
        labelPosition: {
          type: String,
          attribute: 'label-position'
        },
        labelForElement: {
          type: String,
          attribute: 'false'
        }

      }
    }

    constructor () {
      super();
      this.labelPosition = 'before';
      this.labelForElement = 'native';
    }

    get labelTemplate () {
      return html`
        <label id="label" for="${this.labelForElement}">
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
};export{LabelsMixin as L};