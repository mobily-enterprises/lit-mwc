define(['exports', './lit-element-aa931cb5', './ThemeableMixin-c1113bda', './NativeReflectorMixin-3fb8ab21', './InputMixin-7662a43a', './FormElementMixin-c7714e77'], function (exports, litElement, ThemeableMixin, NativeReflectorMixin, InputMixin, FormElementMixin) { 'use strict';

  function _templateObject2() {
    var data = litElement._taggedTemplateLiteral(["\n      "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n      ", "\n      <progress id=\"native\" real-time-event=\"input\"></progress>\n    "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }
  var NnProgress =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(NnProgress, _ThemeableMixin);

    function NnProgress() {
      litElement._classCallCheck(this, NnProgress);

      return litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(NnProgress).apply(this, arguments));
    }

    litElement._createClass(NnProgress, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject(), this.customStyle);
      }
    }, {
      key: "reflectProperties",
      get: function get() {
        return [].concat(litElement._toConsumableArray(litElement._get(litElement._getPrototypeOf(NnProgress.prototype), "reflectProperties", this)), ['max', 'position', 'value', 'labels']);
      }
    }], [{
      key: "styles",
      get: function get() {
        return [litElement._get(litElement._getPrototypeOf(NnProgress), "styles", this) || [], litElement.css(_templateObject2())];
      }
    }, {
      key: "properties",
      get: function get() {
        return {};
      }
    }]);

    return NnProgress;
  }(ThemeableMixin.ThemeableMixin('nn-progress')(FormElementMixin.FormElementMixin(InputMixin.InputMixin(NativeReflectorMixin.NativeReflectorMixin(litElement.LitElement)))));
  customElements.define('nn-progress', NnProgress);

  exports.NnProgress = NnProgress;

  Object.defineProperty(exports, '__esModule', { value: true });

});
