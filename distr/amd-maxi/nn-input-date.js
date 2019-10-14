define(['./lit-element-34339bae', './LabelsMixin-aace811e', './StyleableMixin-9aebdd05', './ThemeableMixin-c1113bda', './NativeReflectorMixin-ee6c4eac', './InputMixin-b647d651', './FormElementMixin-b76da3d3', './nn-input-text'], function (litElement, LabelsMixin, StyleableMixin, ThemeableMixin, NativeReflectorMixin, InputMixin, FormElementMixin, nnInputText) { 'use strict';

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n      ", "\n      ", "\n      ", "\n      <input type=\"date\" id=\"native\">\n      ", "\n      ", "\n    "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  var NnInputDate =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(NnInputDate, _ThemeableMixin);

    function NnInputDate() {
      litElement._classCallCheck(this, NnInputDate);

      return litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(NnInputDate).apply(this, arguments));
    }

    litElement._createClass(NnInputDate, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject(), this.customStyle, this.ifLabelBefore, this.ifValidationMessageBefore, this.ifValidationMessageAfter, this.ifLabelAfter);
      }
    }]);

    return NnInputDate;
  }(ThemeableMixin.ThemeableMixin('nn-input-date')(nnInputText.NnInputText));

  window.customElements.define('nn-input-date', NnInputDate);

});
