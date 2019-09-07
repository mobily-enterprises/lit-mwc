export const CommonMixin = (base) => {
  return class Base extends base {
    //
    firstUpdated () {
      //
      // Find the native element
      this.native = this.shadowRoot.querySelector('#_native')
      
      // Get the boot property values. These are properties that may
      // have been set before the element was first updated, which is
      // before the element had a chance to listen to property changes
      var bootProperties = this._getBootProperties()
      var bootPropertiesValues = {}
      for (let prop of bootProperties) {
        bootPropertiesValues[prop] = this[prop]
      }

      // Reflect all attributes and properties
      this._reflectAttributesAndProperties()

      // Set the boot properties for the element
      for (let prop of bootProperties) {
        this[prop] = bootPropertiesValues[prop]
      }
    }
    _getBootProperties () {
      // Assign "boot properties". This is an unfortunate hack that is
      // necessary in order to assign custom properties added *before* the
      // observer was on
      var bootProperties = Array.isArray(this.bootProperties) ? this.bootProperties : []

      var fromAttr = typeof this.getAttribute('boot-properties') !== 'string'
        ? []
        : this.getAttribute('boot-properties').split(' ')

      bootProperties = [ ...bootProperties, ...fromAttr ]

      return bootProperties
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
      let tokens = subAttr.split('::')

      // Safeguard: if this.native is not yet set, it means that
      // an attribute was set BEFORE the element was rendered. If that
      // is the case, simply give up. _reflectAttributesAndProperties() will
      // be run afterwards to sync things up anyway
      if (!this.native) return

      // No :: found, simply change attribute in `native`
      if (tokens.length === 1) {
        (attrValue === null)
          ? this.native.removeAttribute(subAttr)
          : this.native.setAttribute(subAttr, attrValue)

      // Yes, :: is there: assign the attribute to the element with the
      // corresponding ID
      } else if (tokens.length === 2) {
        let dstElement = this.shadowRoot.querySelector(`#${tokens[0]}`)
        if (dstElement) {
          attrValue === null
            ? dstElement.removeAttribute(tokens[1])
            : dstElement.setAttribute(tokens[1], attrValue)
        }
      }
    }

    getAttribute (attr) {
      if (this.skipAttributes.indexOf(attr) !== -1) {
        return super.getAttribute(attr)
      }

      let nativeAttribute = this.native.getAttribute(attr)
      if (nativeAttribute !== null) return nativeAttribute

      // This shouldn't really happen, but it's here as a fallback
      // TODO: Maybe delete it and always return the native's value regardless
      return super.getAttribute(attr)
    }

    setAttribute (attr, value) {
      // Set the attribute
      super.setAttribute(attr, value)

      // Skip the ones in the skipAttributes list
      if (this.skipAttributes.indexOf(attr) !== -1) return

      // Assign the same attribute to the contained native
      // element, taking care of the 'nn' syntax
      //
      this._setSubAttr(attr, value)
    }

    removeAttribute (attr) {
      // Set the attribute
      super.removeAttribute(attr)

      // Skip the ones in the skipAttributes list
      if (this.skipAttributes.indexOf(attr) !== -1) return

      // Assign the same attribute to the contained native
      // element, taking care of the 'nn' syntax
      //
      this._setSubAttr(attr, null)
    }

    _reflectAttributesAndProperties () {
      var dst = this.native

      // STEP #1: ATTRIBUTES FIRST

      // Assign all starting attribute to the destination element
      for (let attributeObject of this.attributes) {
        var attr = attributeObject.name

        if (this.skipAttributes.indexOf(attr) !== -1) continue
        this._setSubAttr(attr, super.getAttribute(attr))
      }

      // Observe changes in attribute from the source element, and reflect
      // them to the destination element
      var thisObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes') {
            var attr = mutation.attributeName

            // Don't reflect forbidden attributes
            if (this.skipAttributes.indexOf(attr) !== -1) return

            // Don't reflect attributes with ::
            if (attr.indexOf('::') !== -1) return

            // Check if the value has changed. If it hasn't, there is no
            // point in re-assigning it, especially since the observer
            // might have been triggered by this very mixin
            var newValue = this.native.getAttribute(attr)
            var thisValue = super.getAttribute(attr)
            if (newValue === thisValue) return

            // Assign the new value
            (newValue === null)
              ? super.removeAttribute(attr)
              : super.setAttribute(attr, newValue)
          }
        })
      })
      thisObserver.observe(this.native, { attributes: true })

      // STEP #2: METHODS (as bound functions) AND PROPERTIES (as getters/setters)

      this.reflectProperties.forEach(prop => {
        if (typeof dst[prop] === 'function') {
          this[prop] = dst[prop].bind(dst)
        } else {
          Object.defineProperty(this, prop, {
            get: function () {
              return dst[prop]
            },
            set: function (newValue) {
              let oldValue = dst[prop]

              // Set the new value
              dst[prop] = newValue

              // This is required by litElement since it won't
              // create a setter if there is already one
              this._requestUpdate(prop, oldValue)
            },
            configurable: true,
            enumerable: true
          })
        }
      })
    }
  }
}
