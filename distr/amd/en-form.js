define(['./lit-element-aa931cb5', './StyleableMixin-6ddce7d4', './ThemeableMixin-c1113bda', './NativeReflectorMixin-3fb8ab21', './nn-form'], function (litElement, StyleableMixin, ThemeableMixin, NativeReflectorMixin, nnForm) { 'use strict';

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n      ", "\n      <form id=\"native\">\n        <slot></slot>\n      </form>\n    "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }
  /* globals customElements CustomEvent */

  var EnForm =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(EnForm, _ThemeableMixin);

    litElement._createClass(EnForm, [{
      key: "reflectProperties",
      get: function get() {
        // The `submit` and `elements` properties have been redefined
        return litElement._get(litElement._getPrototypeOf(EnForm.prototype), "reflectProperties", this).filter(function (attr) {
          return attr !== 'submit';
        });
      }
    }], [{
      key: "properties",
      get: function get() {
        return {
          fetchingElement: {
            type: String,
            attribute: 'fetching-element'
          },
          recordId: {
            type: String,
            attribute: 'record-id'
          },
          setFormAfterSubmit: {
            type: Boolean,
            attribute: 'set-form-after-submit'
          },
          resetFormAfterSubmit: {
            type: Boolean,
            attribute: 'reset-form-after-submit'
          },
          validateOnLoad: {
            type: Boolean,
            attribute: 'validate-on-load'
          },
          validateOnRender: {
            type: Boolean,
            attribute: 'validate-on-render'
          },
          submitCheckboxesAsNative: {
            type: Boolean,
            attribute: 'submit-checkboxes-as-native'
          },
          noAutoload: {
            type: Boolean,
            attribute: 'no-autoload'
          },
          // This will allow users to redefine methods declaratively
          createSubmitObject: Function,
          presubmit: Function,
          response: Function,
          setFormElementValues: Function,
          extrapolateErrors: Function
        };
      }
    }]);

    function EnForm() {
      var _this;

      litElement._classCallCheck(this, EnForm);

      _this = litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(EnForm).call(this));
      _this.validateOnLoad = false;
      _this.validateOnRender = false;
      _this.fetchingElement = null;
      _this.submitCheckboxesAsNative = false;
      _this._boundRealtimeSubmitter = _this._realTimeSubmitter.bind(litElement._assertThisInitialized(_this));
      _this.inFlight = false;
      _this.attemptedFlight = false;
      _this.inFlightMap = new WeakMap();
      _this.attemptedFlightMap = new WeakMap();
      return _this;
    }

    litElement._createClass(EnForm, [{
      key: "_allChildrenCompleted",
      value: function () {
        var _allChildrenCompleted2 = litElement._asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, el;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  // Wait for all children to be ready to rock and roll
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  _context.prev = 3;
                  _iterator = this.elements[Symbol.iterator]();

                case 5:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    _context.next = 13;
                    break;
                  }

                  el = _step.value;

                  if (!(typeof el.updateComplete !== 'undefined')) {
                    _context.next = 10;
                    break;
                  }

                  _context.next = 10;
                  return el.updateComplete;

                case 10:
                  _iteratorNormalCompletion = true;
                  _context.next = 5;
                  break;

                case 13:
                  _context.next = 19;
                  break;

                case 15:
                  _context.prev = 15;
                  _context.t0 = _context["catch"](3);
                  _didIteratorError = true;
                  _iteratorError = _context.t0;

                case 19:
                  _context.prev = 19;
                  _context.prev = 20;

                  if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                  }

                case 22:
                  _context.prev = 22;

                  if (!_didIteratorError) {
                    _context.next = 25;
                    break;
                  }

                  throw _iteratorError;

                case 25:
                  return _context.finish(22);

                case 26:
                  return _context.finish(19);

                case 27:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[3, 15, 19, 27], [20,, 22, 26]]);
        }));

        function _allChildrenCompleted() {
          return _allChildrenCompleted2.apply(this, arguments);
        }

        return _allChildrenCompleted;
      }()
    }, {
      key: "_realTimeSubmitter",
      value: function _realTimeSubmitter(e) {
        this.submit(e.target);
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this2 = this;

        litElement._get(litElement._getPrototypeOf(EnForm.prototype), "connectedCallback", this).call(this);

        this._allChildrenCompleted().then(function () {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = _this2.elements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var el = _step2.value;
              var realTime = el.getAttribute('real-time') !== null;
              var realTimeEvent = el.getAttribute('real-time-event') || 'input';
              if (!realTime || !realTimeEvent) continue;

              _this2.addEventListener(realTimeEvent, _this2._boundRealtimeSubmitter);
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
        });
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        litElement._get(litElement._getPrototypeOf(EnForm.prototype), "disconnectedCallback", this).call(this);

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.elements[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var el = _step3.value;
            var realTime = el.getAttribute('real-time');
            if (realTime === null) continue;
            var realTimeEvent = el.getAttribute('real-time-event');
            if (!realTimeEvent) continue;
            this.removeEventListener(realTimeEvent, this._boundRealtimeSubmitter);
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
      }
    }, {
      key: "firstUpdated",
      value: function () {
        var _firstUpdated = litElement._asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  litElement._get(litElement._getPrototypeOf(EnForm.prototype), "firstUpdated", this).call(this);

                  if (!this.validateOnRender) {
                    _context2.next = 5;
                    break;
                  }

                  _context2.next = 4;
                  return this._allChildrenCompleted();

                case 4:
                  // Check validity
                  this.reportValidity();

                case 5:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function firstUpdated() {
          return _firstUpdated.apply(this, arguments);
        }

        return firstUpdated;
      }()
    }, {
      key: "setFormElementValues",
      value: function setFormElementValues(o) {
        for (var k in o) {
          this.setFormElementValue(k, o[k]);
        }
      }
    }, {
      key: "setRecordObject",
      value: function setRecordObject(o) {
        o = litElement._objectSpread2({}, o);
        var elHash = {};
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = this.elements[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var el = _step4.value;
            elHash[el.name] = el;
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

        for (var _i = 0, _Object$keys = Object.keys(elHash); _i < _Object$keys.length; _i++) {
          var k = _Object$keys[_i];
          o[k] = this.getFormElementValue(k);
        }

        return o;
      }
    }, {
      key: "extrapolateErrors",
      value: function extrapolateErrors(o) {
        return o;
      }
    }, {
      key: "createSubmitObject",
      value: function createSubmitObject(elements) {
        var r = {};
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = elements[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var el = _step5.value;
            // Radio will only happen once thanks to checking for undefined
            if (typeof r[el.name] !== 'undefined') continue;
            if (el.getAttribute('no-submit') !== null) continue; // Checkboxes are special: they might be handled as native ones,
            // (NOTHING set if unchecked, and their value set if checked) or
            // as booleans (true for checked, or false for unchecked)

            if (this._checkboxElement(el)) {
              if (this.submitCheckboxesAsNative) {
                // As native checkboxes.
                var val = this.getFormElementValue(el.name);
                if (val) r[el.name] = val;
              } else {
                // As more app-friendly boolean value
                r[el.name] = !!this.getFormElementValue(el.name);
              }
            } else {
              r[el.name] = this.getFormElementValue(el.name);
            }
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }

        return r;
      }
    }, {
      key: "presubmit",
      value: function presubmit() {}
    }, {
      key: "response",
      value: function response() {}
    }, {
      key: "_disableElements",
      value: function _disableElements(elements) {
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = elements[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var el = _step6.value;
            if (!el.disabled) el.setAttribute('disabled', true);
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
              _iterator6.return();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }
      }
    }, {
      key: "_enableElements",
      value: function _enableElements(elements) {
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = elements[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var el = _step7.value;
            el.removeAttribute('disabled');
          }
        } catch (err) {
          _didIteratorError7 = true;
          _iteratorError7 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
              _iterator7.return();
            }
          } finally {
            if (_didIteratorError7) {
              throw _iteratorError7;
            }
          }
        }
      }
    }, {
      key: "_fetchEl",
      value: function _fetchEl(specificElement) {
        // Tries to figure out what the fetching element is.
        // if fetching-element was passed, then it's either considered an ID
        // or the element itself.
        // Otherwise it will look for an ee-network or with an element with class
        // .network. Finally, it will use `window`
        if (specificElement) {
          var pEl;
          pEl = specificElement;
          var found = false;

          while (pEl.parentElement) {
            pEl = pEl.parentElement;

            if (pEl.tagName === 'EE-NETWORK' || pEl.classList.contains('network')) {
              found = true;
              break;
            }
          }

          return found ? pEl : window;
        } else {
          if (this.fetchingElement) {
            if (typeof this.fetchingElement === 'string') return this.querySelector("#".concat(this.fetchingElement));else return this.fetchingElement;
          } else {
            var maybeNetwork = this.querySelector('ee-network');
            if (!maybeNetwork) maybeNetwork = this.querySelector('.network');
            return maybeNetwork || window;
          }
        }
      }
    }, {
      key: "submit",
      value: function () {
        var _submit = litElement._asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee3(specificElement) {
          var submitObject, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, el, mapIndex, elementMethod, method, action, url, fetchOptions, networkError, response, errs, _el, event, originalErrs, _event, elHash, _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9, _el2, _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, err, _el3, v, attempted, name, _event2, _attempted;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (!specificElement) {
                    _context3.next = 7;
                    break;
                  }

                  if (typeof specificElement.setCustomValidity === 'function') specificElement.setCustomValidity('');

                  if (specificElement.reportValidity()) {
                    _context3.next = 4;
                    break;
                  }

                  return _context3.abrupt("return");

                case 4:
                  submitObject = this.createSubmitObject([specificElement]);
                  _context3.next = 29;
                  break;

                case 7:
                  _iteratorNormalCompletion8 = true;
                  _didIteratorError8 = false;
                  _iteratorError8 = undefined;
                  _context3.prev = 10;

                  for (_iterator8 = this.elements[Symbol.iterator](); !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                    el = _step8.value;
                    if (typeof el.setCustomValidity === 'function') el.setCustomValidity('');
                  }

                  _context3.next = 18;
                  break;

                case 14:
                  _context3.prev = 14;
                  _context3.t0 = _context3["catch"](10);
                  _didIteratorError8 = true;
                  _iteratorError8 = _context3.t0;

                case 18:
                  _context3.prev = 18;
                  _context3.prev = 19;

                  if (!_iteratorNormalCompletion8 && _iterator8.return != null) {
                    _iterator8.return();
                  }

                case 21:
                  _context3.prev = 21;

                  if (!_didIteratorError8) {
                    _context3.next = 24;
                    break;
                  }

                  throw _iteratorError8;

                case 24:
                  return _context3.finish(21);

                case 25:
                  return _context3.finish(18);

                case 26:
                  if (this.reportValidity()) {
                    _context3.next = 28;
                    break;
                  }

                  return _context3.abrupt("return");

                case 28:
                  submitObject = this.createSubmitObject(this.elements);

                case 29:
                  // inFlightMap is a map of all connections, using the specificElement
                  // as key (or "window" if there is no specific element)
                  mapIndex = specificElement || this; // The connection is ongoing: add a "specificElement" to the attempted
                  // field, and simply return.
                  // Towards the end, this function will check that "attempted" which,
                  // if set, means that the form needs to be resubmitted with that
                  // specificElement

                  if (!this.inFlightMap.has(mapIndex)) {
                    _context3.next = 33;
                    break;
                  }

                  this.inFlightMap.set(mapIndex, {
                    attempted: true
                  });
                  return _context3.abrupt("return");

                case 33:
                  this.inFlightMap.set(mapIndex, {
                    attempted: false
                  }); // The element's method can only be null, POST or PUT.
                  // If not null, and not "PUT", it's set to "POST"

                  elementMethod = this.getAttribute('method');

                  if (elementMethod && elementMethod.toUpperCase() !== 'PUT') {
                    elementMethod = 'POST';
                  } // The 'method' attribute will have priority no matter what.
                  // If `method` is not set, then it will depend on recordId (PUT if present,
                  // POST if not)


                  method = elementMethod === null ? this.recordId ? 'PUT' : 'POST' : elementMethod; // Set the url, which will also depend on recordId

                  action = this.getAttribute('action');

                  if (action) {
                    _context3.next = 40;
                    break;
                  }

                  throw new Error('The submitted form has no action URL set');

                case 40:
                  url = action + (this.recordId ? "/".concat(this.recordId) : '');
                  fetchOptions = {
                    url: url,
                    method: method,
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    redirect: 'follow',
                    // manual, *follow, error
                    body: submitObject // body data type must match "Content-Type" header

                  }; // HOOK: Allow devs to customise the request about to be sent to the server

                  this.presubmit(fetchOptions); // Disable the elements

                  if (!specificElement) this._disableElements(this.elements); // fetch() wants a stingified body

                  fetchOptions.body = JSON.stringify(fetchOptions.body); // Attempt the submission

                  networkError = false;
                  _context3.prev = 46;
                  _el = this._fetchEl(specificElement);
                  _context3.next = 50;
                  return _el.fetch(fetchOptions.url, fetchOptions);

                case 50:
                  response = _context3.sent;
                  _context3.next = 57;
                  break;

                case 53:
                  _context3.prev = 53;
                  _context3.t1 = _context3["catch"](46);
                  console.log('ERROR!', _context3.t1);
                  networkError = true;

                case 57:
                  if (!networkError) {
                    _context3.next = 65;
                    break;
                  }

                  console.log('Network error!'); // Re-enable the elements

                  if (!specificElement) this._enableElements(this.elements); // Emit event to make it possible to tell the user via UI about the problem

                  event = new CustomEvent('form-error', {
                    detail: {
                      type: 'network'
                    },
                    bubbles: true,
                    composed: true
                  });
                  this.dispatchEvent(event); // Response hook

                  this.response(null, null); //
                  // CASE #2: HTTP error.
                  // Invalidate the problem fields

                  _context3.next = 126;
                  break;

                case 65:
                  if (response.ok) {
                    _context3.next = 116;
                    break;
                  }

                  _context3.next = 68;
                  return response.json();

                case 68:
                  originalErrs = _context3.sent;
                  errs = this.extrapolateErrors(originalErrs) || {}; // Emit event to make it possible to tell the user via UI about the problem

                  _event = new CustomEvent('form-error', {
                    detail: {
                      type: 'http',
                      response: response,
                      errs: errs
                    },
                    bubbles: true,
                    composed: true
                  });
                  this.dispatchEvent(_event); // Re-enable the elements
                  // This must happen before setCustomValidity() and reportValidity()

                  if (!specificElement) this._enableElements(this.elements); // Set error messages

                  if (!(errs.errors && errs.errors.length)) {
                    _context3.next = 113;
                    break;
                  }

                  elHash = {};
                  _iteratorNormalCompletion9 = true;
                  _didIteratorError9 = false;
                  _iteratorError9 = undefined;
                  _context3.prev = 78;

                  for (_iterator9 = this.elements[Symbol.iterator](); !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                    _el2 = _step9.value;
                    elHash[_el2.name] = _el2;
                  }

                  _context3.next = 86;
                  break;

                case 82:
                  _context3.prev = 82;
                  _context3.t2 = _context3["catch"](78);
                  _didIteratorError9 = true;
                  _iteratorError9 = _context3.t2;

                case 86:
                  _context3.prev = 86;
                  _context3.prev = 87;

                  if (!_iteratorNormalCompletion9 && _iterator9.return != null) {
                    _iterator9.return();
                  }

                case 89:
                  _context3.prev = 89;

                  if (!_didIteratorError9) {
                    _context3.next = 92;
                    break;
                  }

                  throw _iteratorError9;

                case 92:
                  return _context3.finish(89);

                case 93:
                  return _context3.finish(86);

                case 94:
                  _iteratorNormalCompletion10 = true;
                  _didIteratorError10 = false;
                  _iteratorError10 = undefined;
                  _context3.prev = 97;

                  for (_iterator10 = errs.errors[Symbol.iterator](); !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                    err = _step10.value;
                    _el3 = elHash[err.field];

                    if (_el3) {
                      _el3.setCustomValidity(err.message);

                      _el3.reportValidity();
                    }
                  }

                  _context3.next = 105;
                  break;

                case 101:
                  _context3.prev = 101;
                  _context3.t3 = _context3["catch"](97);
                  _didIteratorError10 = true;
                  _iteratorError10 = _context3.t3;

                case 105:
                  _context3.prev = 105;
                  _context3.prev = 106;

                  if (!_iteratorNormalCompletion10 && _iterator10.return != null) {
                    _iterator10.return();
                  }

                case 108:
                  _context3.prev = 108;

                  if (!_didIteratorError10) {
                    _context3.next = 111;
                    break;
                  }

                  throw _iteratorError10;

                case 111:
                  return _context3.finish(108);

                case 112:
                  return _context3.finish(105);

                case 113:
                  // Response hook
                  this.response(response, errs); // CASE #3: NO error. Set fields to their
                  // new values

                  _context3.next = 126;
                  break;

                case 116:
                  _context3.next = 118;
                  return response.json();

                case 118:
                  v = _context3.sent;

                  if (this.inFlightMap.has(mapIndex)) {
                    attempted = this.inFlightMap.get(mapIndex).attempted;
                  } // HOOK Set the form values, in case the server processed some values
                  // Note: this is only ever called if set-form-after-submit was
                  // passed to the form.


                  if (this.setFormAfterSubmit) {
                    // Won't overwrite fields if another attempt is queued
                    if (!attempted) {
                      if (!specificElement) {
                        this.setFormElementValues(v);
                      } else {
                        name = mapIndex.name;
                        this.setFormElementValues(litElement._defineProperty({}, name, v[name]));
                      }
                    }
                  }

                  if (this.resetFormAfterSubmit && !attempted && !specificElement) this.reset(); // Re-enable the elements

                  if (!specificElement) this._enableElements(this.elements); // Emit event to make it possible to tell the user via UI about the problem

                  _event2 = new CustomEvent('form-ok', {
                    detail: {
                      response: response
                    },
                    bubbles: true,
                    composed: true
                  });
                  this.dispatchEvent(_event2); // Response hook

                  this.response(response, v);

                case 126:
                  if (this.inFlightMap.has(mapIndex)) {
                    _attempted = this.inFlightMap.get(mapIndex).attempted;
                    this.inFlightMap.delete(mapIndex);

                    if (_attempted) {
                      this.submit(specificElement);
                    }
                  }
                  /*
                  this.inFlight = false
                  if (this.attemptedFlight) {
                    const oldEl = this.attemptedFlight
                    this.attemptedFlight = false
                    this.submit(oldEl)
                  }
                  */


                case 127:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[10, 14, 18, 26], [19,, 21, 25], [46, 53], [78, 82, 86, 94], [87,, 89, 93], [97, 101, 105, 113], [106,, 108, 112]]);
        }));

        function submit(_x) {
          return _submit.apply(this, arguments);
        }

        return submit;
      }()
    }, {
      key: "updated",
      value: function () {
        var _updated = litElement._asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee4(changedProperties) {
          var action, response, v, el;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  litElement._get(litElement._getPrototypeOf(EnForm.prototype), "updated", this).call(this); // If no-autoload is set to true, or there is no autoload or no recordId,
                  // simply give up: nothing to do


                  if (!(this.noAutoload || !changedProperties.has('recordId'))) {
                    _context4.next = 3;
                    break;
                  }

                  return _context4.abrupt("return");

                case 3:
                  if (!(typeof this.recordId === 'undefined' || this.recordId === null)) {
                    _context4.next = 5;
                    break;
                  }

                  return _context4.abrupt("return");

                case 5:
                  // Work out the action's URL, adding the record ID  at the end
                  // (It will be a get)
                  // If there is a result, fetch the element values
                  action = this.getAttribute('action');

                  if (!action) {
                    _context4.next = 27;
                    break;
                  }

                  _context4.next = 9;
                  return this.updateComplete;

                case 9:
                  // Disable elements
                  this._disableElements(this.elements); // Fetch the data and trasform it to json


                  _context4.prev = 10;
                  el = this._fetchEl();
                  _context4.next = 14;
                  return el.fetch(action + '/' + this.recordId);

                case 14:
                  response = _context4.sent;
                  _context4.next = 17;
                  return response.json();

                case 17:
                  v = _context4.sent;
                  _context4.next = 24;
                  break;

                case 20:
                  _context4.prev = 20;
                  _context4.t0 = _context4["catch"](10);
                  console.error('WARNING: Fetching element failed to fetch');
                  v = {};

                case 24:
                  // Set values
                  this.setFormElementValues(v); // Re-enabled all disabled fields

                  this._enableElements(this.elements); // Run reportValidity if validateOnRender is on


                  if (this.validateOnLoad) {
                    this.reportValidity();
                  }

                case 27:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this, [[10, 20]]);
        }));

        function updated(_x2) {
          return _updated.apply(this, arguments);
        }

        return updated;
      }()
    }, {
      key: "render",
      value: function render() {
        return litElement.html(_templateObject(), this.customStyle);
      }
    }]);

    return EnForm;
  }(ThemeableMixin.ThemeableMixin('en-form')(nnForm.NnForm));

  customElements.define('en-form', EnForm);

});
