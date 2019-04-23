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
          attr = attr.name
          if (attr !== 'id' && noMap.indexOf(attr) === -1) dst.setAttribute(attr, this.getAttribute(attr))
        }

        // Observe changes in attribute from the source element, and reflect
        // them to the destination element
        var observer = new MutationObserver( (mutations) =>  {
          mutations.forEach((mutation) => {
            if (mutation.type == "attributes") {
              var attr = mutation.attributeName
              dst.setAttribute(attr, this.getAttribute(attr))
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
