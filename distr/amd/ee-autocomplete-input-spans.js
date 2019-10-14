define(['./lit-element-aa931cb5', './LabelsMixin-8c5eaa35', './StyleableMixin-6ddce7d4', './ThemeableMixin-c1113bda'], function (litElement, LabelsMixin, StyleableMixin, ThemeableMixin) { 'use strict';

  function _templateObject3() {
    var data = litElement._taggedTemplateLiteral(["\n        :host {\n          display: inline;\n        }\n        :host(:focus) {\n          outline: none;\n        }\n\n        #list > span {\n          position: relative;\n          display: inline-block;\n        }\n\n        #list > span > *:not(button) {\n          position: relative;\n          display: inline-block;\n          padding: 3px 6px;\n          padding-right: 24px;\n          border: 1px solid #ddd;\n          border-radius: 1em;\n          margin: 2px;\n          vertical-align: middle;\n          line-height: 1em;\n        }\n\n        #list > span > *:not(button)[invalid] {\n          background-color: pink;\n          border-color: red;\n        }\n\n        #list > span:active > *:not(button), #list > span:focus > *:not(button), #list > span:hover > *:not(button) {\n          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);\n          background-color: #eee;\n          outline: none;\n        }\n        #list > span:active > *:not(button), #list > span:focus > *:not(button) {\n          border-color: var(--nn-primary-color, #ccc);\n        }\n\n        #list > span button.remove {\n          appearance: none;\n          -moz-appearance: none;\n          -webkit-appearance: none;\n          fill: #999;\n          border: none;\n          padding: 0;\n          display: inline-block;\n          position: absolute;\n          top: 55%;\n          right: 4px;\n          transform: translateY(-50%);\n          background: none;\n          z-index:0;\n        }\n\n        #list > *:focus, #list > span *:active {\n          outline: none;\n        }\n\n        #list > span button.remove svg {\n          z-index: -1;\n        }\n\n        #list > span button.remove:hover {\n          fill: #555;\n        }\n\n        input {\n          box-sizing: border-box;\n          display: inline-block;\n          outline: none;\n          vertical-align: middle;\n          height: 1.5em;\n          border: none;\n          font-size: 0.9em;\n          width: 120px;\n        }\n\n        input:focus, input:hover {\n          outline: none\n        }\n\n        span.error-message {\n          color: red;\n        }\n\n        :invalid {\n          background-color: pink;\n          border: var(--nn-input-border-invalid, 1px solid #bb7777);\n        }\n      "]);

    _templateObject3 = function _templateObject3() {
      return data;
    };

    return data;
  }

  function _templateObject2() {
    var data = litElement._taggedTemplateLiteral(["\n      <span class=\"error-message\">\n        ", "\n      </span>\n    "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n      ", "\n      ", "\n      ", "\n      <div id=\"list\" @click=\"", "\">\n        <input @keydown=\"", "\" @input=\"", "\" rows=\"1\" id=\"ta\" spellcheck=\"false\" autocomplete=\"false\" autocapitalize=\"off\" autocorrect=\"off\" dir=\"ltr\" role=\"combobox\" aria-autocomplete=\"list\">\n      </div>\n      ", "\n      ", "\n      <input id=\"ni\" type=\"hidden\" name=\"", "\">\n    "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  var EeAutocompleteInputSpans =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(EeAutocompleteInputSpans, _ThemeableMixin);

    litElement._createClass(EeAutocompleteInputSpans, null, [{
      key: "properties",
      get: function get() {
        return {
          name: {
            type: String
          },
          valueAs: {
            type: String,
            attribute: 'value-as'
          },
          valueSeparator: {
            type: String,
            attribute: 'value-separator'
          },
          validationMessagePosition: {
            type: String,
            attribute: 'validation-message-position'
          },
          shownValidationMessage: {
            type: String,
            attribute: false
          },
          validity: {
            type: Object,
            attribute: false
          },
          validator: {
            type: Function
          }
        };
      }
    }]);

    function EeAutocompleteInputSpans() {
      var _this;

      litElement._classCallCheck(this, EeAutocompleteInputSpans);

      _this = litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(EeAutocompleteInputSpans).call(this));
      _this.labelForElement = 'ni';
      _this.valueAs = 'text'; // can be text, ids, json

      _this.removeIcon = '<svg class="icon" height="15" viewBox="0 0 24 24" width="15"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>';
      _this.itemElement = '';
      _this.itemElementConfig = {};
      _this.itemElementAttributes = {};
      _this.shownValidationMessage = '';

      _this.validator = function () {
        return '';
      };

      _this.validationMessagePosition = 'before';
      _this.valueSeparator = ',';
      _this.validity = {
        valid: true,
        _customValidationMessage: ''
      };
      return _this;
    }

    litElement._createClass(EeAutocompleteInputSpans, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject(), this.customStyle, this.ifLabelBefore, this.ifValidationMessageBefore, this._listClicked, this._handleKeyEvents, this._inputReceived, this.ifValidationMessageAfter, this.ifLabelAfter, this.name);
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        litElement._get(litElement._getPrototypeOf(EeAutocompleteInputSpans.prototype), "connectedCallback", this).call(this);

        this.addEventListener('click', this.focus);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        litElement._get(litElement._getPrototypeOf(EeAutocompleteInputSpans.prototype), "connectedCallback", this).call(this);

        this.removeEventListener('click', this.focus);
      }
    }, {
      key: "firstUpdated",
      value: function firstUpdated() {
        this._updateNativeInputValue();
      }
    }, {
      key: "focus",
      value: function focus() {
        this.shadowRoot.querySelector('#ta').focus();
      }
    }, {
      key: "_listClicked",
      value: function _listClicked(e) {
        e.stopPropagation();
      }
    }, {
      key: "setCustomValidity",
      value: function setCustomValidity(m) {
        if (m === '') {
          this.validity = {
            valid: true,
            _customValidationMessage: ''
          };
          this.toggleAttribute('valid', true);
          if (m === '') this.shownValidationMessage = '';
        } else {
          this.validity = {
            valid: false,
            customError: true,
            _customValidationMessage: m
          };
          this.toggleAttribute('valid', false);
        }
      }
    }, {
      key: "reportValidity",
      value: function reportValidity() {
        // Run custom validator. Note that custom validator
        // will only ever run on filed without an existing customError.
        // This is because
        if (!this.validity.customError) {
          var ownErrorMessage = this.validator();
          if (ownErrorMessage) this.setCustomValidity(ownErrorMessage);
        } // Hide the error message by default


        this.shownValidationMessage = '';

        if (!this.validity.valid) {
          this.toggleAttribute('valid', false);
          this.shownValidationMessage = this.validity._customValidationMessage;
          this.dispatchEvent(new CustomEvent('invalid', {
            cancelable: true,
            bubbles: false,
            composed: true
          }));
          return false;
        } else {
          this.toggleAttribute('valid', true);
          return true;
        }
      }
    }, {
      key: "checkValidity",
      value: function checkValidity() {
        if (!this.native.validity.customError) {
          var ownErrorMessage = this.validator();
          if (ownErrorMessage) this.setCustomValidity(ownErrorMessage);
        }

        if (!this.validity.valid) {
          this.dispatchEvent(new CustomEvent('invalid', {
            cancelable: true,
            bubbles: false,
            composed: true
          }));
          return false;
        }

        return true;
      }
    }, {
      key: "_pickCurrentValue",

      /* END OF CONSTRAINTS API */
      // Run this when there are no suggestions and the user hits Tab or Enter in #ta
      // This will run pickElement with a STRING, which will get the element to
      // work out a data structure based on the string
      value: function _pickCurrentValue() {
        if (this.valueAs === 'text') {
          this.pickedElement(this.shadowRoot.querySelector('#ta').value, true);
        }
      }
    }, {
      key: "_askToRemove",
      value: function _askToRemove(e) {
        var target = e.currentTarget;

        this._removeItem(target.parentElement.parentElement);
      }
    }, {
      key: "_updateNativeInputValue",
      value: function _updateNativeInputValue() {
        var ni = this.shadowRoot.querySelector('#ni');
        ni.value = this.value;
      }
    }, {
      key: "_removeItem",
      value: function _removeItem(target) {
        // Focus previous item before deleting target. If it's the first/only, select the input
        var previous = target.previousElementSibling || target.nextElementSibling;
        previous.focus();
        target.remove();

        this._updateNativeInputValue(); // Rerun validator


        this.setCustomValidity('');
        this.reportValidity();
      }
    }, {
      key: "_createRemoveBtn",
      value: function _createRemoveBtn() {
        var el = document.createElement('button');
        el.innerHTML = this.removeIcon;
        el.onclick = this._askToRemove.bind(this);
        el.classList.add('remove');
        return el;
      }
    }, {
      key: "_handleKeyEvents",
      value: function _handleKeyEvents(e) {
        var target = e.currentTarget;

        switch (e.key) {
          case 'ArrowLeft':
            if (target.previousElementSibling) {
              e.preventDefault();
              target.previousElementSibling.focus();
            }

            break;

          case 'ArrowRight':
            if (target.id !== 'ta') {
              e.preventDefault();
              target.nextElementSibling ? target.nextElementSibling.focus() : target.parentElement.firstElementChild.focus();
            }

            break;

          case 'ArrowDown':
            if (this.parentElement.suggestions.length) {
              e.preventDefault();
              this.parentElement.focusNext();
            }

            break;

          case 'Backspace':
          case 'Delete':
            if (target.id === 'ta' && target.parentElement.children.length > 1 && !target.value) {
              this._removeItem(target.previousElementSibling);
            } else if (target.id !== 'ta') {
              this._removeItem(target);
            }

            break;

          case 'Tab':
          case 'Enter':
            if (!this.autocompleteValue) break;

            if (!this.parentElement.suggestions.length) {
              e.preventDefault();

              this._pickCurrentValue();
            } else {
              e.preventDefault();
              this.parentElement.pickFirst();
            }

        }
      }
      /* API */

    }, {
      key: "pickedElement",
      value: function pickedElement(data) {
        var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var skipValidation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var parentEl = document.createElement(this.itemElement);
        var el = new parentEl.constructor.PickedElement();
        el.config = litElement._objectSpread2({}, el.config, {}, this.itemElementConfig);

        for (var _i = 0, _Object$keys = Object.keys(this.itemElementAttributes); _i < _Object$keys.length; _i++) {
          var k = _Object$keys[_i];
          el.setAttribute(k, this.itemElementAttributes[k]);
        } // Convert string into data if necessary


        if (typeof data === 'string') {
          if (!data.length) return;
          data = parentEl.stringToData(data);

          if (!data.valid) {
            el.toggleAttribute('invalid', true);
            if (!force) return;
          }
        }

        el.data = data;
        var list = this.shadowRoot.querySelector('#list');
        var span = document.createElement('span'); // -1 means that it will not in the list of tabs, but
        // it will be focusable (spans aren't by default)

        span.setAttribute('tabindex', -1);
        var ta = this.shadowRoot.querySelector('#ta');

        var removeBtn = this._createRemoveBtn();

        span.onkeydown = this._handleKeyEvents.bind(this); // Span will be not in the list of tabs
        // Necessary since this is a button and it IS
        // in tab list by default

        removeBtn.setAttribute('tabindex', -1);
        span.appendChild(el);
        el.appendChild(removeBtn);
        list.insertBefore(span, ta);
        ta.value = '';

        this._updateNativeInputValue(); // Rerun validator


        if (!skipValidation) {
          this.setCustomValidity('');
          this.reportValidity();
        }
      }
    }, {
      key: "setPickedElement",
      value: function setPickedElement(itemElement, itemElementConfig, itemElementAttributes) {
        this.itemElement = itemElement;
        this.itemElementConfig = itemElementConfig;
        this.itemElementAttributes = itemElementAttributes;
      }
    }, {
      key: "value",
      get: function get() {
        var r;
        var list;

        switch (this.valueAs) {
          case 'json':
            r = {};
            list = this.shadowRoot.querySelector('#list');
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = list.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var span = _step.value;
                if (span.id === 'ta') continue;
                var idValue = span.firstChild.idValue;
                r[idValue] = span.firstChild.data;
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

            return r;

          default:
            r = [];
            list = this.shadowRoot.querySelector('#list');
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = list.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _span = _step2.value;
                if (_span.id === 'ta') continue;

                if (this.valueAs === 'text') {
                  // Won't push invalid spans to the final value
                  if (_span.getAttribute('invalid') === null) r.push(_span.firstChild.textValue);
                } else {
                  r.push(_span.firstChild.idValue);
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

            return r.join(this.valueSeparator);
        }
      },
      set: function set(v) {
        var list = this.shadowRoot.querySelector('#list'); // Remove all children

        while (list.firstChild) {
          if (list.firstChild.id === 'ta') break;
          list.removeChild(list.firstChild);
        } // Assign all children using pickedElement


        if (Array.isArray(v)) {
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = v[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var o = _step3.value;
              this.pickedElement(o, false, true);
            }
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
        } else if (litElement._typeof(v) === 'object' && v !== null) {
          for (var _i2 = 0, _Object$keys2 = Object.keys(v); _i2 < _Object$keys2.length; _i2++) {
            var k = _Object$keys2[_i2];
            var $o = v[k];
            this.pickedElement($o, false, true);
          }
        } else if (typeof v === 'string') {
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = v.split(this.valueSeparator)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var s = _step4.value;
              this.pickedElement(s, false, true);
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
        } // Sets the native input


        this._updateNativeInputValue(); // Rerun validator


        this.setCustomValidity('');
        this.reportValidity();
      }
    }, {
      key: "validationMessage",
      get: function get() {
        return this.validity._customValidationMessage;
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
    }, {
      key: "validationMessageTemplate",
      get: function get() {
        return litElement.html(_templateObject2(), this.shownValidationMessage);
      }
    }, {
      key: "autocompleteValue",
      get: function get() {
        var ta = this.shadowRoot.querySelector('#ta');
        if (ta) return ta.value;
        return '';
      }
    }, {
      key: "multiInputApi",
      get: function get() {
        return true;
      }
    }, {
      key: "textInputValue",
      get: function get() {
        var targetElementTextArea = this.shadowRoot.querySelector('#ta');
        return targetElementTextArea ? targetElementTextArea.value : '';
      }
    }], [{
      key: "styles",
      get: function get() {
        return [litElement._get(litElement._getPrototypeOf(EeAutocompleteInputSpans), "styles", this) || [], litElement.css(_templateObject3())];
      }
    }]);

    return EeAutocompleteInputSpans;
  }(ThemeableMixin.ThemeableMixin('ee-autocomplete-input-spans')(LabelsMixin.LabelsMixin(StyleableMixin.StyleableMixin(litElement.LitElement))));

  window.customElements.define('ee-autocomplete-input-spans', EeAutocompleteInputSpans);

});
