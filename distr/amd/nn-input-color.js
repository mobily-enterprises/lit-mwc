define(['./lit-element-aa931cb5', './LabelsMixin-8c5eaa35', './StyleableMixin-6ddce7d4', './ThemeableMixin-c1113bda', './NativeReflectorMixin-3fb8ab21', './InputMixin-7662a43a', './FormElementMixin-c7714e77', './nn-input-text'], function (litElement, LabelsMixin, StyleableMixin, ThemeableMixin, NativeReflectorMixin, InputMixin, FormElementMixin, nnInputText) { 'use strict';

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
