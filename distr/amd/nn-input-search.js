define(['./lit-element-aa931cb5', './LabelsMixin-8c5eaa35', './StyleableMixin-6ddce7d4', './ThemeableMixin-c1113bda', './NativeReflectorMixin-3fb8ab21', './InputMixin-7662a43a', './FormElementMixin-c7714e77', './nn-input-text'], function (litElement, LabelsMixin, StyleableMixin, ThemeableMixin, NativeReflectorMixin, InputMixin, FormElementMixin, nnInputText) { 'use strict';

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

  window.customElements.define('nn-input-tel', NnInputSearch);

});
