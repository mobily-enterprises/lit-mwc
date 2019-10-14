define(['exports', './lit-element-aa931cb5', './StyleableMixin-6ddce7d4', './ThemeableMixin-c1113bda', './NativeReflectorMixin-3fb8ab21'], function (exports, litElement, StyleableMixin, ThemeableMixin, NativeReflectorMixin) { 'use strict';

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n      ", "\n      <form id=\"native\">\n        <slot></slot>\n      </form>\n    "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }
  /* globals customElements */

  var NnForm =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(NnForm, _ThemeableMixin);

    function NnForm() {
      litElement._classCallCheck(this, NnForm);

      return litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(NnForm).apply(this, arguments));
    }

    litElement._createClass(NnForm, [{
      key: "reportValidity",
      value: function reportValidity() {
        // Check validity in form
        var valid = true;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var el = _step.value;

            if (typeof el.reportValidity === 'function') {
              // Native element may have customValidity set
              // by a server response. Clear any existing custom
              // errors and report validity
              el.setCustomValidity('');

              if (!el.reportValidity()) {
                valid = false;
              }
            }
          }
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

        return valid;
      }
    }, {
      key: "checkValidity",
      value: function checkValidity() {
        // Check validity in form
        var valid = true; // if (!this.native.checkValidity()) valid = false

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.elements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var el = _step2.value;

            if (typeof el.checkValidity === 'function') {
              // Native element may have customValidity set
              // by a server response. Clear any existing custom
              // errors and report validity
              el.setCustomValidity('');

              if (!el.checkValidity()) {
                valid = false;
              }
            }
          }
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

        return valid;
      }
    }, {
      key: "setFormElementValue",
      value: function setFormElementValue(elName, value) {
        var _this = this;

        var el = litElement._toConsumableArray(this.elements).find(function (el) {
          if (_this._radioElement(el)) {
            return el.name === elName && el.value === value;
          } else {
            return el.name === elName;
          }
        });

        if (!el) return; // Get the original value

        var valueSource = this._getElementValueSource(el); // CHECKBOXES


        if (this._checkboxElement(el)) {
          el[valueSource] = !!value; // RADIO
          // Radio elements
        } else if (this._radioElement(el)) {
          el[valueSource] = true;

          var others = litElement._toConsumableArray(this.elements).filter(function (e) {
            return el !== e && _this._radioElement(el);
          });

          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = others[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var other = _step3.value;
              other[valueSource] = false;
            } // SELECT
            // Selectable elements (with prop selectedIndex)

          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        } else if (this._selectElement(el)) {
          if (!value) el.selectedIndex = 0;else el[valueSource] = value; // Any other case
        } else {
          el[valueSource] = value;
        }
      }
    }, {
      key: "getFormElementValue",
      value: function getFormElementValue(elName) {
        var _this2 = this;

        var elements = litElement._toConsumableArray(this.elements).filter(function (el) {
          return el.name === elName;
        });

        if (!elements.length) {
          console.error('Trying to set', elName, 'but no such element in form');
          return;
        }

        if (elements.length === 1) {
          var el = elements[0];

          var valueSource = this._getElementValueSource(el);

          if (this._checkboxElement(el)) {
            return el[valueSource] ? el.value ? el.value : 'on' : undefined;
          } else if (this._selectElement(el)) {
            return el[valueSource];
          } else {
            return el[valueSource];
          }
        } else {
          var nonRadio = elements.filter(function (el) {
            return !_this2._radioElement(el);
          });

          if (nonRadio.length) {
            console.error('Duplicate name', elName, 'for non-radio elements');
            return;
          }

          var checked = elements.find(function (el) {
            var valueSource = _this2._getElementValueSource(el);

            return el[valueSource];
          });
          if (checked) return checked.value;else return undefined;
        }
      }
    }, {
      key: "reset",
      value: function reset() {
        if (!this.native) return;
        this.native.reset(); // TODO: Adjust this for radios in a nice sensible way

        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = this.elements[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var el = _step4.value;

            var valueSource = this._getElementValueSource(el);

            if (this._radioElement(el)) {
              el[valueSource] = el.getAttribute(valueSource) !== null;
            } else if (this._checkboxElement(el)) {
              el[valueSource] = el.getAttribute(valueSource) !== null;
            } else {
              el[valueSource] = el.getAttribute(valueSource);
            }
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }
      }
    }, {
      key: "_selectElement",
      value: function _selectElement(el) {
        if (typeof el.selectedIndex !== 'undefined' || el.getAttribute('as-select') !== null) return true;
        return false;
      }
    }, {
      key: "_checkboxElement",
      value: function _checkboxElement(el) {
        if (el.type === 'checkbox') return true;
        if (el.getAttribute('as-checkbox') !== null) return true;
        return false;
      }
    }, {
      key: "_radioElement",
      value: function _radioElement(el) {
        if (el.type === 'radio') return true;
        if (el.getAttribute('as-radio') !== null) return true;
        return false;
      }
    }, {
      key: "_getElementValueSource",
      value: function _getElementValueSource(el) {
        if (el.type === 'checkbox' || el.type === 'radio') return 'checked';
        if (el.getAttribute('value-source')) return el.getAttribute('value-source');
        return 'value';
      }
    }, {
      key: "render",
      value: function render() {
        return litElement.html(_templateObject(), this.customStyle);
      }
    }, {
      key: "reflectProperties",
      get: function get() {
        return [].concat(litElement._toConsumableArray(litElement._get(litElement._getPrototypeOf(NnForm.prototype), "reflectProperties", this)), ['length', 'name', 'method', 'target', 'action', 'encoding', 'enctype', 'acceptCharset', 'autocomplete', 'noValidate', 'requestAutocomplete', 'submit']);
      }
    }, {
      key: "elements",
      get: function get() {
        // A tags (links) can have "name", filter them out
        return litElement._toConsumableArray(this.querySelectorAll('[name]')).filter(function (el) {
          return el.tagName !== 'A';
        });
      }
    }]);

    return NnForm;
  }(ThemeableMixin.ThemeableMixin('nn-form')(StyleableMixin.StyleableMixin(NativeReflectorMixin.NativeReflectorMixin(litElement.LitElement))));
  customElements.define('nn-form', NnForm);

  exports.NnForm = NnForm;

  Object.defineProperty(exports, '__esModule', { value: true });

});
