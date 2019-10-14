define(['./lit-element-34339bae', './LabelsMixin-aace811e', './StyleableMixin-9aebdd05', './ThemeableMixin-c1113bda', './NativeReflectorMixin-ee6c4eac', './InputMixin-b647d651', './FormElementMixin-b76da3d3'], function (litElement, LabelsMixin, StyleableMixin, ThemeableMixin, NativeReflectorMixin, InputMixin, FormElementMixin) { 'use strict';

  function _templateObject2() {
    var data = litElement._taggedTemplateLiteral(["\n        /* :host {\n          display: flex;\n          height: 30px;\n        } */\n      "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n      ", "\n      ", "\n      ", "\n      <input type=\"range\" id=\"native\" real-time-event=\"input\">\n      ", "\n      ", "\n    "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  var NnInputRange =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(NnInputRange, _ThemeableMixin);

    function NnInputRange() {
      litElement._classCallCheck(this, NnInputRange);

      return litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(NnInputRange).apply(this, arguments));
    }

    litElement._createClass(NnInputRange, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject(), this.customStyle, this.ifLabelBefore, this.ifValidationMessageBefore, this.ifValidationMessageAfter, this.ifLabelAfter);
      }
    }], [{
      key: "styles",
      get: function get() {
        return [litElement._get(litElement._getPrototypeOf(NnInputRange), "styles", this) || [], litElement.css(_templateObject2())];
      }
    }]);

    return NnInputRange;
  }(ThemeableMixin.ThemeableMixin('nn-input-range')(FormElementMixin.FormElementMixin(StyleableMixin.StyleableMixin(LabelsMixin.LabelsMixin(InputMixin.InputMixin(NativeReflectorMixin.NativeReflectorMixin(litElement.LitElement)))))));

  window.customElements.define('nn-input-range', NnInputRange);

});
