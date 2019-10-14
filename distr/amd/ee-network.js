define(['exports', './lit-element-aa931cb5', './StyleableMixin-6ddce7d4', './ThemeableMixin-c1113bda'], function (exports, litElement, StyleableMixin, ThemeableMixin) { 'use strict';

  function _templateObject2() {
    var data = litElement._taggedTemplateLiteral(["\n      <div id=\"overlay\" class=\"", "\" @click=\"", "\">\n        ", "\n      </div>\n      <div id=\"content-wrapper\" class=\"", "\">\n        <slot></slot>\n      </div>\n    "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n        :host {\n          display: block;\n          position: relative;\n        }\n\n        :host([inline]) {\n          display: inline-block;\n        }\n\n        #overlay {\n          display: none; /* Hide by default */\n          position: absolute;\n          top: 0;\n          left: 0;\n          right: 0;\n          bottom: 0;\n          z-index: 1;\n          text-align: center;\n          transition: background var(--hot-network-transition-duration, 200ms);\n          @apply(--hot-network-overlay);\n        }\n        #overlay.overlay-loading {\n          display: block;\n          color: var(--hot-network-overlay-loading-color, #666);\n          /*background-color: var(--hot-network-overlay-loading-background-color, #d9dce0);*/\n          background-color: var(--hot-network-overlay-loading-background-color, rgba(102, 102, 102, 0.25));\n        }\n        #overlay.clear {\n        }\n        #overlay.overlay-error {\n          display: block;\n          cursor: pointer; /* Hint that the object is clickable */\n          color: var(--hot-network-overlay-error-color, #c00);\n          background-color: var(--hot-network-overlay-error-background-color, rgba(255, 0, 0, 0.25));\n        }\n\n        #content-wrapper.overlay-error {\n          pointer-events: none;\n          opacity: 0.25;\n          min-height: 1.25rem; /* FIXME: find a proper value, this is made up */\n        }\n      "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }
  var EeNetwork =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(EeNetwork, _ThemeableMixin);

    litElement._createClass(EeNetwork, null, [{
      key: "styles",
      get: function get() {
        return [litElement._get(litElement._getPrototypeOf(EeNetwork), "styles", this) || [], litElement.css(_templateObject())];
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          manageLoadingErrors: {
            type: Boolean,
            attribute: 'manage-loading-errors'
          },
          reloadMethod: {
            type: String,
            attribute: 'reload-method'
          },
          noReloadOnTap: {
            type: Boolean,
            attribute: 'no-reload-on-tap'
          },
          status: {
            type: String
          },
          statusMessages: {
            type: Object,
            attribute: 'status-messages'
          },
          messenger: {
            type: Function,
            attribute: false
          },
          overlayClass: {
            type: String,
            attribute: false
          }
        };
      }
    }]);

    function EeNetwork() {
      var _this;

      litElement._classCallCheck(this, EeNetwork);

      _this = litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(EeNetwork).call(this));
      _this.manageLoadingErrors = false;
      _this.reloadMethod = null;
      _this.noReloadOnTap = false;
      _this.status = 'loaded';
      _this.statusMessages = {
        loading: "Loading\u2026",
        // &hellip; equivalent
        saving: "Saving\u2026",
        // &hellip; equivalent
        error: 'An error has occurred. Click here to try again.'
      };
      _this.lastInitObject = null;
      _this.lastUrl = null;
      return _this;
    }

    litElement._createClass(EeNetwork, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject2(), this.overlayClass, this._overlayClicked, this.statusMessages[this.status], this.status);
      }
    }, {
      key: "firstUpdated",
      value: function firstUpdated() {
        this._setOverlay();
      }
    }, {
      key: "_setOverlay",
      value: function _setOverlay() {
        switch (this.status) {
          case 'loaded':
          case 'saved':
          case 'saving-error':
            this.overlayClass = 'clear';
            break;

          case 'loading':
          case 'saving':
            this.overlayClass = 'overlay-loading';
            break;

          case 'loading-error':
            this.overlayClass = this.manageLoadingErrors ? 'overlay-error' : 'clear';
        }
      }
    }, {
      key: "_overlayClicked",
      value: function _overlayClicked(e) {
        if (this.noReloadOnTap) return; // Stop the event here

        e.stopPropagation();
        e.preventDefault(); // If the status is 'error', try to reload

        if (this.status === 'loading-error') {
          if (!this.reloadMethod) this.fetch(this.lastUrl, this.lastInitObject);else this.reloadMethod(this.lastUrl, this.lastInitObject);
        }
      }
    }, {
      key: "messenger",
      value: function messenger() {}
    }, {
      key: "fetch",
      value: function (_fetch) {
        function fetch(_x, _x2) {
          return _fetch.apply(this, arguments);
        }

        fetch.toString = function () {
          return _fetch.toString();
        };

        return fetch;
      }(
      /*#__PURE__*/
      function () {
        var _ref = litElement._asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(url, initObject) {
          var fetchMethod, isGet, response;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  this.lastUrl = url;
                  this.lastInitObject = initObject; // Work out manageErrors, which will only ever
                  // applu to GET

                  fetchMethod = initObject && initObject.method && initObject.method.toUpperCase() || 'GET';
                  isGet = fetchMethod === 'GET';
                  this.status = isGet ? 'loading' : 'saving';

                  this._setOverlay();

                  this.messenger(this.status, url, initObject);
                  _context.prev = 7;
                  _context.next = 10;
                  return fetch(url, initObject);

                case 10:
                  response = _context.sent;

                  if (response.ok) {
                    this.status = isGet ? 'loaded' : 'saved';
                  } else {
                    this.status = isGet ? 'loading-error' : 'saving-error';
                  }

                  this._setOverlay();

                  this.messenger(this.status, url, initObject, response);
                  return _context.abrupt("return", response);

                case 17:
                  _context.prev = 17;
                  _context.t0 = _context["catch"](7);
                  this.status = isGet ? 'loading-error' : 'saving-error';

                  this._setOverlay();

                  this.messenger(this.status, url, initObject);
                  throw _context.t0;

                case 23:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[7, 17]]);
        }));

        return function (_x3, _x4) {
          return _ref.apply(this, arguments);
        };
      }())
    }]);

    return EeNetwork;
  }(ThemeableMixin.ThemeableMixin('ee-network')(StyleableMixin.StyleableMixin(litElement.LitElement)));
  customElements.define('ee-network', EeNetwork);

  exports.EeNetwork = EeNetwork;

  Object.defineProperty(exports, '__esModule', { value: true });

});
