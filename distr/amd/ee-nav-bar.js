define(['exports', './lit-element-aa931cb5', './StyleableMixin-6ddce7d4', './ThemeableMixin-c1113bda'], function (exports, litElement, StyleableMixin, ThemeableMixin) { 'use strict';

  function _templateObject2() {
    var data = litElement._taggedTemplateLiteral(["\n      <nav>\n        <slot @slotchange=\"", "\"></slot>\n      </nav>\n    "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n        :host {\n          display: block;\n          position: fixed;\n          bottom: 0;\n          left: 0;\n          width: 100%;\n          height: 56px;\n          z-index: 100;\n        }\n\n        :host nav {\n          display: flex;\n          width: 100%;\n          height: 64px;\n          background: var(--ee-nav-bar-background, var(--app-primary-color));\n          color: var(--ee-nav-bar-color, var(--app-light-text-color));\n          fill: var(--ee-nav-bar-color, var(--app-light-text-color));\n        }\n\n        :host nav > ::slotted(*[nav-item]) {\n          margin: 0 auto;\n          padding: 8px 12px;\n          display: block;\n          position: relative;\n          opacity: 0.7;\n          height: 24px;\n          min-width: 80px;\n          max-width: 168px;\n          text-align: center;\n        }\n\n        :host nav > ::slotted(*[nav-item])::after {\n          content: attr(item-label);\n          position: absolute;\n          top: 24px;\n          left: 50%;\n          line-height: 12px;\n          font-size: 12px;\n          transform: translateX(-50%);\n          margin-top: 6px;\n          padding: 6px;\n          white-space: nowrap;\n          text-transform: uppercase;\n        }\n\n        :host nav > ::slotted(*[selected]) {\n          opacity: 1;\n        }\n      "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }
  var EeNavBar =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(EeNavBar, _ThemeableMixin);

    litElement._createClass(EeNavBar, null, [{
      key: "styles",
      get: function get() {
        return [litElement._get(litElement._getPrototypeOf(EeNavBar), "styles", this) || [], litElement.css(_templateObject())];
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          selected: {
            type: String,
            reflect: true
          },
          selectedAttribute: {
            type: String
          },
          eventBubbles: {
            type: Boolean
          }
        };
      }
    }]);

    function EeNavBar() {
      var _this;

      litElement._classCallCheck(this, EeNavBar);

      _this = litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(EeNavBar).call(this));
      _this.selected = '';
      _this.eventBubbles = false;
      _this.selectedAttribute = 'name';
      return _this;
    }

    litElement._createClass(EeNavBar, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject2(), this._manageSlotted);
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        litElement._get(litElement._getPrototypeOf(EeNavBar.prototype), "connectedCallback", this).call(this); // Listen to local clicked-slot event


        this.addEventListener('clicked-slot', this._fireSelectedEvent);
      } // This adds a click event listener to all slotted children (the tabs)

    }, {
      key: "_manageSlotted",
      value: function _manageSlotted(e) {
        var slot = e.currentTarget;
        var slotted = slot.assignedNodes();
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = slotted[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var element = _step.value;
            element.addEventListener('click', this._clickedSlotted.bind(this));
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
      } // Each tab runs this and fires a clicked-slot event, which carries the selected value, It gets the value from the name attribute of the slotted "tab"

    }, {
      key: "_clickedSlotted",
      value: function _clickedSlotted(e) {
        console.log('slot clicked', this.selectedAttribute);
        this.dispatchEvent(new CustomEvent('clicked-slot', {
          detail: {
            event: e,
            selected: e.currentTarget.getAttribute(this.selectedAttribute)
          }
        }));
      } // This function runs when the host element receives a clicked-slot event from it's children. It sets the selected property and fires a 'selected-changed' event with that value.

    }, {
      key: "_fireSelectedEvent",
      value: function _fireSelectedEvent(e) {
        this.dispatchEvent(new CustomEvent('selected-changed', {
          detail: {
            selected: e.detail.selected
          }
        }));
        this.selected = e.detail.selected;
      }
    }]);

    return EeNavBar;
  }(ThemeableMixin.ThemeableMixin('ee-nav-bar')(StyleableMixin.StyleableMixin(litElement.LitElement)));
  customElements.define('ee-nav-bar', EeNavBar);

  exports.EeNavBar = EeNavBar;

  Object.defineProperty(exports, '__esModule', { value: true });

});
