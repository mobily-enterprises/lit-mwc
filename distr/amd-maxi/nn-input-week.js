define(['./lit-element-34339bae', './LabelsMixin-aace811e', './StyleableMixin-9aebdd05', './ThemeableMixin-c1113bda', './NativeReflectorMixin-ee6c4eac', './InputMixin-b647d651', './FormElementMixin-b76da3d3', './nn-input-text'], function (litElement, LabelsMixin, StyleableMixin, ThemeableMixin, NativeReflectorMixin, InputMixin, FormElementMixin, nnInputText) { 'use strict';

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n      ", "\n      ", "\n      ", "\n      <input type=\"password\" id=\"native\">\n      ", "\n      ", "\n    "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  var NnInputWeek =
  /*#__PURE__*/
  function (_NnInputText) {
    litElement._inherits(NnInputWeek, _NnInputText);

    function NnInputWeek() {
      litElement._classCallCheck(this, NnInputWeek);

      return litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(NnInputWeek).apply(this, arguments));
    }

    litElement._createClass(NnInputWeek, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject(), this.customStyle, this.ifLabelBefore, this.ifValidationMessageBefore, this.ifValidationMessageAfter, this.ifLabelAfter);
      }
    }]);

    return NnInputWeek;
  }(nnInputText.NnInputText);

  window.customElements.define('nn-input-week', NnInputWeek);

});
