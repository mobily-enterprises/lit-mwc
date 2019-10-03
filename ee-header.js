import { LitElement, html, css } from 'lit-element'
import './ee-toolbar'

export class EeHeaderLayout extends LitElement {
  static get styles () {
    return [
      css`
        :host {
          display: block;
          width: 100%;
          z-index: 101;
        }

        div#header {
          z-index: 100;
        }

        .toolbar .subtitle {
          color: rgba(255, 255, 255, 0.75);
        }
        .toolbar button, .toolbar button svg {
          color: var(--app-header-text-color);
          fill: var(--app-header-text-color);
        }

        .toolbar div.actions {
          position: absolute;
          right: 20px;
          display: inline;
        }

        ::slotted([slot=actions]) {
          display: flex
        }

        .toolbar div.actions ::slotted(*[slot="actions"]) a {
          line-height: unset
        }

        .toolbar div.actions ::slotted(*[slot="actions"]) paper-button {
          max-height: 30px;
        }

      `
    ]
  }

  static get properties () {
    return {
      back: { type: Boolean },
      headerTitle: { type: String },
      headerSubtitle: { type: String },
      headerFixed: { type: Boolean }
    }
  }

  constructor () {
    super()
    this.headerTitle = ''
  }

  render () {
    return html`
      <div id="header">
        <ee-toolbar class="toolbar">
          <slot name="controls"></slot>
          <div main-title>
          ${this.headerTitle
            ? html`
                ${this.headerTitle}
                ${this.headerSubtitle ? html`<div class="subtitle">${this.headerSubtitle}</div>` : ''}
            `
            : html`
              <slot name="header-title"></slot>
            `
          }
          </div>
          <div class="actions">
            <slot name="actions"></slot>
          </div>
        </ee-toolbar>
        <slot name="sub-toolbar"></slot>
      </div>
    `
  }
}
customElements.define('ee-header-layout', EeHeaderLayout)

export class EeHeader extends LitElement {
  static get styles () {
    return [
      css`
        :host {
          display: flex;
          width: 100%;
          position: sticky;
          top: 0;
          right: 0;
          width: 100%;
          text-align: center;
          background-color: var(--header-background, var(--app-header-background-color));
          color: var(--header-color, var(--app-header-text-color));
          border-bottom: 1px solid #eee;
        }
      `
    ]
  }

  render () {
    return html`
      <slot></slot>
    `
  }
}
customElements.define('ee-header', EeHeader)
