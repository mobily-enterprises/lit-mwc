// DraggableElement
// ===============
export const DraggableElementMixin = (base) => {
  return class Base extends base {
    // Necessary styles to be added to the litElement based target element:
    static get styles () {
      return [
        super.styles
      ]
    }

    // These properties are also added to the target element.
    static get properties () {
      return {
        dragData: { type: Object, attribute: 'drag-data' }
      }
    }

    constructor () {
      super()
      this.dragData = {}
    }

    firstUpdated () {
      super.firstUpdated()
      if (this.hasAttribute('enable-dnd')) {
        this.dispatchEvent(new CustomEvent('enable-dnd', { bubbles: true }))
      }
    }
  }
}
