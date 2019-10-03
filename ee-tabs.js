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
          animation: fadeIn 0.5s ease-in;
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
      selected: { type: String },
      eventBubbles: { type: Boolean }
    }
  }

  constructor () {
    super()
    this.selected = ''
    this.eventBubbles = false
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
    this.addEventListener('clicked-slot', this._fireSelectedEvent)
  }

  _fireSelectedEvent (e) {
    this.dispatchEvent(new CustomEvent('selected-changed', { detail: { action: e.detail.selected } }))
    this.selected = e.detail.selected
  }

  _manageSlotted (e) {
    const slot = e.currentTarget
    const slotted = slot.assignedNodes()
    for (const element of slotted) {
      element.addEventListener('click', this._clickedSlotted)
    }
  }

  _clickedSlotted (e) {
    this.parentElement.dispatchEvent(new CustomEvent('clicked-slot', { detail: { event: e, selected: this.id } }))
  }
}
customElements.define('nl-tabs', EeTabs)
