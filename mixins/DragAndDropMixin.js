export const DragAndDropMixin = (base) => {
  return class Base extends base {
    static get properties () {
      return {
        dragDrop: {
          type: Boolean,
          attribute: 'drag-drop'
        },
        manipulateDOM: { type: Boolean, attribute: 'manipulate-dom' }
      }
    }

    constructor () {
      super()
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

    firstUpdated () {
      this._updateDragDrop()
      this.lastDropTarget = this.shadowRoot.querySelector('#last-row-drop-target')
      this._activateRowDnD(this.lastDropTarget)
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

     // Sets up all list children (rows) with listeners for Drag and Drop
    _updateDragDrop () {
      const rows = this.shadowRoot.querySelector('slot').assignedElements()
      for (const row of rows) {
        if (this.dragDrop) {
          row.setAttribute('draggable', 'true')
          this._activateRowDnD(row)
        } else {
          row.removeAttribute('draggable')
          this._deactivateRowDnD(row)
        }
      }
    }

    _dragstart (e) {
      console.log(e)
      if (this.header) e.preventDefault()
      e.dataTransfer.effectAllowed = 'move'
      // This is the proper way to 'move' data around while dragging. However, webKit based browsers
      // only make that data accessible on the drop event, so checking anything in dragover is harder.
      // To make it simpler and fully intereoperable, the list parent (ee-table)
      // stores the current moving item in a property
      const table = this.parentElement
      table.moving = this
      requestAnimationFrame(() => {
        this.style.visibility = 'hidden'
        // Show last row drop target
        if (table.manipulateDOM) table.lastDropTarget.style.display = 'block'
      })
      // All handler hooks are called from the list parent, which must implement them.
      table.handleDragstart(e, table.moving)
    }

    handleDragstart (e) {}

    _dragover (e) {
      // preventDefault is necessary to ALLOW custom dragover and dropping handling
      if (!this.header) e.preventDefault()
      const table = this.parentElement
      table.handleDragover(e, table.moving, this)
    }

    handleDragover (e) {}

    _dragenter (e) {
      // preventDefault is necessary to ALLOW custom dragenter handling
      // console.log(this.moving)
      if (!this.header && this !== this.moving) e.preventDefault()
      else return
      const table = this.parentElement
      table.handleDragenter(e, table.moving, this)
    }

    handleDragenter (e) {}

    _dragleave (e) {
      if (this.header) e.preventDefault()
      const table = this.parentElement
      table.handleDragleave(e, table.moving, this)
    }

    handleDragleave (e) {}

    _dragexit (e) {
      if (this.header) e.preventDefault()
      const table = this.parentElement
      table.handleDragexit(e, table.moving, this)
    }

    handleDragexit (e) {}

    _dragend (e) {
      // Clear the temporary moving item reference
      this.moving = null
      const table = this.parentElement
      requestAnimationFrame(() => {
        this.style.visibility = ''
        // Hide last row drop target
        if (table.manipulateDOM) table.lastDropTarget.style.display = ''
      })
      if (this.header) e.preventDefault()
      table.handleDragend(e, table.moving, this)
    }

    handleDragend (e) {}

    _dragdrop (e) {
      if (this.header) return
      e.preventDefault()
      const table = this.parentElement
      table.handleDragdrop(e, table.moving, this)
    }

    handleDragdrop (e) {}
  }
}
