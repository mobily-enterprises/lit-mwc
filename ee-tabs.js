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
          border-bottom: 1px solid var(var(--ee-tabs-lines-color, #999));
        }

        :host nav {
          position: sticky;
          top:0;
          width: 100%;
          border-bottom: 1px solid var(--ee-tabs-lines-color, #999);
          display: flex;
          height: var(--ee-tabs-height, 32px);
        }

        :host div#contentContainer {
          height: 100%;
          overflow: auto;
        }

        :host nav ::slotted(*) .icon {
          fill: var(--ee-tabs-color);
        }

        :host nav > ::slotted(*[active]) .icon {
          fill: var(--ee-tabs-selected-color, black);
        }

        :host nav > ::slotted(*) {
          color: var(--ee-tabs-color, black);
          text-decoration: none;
          line-height: var(--ee-tabs-height, 20px);
          padding: 4px 24px;
          border: unset;
          border-right: 1px solid var(--ee-tabs-lines-color, #999);
          border-bottom: 4px inset transparent;
          font-size: 0.9em;
          border-radius: 0;
          width: 100%;
          text-align: center;
          background-color:  var(--ee-tabs-background-color, whitesmoke);
          cursor: default;
        }

        :host nav > ::slotted(*:last-child) {
          border-right: unset
        }

        :host nav > ::slotted(*[active]) {
          color: var(--ee-tabs-selected-color);
          border-bottom: 4px solid var(--ee-tabs-selected-color, black);
          background-color: var(--ee-tabs-selected-background-color, white);
          font-size: bold;
        }

        :host nav > ::slotted(*:focus),
        :host nav > ::slotted(*:hover) {
          /* outline:0 ; */
          border-bottom: 4px inset var(--ee-tabs-selected-color, black);
          filter: brightness(150%)
        }

        :host nav > ::slotted(*:active) {
          background: #cccccc;
          border-bottom: 4px inset #bdbdbd;
          box-shadow: none;
          animation: fadeIn 0.2s ease-in;
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
      default: { type: String },
      selected: { type: String, reflect: true },
      tabs: { type: Array },
      nameAttribute: { type: String },
      eventBubbles: { type: Boolean }
    }
  }

  constructor () {
    super()
    this.selected = ''
    this.tabs = []
    this.eventBubbles = false
    this.nameAttribute = 'name'
    this.selectedAttribute = 'active'
  }

  /** Tabs usage
   * add elements within the ee-tabs tags to create tabs.
   * Tab elements must have an name attribute, or you can set a custom value to 'selected-attribute'. Index support will be added soon
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

  // Check if there are tabs, then, if there is a default tab to be selected, or select the first one
  firstUpdated () {
    super.firstUpdated()
    const tabs = this.shadowRoot.querySelector('slot#tabs').assignedElements()
    const defaultTab = this.default ? tabs.find(i => i.getAttribute('name') === this.default) : tabs[0]
    this._select(null, defaultTab)
  }

  _isSelected (el) {
    return el.hasAttribute(this.selectedAttribute)
  }

  _matchSelected (el) {
    return el.getAttribute(this.nameAttribute) === this.selected
  }

  // Clear the seletecAttribute from the current acteive tab and content
  _clearCurrent (tabs, content) {
    const currentTab = tabs.find(this._isSelected.bind(this))
    const currentContent = content.find(this._isSelected.bind(this))
    if (currentTab) currentTab.toggleAttribute(this.selectedAttribute, false)
    if (currentContent) currentContent.toggleAttribute(this.selectedAttribute, false)
    this.selected = ''
    content[this.selectedAttribute] = false
  }

  _select (e, el) {
    const tab = e ? e.currentTarget : el
    if (!tab) return
    const content = this.shadowRoot.querySelector('slot[name="content"]').assignedElements()
    if (this.selected !== tab.getAttribute(this.nameAttribute)) this._clearCurrent(this.tabs, content)
    this.selected = tab.getAttribute(this.nameAttribute)
    tab.toggleAttribute(this.selectedAttribute, true)
    const selectedContent = content.find(this._matchSelected.bind(this))
    if (selectedContent) {
      selectedContent[this.selectedAttribute] = false
      selectedContent.toggleAttribute(this.selectedAttribute, true)
    }
  }

  // This adds a click event listener to all slotted children (the tabs)
  _manageSlottedTabs (e) {
    const slot = e.currentTarget
    const slotted = slot.assignedElements()
    this.tabs = slotted
    for (const element of slotted) {
      element.addEventListener('click', this._select.bind(this))
    }
  }
}
customElements.define('ee-tabs', EeTabs)
