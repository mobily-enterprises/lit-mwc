define(['./lit-element-34339bae', './LabelsMixin-aace811e', './StyleableMixin-9aebdd05', './ThemeableMixin-c1113bda', './NativeReflectorMixin-ee6c4eac', './InputMixin-b647d651', './FormElementMixin-b76da3d3', './nn-input-text'], function (litElement, LabelsMixin, StyleableMixin, ThemeableMixin, NativeReflectorMixin, InputMixin, FormElementMixin, nnInputText) { 'use strict';

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n      ", "\n      ", "\n      <input type=\"search\" id=\"native\">\n      ", "\n    "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  var NnInputSearch =
  /*#__PURE__*/
  function (_NnInputText) {
    litElement._inherits(NnInputSearch, _NnInputText);

    function NnInputSearch() {
      litElement._classCallCheck(this, NnInputSearch);

      return litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(NnInputSearch).apply(this, arguments));
    }

    litElement._createClass(NnInputSearch, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject(), this.customStyle, this.ifLabelBefore, this.ifLabelAfter);
      }
    }]);

    return NnInputSearch;
  }(nnInputText.NnInputText);

  window.customElements.define('nn-input-search', NnInputSearch);

});
