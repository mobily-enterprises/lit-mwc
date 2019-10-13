import { LitElement, html, css } from 'lit-element'
import { StyleableMixin } from './mixins/StyleableMixin'
import { ThemeableMixin } from './mixins/ThemeableMixin'

export class EeFab extends ThemeableMixin('ee-fab')(StyleableMixin(LitElement)) {
  static get styles () {
    return css`
      :host {
        display: block;
      }
    `
  }

  render () {
    return html`
    `
  }
}
customElements.define('ee-fab', EeFab)
