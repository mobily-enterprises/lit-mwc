export const CommonMixin = (base) => {
  return class Base extends base {

    constructor() {
      super()
      debugger
      this._reflectAttributesAndProperties(this.noReflectionList)
    }

    get notReflectedAttributes() {
      return []
    }

    get reflectedProperties() {
      return []
    }

    _reflectAttributesAndProperties(noMap = []) {
      this.updateComplete.then(() => {
        var dst = this.shadowRoot.querySelector('#_el')

        // ATTRIBUTES FIRST

        // Assign all starting attributes to the destination element
        for (let attr of this.attributes) {
          let nativeAttr
          nativeAttr = attr.name.split('native:')[1]
          if (nativeAttr) dst.setAttribute(nativeAttr, this.getAttribute(attr.name))
        }

        // Observe changes in attribute from the source element, and reflect
        // them to the destination element
        var observer = new MutationObserver( (mutations) =>  {
          mutations.forEach((mutation) => {
            if (mutation.type == "attributes") {
              let nativeAttr
              nativeAttr = mutation.attributeName.split('native:')[1]

              if (nativeAttr) dst.setAttribute(nativeAttr, this.getAttribute(mutation.attributeName))
            }
          });
        });
        observer.observe(this, { attributes: true })

        // PROPERTIES
        for (var prop of this.reflectedProperties) {
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
