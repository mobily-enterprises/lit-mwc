define(['exports', './lit-element-aa931cb5', './LabelsMixin-8c5eaa35', './StyleableMixin-6ddce7d4', './ThemeableMixin-c1113bda', './NativeReflectorMixin-3fb8ab21', './InputMixin-7662a43a', './FormElementMixin-c7714e77'], function (exports, litElement, LabelsMixin, StyleableMixin, ThemeableMixin, NativeReflectorMixin, InputMixin, FormElementMixin) { 'use strict';

  function _templateObject2() {
    var data = litElement._taggedTemplateLiteral(["\n      "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n      ", "\n      ", "\n      <slot @slotchange=\"", "\"></slot>\n      <input type=\"text\" id=\"native\" list=\"_datalist\" real-time-event=\"input\">\n      <datalist id=\"_datalist\">\n      </datalist>\n      ", "\n    "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }
  var NnInputDatalist =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(NnInputDatalist, _ThemeableMixin);

    function NnInputDatalist() {
      litElement._classCallCheck(this, NnInputDatalist);

      return litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(NnInputDatalist).apply(this, arguments));
    }

    litElement._createClass(NnInputDatalist, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject(), this.customStyle, this.ifLabelBefore, this.addSlotToSelect, this.ifLabelAfter);
      }
    }, {
      key: "addSlotToSelect",
      value: function addSlotToSelect(e) {
        var select = this.shadowRoot.querySelector('#_datalist');
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = e.srcElement.assignedElements()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var option = _step.value;
            select.appendChild(option);
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
    }, {
      key: "skipAttributes",
      get: function get() {
        return [].concat(litElement._toConsumableArray(litElement._get(litElement._getPrototypeOf(NnInputDatalist.prototype), "skipAttributes", this)), ['list']);
      }
    }], [{
      key: "styles",
      get: function get() {
        return [litElement._get(litElement._getPrototypeOf(NnInputDatalist), "styles", this) || [], litElement.css(_templateObject2())];
      }
    }]);

    return NnInputDatalist;
  }(ThemeableMixin.ThemeableMixin('nn-input-datalist')(FormElementMixin.FormElementMixin(LabelsMixin.LabelsMixin(StyleableMixin.StyleableMixin(InputMixin.InputMixin(NativeReflectorMixin.NativeReflectorMixin(litElement.LitElement)))))));
  customElements.define('nn-input-datalist', NnInputDatalist);

  exports.NnInputDatalist = NnInputDatalist;

  Object.defineProperty(exports, '__esModule', { value: true });

});
