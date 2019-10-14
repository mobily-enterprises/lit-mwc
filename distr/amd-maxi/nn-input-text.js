define(['exports', './lit-element-34339bae', './LabelsMixin-aace811e', './StyleableMixin-9aebdd05', './ThemeableMixin-c1113bda', './NativeReflectorMixin-ee6c4eac', './InputMixin-b647d651', './FormElementMixin-b76da3d3'], function (exports, litElement, LabelsMixin, StyleableMixin, ThemeableMixin, NativeReflectorMixin, InputMixin, FormElementMixin) { 'use strict';

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n      ", "\n      ", "\n      ", "\n      <input type=\"text\" id=\"native\" real-time-event=\"input\">\n      ", "\n      ", "\n    "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }
  var NnInputText =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(NnInputText, _ThemeableMixin);

    function NnInputText() {
      litElement._classCallCheck(this, NnInputText);

      return litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(NnInputText).apply(this, arguments));
    }

    litElement._createClass(NnInputText, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject(), this.customStyle, this.ifLabelBefore, this.ifValidationMessageBefore, this.ifValidationMessageAfter, this.ifLabelAfter);
      }
    }]);

    return NnInputText;
  }(ThemeableMixin.ThemeableMixin('nn-input-text')(FormElementMixin.FormElementMixin(StyleableMixin.StyleableMixin(LabelsMixin.LabelsMixin(InputMixin.InputMixin(NativeReflectorMixin.NativeReflectorMixin(litElement.LitElement)))))));
  customElements.define('nn-input-text', NnInputText);

  exports.NnInputText = NnInputText;

  Object.defineProperty(exports, '__esModule', { value: true });

});
