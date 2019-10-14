define(['./lit-element-aa931cb5', './LabelsMixin-8c5eaa35', './StyleableMixin-6ddce7d4', './ThemeableMixin-c1113bda', './NativeReflectorMixin-3fb8ab21', './InputMixin-7662a43a', './FormElementMixin-c7714e77', './nn-input-text'], function (litElement, LabelsMixin, StyleableMixin, ThemeableMixin, NativeReflectorMixin, InputMixin, FormElementMixin, nnInputText) { 'use strict';

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
