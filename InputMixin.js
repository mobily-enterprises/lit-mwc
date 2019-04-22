import { inputProperties } from './common.js'

export const InputMixin = (base) => {
  return class Base extends base {


    // Return the straight input properties by default
    // They are here so that attributeChangedCallback is called
    static get properties(){
      return inputProperties
    }

    // When an attribute changes, relay the change
    //
    attributeChangedCallback(name, oldval, newval) {
      this.updateComplete.then(() => {
        this._el = this.shadowRoot.querySelector('#_el')
        this._el.setAttribute(name, newval)
        super.attributeChangedCallback(name, oldval, newval);
      })
    }
  }
}
