define(['./lit-element-34339bae', './LabelsMixin-aace811e', './StyleableMixin-9aebdd05', './ThemeableMixin-c1113bda', './NativeReflectorMixin-ee6c4eac', './InputMixin-b647d651', './FormElementMixin-b76da3d3', './nn-input-text'], function (litElement, LabelsMixin, StyleableMixin, ThemeableMixin, NativeReflectorMixin, InputMixin, FormElementMixin, nnInputText) { 'use strict';

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n      ", "\n      ", "\n      <input type=\"password\" id=\"native\">\n      ", "\n    "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  var NnInputPassword =
  /*#__PURE__*/
  function (_NnInputText) {
    litElement._inherits(NnInputPassword, _NnInputText);

    function NnInputPassword() {
      litElement._classCallCheck(this, NnInputPassword);

      return litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(NnInputPassword).apply(this, arguments));
    }

    litElement._createClass(NnInputPassword, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject(), this.customStyle, this.ifLabelBefore, this.ifLabelAfter);
      }
    }]);

    return NnInputPassword;
  }(nnInputText.NnInputText);

  window.customElements.define('nn-input-password', NnInputPassword);

});
