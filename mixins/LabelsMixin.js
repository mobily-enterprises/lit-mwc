import { html } from 'lit-element'

export const LabelsMixin = (base) => {
  return class Base extends base {

    constructor () {
      super()
      this.labelPosition = 'before'
    }

    static get properties () {
      return {
        label: { type: String },
        labelPostion: {
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
      if (this.labelPosition === 'after') return
      return this.labelTemplate
    }

    get ifLabelAfter () {
      if (this.labelPosition === 'before') return
      return this.labelTemplate
    }
  }
}
