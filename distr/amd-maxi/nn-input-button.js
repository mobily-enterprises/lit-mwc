define(['./lit-element-34339bae', './ThemeableMixin-c1113bda', './NativeReflectorMixin-ee6c4eac', './InputMixin-b647d651', './FormElementMixin-b76da3d3'], function (litElement, ThemeableMixin, NativeReflectorMixin, InputMixin, FormElementMixin) { 'use strict';

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n      <input type=\"button\" id=\"native\">\n        <slot></slot>\n     "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  var NnInputButton =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(NnInputButton, _ThemeableMixin);

    function NnInputButton() {
      litElement._classCallCheck(this, NnInputButton);

      return litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(NnInputButton).apply(this, arguments));
    }

    litElement._createClass(NnInputButton, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject());
      }
    }], [{
      key: "properties",
      get: function get() {
        return {};
      }
    }]);

    return NnInputButton;
  }(ThemeableMixin.ThemeableMixin('nn-input-button')(FormElementMixin.FormElementMixin(InputMixin.InputMixin(NativeReflectorMixin.NativeReflectorMixin(litElement.LitElement)))));

  customElements.define('nn-input-button', NnInputButton);

});
