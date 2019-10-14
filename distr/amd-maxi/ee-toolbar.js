define(['exports', './lit-element-34339bae', './StyleableMixin-9aebdd05', './ThemeableMixin-c1113bda'], function (exports, litElement, StyleableMixin, ThemeableMixin) { 'use strict';

  function _templateObject2() {
    var data = litElement._taggedTemplateLiteral(["\n        :host {\n          display: flex;\n          width: 100%;\n          align-items: center;\n          position: relative;\n          height: 64px;\n          padding: 0 5px;\n          pointer-events: none;\n          font-size: var(--toolbar-font-size, 20px);\n        }\n\n        :host ::slotted(*) {\n          pointer-events: auto;\n        }\n\n        :host ::slotted(.icon) {\n          font-size: 0;\n        }\n\n        :host ::slotted([title]) {\n          pointer-events: none;\n          display: flex;\n          margin: auto\n        }\n\n        :host ::slotted([bottom-item]) {\n          position: absolute;\n          right: 0;\n          bottom: 0;\n          left: 0;\n        }\n\n        :host ::slotted([top-item]) {\n          position: absolute;\n          top: 0;\n          right: 0;\n          left: 0;\n        }\n\n        :host ::slotted([spacer]) {\n          margin-left: 64px;\n        }\n      "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n      <slot></slot>\n    "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }
  var EeToolbar =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(EeToolbar, _ThemeableMixin);

    function EeToolbar() {
      litElement._classCallCheck(this, EeToolbar);

      return litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(EeToolbar).apply(this, arguments));
    }

    litElement._createClass(EeToolbar, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject());
      }
    }], [{
      key: "styles",
      get: function get() {
        return [litElement._get(litElement._getPrototypeOf(EeToolbar), "styles", this) || [], litElement.css(_templateObject2())];
      }
    }]);

    return EeToolbar;
  }(ThemeableMixin.ThemeableMixin('ee-toolbar')(StyleableMixin.StyleableMixin(litElement.LitElement)));
  customElements.define('ee-toolbar', EeToolbar);

  exports.EeToolbar = EeToolbar;

  Object.defineProperty(exports, '__esModule', { value: true });

});
