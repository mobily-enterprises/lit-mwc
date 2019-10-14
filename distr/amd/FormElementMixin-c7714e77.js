define(['exports', './lit-element-aa931cb5'], function (exports, litElement) { 'use strict';

  function _templateObject2() {
    var data = litElement._taggedTemplateLiteral(["\n        <span class=\"error-message\">\n          ", "\n        </span>\n      "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n\n          span.error-message {\n            color: red;\n          }\n\n          :invalid {\n            background-color: pink;\n            border: var(--nn-input-border-invalid, 1px solid #bb7777);\n          }\n        "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }
  var FormElementMixin = function FormElementMixin(base) {
    return (
      /*#__PURE__*/
      function (_base) {
        litElement._inherits(Base, _base);

        litElement._createClass(Base, [{
          key: "_eventListener",
          // Submit on enter with forms with only one element
          value: function _eventListener(e) {
            if (e.keyCode === 13 && litElement._toConsumableArray(this.form.elements).length === 1) {
              this.form.submit();
            }
          }
        }, {
          key: "connectedCallback",
          value: function connectedCallback() {
            litElement._get(litElement._getPrototypeOf(Base.prototype), "connectedCallback", this).call(this);

            this.assignFormProperty();
            this.addEventListener('keydown', this._boundKeyEventListener);
          }
        }, {
          key: "disconnectedCallback",
          value: function disconnectedCallback() {
            litElement._get(litElement._getPrototypeOf(Base.prototype), "disconnectedCallBack", this).call(this);

            this.removeEventListener('keydown', this._boundKeyEventListener);
          }
        }, {
          key: "reflectProperties",
          get: function get() {
            return litElement._get(litElement._getPrototypeOf(Base.prototype), "reflectProperties", this).filter(function (attr) {
              return attr !== 'checkValidity' && attr !== 'reportValidity' && attr !== 'setCustomValidity';
            });
          }
        }], [{
          key: "properties",
          get: function get() {
            return {
              nativeErrorMessages: {
                type: Boolean,
                attribute: 'native-error-messages'
              },
              shownValidationMessage: {
                type: String,
                attribute: false
              },
              validator: {
                type: Function
              },
              validationMessages: {
                type: Object,
                attribute: 'validition-messages'
              },
              validationMessagePosition: {
                type: String,
                attribute: 'validation-message-position'
              }
            };
          }
        }, {
          key: "styles",
          get: function get() {
            return [litElement._get(litElement._getPrototypeOf(Base), "styles", this) || [], litElement.css(_templateObject())];
          }
        }]);

        function Base() {
          var _this;

          litElement._classCallCheck(this, Base);

          _this = litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(Base).call(this));

          _this.validator = function () {
            return '';
          };

          _this.nativeValidationKeys = ['badInput', 'customError', 'patternMismatch', 'rangeOverflow', 'rangeUnderflow', 'stepMismatch', 'valueMissing', 'tooLong', 'tooShort', 'typeMismatch'];
          _this.validationMessages = {};
          _this.validationMessagePosition = 'before';
          _this._boundKeyEventListener = _this._eventListener.bind(litElement._assertThisInitialized(_this));
          _this._showPrettyError = false;
          return _this;
        }

        litElement._createClass(Base, [{
          key: "assignFormProperty",
          value: function assignFormProperty() {
            if (this.tagName === 'NN-FORM' || this.tagName === 'EN-FORM') return;
            var el = this;

            while ((el = el.parentElement) && el.tagName !== 'FORM' && el.tagName !== 'NN-FORM' && el.tagName !== 'EN-FORM') {} // eslint-disable-line no-empty


            this.form = el;
          }
        }, {
          key: "setCustomValidity",
          value: function setCustomValidity(m) {
            return this.native.setCustomValidity(m);
          }
        }, {
          key: "reportValidity",
          value: function reportValidity() {
            // Run custom validator. Note that custom validator
            // will only ever run on filed without an existing customError.
            // This is because
            if (!this.native.validity.customError) {
              var ownErrorMessage = this.validator();
              if (ownErrorMessage) this.setCustomValidity(ownErrorMessage);
            } // Hide the fancy error message by default


            this.shownValidationMessage = ''; // Run reportValidity which will display the native
            // error messages.
            // Suppress the pretty error messages

            if (this.nativeErrorMessages) {
              this._showPrettyError = false;
              return this.native.reportValidity();
            } else {
              // Since pretty errors will be shown, it will actually
              // return checkValidity() which will not show the
              // error messages
              this._showPrettyError = true;
              return this.native.checkValidity();
            }
          }
        }, {
          key: "checkValidity",
          value: function checkValidity() {
            if (!this.native.validity.customError) {
              var ownErrorMessage = this.validator();
              if (ownErrorMessage) this.setCustomValidity(ownErrorMessage);
            }

            this._showPrettyError = false;
            return this.native.checkValidity();
          }
        }, {
          key: "firstUpdated",
          value: function firstUpdated() {
            var _this2 = this;

            litElement._get(litElement._getPrototypeOf(Base.prototype), "firstUpdated", this).call(this);

            this.native.oninput = function (e) {
              _this2.setCustomValidity('');

              _this2.reportValidity();
            };

            this.native.oninvalid = function (e) {
              // No pretty error to be shown (probably running checkValidity())
              if (!_this2._showPrettyError) return;
              var validity = e.target.validity; // Find which one flag in validity is raised

              var found;
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = _this2.nativeValidationKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var k = _step.value;

                  if (validity[k]) {
                    found = k;
                    break;
                  }
                } // Assign shownValidationMessage
                // Allow translating with specific function

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

              var translator = _this2.validationMessages[found];

              if (translator) {
                _this2.shownValidationMessage = typeof translator === 'function' ? translator(e.target.validationMessage) : translator;
              } else {
                _this2.shownValidationMessage = e.target.validationMessage;
              }
            };
          }
        }, {
          key: "skipAttributes",
          get: function get() {
            return [].concat(litElement._toConsumableArray(litElement._get(litElement._getPrototypeOf(Base.prototype), "skipAttributes", this)), ['form']);
          }
        }, {
          key: "validationMessageTemplate",
          get: function get() {
            return litElement.html(_templateObject2(), this.shownValidationMessage);
          }
        }, {
          key: "ifValidationMessageBefore",
          get: function get() {
            if (this.validationMessagePosition === 'after') return '';
            return this.validationMessageTemplate;
          }
        }, {
          key: "ifValidationMessageAfter",
          get: function get() {
            if (this.validationMessagePosition === 'before') return '';
            return this.validationMessageTemplate;
          }
        }]);

        return Base;
      }(base)
    );
  };

  exports.FormElementMixin = FormElementMixin;

});
