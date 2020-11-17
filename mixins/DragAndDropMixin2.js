export const DragAndDropMixin = (base) => {
  return class Base extends base {
    static get properties () {
      return {
        dragDrop: {
          type: Boolean,
          attribute: 'drag-drop'
        }
      }
    }

    constructor () {
      super()
      this.dragDrop = false
      this._boundDragstart = this._dragstart.bind(this)
      this._boundDragover = this._dragover.bind(this)
      this._boundDragend = this._dragend.bind(this)
      this._boundDragenter = this._dragenter.bind(this)
      this._boundDragleave = this._dragleave.bind(this)
      this._boundDragexit = this._dragexit.bind(this)
      this._boundDragdrop = this._dragdrop.bind(this)
    }

    // Sets up all list children (rows) with listeners for Drag and Drop
    _updateDragDrop () {
      const rows = this.shadowRoot.querySelector('slot').assignedElements()
      for (const row of rows) {
        console.log(row)
        if (this.dragDrop) {
          row.setAttribute('draggable', 'true')
          row.addEventListener('dragstart', this._dragstart, false)
          row.addEventListener('dragover', this._dragover, false)
          row.addEventListener('dragend', this._dragend, false)
          row.addEventListener('dragenter', this._dragenter, false)
          row.addEventListener('dragleave', this._dragleave, false)
          row.addEventListener('dragexit', this._dragexit, false)
          row.addEventListener('drop', this._dragdrop, false)
        } else {
          row.removeAttribute('draggable')
          row.removeEventListener('dragstart', this._dragstart)
          row.removeEventListener('dragover', this._dragover)
          row.removeEventListener('dragend', this._dragend)
          row.removeEventListener('dragenter', this._dragenter)
          row.removeEventListener('dragleave', this._dragleave)
          row.removeEventListener('dragexit', this._dragexit)
          row.removeEventListener('drop', this._dragdrop)
        }
      }
    }

    firstUpdated () {
      super.firstUpdated()
      this._updateDragDrop()
    }

    _slotChanged () {
      super.slotChanged()
      this._updateDragDrop()
    }

    _dragstart (e) {
      if (e.target.header) e.preventDefault()
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
      //  This is the proper way to 'move' data around while dragging. However, webKit based browsers
      //  only make that data accessible on the drop event, so checking anything in dragover is harder.
      const data = JSON.stringify(this.dragData)
      e.dataTransfer.setData('item', data)
      // To make it simpler and fully intereoperable, the list parent (ul, ee-table, etc), which has
      // the applied DragAndDropMixin, stores the current moving item in a property
      this.parentElement.moving = this
      requestAnimationFrame(() => { this.style.visibility = 'hidden' })
      // All handler hooks are called from the list parent, which must implement them.
      this.parentElement.handleDragstart(e, this.parentElement.moving, this)
    }

    handleDragstart (e) {}

    _dragover (e) {
      // preventDefault is necessary to ALLOW custom dragover and dropping handling
      if (!this.header) e.preventDefault()
      this.parentElement.handleDragover(e, this.parentElement.moving, this)
    }

    handleDragover (e) {}

    _dragend (e) {
      this.moving = null
      requestAnimationFrame(() => { this.style.visibility = '' })
      if (this.header) e.preventDefault()
      this.parentElement.handleDragend(e, this.parentElement.moving, this)
    }

    handleDragend (e) {}

    _dragenter (e) {
      // preventDefault is necessary to ALLOW custom dragenter handling
      // console.log(this.moving)
      if (!this.header && this !== this.moving) e.preventDefault()
      else return
      const data = this.movingData
      console.log(data)

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
  }
}
