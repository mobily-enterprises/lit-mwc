// DragAndDropMixin
// ====================
//
// This mixin adds a Drag and Drop API basic implementation to any element.
// The base element (the one to which the Mixin is added) needs to have slotted children,
// for which the mixin will add drag events listeners.
// These capabilities are applied solely to the direct slotted children, and not their children.

// For now, the children also need to abide to a few rules:
//
// 1. It needs CSS to provide the correct visual state as draggable or not:
//
//   /* Drag and Drop Styles */
//   #handle {
//     display: none;
//     max-width: 18px;
//     height: 18px;
//   }
//
//   :host([header]) .handle,
//   :host([header]) ::slotted(.handle) {
//     pointer-events: none;
//     visibility: hidden;
//   }
//
//   :host([draggable]) .handle,
//   :host([draggable]) ::slotted(.handle) {
//     display: block;
//     cursor: move;
//   }
//
// 2. It needs to have a "header" attribute if the first child is used as a table header and will not be draggable
// 3. It needs as "drag-data" attribute and/or "dragData" property if any usable data is necessary for the DnD operation. More on that later.
//
// This is the DragAndDropMixin declaration:
import { css } from 'lit-element'

// These are declared outside the mixin to make sure diffrent instances access the same data
window.moving = null
window.originParent = null
window.targetParent = null
const targetRows = []
window.lastEntered = null

export const DragAndDropMixin = (base) => {
  return class Base extends base {
    // Necessary styles to be added to the litElement based target element:
    static get styles () {
      return [
        super.styles,
        css`
          @-webkit-keyframes fadeIn {
            0%   { opacity: 0; }
            100% { opacity: 1; }
          }
          @-moz-keyframes fadeIn {
            0%   { opacity: 0; }
            100% { opacity: 1; }
          }
          @-o-keyframes fadeIn {
            0%   { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes fadeIn {
            0%   { opacity: 0; }
            100% { opacity: 1; }
          }

          #last-row-drop-target {
            display: none;
            text-align: center;
            /* height: 0; */
            /* visibility: hidden; */
          }

          #last-row-drop-target.show {
            /* height: initial; */
            /* visibility: visible; */
          }

          ::slotted(.moving) {
            /* visibility: hidden; */
            /* height: 0; */
            opacity: 0.2;
          }

          ::slotted(.target) {
            position: relative;
            box-sizing: border-box;
            background-color: white;
            /* margin-top: 40px; */
          }
/*
          ::slotted(.target)::before {
            content: attr(drop-label);
            font-weight: bold;
            color: white;
            text-align: center;
            vertical-align: middle;
            position: absolute;
            top: -100%;
            bottom: 100%;
            left: 0;
            width: 100%;
            background-color: purple;
            /* animation: fadeIn 0.3s ease-in;*/
          } */
        `
      ]
    }

    // These properties are also added to the target element.
    static get properties () {
      return {
      // This boolean property turns DnD funnctionality on an off.
        dragDrop: {
          type: Boolean,
          attribute: 'drag-drop'
        },
        // This flag should be used only in vanilla, static HTML markup. The DOM should NEVER be directly modified in a lit-html based elements.
        manipulateDOM: { type: Boolean, attribute: 'manipulate-dom' },
        // The handle icon can be customized.
        handleIcon: { type: String }
      }
    }

    constructor () {
      super()
      // By default, drag and drop functionality is disabled
      this.dragDrop = false
      // By default, the DOM is not updated while dragging. This needs to be set if it's ok to manipulate the DOM directly
      this.manipulateDOM = false
      // This is the standard icon used as the drag handle in the activated draggable elements
      this.handleIcon = `
         <span><svg class="icon" height="20" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg></span>
      `
      this.addEventListener('enable-dnd', this._enableDnD)
    }


    _enableDnD (e) {
      e.stopPropagation()
      const el = e.srcElement
      const dndHandle = el.querySelector('#dnd-handle')

      // If a DND handle is defined (element with ID dnd-handle), then
      // use THAT as the only option to move elements around
      if (dndHandle) {
        // Hovering the handle will enable dragging the element
        dndHandle.addEventListener('mouseover', () => {
          el.setAttribute('draggable', 'true')
          el.addEventListener('dragstart', this._dragstart, false)
        })
        dndHandle.addEventListener('mouseout', () => {
          el.removeAttribute('draggable')
          el.removeEventListener('dragstart', this._dragstart)
        })
      } else {
        // Hovering the handle will enable dragging the element
        el.addEventListener('mouseover', () => {
          el.setAttribute('draggable', 'true')
          el.addEventListener('dragstart', this._dragstart, false)
        })
        el.addEventListener('mouseout', () => {
          el.removeAttribute('draggable')
          el.removeEventListener('dragstart', this._dragstart)
        })
      }

      // Add event listeners to element
      el.addEventListener('dragover', this._dragover, false)
      el.addEventListener('dragend', this._dragend, false)
      el.addEventListener('dragenter', this._dragenter, false)
      el.addEventListener('dragleave', this._dragleave, false)
      el.addEventListener('dragexit', this._dragexit, false)
      el.addEventListener('drop', this._dragdrop, false)
    }

    // # Drag and Drop Handlers and hooks
    //
    // All the logic used during DnD is defined in these handlers, which are registered as listeners during instantiation.
    // All listeners are private and not supposed to be modified. They call a hook for each type of event.
    // The hooks should be redefined to handle any work that's needed during of in response to the drag event.
    _dragstart (e) {
      window.lastEntered = null
      if (this.header) e.preventDefault()
      // Start out by assuming the user is moving, and that moving is allowed. This can be changed in the hook.
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
      // The proper way to 'move' data around while dragging is to use the dataTransfer interface. However, webKit based browsers
      // only make that data accessible in the drop event, so getting anything in dragenter or dragover is impossible.
      // To make it simpler and fully intereoperable, we store a reference to the parent of the moving item and the item itself
      // in the Mixin's outer scope
      window.originParent = this.parentElement
      window.moving = this
      // Use requestAnimationFrame API to update styles, toa void performance issues
      requestAnimationFrame(() => {
        this.classList.add('moving')
      })
      // All handler hooks are called from the list parent, which must implement them.
      window.originParent.handleDragstart(e, window.moving)
    }

    handleDragstart (e) {}

    _dragenter (e) {
      if (this === window.lastEntered) return
      window.lastEntered = this

      // preventDefault is necessary to ALLOW custom dragenter handling
      e.dataTransfer.dropEffect = 'move'
      if (this.header) return
      e.preventDefault()
      // Like in dragstart with the moving item, we store the target's parent reference for later use
      window.targetParent = this.parentElement

      requestAnimationFrame(() => {
        // The targetRows array might have previous targets in it. Remove the target class from them
        targetRows.forEach(element => {
          element.classList.remove('target')
        })
        // Add target class and push the current target to the targetRows array
        if (this !== window.moving) {
          this.classList.add('target')
          targetRows.push(this)
        }
      })
      window.targetParent.handleDragenter(e, window.moving, this)
    }

    handleDragenter (e) {}

    // dragover, dragleave and dragexit listeners are setup and hooks are available, but no work is done here by default
    _dragover (e) {
      // preventDefault is necessary to ALLOW custom dragover and dropping handling
      if (!this.header) e.preventDefault()
      e.dataTransfer.dropEffect = 'move'

      window.targetParent.handleDragover(e, window.moving, this)
    }

    handleDragover (e) {}

    _dragleave (e) {
      if (this.header) e.preventDefault()

      window.targetParent.handleDragleave(e, window.moving, this)
    }

    handleDragleave (e) {}

    _dragexit (e) {
      if (this.header) e.preventDefault()
      window.targetParent.handleDragexit(e, window.moving, this)
    }

    handleDragexit (e) {}

    _dragend (e) {
      window.lastEntered = null

      if (this.header) e.preventDefault()
      // some niche cases might result in this method running when references are empty. Bail to avoid errors
      if (!window.originParent || !window.targetParent) return

      // This hook needs to be a promise, so references are not cleared before the hook is done
      window.originParent.handleDragend(e, window.moving).then(() => {
        window.targetParent.handleDragend(e, window.moving).then(() => {
          // only clear styles and references if dropEffect is none, which should be set while validating the target in the hooks
          if (e.dataTransfer.dropEffect === 'none') {
            requestAnimationFrame(() => {
              this.classList.remove('moving')
              targetRows.forEach(element => {
                element.classList.remove('target')
              })
              window.moving = null
              window.originParent = null
              window.targetParent = null
            })
          }
        })
      })
    }

    // Default dragend hook defined as asynchronous. This needs to also be the case when redefining it in the the mixed in class
    async handleDragend (e) {
      return true
    }

    _dragdrop (e) {
      console.log('MIXIN', e.dataTransfer.dropEffect)
      if (this.header) return
      e.preventDefault()
      // Like with dragend, the hook needs to return a promise to avoid timing issues.
      window.targetParent.handleDragdrop(e, window.moving, this).then(() => {
        requestAnimationFrame(() => {
          window.moving.classList.remove('moving')
          targetRows.forEach(element => {
            element.classList.remove('target')
          })
          window.moving = null
          window.originParent = null
          window.targetParent = null
        })
      })
    }

    async handleDragdrop (e) {
      return true
    }
  }
}
