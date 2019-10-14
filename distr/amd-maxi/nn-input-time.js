define(['./lit-element-34339bae', './LabelsMixin-aace811e', './StyleableMixin-9aebdd05', './ThemeableMixin-c1113bda', './NativeReflectorMixin-ee6c4eac', './InputMixin-b647d651', './FormElementMixin-b76da3d3', './nn-input-text'], function (litElement, LabelsMixin, StyleableMixin, ThemeableMixin, NativeReflectorMixin, InputMixin, FormElementMixin, nnInputText) { 'use strict';

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n      ", "\n      ", "\n      ", "\n      <input type=\"time\" id=\"native\">\n      ", "\n      ", "\n    "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  var NnInputTime =
  /*#__PURE__*/
  function (_NnInputText) {
    litElement._inherits(NnInputTime, _NnInputText);

    function NnInputTime() {
      litElement._classCallCheck(this, NnInputTime);

      return litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(NnInputTime).apply(this, arguments));
    }

    litElement._createClass(NnInputTime, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject(), this.customStyle, this.ifLabelBefore, this.ifValidationMessageBefore, this.ifValidationMessageAfter, this.ifLabelAfter);
      }
    }]);

    return NnInputTime;
  }(nnInputText.NnInputText);

  window.customElements.define('nn-input-time', NnInputTime);

});
