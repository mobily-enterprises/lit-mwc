import { LitElement, html, css } from 'lit-element'
import { StyleableMixin } from './mixins/StyleableMixin'
import { ThemeableMixin } from './mixins/ThemeableMixin'

export class EeTabs extends ThemeableMixin('ee-tabs')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      super.styles,
      css`
        :host {
          width: 100%;
          height: 42px;
          padding-top: 0;
          border-bottom: 1px solid var(var(--ee-tabs-lines-color, #999));
        }

        :host nav {
          border-bottom: 1px solid var(--ee-tabs-lines-color, #999);
          display: flex;
        }

        :host nav ::slotted(*) .icon {
          fill: var(--ee-tabs-color);
        }

        :host nav > ::slotted(*[selected]) .icon {
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

        :host nav > ::slotted(*[selected]) {
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
   * add elements within the ee-tabs tags to create tabs.
   * Tab elements must have an name attribute, or you can set a custom value to 'selected-attribute'. Index support will be added soon
   */
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
    <nav>
      <slot @slotchange="${this._manageSlotted}"></slot>
    </nav>
    `
  }

  firstUpdated () {
    const slotted = this.shadowRoot.querySelector('slot').assignedElements()
    if (!slotted.length) return
    const selected = this.selected || this.default
    const defaultTab = selected ? slotted.filter(i => i.getAttribute('name') === this.default)[0] : slotted[0]
    if (defaultTab) {
      this.dispatchEvent(new CustomEvent('selected-changed', { detail: { selected: selected } }))
      this.selected = selected
    }
  }

  connectedCallback () {
    super.connectedCallback()
    // Listen to local clicked-slot event
    this.addEventListener('clicked-slot', this._fireSelectedEvent)
  }

  // This adds a click event listener to all slotted children (the tabs)
  _manageSlotted (e) {
    const slot = e.currentTarget
    const slotted = slot.assignedElements()
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
