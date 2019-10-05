import { LitElement, html } from 'lit-element'
import { StyleableMixin } from './mixins/StyleableMixin'
import { ThemeableMixin } from './mixins/ThemeableMixin';

export class EeFab extends ThemeableMixin('ee-fab')(StyleableMixin(LitElement)) {

  static styles = css`
  :host {
    display: block;
  }
  `;

  render() {
    return html``;
  }
}
customElements.define('ee-fab', EeFab);