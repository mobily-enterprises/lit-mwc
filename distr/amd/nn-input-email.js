define(['./lit-element-aa931cb5', './LabelsMixin-8c5eaa35', './StyleableMixin-6ddce7d4', './ThemeableMixin-c1113bda', './NativeReflectorMixin-3fb8ab21', './InputMixin-7662a43a', './FormElementMixin-c7714e77', './nn-input-text'], function (litElement, LabelsMixin, StyleableMixin, ThemeableMixin, NativeReflectorMixin, InputMixin, FormElementMixin, nnInputText) { 'use strict';

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
