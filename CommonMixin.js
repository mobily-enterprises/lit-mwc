import { skipAttributes } from './common.js'

export const CommonMixin = (base) => {
  return class Base extends base {
    firstUpdated () {
      this.native = this.shadowRoot.querySelector('#_native')
      this._reflectAttributesAndProperties()
    }

    connectedCallback () {
      super.connectedCallback()
      this.assignFormProperty()
    }

    assignFormProperty () {
      if (this.tagName === 'NN-FORM') return
      var el = this
      while ((el = el.parentElement) && (el.tagName !== 'FORM' && el.tagName !== 'NN-FORM')) {}
      this.form = el
    }

    get reflectProperties () {
      return []
    }

    get skipAttributes () {
      return []
    }

    _setSubAttr (subAttr, attrValue) {
      let tokens = subAttr.split(':')
      if (tokens.length === 1) {
        this.native.setAttribute(subAttr, attrValue)
      } else if (tokens.length === 2) {
        let dstElement = this.shadowRoot.querySelector(`#${tokens[0]}`)
        if (dstElement) dstElement.setAttribute(tokens[1], attrValue)
      }
    }

    getAttribute (attr) {
      let na = [...this.skipAttributes, skipAttributes]
      if (na.indexOf(attr) !== -1) {
        return super.getAttribute(attr)
      }

      let nativeAttribute = this.native.getAttribute(attr)
      if (nativeAttribute !== null) return nativeAttribute

      return super.getAttribute(attr)
    }

    _reflectAttributesAndProperties () {
      var dst = this.native

      let na = [...this.skipAttributes, skipAttributes]

      // ATTRIBUTES FIRST

      // Assign all starting nn- to the destination element
      for (let attributeObject of this.attributes) {
        var attr = attributeObject.name
        let subAttr = attr.split('nn:')[1]
        if (subAttr) this._setSubAttr(subAttr, super.getAttribute(attr))
        else {
          // if (this.reflectedAttributes.indexOf(attr) !== -1) {
          if (na.indexOf(attr) === -1) {
            // Assign new value. NOTE: if the main element's attribute
            // comes back as null, it will remove it instead
            var newValue = super.getAttribute(attr)
            dst.setAttribute(attr, newValue)
          }
        }
      }

      // Observe changes in attribute from the source element, and reflect
      // them to the destination element
      var thisObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes') {
            // Look for nn: attributes
            // If not there, set the attrivute if in the list of
            // reflected ones
            var attr = mutation.attributeName
            let subAttr = attr.split('nn:')[1]
            if (subAttr) this._setSubAttr(subAttr, super.getAttribute(attr))
            else {
              let attr = mutation.attributeName
              // if (this.reflectedAttributes.indexOf(attr) !== -1) {
              if (na.indexOf(attr) === -1) {
                // Assign new value. NOTE: if the main element's attribute
                // comes back as null, it will remove it instead
                var newValue = super.getAttribute(attr)
                if (newValue === null) {
                  dst.removeAttribute(attr)
                } else {
                  dst.setAttribute(attr, newValue)
                }
              }
            }
          }
        })
      })
      thisObserver.observe(this, { attributes: true })

      // METHODS (as bound functions) AND PROPERTIES (as getters/setters)
      this.reflectProperties.forEach(prop => {
        if (typeof dst[prop] === 'function') {
          this[prop] = dst[prop].bind(dst)
        } else {
          Object.defineProperty(this, prop, {
            get: function () {
              return dst[prop]
            },
            set: function (newValue) {
              dst[prop] = newValue
            }
          })
        }
      })
    }
  }
}
