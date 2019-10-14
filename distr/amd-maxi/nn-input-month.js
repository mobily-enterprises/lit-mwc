define(['./lit-element-34339bae', './LabelsMixin-aace811e', './StyleableMixin-9aebdd05', './ThemeableMixin-c1113bda', './NativeReflectorMixin-ee6c4eac', './InputMixin-b647d651', './FormElementMixin-b76da3d3', './nn-input-text'], function (litElement, LabelsMixin, StyleableMixin, ThemeableMixin, NativeReflectorMixin, InputMixin, FormElementMixin, nnInputText) { 'use strict';

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n      ", "\n      ", "\n      ", "\n      <input type=\"password\" id=\"native\">\n      ", "\n      ", "\n    "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  var NnInputMonth =
  /*#__PURE__*/
  function (_NnInputText) {
    litElement._inherits(NnInputMonth, _NnInputText);

    function NnInputMonth() {
      litElement._classCallCheck(this, NnInputMonth);

      return litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(NnInputMonth).apply(this, arguments));
    }

    litElement._createClass(NnInputMonth, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject(), this.customStyle, this.ifLabelBefore, this.ifValidationMessageBefore, this.ifValidationMessageAfter, this.ifLabelAfter);
      }
    }]);

    return NnInputMonth;
  }(nnInputText.NnInputText);

  window.customElements.define('nn-input-month', NnInputMonth);

});
