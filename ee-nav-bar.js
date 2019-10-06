import { LitElement, html, css } from 'lit-element';
import { StyleableMixin } from './mixins/StyleableMixin'
import { ThemeableMixin } from './mixins/ThemeableMixin'

export class EeNavBar extends ThemeableMixin('ee-nav-bar')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      super.styles || [],
      css`
        :host {
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 64px;
        z-index: 100;
      }

      :host nav {
        display: flex;
        width: 100%;
        height: 64px;
        background: var(--ee-nav-bar-background, --app-primary-color);
        color: var(--ee-nav-bar-color, --app-header-color)
      }

      :host nav > ::slotted(*) {
        margin: auto;
        opacity: 0.75;
      }

      :host nav > ::slotted(*[selected]) {
        opacity: 1;
      }
    `
    ]
  }

  render () {
    return html`
      <nav>
        <slot></slot>
      </nav>
    `;
  }
}
customElements.define('ee-nav-bar', EeNavBar);
