define(['./lit-element-34339bae', './StyleableMixin-9aebdd05', './ThemeableMixin-c1113bda'], function (litElement, StyleableMixin, ThemeableMixin) { 'use strict';

  function _templateObject2() {
    var data = litElement._taggedTemplateLiteral(["\n        :host {\n          display: block;\n          position: fixed;\n          bottom: 0;\n          left: 0;\n          right: 0;\n          padding: 12px;\n          background-color: var(--app-primary-color);\n          color: var(--app-light-text-color);\n          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n          text-align: center;\n          will-change: transform;\n          transform: translate3d(0, 100%, 0);\n          transition-property: visibility, transform;\n          transition-duration: 0.2s;\n          visibility: hidden;\n        }\n\n        :host([active]) {\n          visibility: visible;\n          transform: translate3d(0, 0, 0);\n        }\n\n        :host([theme=\"success\"]) {\n          background-color: green;\n          color: white;\n        }\n\n        :host([theme=\"info\"]) {\n          background-color: gray;\n          color: white;\n        }\n\n        :host([theme=\"error\"]) {\n          background-color: red;\n          color: white;\n        }\n        @media (min-width: 460px) {\n          :host {\n            width: 320px;\n            margin: auto;\n          }\n        }\n      "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n      ", "\n    "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  var EeSnackBar =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(EeSnackBar, _ThemeableMixin);

    litElement._createClass(EeSnackBar, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject(), this.message);
      }
    }, {
      key: "_eventListener",
      value: function _eventListener(e) {
        var theme = e.detail.theme || 'info';
        this.setAttribute('theme', theme);
        this.message = e.detail.message;
        this.show();
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        litElement._get(litElement._getPrototypeOf(EeSnackBar.prototype), "connectedCallback", this).call(this);

        document.addEventListener('snack-bar', this.boundEventListener);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        litElement._get(litElement._getPrototypeOf(EeSnackBar.prototype), "disconnectedCallBack", this).call(this);

        document.removeEventListener('snack-bar', this.boundEventListener);
      }
    }], [{
      key: "styles",
      get: function get() {
        return [litElement.css(_templateObject2())];
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          active: {
            type: Boolean,
            reflect: true
          },
          message: {
            type: String
          }
        };
      }
    }]);

    function EeSnackBar() {
      var _this;

      litElement._classCallCheck(this, EeSnackBar);

      _this = litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(EeSnackBar).call(this));
      _this.active = false;
      _this.boundEventListener = _this._eventListener.bind(litElement._assertThisInitialized(_this));
      _this.intervalId = null;
      return _this;
    }

    litElement._createClass(EeSnackBar, [{
      key: "show",
      value: function show() {
        var _this2 = this;

        this.active = true;
        if (this.intervalId) clearInterval(this.intervalId);
        this.intervalId = setInterval(function () {
          _this2.active = false;
        }, 3000);
      }
    }]);

    return EeSnackBar;
  }(ThemeableMixin.ThemeableMixin('ee-snack-bar')(StyleableMixin.StyleableMixin(litElement.LitElement)));

  window.customElements.define('ee-snack-bar', EeSnackBar);

});
