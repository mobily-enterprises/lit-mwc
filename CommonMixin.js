export const CommonMixin = (base) => {
  return class Base extends base {

    firstUpdated () {
      this.native = this.shadowRoot.querySelector('#_el')
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
    get reflectedProperties() {
      return []
    }

    get reflectedAttributes() {
      return []
    }
    _reflectAttributesAndProperties() {
      var dst = this.native

      // ATTRIBUTES FIRST

      // Assign all starting native: to the destination element
      for (let attributeObject of this.attributes) {
        var attr = attributeObject.name
        let nativeAttr = attr.split('native:')[1]
        if (nativeAttr) dst.setAttribute(nativeAttr, this.getAttribute(attr))
        else {
          if (this.reflectedAttributes.indexOf(attr) !== -1) {
            dst.setAttribute(attr, this.getAttribute(attr))
          }
        }
      }

      // Observe changes in attribute from the source element, and reflect
      // them to the destination element
      var observer = new MutationObserver( (mutations) =>  {
        mutations.forEach((mutation) => {
          if (mutation.type == "attributes") {

            // Look for native: attributes
            // If not there, set the attrivute if in the list of
            // reflected ones
            var attr = mutation.attributeName
            let nativeAttr = attr.split('native:')[1]
            if (nativeAttr) dst.setAttribute(nativeAttr, this.getAttribute(attr))
            else {
              let attr = mutation.attributeName
              if (this.reflectedAttributes.indexOf(attr) !== -1) {
                dst.setAttribute(attr, this.getAttribute(attr))
              }
            }
          }
        });
      });
      observer.observe(this, { attributes: true })

      // METHODS (as bound functions) AND PROPERTIES (as getters/setters)
      this.reflectedProperties.forEach( prop => {
        if (typeof dst[prop] === 'function') {
          this[prop] = dst[prop].bind(dst)
        } else {
          Object.defineProperty (this, prop, {
            get: function () {
              return dst[prop];
            },
            set: function (newValue) {
              dst[prop] = newValue;
            }
          });
        }
      })
    }
  }
}
