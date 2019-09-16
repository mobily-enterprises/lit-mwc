// NativeReflectorMixin
// ====================
//
// This is the centrepiece of the `nn-`` elements. Every `nn-` element has the
// characteristic of being basically a native element with theming steroids.
// Each `nn-` element has, in its template, a native element marked as
// `id="native"` which identifies the element they represent. For example
// the `Button.js` file will implement `nn-button` element, which in turn will
// have `<button id="native"` in its template.
//
// The approach to `nn-` elements is to reflect as much as possible, in terms
// of properties and attributes, from the `nn-` element down to the `native` one.
//
// This means that the `nn-` element is a "gateway" to properties and attributes
// of the actual native element inside.
//
// For example writing:
//
//     <nn-button label="Some label"></nn-button>
//
// Will imply that the contained `<button>` element (which is marked as
// `native`) also has the `label` attribute set to `Some label`.
//
// The idea is that between `<nn-button>` and `<button>` _everything_ is
// reflected. This is great in theory, but there is a level of trickery
// required to make things work properly. For example some attributes will
// _always_ need to be skipped (`id`, `style`, `class`). Also, it's impossible
// to simply reflect every property, since 1) they could be anywhere in the
// prototype chain 2) Some properties should never be reflected (see:
// `setAttribute()`, `hasChildNodes()`, and so on).
//
// So, the approach is:
//
//  * All attributes are reflected, _except_ some that are blacklisted (in
//    `this.skipAttributes`)
//  * Only properties/methods listed in `this.reflectProperties` are reflected.
//    Each element will provide a comprehensive list of reflected properties, which
//    will depend on the HTML specs of the targeted `native` element.
//  * Some "boot" properties are assigned when the element is first updated.
//
// "Boot properties" are those properties (stressing _proproperties_, not
// _attributes_!) that are meaningful to the element and might be set when
// the element is declared -- and _before_ the element has a chance to run its
// code and therefore listen to property changes. For example:
//
//     <nn-input name="description" .value="${this.info.dbDescription}">
//
// In this case, the _property_ `value` of the input element is set before
// the element is declared. Therefore, `value` must be set as a boot property,
// guaranteeing that the `value` property will be assigned to the targeted
// `native` element.
//
// ## Into the code
//
// First of all, NativeRefletorMixin is declared as a mixing in function:
export const NativeReflectorMixin = (base) => {
  return class Base extends base { // eslint-disable-line

// The firstUpdated method is used to perform one-time work after the element's
// template has been created. In this case, it will need to:
//
// 1) Find the native element (marked with `id="native"`)
// 2) Map the values of the boot properties. At this stage, the property `value`
//    for example might have already been set.
// 3) Start reflection of attributes and properties
// 4) Assign boot properties to the element. NOTE: since reflection has
//    started, assigning `this[prop] = bootPropertiesValues[prop]` will also
//    assign the corresponding property down to the `native` element
//
// Boot properties are stored in `this.bootProperties`. However, users are given
// the option to add last-minute boot properties with the attribute
// `extra-boot-properties`. This is done by `_getBootProperties()`,
// explained shortly.
    firstUpdated () {
      /* Find the native element */
      this.native = this.shadowRoot.querySelector('#native')

      /* Get the boot property values which may have been set before the element */
      /* had a chance to listen to property changes */
      const bootProperties = this._getBootProperties()
      const bootPropertiesValues = {}
      for (const prop of bootProperties) {
        if (typeof this[prop] !== 'undefined') {
          bootPropertiesValues[prop] = this[prop]
        }
      }

      /* Reflect all attributes and properties */
      /*  - all properties are reflected except some (listed in skipAttributes) */
      /*  - only elected properties are reflected (listed in reflectProperties) */
      this._reflectAttributesAndProperties()

      /* Set the boot properties for the element */
      for (const prop of Object.keys(bootPropertiesValues)) {
        this[prop] = bootPropertiesValues[prop]
      }
    }

// As mentoned above, boot properties are defined in the element, but
// users are able to add more by setting the attribute
// `extra-boot-properties`:

    _getBootProperties () {
      // Assign "boot properties". This is an unfortunate hack that is
      // necessary in order to assign custom properties added *before* the
      // observer was on
      let bootProperties = this.bootProperties

      /* Users can have attribute `extra-boot-properties` */
      /* to add boot properties */
      const fromAttr = this.getAttribute('extra-boot-properties')
      if (fromAttr && typeof fromAttr === 'string') {
        bootProperties = [...bootProperties, ...fromAttr.split(' ')]
      }

      return bootProperties
    }

    // From https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
    get reflectProperties () {
      return [
        'accessKey', 'accessKeyLabel', 'contentEditable', 'isContentEditable', 'contextMenu ', 'dataset', 'dir', 'draggable', 'dropzone', 'hidden', 'inert', 'innerText', 'itemScope ', 'itemType', 'itemId ', 'itemRef', 'itemProp', 'itemValue ', 'lang', 'noModule', 'nonce', 'offsetHeight', 'offsetLeft', 'offsetParent', 'offsetTop', 'offsetWidth', 'properties', 'spellcheck', 'style', 'tabIndex', 'title', 'translate', 'attachInternals', 'blur', 'click', 'focus', 'forceSpellCheck'
      ]
    }

    get skipAttributes () {
      return ['id', 'style', 'class']
    }

    get bootProperties () {
      return ['value']
    }

    getAttribute (attr) {
      if (this.skipAttributes.indexOf(attr) !== -1) {
        return super.getAttribute(attr)
      }

      const nativeAttribute = this.native.getAttribute(attr)
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

    _setSubAttr (subAttr, attrValue) {
      const tokens = subAttr.split('::')

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
        const dstElement = this.shadowRoot.querySelector(`#${tokens[0]}`)
        if (dstElement) {
          attrValue === null
            ? dstElement.removeAttribute(tokens[1])
            : dstElement.setAttribute(tokens[1], attrValue)
        }
      }
    }

    _reflectAttributesAndProperties () {
      const dst = this.native

      // STEP #1: ATTRIBUTES FIRST

      // Assign all starting attribute to the destination element
      for (const attributeObject of this.attributes) {
        const attr = attributeObject.name

        if (this.skipAttributes.indexOf(attr) !== -1) continue
        this._setSubAttr(attr, super.getAttribute(attr))
      }

      // Observe changes in attribute from the source element, and reflect
      // them to the destination element
      const thisObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes') {
            const attr = mutation.attributeName

            // Don't reflect forbidden attributes
            if (this.skipAttributes.indexOf(attr) !== -1) return

            // Don't reflect attributes with ::
            if (attr.indexOf('::') !== -1) return

            // Check if the value has changed. If it hasn't, there is no
            // point in re-assigning it, especially since the observer
            // might have been triggered by this very mixin
            const newValue = this.native.getAttribute(attr)
            const thisValue = super.getAttribute(attr)
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

      const uniqProps = [...new Set(this.reflectProperties)]
      uniqProps.forEach(prop => {
        if (typeof dst[prop] === 'function') {
          this[prop] = dst[prop].bind(dst)
        } else {
          Object.defineProperty(this, prop, {
            get: function () {
              return dst[prop]
            },
            set: function (newValue) {
              const oldValue = dst[prop]

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

/*
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement
  button: ['accessKey', 'autofocus', 'disabled', 'form', 'formAction', 'formEnctype', 'formMethod', 'formNoValidate', 'formTarget', 'labels', 'menu ', 'name', 'tabIndex', 'type', 'willValidate', 'validationMessage', 'validity', 'value', 'checkValidity', 'reportValidity', 'setCustomValidity'],

  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement
  form: ['elements', 'length', 'name', 'method', 'target', 'action', 'encoding', 'enctype', 'acceptCharset', 'autocomplete', 'noValidate', 'submit', 'reset', 'checkValidity', 'reportValidity', 'requestAutocomplete'],
  ['elements', 'length', 'name', 'method', 'target', 'action', 'encoding', 'enctype', 'acceptCharset', 'autocomplete', 'noValidate', 'submit', 'reset', 'checkValidity', 'reportValidity', 'requestAutocomplete']

  // From https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
  input: ['form', 'formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget', 'name', 'type', 'disabled', 'autofocus', 'required', 'validity', 'validationMessage', 'willValidate', 'checked', 'defaultChecked', 'indeterminate', 'alt', 'height', 'src', 'width', 'accept', 'allowdirs ', 'files', 'webkitdirectory ', 'webkitEntries ', 'autocomplete', 'max', 'maxLength', 'min', 'minLength', 'pattern', 'placeholder', 'readOnly', 'size', 'selectionStart', 'selectionEnd', 'selectionDirection', 'defaultValue', 'dirName', 'accessKey', 'list', 'multiple', 'files', 'labels', 'step', 'valueAsDate', 'valueAsNumber', 'autocapitalize ', 'inputmode', 'align ', 'useMap ', 'blur', 'click', 'focus', 'select', 'setSelectionRange', 'setRangeText', 'setCustomValidity', 'checkValidity', 'reportValidity', 'stepDown', 'stepUp'],

  // From https://developer.mozilla.org/en-US/docs/Web/API/HTMLMeterElement
  meter: ['high', 'low', 'max', 'min', 'optimum', 'value', 'labels'],

  // From https://developer.mozilla.org/en-US/docs/Web/API/HTMLProgressElement
  progress: ['max', 'position', 'value', 'labels'],

  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement
  select: ['autofocus', 'disabled', 'form', 'labels', 'length', 'multiple', 'name', 'options', 'required', 'selectedIndex', 'selectedOptions', 'size', 'type', 'validationMessage', 'validity', 'value', 'willValidate', 'add', 'blur', 'checkValidity', 'focus', 'item', 'namedItem', 'remove', 'reportValidity', 'setCustomValidity', ''],

  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement
  textarea: ['form', 'type', 'value', 'textLength', 'defaultValue', 'placeholder', 'rows', 'cols', 'autofocus', 'name', 'disabled', 'labels', 'maxLength', 'accessKey', 'readOnly', 'required', 'tabIndex', 'selectionStart', 'selectionEnd', 'selectionDirection', 'validity', 'willValidate', 'validationMessage', 'autocomplete ', 'autocapitalize ', 'inputMode ', 'wrap', 'blur', 'focus', 'select', 'setRangeText', 'setSelectionRange', 'checkValidity', 'reportValidity', 'setCustomValidity']

}

NativeReflectorMixin.defaultBootProperties = ['value']
NativeReflectorMixin.alwaysSkipAttributes = ['id', 'style', 'class']

*/
