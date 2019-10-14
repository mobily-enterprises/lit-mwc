define(['./lit-element-34339bae', './LabelsMixin-aace811e', './StyleableMixin-9aebdd05', './ThemeableMixin-c1113bda', './NativeReflectorMixin-ee6c4eac', './InputMixin-b647d651', './FormElementMixin-b76da3d3', './nn-input-text'], function (litElement, LabelsMixin, StyleableMixin, ThemeableMixin, NativeReflectorMixin, InputMixin, FormElementMixin, nnInputText) { 'use strict';

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n      ", "\n      ", "\n      <input type=\"color\" id=\"native\">\n      ", "\n    "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  var NnInputColor =
  /*#__PURE__*/
  function (_NnInputText) {
    litElement._inherits(NnInputColor, _NnInputText);

    function NnInputColor() {
      litElement._classCallCheck(this, NnInputColor);

      return litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(NnInputColor).apply(this, arguments));
    }

    litElement._createClass(NnInputColor, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject(), this.customStyle, this.ifLabelBefore, this.ifLabelAfter);
      }
    }]);

    return NnInputColor;
  }(nnInputText.NnInputText);

  window.customElements.define('nn-input-color', NnInputColor);

});
