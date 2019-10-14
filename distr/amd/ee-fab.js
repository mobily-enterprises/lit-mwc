define(['exports', './lit-element-aa931cb5', './StyleableMixin-6ddce7d4', './ThemeableMixin-c1113bda'], function (exports, litElement, StyleableMixin, ThemeableMixin) { 'use strict';

  function _templateObject2() {
    var data = litElement._taggedTemplateLiteral(["\n      :host {\n        display: block;\n      }\n    "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n    "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }
  var EeFab =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(EeFab, _ThemeableMixin);

    function EeFab() {
      litElement._classCallCheck(this, EeFab);

      return litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(EeFab).apply(this, arguments));
    }

    litElement._createClass(EeFab, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject());
      }
    }], [{
      key: "styles",
      get: function get() {
        return litElement.css(_templateObject2());
      }
    }]);

    return EeFab;
  }(ThemeableMixin.ThemeableMixin('ee-fab')(StyleableMixin.StyleableMixin(litElement.LitElement)));
  customElements.define('ee-fab', EeFab);

  exports.EeFab = EeFab;

  Object.defineProperty(exports, '__esModule', { value: true });

});
