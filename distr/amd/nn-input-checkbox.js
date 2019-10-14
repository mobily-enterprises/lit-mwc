define(['./lit-element-aa931cb5', './LabelsMixin-8c5eaa35', './StyleableMixin-6ddce7d4', './ThemeableMixin-c1113bda', './NativeReflectorMixin-3fb8ab21', './InputMixin-7662a43a', './FormElementMixin-c7714e77'], function (litElement, LabelsMixin, StyleableMixin, ThemeableMixin, NativeReflectorMixin, InputMixin, FormElementMixin) { 'use strict';

  function _templateObject2() {
    var data = litElement._taggedTemplateLiteral(["\n      "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n      ", "\n      ", "\n      <input type=\"checkbox\" as-checkbox value-source=\"checked\" id=\"native\"  real-time-event=\"checked\">\n      ", "\n    "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  var NnInputCheckbox =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(NnInputCheckbox, _ThemeableMixin);

    function NnInputCheckbox() {
      litElement._classCallCheck(this, NnInputCheckbox);

      return litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(NnInputCheckbox).apply(this, arguments));
    }

    litElement._createClass(NnInputCheckbox, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject(), this.customStyle, this.ifLabelBefore, this.ifLabelAfter);
      }
    }, {
      key: "bootProperties",
      get: function get() {
        return [litElement._get(litElement._getPrototypeOf(NnInputCheckbox.prototype), "bootProperties", this), 'checked'];
      }
    }], [{
      key: "styles",
      get: function get() {
        return [litElement._get(litElement._getPrototypeOf(NnInputCheckbox), "styles", this) || [], litElement.css(_templateObject2())];
      }
    }]);

    return NnInputCheckbox;
  }(ThemeableMixin.ThemeableMixin('nn-input-checkbox')(FormElementMixin.FormElementMixin(LabelsMixin.LabelsMixin(StyleableMixin.StyleableMixin(InputMixin.InputMixin(NativeReflectorMixin.NativeReflectorMixin(litElement.LitElement)))))));

  customElements.define('nn-input-checkbox', NnInputCheckbox);

});
