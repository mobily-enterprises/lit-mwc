define(['./lit-element-34339bae', './LabelsMixin-aace811e', './StyleableMixin-9aebdd05', './ThemeableMixin-c1113bda', './NativeReflectorMixin-ee6c4eac', './InputMixin-b647d651', './FormElementMixin-b76da3d3'], function (litElement, LabelsMixin, StyleableMixin, ThemeableMixin, NativeReflectorMixin, InputMixin, FormElementMixin) { 'use strict';

  function _templateObject2() {
    var data = litElement._taggedTemplateLiteral(["\n        /* :host {\n          display: flex;\n          height: 30px;\n        } */\n      "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n      ", "\n      <slot @slotchange=\"", "\" id=\"range-amount-before\" name=\"range-amount-before\"></slot>\n      ", "\n      ", "\n      <input @change=", " type=\"range\" id=\"native\" real-time-event=\"input\">\n      ", "\n      ", "\n      <slot @slotchange=\"", "\" id=\"range-amount-after\" name=\"range-amount-after\"></slot>\n    "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  var EnInputRange =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(EnInputRange, _ThemeableMixin);

    function EnInputRange() {
      litElement._classCallCheck(this, EnInputRange);

      return litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(EnInputRange).apply(this, arguments));
    }

    litElement._createClass(EnInputRange, [{
      key: "firstUpdated",
      value: function firstUpdated() {
        litElement._get(litElement._getPrototypeOf(EnInputRange.prototype), "firstUpdated", this).call(this);

        this.shownValue = this.shadowRoot.querySelector('#native').value;
      }
    }, {
      key: "render",
      value: function render() {
        return litElement.html(_templateObject(), this.customStyle, this.slotChanged, this.ifLabelBefore, this.ifValidationMessageBefore, this.updateShownValue, this.ifValidationMessageAfter, this.ifLabelAfter, this.slotChanged);
      }
    }, {
      key: "_updateSpanInSlot",
      value: function _updateSpanInSlot(slot, value) {
        if (slot) {
          var slotContents = slot.assignedElements()[0];

          if (slotContents) {
            var amountSpan = slotContents.querySelector('span#range-amount');

            if (amountSpan) {
              amountSpan.innerHTML = Number(value);
            }
          }
        }
      }
    }, {
      key: "updateShownValue",
      value: function updateShownValue(e) {
        var slot;
        this.shownValue = e.srcElement.value;
        slot = this.shadowRoot.querySelector('slot#range-amount-before');

        this._updateSpanInSlot(slot, this.shownValue);

        slot = this.shadowRoot.querySelector('slot#range-amount-after');

        this._updateSpanInSlot(slot, this.shownValue);
      }
    }, {
      key: "slotChanged",
      value: function slotChanged(e) {
        this._updateSpanInSlot(e.srcElement, this.shownValue);
      }
    }], [{
      key: "styles",
      get: function get() {
        return [litElement._get(litElement._getPrototypeOf(EnInputRange), "styles", this) || [], litElement.css(_templateObject2())];
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          shownValue: {
            type: String,
            attribute: false
          }
        };
      }
    }]);

    return EnInputRange;
  }(ThemeableMixin.ThemeableMixin('en-input-range')(FormElementMixin.FormElementMixin(StyleableMixin.StyleableMixin(LabelsMixin.LabelsMixin(InputMixin.InputMixin(NativeReflectorMixin.NativeReflectorMixin(litElement.LitElement)))))));

  window.customElements.define('en-input-range', EnInputRange);

});
