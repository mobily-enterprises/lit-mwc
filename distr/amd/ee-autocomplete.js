define(['exports', './lit-element-aa931cb5', './StyleableMixin-6ddce7d4', './ThemeableMixin-c1113bda', './ee-autocomplete-item-li'], function (exports, litElement, StyleableMixin, ThemeableMixin, eeAutocompleteItemLi) { 'use strict';

  function _templateObject2() {
    var data = litElement._taggedTemplateLiteral(["\n      <slot></slot>\n      <div @click=\"", "\" id=\"suggestions\" @keydown=", "></div>\n    "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n        :host {\n          display: block;\n          position: relative;\n        }\n\n        #suggestions {\n          box-sizing: border-box;\n          background-color: white;\n          position: absolute;\n          z-index: 1000;\n          max-height: 480px;\n          overflow-y: scroll;\n          top: 90%;\n          box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.2), 0 0 2px 2px rgba(0, 0, 0, 0.05);\n        }\n\n        #suggestions[populated] {\n          width: 100%;\n          padding: 10px;\n        }\n\n        #suggestions > *[selected], #suggestions > *:focus, #suggestions > *:hover  {\n          background-color: #eee;\n        }\n\n        [hidden] {\n          display: none !important;\n        }\n      "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }
  var EeAutocomplete =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(EeAutocomplete, _ThemeableMixin);

    litElement._createClass(EeAutocomplete, null, [{
      key: "styles",
      get: function get() {
        return [litElement._get(litElement._getPrototypeOf(EeAutocomplete), "styles", this) || [], litElement.css(_templateObject())];
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          url: {
            type: String
          },
          informational: {
            type: Boolean
          },
          target: {
            type: String
          },
          targetForId: {
            type: String,
            attribute: 'target-for-id'
          },
          picked: {
            type: Boolean,
            reflect: true
          },
          suggestions: {
            type: Array,
            attribute: false
          },
          itemElement: {
            type: String,
            attribute: 'item-element'
          },
          itemElementConfig: {
            type: Object,
            attribute: 'item-element-config'
          },
          itemElementAttributes: {
            type: Object,
            attribute: 'item-element-attributes'
          }
        };
      }
    }]);

    function EeAutocomplete() {
      var _this;

      litElement._classCallCheck(this, EeAutocomplete);

      _this = litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(EeAutocomplete).call(this));
      _this.url = '';
      _this.target = null;
      _this.targetForId = null;
      _this.suggestions = [];
      _this.itemElement = 'ee-autocomplete-item-li';
      _this.itemElementConfig = {};
      _this.itemElementAttributes = {};
      _this._boundInputEvent = _this._inputEvent.bind(litElement._assertThisInitialized(_this));
      _this._boundKeydownEvent = _this._keydownEvent.bind(litElement._assertThisInitialized(_this));
      return _this;
    } // If if's not set, return the first child
    // If it's set:
    //   If it's a string, return the #element
    //   If it's an object, return it directly (assumption that it's an element)


    litElement._createClass(EeAutocomplete, [{
      key: "_findTarget",
      value: function _findTarget(target) {
        if (target !== null) {
          if (typeof target === 'string') return this.querySelector("#".concat(target));else if (litElement._typeof(target) === 'object') return target;
        } else {
          return this.children[0];
        }

        return null;
      } // If if's not set, don't do anything
      // If it's set:
      //   If it's an empty string, look for the first [name] element without no-submit,
      //   If it's a string, return the #element
      //   If it's an object, return it  directly (assumption that it's an element)

    }, {
      key: "_findTargetForId",
      value: function _findTargetForId(target) {
        if (target !== 'null') {
          if (typeof target === 'string') {
            return target === '' ? this.querySelector('[name]:not([no-submit])') : this.querySelector("#".concat(target));
          } else if (litElement._typeof(target) === 'object') return target;
        }

        return null;
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        litElement._get(litElement._getPrototypeOf(EeAutocomplete.prototype), "connectedCallback", this).call(this);

        this.targetElement = this._findTarget(this.target);
        this.targetForId = this._findTargetForId(this.targetForId);
        console.log('Target element:', this.targetElement);
        console.log('Target for ID element:', this.targetForId);

        if (!this.targetElement) {
          console.error('Target element not found');
          return;
        }

        this.targetElement.addEventListener('input', this._boundInputEvent);
        this.targetElement.addEventListener('keydown', this._boundKeydownEvent); // API USE: If the target input element implements multiInputApi,
        // then set the basic parameters for all
        // picked items (element name, config and attributes)

        if (this.targetElement.multiInputApi) {
          this.targetElement.setPickedElement(this.itemElement, this.itemElementConfig, this.itemElementAttributes);
        }
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        if (!this.targetElement) return;
        this.targetElement.removeEventListener('input', this._boundInputEvent);
        this.targetElement.removeEventListener('keydown', this._boundKeydownEvent);
      }
    }, {
      key: "render",
      value: function render() {
        return litElement.html(_templateObject2(), this._picked, this._handleKeyEvents);
      }
    }, {
      key: "_keydownEvent",
      value: function _keydownEvent(e) {
        switch (e.key) {
          case 'Escape':
            this._dismissSuggestions();

            break;
        }
      }
    }, {
      key: "pickFirst",
      value: function pickFirst() {
        var suggestionsDiv = this.shadowRoot.querySelector('#suggestions');
        suggestionsDiv.querySelector('[selected]').click();
      }
    }, {
      key: "focusNext",
      value: function focusNext() {
        if (!this.suggestions.length) return;
        var suggestionsDiv = this.shadowRoot.querySelector('#suggestions');
        var selected = suggestionsDiv.querySelector('[selected]') || suggestionsDiv.firstElementChild;

        if (this.suggestions.length > 1) {
          selected.toggleAttribute('selected', false);
          selected = selected.nextElementSibling || selected.previousElementSibling;
        }

        if (selected) selected.focus();
      }
    }, {
      key: "_picked",
      value: function _picked(e) {
        if (this.informational || !this.targetElement) return;

        if (this.targetElement.multiInputApi) {
          this.targetElement.pickedElement(e.target.data);
        } else {
          this.targetElement.value = e.target.textValue;

          if (this.targetForId) {
            this.targetForId.value = e.target.idValue;
            this.picked = true;
          }
        }

        this._dismissSuggestions();

        this.targetElement.focus();
      }
    }, {
      key: "updated",
      value: function () {
        var _updated = litElement._asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(cp) {
          var suggestionsDiv, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, suggestion, el, _i, _Object$keys, k, firstOption, textValue, oldValue;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (cp.has('suggestions')) {
                    _context.next = 2;
                    break;
                  }

                  return _context.abrupt("return");

                case 2:
                  suggestionsDiv = this.shadowRoot.querySelector('#suggestions');

                  while (suggestionsDiv.firstChild) {
                    suggestionsDiv.removeChild(suggestionsDiv.firstChild);
                  }

                  if (!this._autocompleteInFlight) {
                    _context.next = 6;
                    break;
                  }

                  return _context.abrupt("return");

                case 6:
                  if (!this.targetElement.multiInputApi) {
                    _context.next = 10;
                    break;
                  }

                  if (!(this.targetElement.textInputValue === '')) {
                    _context.next = 10;
                    break;
                  }

                  suggestionsDiv.toggleAttribute('populated', false);
                  return _context.abrupt("return");

                case 10:
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  _context.prev = 13;

                  for (_iterator = this.suggestions[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    suggestion = _step.value;
                    el = document.createElement(this.itemElement);
                    el.config = litElement._objectSpread2({}, el.config, {}, this.itemElementConfig);

                    for (_i = 0, _Object$keys = Object.keys(this.itemElementAttributes); _i < _Object$keys.length; _i++) {
                      k = _Object$keys[_i];
                      el.setAttribute(k, this.itemElementAttributes[k]);
                    }

                    el.data = suggestion;
                    el.onkeydown = this._handleKeyEvents.bind(this); // Make span focusable AND in the tab list

                    el.setAttribute('tabindex', 0);
                    suggestionsDiv.appendChild(el);
                  } // Only 1 response and it's a plain text input? Autocomplete if text fully matches
                  // beginning of the only result


                  _context.next = 21;
                  break;

                case 17:
                  _context.prev = 17;
                  _context.t0 = _context["catch"](13);
                  _didIteratorError = true;
                  _iteratorError = _context.t0;

                case 21:
                  _context.prev = 21;
                  _context.prev = 22;

                  if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                  }

                case 24:
                  _context.prev = 24;

                  if (!_didIteratorError) {
                    _context.next = 27;
                    break;
                  }

                  throw _iteratorError;

                case 27:
                  return _context.finish(24);

                case 28:
                  return _context.finish(21);

                case 29:
                  if (this.suggestions.length === 1 && !this.targetElement.multiInputApi && typeof this.targetElement.setSelectionRange === 'function') {
                    firstOption = suggestionsDiv.firstChild;
                    textValue = firstOption.textValue;

                    if (textValue.toUpperCase().startsWith(this.targetElement.value.toUpperCase())) {
                      oldValue = this.targetElement.value;
                      this.targetElement.value = textValue;
                      this.targetElement.setSelectionRange(oldValue.length, textValue.length);

                      if (this.targetForId) {
                        this.targetForId.value = firstOption.idValue;
                        this.picked = true;
                      }
                    }
                  }

                  if (!this.suggestions.length) {
                    suggestionsDiv.toggleAttribute('populated', false);
                  }

                  if (this.suggestions.length) {
                    suggestionsDiv.toggleAttribute('populated', true);
                    suggestionsDiv.firstChild.toggleAttribute('selected', true);
                  }

                case 32:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[13, 17, 21, 29], [22,, 24, 28]]);
        }));

        function updated(_x) {
          return _updated.apply(this, arguments);
        }

        return updated;
      }()
    }, {
      key: "_dismissSuggestions",
      value: function _dismissSuggestions() {
        var suggestionsDiv = this.shadowRoot.querySelector('#suggestions');
        suggestionsDiv.toggleAttribute('populated', false);
        this.suggestions = [];
      }
    }, {
      key: "_handleKeyEvents",
      value: function _handleKeyEvents(e) {
        var target = e.currentTarget;
        if (!this.suggestions.length || !target.parentElement) return;

        switch (e.key) {
          case 'ArrowUp':
            e.preventDefault();
            target.previousElementSibling ? target.previousElementSibling.focus() : target.parentElement.lastElementChild.focus();
            break;

          case 'ArrowDown':
            e.preventDefault();
            target.nextElementSibling ? target.nextElementSibling.focus() : target.parentElement.firstElementChild.focus();
            break;

          case 'Tab':
          case 'Enter':
            this._picked(e);

            e.preventDefault();
            this.targetElement.focus();
            break;

          case 'Escape':
            this._dismissSuggestions();

            this.targetElement.focus();
            break;
        }
      }
    }, {
      key: "_inputEvent",
      value: function () {
        var _inputEvent2 = litElement._asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2(e) {
          var target, value, url, fetchOptions, networkError, response, event, errs, _event, v, _event2, oldE;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  // Nothing can nor should happen without a target
                  target = this.targetElement;

                  if (target) {
                    _context2.next = 3;
                    break;
                  }

                  return _context2.abrupt("return");

                case 3:
                  // There is more input: a new query will be made,
                  // so the list is now stale
                  this._dismissSuggestions(); // If the target element is not valid, don't take off at all
                  // TAKEN OUT as autocomplete might be necessary to actually make
                  // it valid
                  // if (!target.validity.valid) {
                  //  this.suggestions = []
                  //  return
                  // }
                  // Check if it's inflight. If so, queue up an autocomplete
                  // with the same 'e'


                  if (!this._autocompleteInFlight) {
                    _context2.next = 7;
                    break;
                  }

                  this._attemptedAutocompleteFlight = e;
                  return _context2.abrupt("return");

                case 7:
                  this._autocompleteInFlight = true;

                  if (this.targetForId) {
                    this.targetForId.value = '';
                    this.picked = false;
                  } // Set the url, which will also depend on recordId


                  value = target.autocompleteValue || target.value;
                  url = this.url + value;
                  fetchOptions = {
                    method: 'GET',
                    redirect: 'follow' // manual, *follow, error

                  }; // Attempt the submission

                  networkError = false;
                  _context2.prev = 13;
                  _context2.next = 16;
                  return fetch(url, fetchOptions);

                case 16:
                  response = _context2.sent;
                  _context2.next = 23;
                  break;

                case 19:
                  _context2.prev = 19;
                  _context2.t0 = _context2["catch"](13);
                  console.log('ERROR!', _context2.t0);
                  networkError = true;

                case 23:
                  if (!networkError) {
                    _context2.next = 29;
                    break;
                  }

                  console.log('Network error!'); // Emit event to make it possible to tell the user via UI about the problem

                  event = new CustomEvent('autocomplete-error', {
                    detail: {
                      type: 'network'
                    },
                    bubbles: true,
                    composed: true
                  });
                  this.dispatchEvent(event); //
                  // CASE #2: HTTP error.
                  // Invalidate the problem fields

                  _context2.next = 44;
                  break;

                case 29:
                  if (response.ok) {
                    _context2.next = 38;
                    break;
                  }

                  console.log('Fetch error!');
                  _context2.next = 33;
                  return response.json();

                case 33:
                  errs = _context2.sent;
                  // Emit event to make it possible to tell the user via UI about the problem
                  _event = new CustomEvent('autocomplete-error', {
                    detail: {
                      type: 'http',
                      response: response,
                      errs: errs
                    },
                    bubbles: true,
                    composed: true
                  });
                  this.dispatchEvent(_event); // CASE #3: NO error. Set fields to their
                  // new values

                  _context2.next = 44;
                  break;

                case 38:
                  _context2.next = 40;
                  return response.json();

                case 40:
                  v = _context2.sent;
                  // Emit event to make it possible to tell the user via UI about the problem
                  _event2 = new CustomEvent('form-ok', {
                    detail: {
                      response: response
                    },
                    bubbles: true,
                    composed: true
                  });
                  this.dispatchEvent(_event2);
                  this.suggestions = v;

                case 44:
                  this._autocompleteInFlight = false;

                  if (this._attemptedAutocompleteFlight) {
                    oldE = this._attemptedAutocompleteFlight;
                    this._attemptedAutocompleteFlight = false;

                    this._inputEvent(oldE);
                  }

                case 46:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[13, 19]]);
        }));

        function _inputEvent(_x2) {
          return _inputEvent2.apply(this, arguments);
        }

        return _inputEvent;
      }()
    }]);

    return EeAutocomplete;
  }(ThemeableMixin.ThemeableMixin('ee-autocomplete')(StyleableMixin.StyleableMixin(litElement.LitElement)));
  customElements.define('ee-autocomplete', EeAutocomplete);

  exports.EeAutocomplete = EeAutocomplete;

  Object.defineProperty(exports, '__esModule', { value: true });

});
