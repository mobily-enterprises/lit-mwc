export const CommonMixin = (base) => {
  return class Base extends base {

    constructor() {
      super()
      this.updateComplete.then(() => {
        this.native = this.shadowRoot.querySelector('#_el')
        this._reflectAttributesAndProperties()
      })
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
      for (let attr of this.attributes) {
        let nativeAttr = attr.name.split('native:')[1]
        if (nativeAttr) dst.setAttribute(nativeAttr, this.getAttribute(attr.name))
        else {
          if (this.reflectedAttributes[attr]) {
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
              if (this.reflectedAttributes[attr]) {
                dst.setAttribute(attr, this.getAttribute(attr))
              }
            }
          }
        });
      });
      observer.observe(this, { attributes: true })

      // PROPERTIES
      this.reflectedProperties.forEach( prop => {
        Object.defineProperty (this, prop, {
          get: function () {
            debugger
             return dst[prop];
          },
          set: function (newValue) {
            debugger
             dst[prop] = newValue;
          }
        });
      })
    }
  }
}
