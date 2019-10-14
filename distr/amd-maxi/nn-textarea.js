define(['exports', './lit-element-34339bae', './LabelsMixin-aace811e', './StyleableMixin-9aebdd05', './ThemeableMixin-c1113bda', './NativeReflectorMixin-ee6c4eac', './InputMixin-b647d651', './FormElementMixin-b76da3d3'], function (exports, litElement, LabelsMixin, StyleableMixin, ThemeableMixin, NativeReflectorMixin, InputMixin, FormElementMixin) { 'use strict';

  function _templateObject2() {
    var data = litElement._taggedTemplateLiteral(["\n      "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n      ", "\n      ", "\n      <textarea name=\"\" id=\"native\" real-time-event=\"input\"></textarea>\n      ", "\n    "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }
  var NnTextArea =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(NnTextArea, _ThemeableMixin);

    function NnTextArea() {
      litElement._classCallCheck(this, NnTextArea);

      return litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(NnTextArea).apply(this, arguments));
    }

    litElement._createClass(NnTextArea, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject(), this.customStyle, this.ifLabelBefore, this.ifLabelAfter);
      }
    }, {
      key: "reflectProperties",
      get: function get() {
        return [].concat(litElement._toConsumableArray(litElement._get(litElement._getPrototypeOf(NnTextArea.prototype), "reflectProperties", this)), ['type', 'value', 'textLength', 'defaultValue', 'placeholder', 'rows', 'cols', 'autofocus', 'name', 'disabled', 'labels', 'maxLength', 'accessKey', 'readOnly', 'required', 'tabIndex', 'selectionStart', 'selectionEnd', 'selectionDirection', 'validity', 'willValidate', 'validationMessage', 'autocomplete ', 'autocapitalize ', 'inputMode ', 'wrap', 'blur', 'focus', 'select', 'setRangeText', 'setSelectionRange', 'reportValidity', 'setCustomValidity']);
      }
    }], [{
      key: "styles",
      get: function get() {
        return [litElement._get(litElement._getPrototypeOf(NnTextArea), "styles", this) || [], litElement.css(_templateObject2())];
      }
    }]);

    return NnTextArea;
  }(ThemeableMixin.ThemeableMixin('nn-textarea')(StyleableMixin.StyleableMixin(FormElementMixin.FormElementMixin(LabelsMixin.LabelsMixin(InputMixin.InputMixin(NativeReflectorMixin.NativeReflectorMixin(litElement.LitElement)))))));
  customElements.define('nn-textarea', NnTextArea);

  exports.NnTextArea = NnTextArea;

  Object.defineProperty(exports, '__esModule', { value: true });

});
