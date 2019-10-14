define(['./lit-element-aa931cb5', './LabelsMixin-8c5eaa35', './StyleableMixin-6ddce7d4', './ThemeableMixin-c1113bda', './NativeReflectorMixin-3fb8ab21', './InputMixin-7662a43a', './FormElementMixin-c7714e77'], function (litElement, LabelsMixin, StyleableMixin, ThemeableMixin, NativeReflectorMixin, InputMixin, FormElementMixin) { 'use strict';

  function _templateObject2() {
    var data = litElement._taggedTemplateLiteral(["\n      "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n      ", "\n      ", "\n      <input as-radio value-source=\"checked\" @change=\"", "\" type=\"radio\" id=\"native\"  real-time-event=\"input\">\n      ", "\n    "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  var NnInputRadio =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(NnInputRadio, _ThemeableMixin);

    function NnInputRadio() {
      litElement._classCallCheck(this, NnInputRadio);

      return litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(NnInputRadio).apply(this, arguments));
    }

    litElement._createClass(NnInputRadio, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject(), this.customStyle, this.ifLabelBefore, this._excludeOthers, this.ifLabelAfter);
      }
    }, {
      key: "_excludeOthers",
      value: function _excludeOthers(e) {
        var _this = this;

        // All other elements with the same name, marked as `as-radio`
        var others = litElement._toConsumableArray(this.form.elements).filter(function (el) {
          return el !== _this && el.getAttribute('name') && el.getAttribute('name') === _this.getAttribute('name') && el.getAttribute('as-radio') !== null;
        });

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = others[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var el = _step.value;
            var prop = el.getAttribute('value-source') || 'checked';
            el[prop] = false;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }], [{
      key: "styles",
      get: function get() {
        return [litElement._get(litElement._getPrototypeOf(NnInputRadio), "styles", this) || [], litElement.css(_templateObject2())];
      }
    }]);

    return NnInputRadio;
  }(ThemeableMixin.ThemeableMixin('nn-input-radio')(FormElementMixin.FormElementMixin(LabelsMixin.LabelsMixin(StyleableMixin.StyleableMixin(InputMixin.InputMixin(NativeReflectorMixin.NativeReflectorMixin(litElement.LitElement)))))));

  customElements.define('nn-input-radio', NnInputRadio);

});
