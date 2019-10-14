define(['./lit-element-34339bae', './LabelsMixin-aace811e', './StyleableMixin-9aebdd05', './ThemeableMixin-c1113bda', './NativeReflectorMixin-ee6c4eac', './InputMixin-b647d651', './FormElementMixin-b76da3d3', './nn-input-text'], function (litElement, LabelsMixin, StyleableMixin, ThemeableMixin, NativeReflectorMixin, InputMixin, FormElementMixin, nnInputText) { 'use strict';

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n      ", "\n      ", "\n      <input type=\"datetime-local\" id=\"native\">\n      ", "\n    "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  var NnInputDateTimeLocal =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(NnInputDateTimeLocal, _ThemeableMixin);

    function NnInputDateTimeLocal() {
      litElement._classCallCheck(this, NnInputDateTimeLocal);

      return litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(NnInputDateTimeLocal).apply(this, arguments));
    }

    litElement._createClass(NnInputDateTimeLocal, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject(), this.customStyle, this.ifLabelBefore, this.ifLabelAfter);
      }
    }]);

    return NnInputDateTimeLocal;
  }(ThemeableMixin.ThemeableMixin('nn-input-date')(nnInputText.NnInputText));

  window.customElements.define('nn-input-datetime-local', NnInputDateTimeLocal);

});
