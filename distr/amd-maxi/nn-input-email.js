define(['./lit-element-34339bae', './LabelsMixin-aace811e', './StyleableMixin-9aebdd05', './ThemeableMixin-c1113bda', './NativeReflectorMixin-ee6c4eac', './InputMixin-b647d651', './FormElementMixin-b76da3d3', './nn-input-text'], function (litElement, LabelsMixin, StyleableMixin, ThemeableMixin, NativeReflectorMixin, InputMixin, FormElementMixin, nnInputText) { 'use strict';

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n      ", "\n      ", "\n      ", "\n      <input type=\"email\" id=\"native\">\n      ", "\n      ", "\n    "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  var NnInputEmail =
  /*#__PURE__*/
  function (_NnInputText) {
    litElement._inherits(NnInputEmail, _NnInputText);

    function NnInputEmail() {
      litElement._classCallCheck(this, NnInputEmail);

      return litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(NnInputEmail).apply(this, arguments));
    }

    litElement._createClass(NnInputEmail, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject(), this.customStyle, this.ifLabelBefore, this.ifValidationMessageBefore, this.ifValidationMessageAfter, this.ifLabelAfter);
      }
    }]);

    return NnInputEmail;
  }(nnInputText.NnInputText);

  window.customElements.define('nn-input-email', NnInputEmail);

});
