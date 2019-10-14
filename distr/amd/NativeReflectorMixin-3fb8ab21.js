define(['exports', './lit-element-aa931cb5'], function (exports, litElement) { 'use strict';

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
  var NativeReflectorMixin = function NativeReflectorMixin(base) {
    return (
      /*#__PURE__*/
      function (_base) {
        litElement._inherits(Base, _base);

        function Base() {
          litElement._classCallCheck(this, Base);

          return litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(Base).apply(this, arguments));
        }

        litElement._createClass(Base, [{
          key: "firstUpdated",
          // eslint-disable-line
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
          value: function firstUpdated() {
            /* Find the native element */
            this.native = this.shadowRoot.querySelector('#native');
            /* Get the boot property values which may have been set before the element */

            /* had a chance to listen to property changes */

            var bootProperties = this._getBootProperties();

            var bootPropertiesValues = {};
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = bootProperties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var prop = _step.value;

                if (typeof this[prop] !== 'undefined') {
                  bootPropertiesValues[prop] = this[prop];
                }
              }
              /* Reflect all attributes and properties */

              /*  - all properties are reflected except some (listed in skipAttributes) */

              /*  - only elected properties are reflected (listed in reflectProperties) */

            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            this._reflectAttributesAndProperties();
            /* Set the boot properties for the element */


            for (var _i = 0, _Object$keys = Object.keys(bootPropertiesValues); _i < _Object$keys.length; _i++) {
              var _prop = _Object$keys[_i];
              this[_prop] = bootPropertiesValues[_prop];
            }
          } // As mentoned above, boot properties are defined in the element, but
          // users are able to add more by setting the attribute
          // `extra-boot-properties`:

        }, {
          key: "_getBootProperties",
          value: function _getBootProperties() {
            // Assign "boot properties". This is an unfortunate hack that is
            // necessary in order to assign custom properties added *before* the
            // observer was on
            var bootProperties = this.bootProperties;
            /* Users can have attribute `extra-boot-properties` */

            /* to add boot properties */

            var fromAttr = this.getAttribute('extra-boot-properties');

            if (fromAttr && typeof fromAttr === 'string') {
              bootProperties = [].concat(litElement._toConsumableArray(bootProperties), litElement._toConsumableArray(fromAttr.split(' ')));
            }

            return bootProperties;
          } // From https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement

        }, {
          key: "getAttribute",
          value: function getAttribute(attr) {
            if (this.skipAttributes.indexOf(attr) !== -1) {
              return litElement._get(litElement._getPrototypeOf(Base.prototype), "getAttribute", this).call(this, attr);
            }

            var nativeAttribute = this.native.getAttribute(attr);
            if (nativeAttribute !== null) return nativeAttribute; // This shouldn't really happen, but it's here as a fallback
            // TODO: Maybe delete it and always return the native's value regardless

            return litElement._get(litElement._getPrototypeOf(Base.prototype), "getAttribute", this).call(this, attr);
          }
        }, {
          key: "setAttribute",
          value: function setAttribute(attr, value) {
            // Set the attribute
            litElement._get(litElement._getPrototypeOf(Base.prototype), "setAttribute", this).call(this, attr, value); // Skip the ones in the skipAttributes list


            if (this.skipAttributes.indexOf(attr) !== -1) return; // Assign the same attribute to the contained native
            // element, taking care of the 'nn' syntax
            //

            this._setSubAttr(attr, value);
          }
        }, {
          key: "removeAttribute",
          value: function removeAttribute(attr) {
            // Set the attribute
            litElement._get(litElement._getPrototypeOf(Base.prototype), "removeAttribute", this).call(this, attr); // Skip the ones in the skipAttributes list


            if (this.skipAttributes.indexOf(attr) !== -1) return; // Assign the same attribute to the contained native
            // element, taking care of the 'nn' syntax
            //

            this._setSubAttr(attr, null);
          }
        }, {
          key: "_setSubAttr",
          value: function _setSubAttr(subAttr, attrValue) {
            var tokens = subAttr.split('::'); // Safeguard: if this.native is not yet set, it means that
            // an attribute was set BEFORE the element was rendered. If that
            // is the case, simply give up. _reflectAttributesAndProperties() will
            // be run afterwards to sync things up anyway

            if (!this.native) return; // No :: found, simply change attribute in `native`

            if (tokens.length === 1) {
              attrValue === null ? this.native.removeAttribute(subAttr) : this.native.setAttribute(subAttr, attrValue); // Yes, :: is there: assign the attribute to the element with the
              // corresponding ID
            } else if (tokens.length === 2) {
              var dstElement = this.shadowRoot.querySelector("#".concat(tokens[0]));

              if (dstElement) {
                attrValue === null ? dstElement.removeAttribute(tokens[1]) : dstElement.setAttribute(tokens[1], attrValue);
              }
            }
          }
        }, {
          key: "_reflectAttributesAndProperties",
          value: function _reflectAttributesAndProperties() {
            var _this = this;

            var dst = this.native; // STEP #1: ATTRIBUTES FIRST
            // Assign all starting attribute to the destination element

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = this.attributes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var attributeObject = _step2.value;
                var attr = attributeObject.name;
                if (this.skipAttributes.indexOf(attr) !== -1) continue;

                this._setSubAttr(attr, litElement._get(litElement._getPrototypeOf(Base.prototype), "getAttribute", this).call(this, attr));
              } // Observe changes in attribute from the source element, and reflect
              // them to the destination element

            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }

            var thisObserver = new MutationObserver(function (mutations) {
              mutations.forEach(function (mutation) {
                if (mutation.type === 'attributes') {
                  var attr = mutation.attributeName; // Don't reflect forbidden attributes

                  if (_this.skipAttributes.indexOf(attr) !== -1) return; // Don't reflect attributes with ::

                  if (attr.indexOf('::') !== -1) return; // Check if the value has changed. If it hasn't, there is no
                  // point in re-assigning it, especially since the observer
                  // might have been triggered by this very mixin

                  var newValue = _this.native.getAttribute(attr);

                  var thisValue = litElement._get(litElement._getPrototypeOf(Base.prototype), "getAttribute", _this).call(_this, attr);

                  if (newValue === thisValue) return; // Assign the new value

                  newValue === null ? litElement._get(litElement._getPrototypeOf(Base.prototype), "removeAttribute", _this).call(_this, attr) : litElement._get(litElement._getPrototypeOf(Base.prototype), "setAttribute", _this).call(_this, attr, newValue);
                }
              });
            });
            thisObserver.observe(this.native, {
              attributes: true
            }); // STEP #2: METHODS (as bound functions) AND PROPERTIES (as getters/setters)

            var uniqProps = litElement._toConsumableArray(new Set(this.reflectProperties));

            uniqProps.forEach(function (prop) {
              Object.defineProperty(_this, prop, {
                get: function get() {
                  if (typeof dst[prop] === 'function') return dst[prop].bind(dst);else return dst[prop];
                },
                set: function set(newValue) {
                  if (typeof dst[prop] === 'function') return;
                  var oldValue = dst[prop]; // Set the new value

                  dst[prop] = newValue; // This is required by litElement since it won't
                  // create a setter if there is already one

                  this._requestUpdate(prop, oldValue);
                },
                configurable: true,
                enumerable: true
              });
            });
          }
        }, {
          key: "reflectProperties",
          get: function get() {
            return ['accessKey', 'accessKeyLabel', 'contentEditable', 'isContentEditable', 'contextMenu ', 'dataset', 'dir', 'draggable', 'dropzone', 'hidden', 'inert', 'innerText', 'itemScope ', 'itemType', 'itemId ', 'itemRef', 'itemProp', 'itemValue ', 'lang', 'noModule', 'nonce', 'offsetHeight', 'offsetLeft', 'offsetParent', 'offsetTop', 'offsetWidth', 'properties', 'spellcheck', 'style', 'tabIndex', 'title', 'translate', 'attachInternals', 'blur', 'click', 'focus', 'forceSpellCheck'];
          }
        }, {
          key: "skipAttributes",
          get: function get() {
            return ['id', 'style', 'class'];
          }
        }, {
          key: "bootProperties",
          get: function get() {
            return ['value'];
          }
        }]);

        return Base;
      }(base)
    );
  };

  exports.NativeReflectorMixin = NativeReflectorMixin;

});
