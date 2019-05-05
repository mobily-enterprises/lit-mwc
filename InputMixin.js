import { html } from "lit-element";

export const InputMixin = (base) => {
  return class Base extends base {
    
    set labelBefore(val) {
      let oldVal = this._labelBefore
      this._labelBefore = val
      this.requestUpdate('labelBefore', oldVal)
    }
  
    get labelBefore() {
      return this._labelBefore
    }

    set label(val) {
      this.labelBefore = val
    }

    get label() {
      return this.labelBefore
    }

      
    set labelAfter(val) {
      let oldVal = this._labelAfter
      this._labelAfter = val
      this.requestUpdate('labelAfter', oldVal)
    }
  
    get labelAfter() {
      return this._labelAfter
    }

    get labelTemplate() {
      return  html`
                <label for="_el">
                <slot name="label"></slot>
                </label>
              `
    }
   
    get labelBeforeTemplate() {
      return html`
        ${ this.labelBefore ? this.labelTemplate : '' }
      `
    }

    get labelAfterTemplate() {
      return html`
        ${ this.labelAfter ? this.labelTemplate : '' }
      `
    }
  }
}