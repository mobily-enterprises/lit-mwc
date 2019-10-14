define(['exports', './lit-element-34339bae', './LabelsMixin-aace811e', './ThemeableMixin-c1113bda', './NativeReflectorMixin-ee6c4eac', './InputMixin-b647d651', './FormElementMixin-b76da3d3'], function (exports, litElement, LabelsMixin, ThemeableMixin, NativeReflectorMixin, InputMixin, FormElementMixin) { 'use strict';

  function _templateObject2() {
    var data = litElement._taggedTemplateLiteral(["\n      ", "\n      ", "\n      ", "\n      <slot @slotchange=\"", "\"></slot>\n      <select id=\"native\" real-time-event=\"selected\"></select>\n      ", "\n      ", "\n    "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n        /* :host {\n          display: flex;\n          height: 30px;\n        } */\n\n        /* select {\n          display: inline-flex;\n          border-radius: var(--nn-select-border-radius, 0 4px 4px 0);\n          border: var(--nn-select-border, 1px solid #dddddd);\n          color: var(--nn-select-color, inherit);\n          background-color: var(--nn-select-background, initial);\n          -webkit-appearance: select;\n          width: 100%;\n          float: right;\n          font-size: 1em;\n          padding-left: 10px;\n          margin-left: 4px;\n        } */\n      "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }
  var NnSelect =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(NnSelect, _ThemeableMixin);

    litElement._createClass(NnSelect, [{
      key: "reflectProperties",
      get: function get() {
        return [].concat(litElement._toConsumableArray(litElement._get(litElement._getPrototypeOf(NnSelect.prototype), "reflectProperties", this)), ['autofocus', 'disabled', 'labels', 'length', 'multiple', 'name', 'options', 'required', 'selectedIndex', 'selectedOptions', 'size', 'type', 'validationMessage', 'validity', 'value', 'willValidate', 'add', 'blur', 'focus', 'item', 'namedItem', 'remove', 'reportValidity', 'setCustomValidity']);
      }
    }], [{
      key: "styles",
      get: function get() {
        return [litElement._get(litElement._getPrototypeOf(NnSelect), "styles", this) || [], litElement.css(_templateObject())];
      }
    }]);

    function NnSelect() {
      var _this;

      litElement._classCallCheck(this, NnSelect);

      _this = litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(NnSelect).call(this));
      _this.options = [];
      return _this;
    }

    litElement._createClass(NnSelect, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject2(), this.customStyle, this.ifLabelBefore, this.ifValidationMessageBefore, this.addSlotToSelect, this.ifValidationMessageAfter, this.ifLabelAfter);
      }
    }, {
      key: "addSlotToSelect",
      value: function addSlotToSelect(e) {
        var select = this.shadowRoot.querySelector('#native');
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
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }]);

    return NnSelect;
  }(ThemeableMixin.ThemeableMixin('nn-select')(FormElementMixin.FormElementMixin(LabelsMixin.LabelsMixin(InputMixin.InputMixin(NativeReflectorMixin.NativeReflectorMixin(litElement.LitElement))))));
  customElements.define('nn-select', NnSelect);

  exports.NnSelect = NnSelect;

  Object.defineProperty(exports, '__esModule', { value: true });

});
