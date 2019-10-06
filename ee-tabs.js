import { LitElement, html, css } from 'lit-element'
import { StyleableMixin } from './mixins/StyleableMixin'
import { ThemeableMixin } from './mixins/ThemeableMixin'

export class EeTabs extends ThemeableMixin('ee-tabs')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      super.styles || [],
      css`
        :host {
          width: 100%;
          height: 42px;
          padding-top: 0;
        }

        :host nav {
          border-bottom: 1px solid var(--app-lines-color)
        }

        :host nav ::slotted(*) .icon {
          fill: var(--app-drawer-text-color);
        }

        :host nav > ::slotted(*[selected]) .icon {
          fill: var(--app-header-selected-color);
        }

        :host nav > ::slotted(*) {
          display: inline-flex;
          color: var(--app-dark-text-color);
          text-decoration: none;
          line-height: 30px;
          padding: 4px 24px;
          border: unset;
          border-right: 1px solid var(--app-lines-color);
          border-bottom: 4px inset transparent;
          font-size: 0.9em;
          border-radius: 0;
        }

        :host nav > ::slotted(*:last-child) {
          border-right: unset
        }

        :host nav > ::slotted(*[selected]) {
          color: var(--app-header-selected-color);
          border-bottom: 4px solid var(--app-primary-color);
        }

        :host nav > ::slotted(*:focus) {
          outline:0 ;
          background: whitesmoke;
          /* border: 1px solid #bdbdbd; */
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
          fill: var(--app-primary-color);
        }
      `
    ]
  }

  static get properties () {
    return {
      selected: { type: String, reflect: true },
      selectedAttribute: { type: String },
      eventBubbles: { type: Boolean }
    }
  }

  constructor () {
    super()
    this.selected = ''
    this.eventBubbles = false
    this.selectedAttribute = 'name'
  }

  /** Tabs usage
   * add elements with a slot="tabs" within the nl-tabs tags to create tabs.
   * Tab elements must have an id. Index support will be added soon
   */
  render () {
    return html`
    <nav>
      <slot @slotchange="${this._manageSlotted}"></slot>
    </nav>
    `
  }

  connectedCallback () {
    super.connectedCallback()
    // Listen to local clicked-slot event
    this.addEventListener('clicked-slot', this._fireSelectedEvent)
  }

  // This adds a click event listener to all slotted children (the tabs)
  _manageSlotted (e) {
    const slot = e.currentTarget
    const slotted = slot.assignedNodes()
    for (const element of slotted) {
      element.addEventListener('click', this._clickedSlotted.bind(this))
    }
  }

  // Each tab runs this and fires a clicked-slot event, which carries the selected value, It gets the value from the name attribute of the slotted "tab"
  _clickedSlotted (e) {
    console.log('slot clicked', this.selectedAttribute)
    this.dispatchEvent(new CustomEvent('clicked-slot', { detail: { event: e, selected: e.currentTarget.getAttribute(this.selectedAttribute) } }))
  }

  // This function runs when the host element receives a clicked-slot event from it's children. It sets the selected property and fires a 'selected-changed' event with that value.
  _fireSelectedEvent (e) {
    this.dispatchEvent(new CustomEvent('selected-changed', { detail: { selected: e.detail.selected } }))
    this.selected = e.detail.selected
  }
}
customElements.define('ee-tabs', EeTabs)
