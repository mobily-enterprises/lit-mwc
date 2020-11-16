import { LitElement, html, css } from 'lit-element'
import { StyleableMixin } from './mixins/StyleableMixin'
import { ThemeableMixin } from './mixins/ThemeableMixin'

// https://css-tricks.com/snippets/css/a-guide-to-flexbox/
// https://dev.to/drews256/ridiculously-easy-row-and-column-layouts-with-flexbox-1k01

// https://github.com/Victor-Bernabe/lit-media-query/blob/master/lit-media-query.js

// eslint-disable-next-line new-cap
export class EeTable extends ThemeableMixin('ee-table')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      super.styles || [],
      css`
        :host {
          display: block;
          width: 100%;
        }

        :host([striped]) ::slotted(ee-row:nth-child(odd)) {
          background-color: var(--ee-table-striped-odd-color, white)
        }

        :host([striped]) ::slotted(ee-row:nth-child(even)) {
          background-color: var(--ee-table-striped-even-color, whitesmoke)
        }

        #last-row-drop-target {
          display: none;
          text-align: center;
        }
      `
    ]
  }

  static get properties () {
    return {
      small: {
        type: String
      },
      medium: {
        type: String
      },
      dragDrop: {
        type: Boolean,
        attribute: 'drag-drop'
      },
      manipulateDOM: { type: Boolean, attribute: 'manipulate-dom' }
    }
  }

  constructor () {
    super()
    this.small = 600
    this.medium = 1024
    this.dragDrop = false
    this.manipulateDOM = false
    this._boundDragstart = this._dragstart.bind(this)
    this._boundDragover = this._dragover.bind(this)
    this._boundDragend = this._dragend.bind(this)
    this._boundDragenter = this._dragenter.bind(this)
    this._boundDragleave = this._dragleave.bind(this)
    this._boundDragexit = this._dragexit.bind(this)
    this._boundDragdrop = this._dragdrop.bind(this)
  }

  _changeRowsSize (size) {
    const rows = this.shadowRoot.querySelector('slot').assignedElements()
    for (const row of rows) row.setAttribute('size', size)
  }

  _handleResize () {
    if (window.matchMedia(`(max-width: ${this.small}px)`).matches) {
      this._changeRowsSize('small')
    } else if (window.matchMedia(`(max-width: ${this.medium}px)`).matches) {
      this._changeRowsSize('medium')
    } else {
      this._changeRowsSize('large')
    }
  }

   // Sets up all list children (rows) with listeners for Drag and Drop
  _updateDragDrop () {
    const rows = this.shadowRoot.querySelector('slot').assignedElements()
    for (const row of rows) {
      console.log(row)
      if (this.dragDrop) {
        row.setAttribute('draggable', 'true')
        this._activateRowDnD(row)
      } else {
        row.removeAttribute('draggable')
        this._deactivateRowDnD(row)
      }
    }
  }

  _activateRowDnD (row) {
    row.addEventListener('dragstart', this._dragstart, false)
    row.addEventListener('dragover', this._dragover, false)
    row.addEventListener('dragend', this._dragend, false)
    row.addEventListener('dragenter', this._dragenter, false)
    row.addEventListener('dragleave', this._dragleave, false)
    row.addEventListener('dragexit', this._dragexit, false)
    row.addEventListener('drop', this._dragdrop, false)
  }

  _deactivateRowDnD (row) {
    row.removeEventListener('dragstart', this._dragstart)
    row.removeEventListener('dragover', this._dragover)
    row.removeEventListener('dragend', this._dragend)
    row.removeEventListener('dragenter', this._dragenter)
    row.removeEventListener('dragleave', this._dragleave)
    row.removeEventListener('dragexit', this._dragexit)
    row.removeEventListener('drop', this._dragdrop)
  }

  firstUpdated () {
    this._handleResize()
    this._updateDragDrop()
    this.lastDropTarget = this.shadowRoot.querySelector('#last-row-drop-target')
    this._activateRowDnD(this.lastDropTarget)
  }

  connectedCallback () {
    super.connectedCallback()

    // Check if Visual Viewport API is supported
    const listenObject = window.visualViewport || window
    listenObject.addEventListener('resize', () => {
      this._handleResize()
    })
  }

  _dragstart (e) {
    if (e.target.header) e.preventDefault()
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.dropEffect = 'move'
    //  This is the proper way to 'move' data around while dragging. However, webKit based browsers
    //  only make that data accessible on the drop event, so checking anything in dragover is harder.
    const data = JSON.stringify(this.dragData)
    e.dataTransfer.setData('item', data)
    // To make it simpler and fully intereoperable, the list parent (ee-table)
    // stores the current moving item in a property
    const table = this.parentElement
    table.moving = this
    requestAnimationFrame(() => {
      this.style.visibility = 'hidden'
      // Show last row drop target
      table.lastDropTarget.style.display = 'block'
    })
    if (this.manipulateDOM) {
      console.log('moving dom')
      table.insertBefore(table.moving, this)
    }
    // All handler hooks are called from the list parent, which must implement them.
    table.handleDragstart(e, table.moving, this)
  }

  handleDragstart (e) {}

  _dragover (e) {
    // preventDefault is necessary to ALLOW custom dragover and dropping handling
    if (!this.header) e.preventDefault()
    this.parentElement.handleDragover(e, this.parentElement.moving, this)
  }

  handleDragover (e) {}

  _dragend (e) {
    // Clear the temporary moving item reference
    this.moving = null
    requestAnimationFrame(() => {
      this.style.visibility = ''
      // Hide last row drop target
      this.parentElement.lastDropTarget.style.display = ''
    })
    if (this.header) e.preventDefault()
    this.parentElement.handleDragend(e, this.parentElement.moving, this)
  }

  handleDragend (e) {}

  _dragenter (e) {
    // preventDefault is necessary to ALLOW custom dragenter handling
    // console.log(this.moving)
    if (!this.header && this !== this.moving) e.preventDefault()
    else return
    console.log(this.parentElement)
    this.parentElement.handleDragenter(e, this.parentElement.moving, this)
  }

  handleDragenter (e) {}

  _dragleave (e) {
    if (this.header) e.preventDefault()
    this.parentElement.handleDragleave(e, this.parentElement.moving, this)
  }

  handleDragleave (e) {}

  _dragexit (e) {
    if (this.header) e.preventDefault()
    this.parentElement.handleDragexit(e, this.parentElement.moving, this)
  }

  handleDragexit (e) {}

  _dragdrop (e) {
    if (this.header) return
    e.preventDefault()
    this.parentElement.handleDragdrop(e, this.parentElement.moving, this)
  }

  handleDragdrop (e) {}

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      <slot @slotchange="${this._slotChanged}"></slot>
      <ee-row id="last-row-drop-target">target for last item</ee-row>
    `
  }

  _slotChanged () {
    this._handleResize()
    this._updateDragDrop()
  }
}
customElements.define('ee-table', EeTable)
