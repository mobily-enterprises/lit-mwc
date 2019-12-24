import { LitElement, html, css } from 'lit-element'
import { StyleableMixin } from './mixins/StyleableMixin'
import { ThemeableMixin } from './mixins/ThemeableMixin'

export class EeTabs extends ThemeableMixin('ee-tabs')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      super.styles,
      css`
        :host {
          position: relative;
          width: 100%;
          border-bottom: 1px solid var(var(--ee-tabs-lines-color, #bbb));
        }

        :host nav {
          position: sticky;
          top:0;
          width: 100%;
          border-bottom: 1px solid var(--ee-tabs-lines-color, #bbb);
          display: flex;
          height: var(--ee-tabs-height, 32px);
          z-index: var(--ee-tabs-z-index, 10);
        }

        :host div#contentContainer {
          height: 100%;
          overflow: auto;
        }

        :host nav ::slotted(*) .icon {
          fill: var(--ee-tabs-color);
        }

        :host nav > ::slotted(*[active]) .icon {
          fill: var(--ee-tabs-active-color, black);
        }

        :host nav > ::slotted(*) {
          color: var(--ee-tabs-color, black);
          text-decoration: none;
          line-height: var(--ee-tabs-height, 20px);
          padding: 4px 24px;
          border: unset;
          border-left: 0.5px solid var(--ee-tabs-lines-color, #bbb);
          border-right: 0.5px solid var(--ee-tabs-lines-color, #bbb);
          border-bottom: 4px solid var(--ee-tabs-background-color, #bbb);
          font-size: 0.9em;
          border-radius: 0;
          width: 100%;
          text-align: center;
          background-color:  var(--ee-tabs-background-color, whitesmoke);
          cursor: default;
        }

        :host nav > ::slotted(*:last-child) {
          border-right-color: var(--ee-tabs-background-color, #bbb)
        }

        :host nav > ::slotted(*:first-child) {
          border-left-color: var(--ee-tabs-background-color, #bbb)
        }

        :host nav > ::slotted(*[active]) {
          color: var(--ee-tabs-active-color);
          border-bottom: 4px solid var(--ee-tabs-active-color, black);
          background-color: var(--ee-tabs-active-background-color, white);
          font-size: bold;
        }

        :host nav > ::slotted(*:focus),
        :host nav > ::slotted(*:hover) {
          /* outline:0 ; */
          border-left: 0.5px solid var(--ee-tabs-lines-color, #bbb);
          border-right: 0.5px solid var(--ee-tabs-lines-color, #bbb);
          border-bottom: 4px solid var(--ee-tabs-active-color, black);
          filter: brightness(150%)
        }

        :host nav > ::slotted(*:active) {
          background: #cccccc;
          border-bottom: 4px solid #bdbdbd;
          box-shadow: none;
        }

        :host nav > ::slotted(*[disabled]) {
          box-shadow: none
        }

        :host nav > ::slotted(*.icon:active) {
          background: #cccccc;
          border: unset;
          border-radius: 50%;
        }

        :host nav > ::slotted(*.icon:hover) svg, :host > ::slotted(*:hover) svg {
          fill: var(--ee-tabs-color, black);
        }
      `
    ]
  }

  static get properties () {
    return {
      useHash: { type: Boolean, attribute: 'use-hash' },
      default: { type: String },
      nameAttribute: { type: String, attribute: 'name-attribute' }
    }
  }

  constructor () {
    super()
    this.nameAttribute = 'name'
    this.useHash = false
  }

  /** Tabs usage
   * add elements within the ee-tabs tags to create tabs.
   * Tab elements must have an name attribute, or you can set a custom value to 'active-attribute'. Index support will be added soon
   */
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
    <nav>
      <slot id="tabs" @slotchange="${this._manageSlottedTabs}"></slot>
    </nav>
    <div id="contentContainer">
      <slot name="content"></slot>
    </div>
    `
  }

  _getAllTabs () {
    return this.shadowRoot.querySelector('slot#tabs').assignedElements()
  }

  firstUpdated () {
    super.firstUpdated()

    // Select either the default tab, or the first one
    if (this.useHash && window.location.hash) this.select(window.location.hash.substr(1))
    else this.select(this.default || this._getAllTabs()[0], false)
  }

  _isActive (el) {
    return el.hasAttribute('active')
  }

  select (tab, clearAll = true) {
    if (typeof tab === 'string') {
      tab = this._getAllTabs().find(i => i.getAttribute(this.nameAttribute) === tab)
    }
    if (!tab) return

    const pages = this.shadowRoot.querySelector('slot[name="content"]').assignedElements()
    if (clearAll) this._clearAll(this._getAllTabs(), pages)

    tab.toggleAttribute('active', true)
    tab.active = true

    /*
    const name = tab.getAttribute(this.nameAttribute)
    const activePage = pages.find(el => el.getAttribute(this.nameAttribute) === name)
    if (activePage) {
      activePage.toggleAttribute('active', true)
      activePage.active = true
    }
    */
  }

  // Clear the seletecAttribute from the current active tab and page
  _clearAll (tabs, pages) {
    const currentTab = tabs.find(this._isActive.bind(this))
    // const currentPage = pages.find(this._isActive.bind(this))
    if (currentTab) {
      currentTab.toggleAttribute('active', false)
      currentTab.active = false
    }
    /*
    if (currentPage) {
      currentPage.toggleAttribute('active', false)
      currentPage.active = false
    }
    */
  }

  // This adds a click event listener to all slotted children (the tabs)
  _manageSlottedTabs (e) {
    for (const element of this._getAllTabs()) {
      element.addEventListener('click', (e) => { this.select.bind(this)(e.currentTarget) })
      element.setAttribute('tabindex', 1)
    }
  }
}
customElements.define('ee-tabs', EeTabs)
