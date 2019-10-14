define(['exports', './lit-element-aa931cb5', './LabelsMixin-8c5eaa35', './StyleableMixin-6ddce7d4', './ThemeableMixin-c1113bda', './NativeReflectorMixin-3fb8ab21', './InputMixin-7662a43a', './FormElementMixin-c7714e77'], function (exports, litElement, LabelsMixin, StyleableMixin, ThemeableMixin, NativeReflectorMixin, InputMixin, FormElementMixin) { 'use strict';

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
