/* eslint-disable indent */
import { LitElement, html, css } from 'lit-element'
import { repeat } from 'lit-html/directives/repeat'

class DndExample extends LitElement {
  static get styles () {
    return css`
      :host {
        display: block;
      }

      ee-table {
        box-sizing: border-box;
        border: 1px solid #999;
        margin: 20px;
        align-self: center;
        max-width: calc(100% - 40px);
      }

      ee-cell + ee-cell {
        border-left: 1px solid #777;
      }

    `
  }

  static get properties () {
    return {
      data: { type: Array }
    }
  }

  constructor () {
    super()
    this.data = []
    this.handleDragStart = this._dragStart.bind(this)
    this.handleDragEnter = this._dragEnter.bind(this)
    this.handleDragEnd = this._dragEnd.bind(this)
    this.handleDragDrop = this._dragDrop.bind(this)
  }

  render () {
    return html`
      <ee-table drag-drop .handleDragstart=${this.handleDragStart} .handleDragenter=${this.handleDragEnter} .handleDragend=${this.handleDragEnd} .handleDragdrop=${this.handleDragDrop}>
        <ee-row header no-drop>
          <ee-cell header>Content</ee-cell>
          <ee-cell header>Content</ee-cell>
          <ee-cell header>Content</ee-cell>
        </ee-row>
        ${repeat(this.data, i => i.id, (item) => {
          return html`
            <ee-row .dragData=${item}>
              <ee-cell> ${item.name}</ee-cell>
              <ee-cell> ${item.name}</ee-cell>
              <ee-cell> ${item.name}</ee-cell>
            </ee-row>
          `
        })}
      </ee-table>
    `
  }

  _dragStart (e, moving) {
    this.__oldData = [...this.data]
    e.dataTransfer.dropEffect = 'move'
  }

  _dragEnter (e, moving, target) {
    // clearTimeout(this.dragTimer)
    // this.dragTimer = setTimeout(() => {
    //   const movingIndex = this.data.findIndex(i => i.id === moving.dragData.id)
    //   const targetIndex = this.data.findIndex(i => i.id === target.dragData.id)
    //   const data = [...this.data]
    //   const movingItemData = data.splice(movingIndex, 1)[0]
    //   data.splice(targetIndex, 0, movingItemData)
    //   this.data = data
    // }, 100)
  }

  async _dragEnd (e, moving, target) {
    console.log('end', e.dataTransfer.dropEffect)
    // if (e.dataTransfer.dropEffect === 'none') this.data = [...this.__oldData]
    // delete this.__oldData
    // return Promise.resolve()
  }

  _dragDrop (e, moving, target) {
    // Make the request to the server in order to actually save the new order
    const data = [...this.data]
    const movingIndex = data.findIndex(i => i.id === moving.dragData.id)
    const movingItemData = data.splice(movingIndex, 1)[0]
    const targetIndex = data.findIndex(i => i.id === target.dragData.id)
    data.splice(targetIndex, 0, movingItemData)
    this.data = data
  }
}

customElements.define('dnd-example', DndExample)
