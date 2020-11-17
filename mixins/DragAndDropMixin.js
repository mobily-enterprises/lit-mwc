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
    }
  }
}
