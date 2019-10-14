define(['exports', './lit-element-34339bae', './StyleableMixin-9aebdd05', './ThemeableMixin-c1113bda'], function (exports, litElement, StyleableMixin, ThemeableMixin) { 'use strict';

  function _templateObject2() {
    var data = litElement._taggedTemplateLiteral(["\n    <nav>\n      <slot @slotchange=\"", "\"></slot>\n    </nav>\n    "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n        :host {\n          width: 100%;\n          height: 42px;\n          padding-top: 0;\n        }\n\n        :host nav {\n          border-bottom: 1px solid var(--app-lines-color);\n          display: flex;\n        }\n\n        :host nav ::slotted(*) .icon {\n          fill: var(--app-drawer-text-color);\n        }\n\n        :host nav > ::slotted(*[selected]) .icon {\n          fill: var(--app-header-selected-color);\n        }\n\n        :host nav > ::slotted(*) {\n          color: var(--app-dark-text-color);\n          text-decoration: none;\n          line-height: 30px;\n          padding: 4px 24px;\n          border: unset;\n          border-right: 1px solid var(--app-lines-color);\n          border-bottom: 4px inset transparent;\n          font-size: 0.9em;\n          border-radius: 0;\n          width: 100%;\n          text-align: center;\n        }\n\n        :host nav > ::slotted(*:last-child) {\n          border-right: unset\n        }\n\n        :host nav > ::slotted(*[selected]) {\n          color: var(--app-header-selected-color);\n          border-bottom: 4px solid var(--app-primary-color);\n        }\n\n        :host nav > ::slotted(*:focus) {\n          outline:0 ;\n          background: whitesmoke;\n          /* border: 1px solid #bdbdbd; */\n        }\n\n        :host nav > ::slotted(*:active) {\n          background: #cccccc;\n          border-bottom: 4px inset #bdbdbd;\n          box-shadow: none;\n          animation: fadeIn 0.2s ease-in;\n        }\n\n        :host nav > ::slotted(*[disabled]) {\n          box-shadow: none\n        }\n\n        :host nav > ::slotted(*.icon:active) {\n          background: #cccccc;\n          border: unset;\n          border-radius: 50%;\n        }\n\n        :host nav > ::slotted(*.icon:hover) svg, :host > ::slotted(*:hover) svg {\n          fill: var(--app-primary-color);\n        }\n      "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }
  var EeTabs =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(EeTabs, _ThemeableMixin);

    litElement._createClass(EeTabs, null, [{
      key: "styles",
      get: function get() {
        return [litElement._get(litElement._getPrototypeOf(EeTabs), "styles", this) || [], litElement.css(_templateObject())];
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          "default": {
            type: String
          },
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

    function EeTabs() {
      var _this;

      litElement._classCallCheck(this, EeTabs);

      _this = litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(EeTabs).call(this));
      _this.selected = '';
      _this.eventBubbles = false;
      _this.selectedAttribute = 'name';
      return _this;
    }
    /** Tabs usage
     * add elements with a slot="tabs" within the nl-tabs tags to create tabs.
     * Tab elements must have an id. Index support will be added soon
     */


    litElement._createClass(EeTabs, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject2(), this._manageSlotted);
      }
    }, {
      key: "firstUpdated",
      value: function firstUpdated() {
        var _this2 = this;

        var slotted = this.shadowRoot.querySelector('slot').assignedElements();
        if (!slotted.length) return;
        var defaultTab = this["default"] ? slotted.filter(function (i) {
          return i.getAttribute('name') === _this2["default"];
        })[0] : slotted[0];
        var selected = defaultTab.getAttribute('name');

        if (defaultTab) {
          this.dispatchEvent(new CustomEvent('selected-changed', {
            detail: {
              selected: selected
            }
          }));
          this.selected = selected;
        }
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        litElement._get(litElement._getPrototypeOf(EeTabs.prototype), "connectedCallback", this).call(this); // Listen to local clicked-slot event


        this.addEventListener('clicked-slot', this._fireSelectedEvent);
      } // This adds a click event listener to all slotted children (the tabs)

    }, {
      key: "_manageSlotted",
      value: function _manageSlotted(e) {
        var slot = e.currentTarget;
        var slotted = slot.assignedElements();
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
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
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

    return EeTabs;
  }(ThemeableMixin.ThemeableMixin('ee-tabs')(StyleableMixin.StyleableMixin(litElement.LitElement)));
  customElements.define('ee-tabs', EeTabs);

  exports.EeTabs = EeTabs;

  Object.defineProperty(exports, '__esModule', { value: true });

});
