define(['exports', './lit-element-aa931cb5', './ThemeableMixin-c1113bda', './NativeReflectorMixin-3fb8ab21', './InputMixin-7662a43a', './FormElementMixin-c7714e77'], function (exports, litElement, ThemeableMixin, NativeReflectorMixin, InputMixin, FormElementMixin) { 'use strict';

  function _templateObject2() {
    var data = litElement._taggedTemplateLiteral(["\n      "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n      ", "\n      <meter id=\"native\" real-time-event=\"input\"></meter>\n    "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }
  var NnMeter =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(NnMeter, _ThemeableMixin);

    function NnMeter() {
      litElement._classCallCheck(this, NnMeter);

      return litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(NnMeter).apply(this, arguments));
    }

    litElement._createClass(NnMeter, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject(), this.customStyle);
      }
    }, {
      key: "reflectProperties",
      get: function get() {
        return [].concat(litElement._toConsumableArray(litElement._get(litElement._getPrototypeOf(NnMeter.prototype), "reflectProperties", this)), ['high', 'low', 'max', 'min', 'optimum', 'value', 'labels']);
      }
    }], [{
      key: "styles",
      get: function get() {
        return [litElement._get(litElement._getPrototypeOf(NnMeter), "styles", this) || [], litElement.css(_templateObject2())];
      }
    }]);

    return NnMeter;
  }(ThemeableMixin.ThemeableMixin('nn-meter')(FormElementMixin.FormElementMixin(InputMixin.InputMixin(NativeReflectorMixin.NativeReflectorMixin(litElement.LitElement)))));
  customElements.define('nn-meter', NnMeter);

  exports.NnMeter = NnMeter;

  Object.defineProperty(exports, '__esModule', { value: true });

});
