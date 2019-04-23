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

    _reflectAttributesAndProperties() {
      var dst = this.native

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
