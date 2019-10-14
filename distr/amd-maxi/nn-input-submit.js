define(['./lit-element-34339bae', './ThemeableMixin-c1113bda', './NativeReflectorMixin-ee6c4eac', './InputMixin-b647d651', './FormElementMixin-b76da3d3'], function (litElement, ThemeableMixin, NativeReflectorMixin, InputMixin, FormElementMixin) { 'use strict';

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n      ", "\n      <input @click=\"", "\" type=\"submit\" id=\"native\">\n    "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  var NnInputSubmit =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(NnInputSubmit, _ThemeableMixin);

    function NnInputSubmit() {
      litElement._classCallCheck(this, NnInputSubmit);

      return litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(NnInputSubmit).apply(this, arguments));
    }

    litElement._createClass(NnInputSubmit, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject(), this.customStyle, this._formSubmit);
      }
    }, {
      key: "_formSubmit",
      value: function _formSubmit(e) {
        if (this.form) {
          this.form.submit();
        }
      }
    }]);

    return NnInputSubmit;
  }(ThemeableMixin.ThemeableMixin('nn-input-submit')(FormElementMixin.FormElementMixin(InputMixin.InputMixin(NativeReflectorMixin.NativeReflectorMixin(litElement.LitElement)))));

  customElements.define('nn-input-submit', NnInputSubmit);

});
