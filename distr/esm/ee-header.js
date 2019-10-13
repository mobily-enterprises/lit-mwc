import { html, LitElement, css } from './node_modules/lit-element/lit-element.js';
import './ee-toolbar.js';
const arrowback = html`<svg class="icon" height="24" viewBox="0 0 24 24" width="24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>`;
const menu = html`<svg class="icon" height="24" viewBox="0 0 24 24" width="24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>`;

class EeHeader extends LitElement {
  static get styles() {
    return [super.styles || [], css`
        :host {
          display: block;
          width: 100%;
        }

        div#header {
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

        :host([menu]) div[title], 
        :host([back]) div[title] {
          padding-right: 46px;
        }

        :host([menu][back]) div[title]{
          padding-right: 92px;
        }

        .toolbar .subtitle {
          color: rgba(255, 255, 255, 0.75);
        }
        .toolbar button.icon {
          appearance: none;
          -webkit-appearance: none;
          font-size: inherit;
          vertical-align: middle;
          background: transparent;
          border: none;
          cursor: pointer;
          -webkit-appearance: none;
          height: 40px;
          width: 40px;
          padding: 6px ;
          margin: auto 3px;
        }

        .toolbar button.icon:focus, .toolbar button.icon:hover {
          outline: 0;
          background: #eeeeee;
          /* border: 1px solid #bdbdbd; */
        }

        .toolbar button.icon:active {
          outline: 0;
          background: #cccccc;
          border: 1px solid #bdbdbd;
          box-shadow: none
          /* animation: fadeIn 0.1s ease-in; */
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

        .toolbar div.controls {
          align-items: left;
        }

        .toolbar div.controls ::slotted(*[slot="controls"]) {
        }

      `];
  }

  static get properties() {
    return {
      // Users can set these attributes to get built-in basic controls and title text. 
      // Otherwise, they can user their own with slot="controls" and slot="header-title"
      back: {
        type: Boolean,
        reflect: true
      },
      menu: {
        type: Boolean,
        reflect: true
      },
      headerTitle: {
        type: String,
        attribute: 'header-title'
      },
      headerSubtitle: {
        type: String,
        attribute: 'header-subtitle'
      }
    };
  }

  constructor() {
    super();
    this.headerTitle = '';
  }

  render() {
    return html`
      <div id="header">
        <ee-toolbar class="toolbar">
          <div class="controls">
            ${this.menu ? html`<button class="icon" title="Menu" @click="${this._menuEvent}">${menu}</button>` : ''}
            ${this.back || this.history.length > 1 ? html`<button class="icon" title="Back" @click="${this._backEvent}">${arrowback}</button>` : ''}
            <slot name="controls"></slot>
          </div>
          <div title>
          ${this.headerTitle ? html`
                ${this.headerTitle}
                ${this.headerSubtitle ? html`<div class="subtitle">${this.headerSubtitle}</div>` : ''}
            ` : html`
              <slot name="header-title"></slot>
            `}
          </div>
          <div class="actions">
            <slot name="actions"></slot>
          </div>
        </ee-toolbar>
        <slot name="sub-toolbar"></slot>
      </div>
    `;
  }

  _menuEvent() {
    this.dispatchEvent(new CustomEvent('menu-clicked'));
  }

  _backEvent() {
    this.dispatchEvent(new CustomEvent('back-clicked'));
  }

}

customElements.define('ee-header', EeHeader);
var eeHeader = {
  EeHeader: EeHeader
};
export { eeHeader as $eeHeader, EeHeader };