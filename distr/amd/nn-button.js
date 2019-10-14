define(['./lit-element-aa931cb5', './StyleableMixin-6ddce7d4', './ThemeableMixin-c1113bda', './NativeReflectorMixin-3fb8ab21', './FormElementMixin-c7714e77'], function (litElement, StyleableMixin, ThemeableMixin, NativeReflectorMixin, FormElementMixin) { 'use strict';

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n      ", "\n      <button @click=\"", "\" id=\"native\">\n        <slot></slot>\n      </button>\n    "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  var NnButton =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(NnButton, _ThemeableMixin);

    function NnButton() {
      litElement._classCallCheck(this, NnButton);

      return litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(NnButton).apply(this, arguments));
    }

    litElement._createClass(NnButton, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject(), this.customStyle, this._clicked);
      }
    }, {
      key: "_clicked",
      value: function _clicked() {
        if (this.getAttribute('type') === 'submit') this.form.submit();
      }
    }, {
      key: "skipAttributes",
      get: function get() {
        return [].concat(litElement._toConsumableArray(litElement._get(litElement._getPrototypeOf(NnButton.prototype), "skipAttributes", this)), ['form']);
      }
    }, {
      key: "reflectProperties",
      get: function get() {
        return [].concat(litElement._toConsumableArray(litElement._get(litElement._getPrototypeOf(NnButton.prototype), "reflectProperties", this)), ['accessKey', 'autofocus', 'disabled', 'formAction', 'formEnctype', 'formMethod', 'formNoValidate', 'formTarget', 'labels', 'menu ', 'name', 'tabIndex', 'type', 'willValidate', 'validationMessage', 'validity', 'value', 'reportValidity', 'setCustomValidity']);
      }
    }], [{
      key: "styles",
      get: function get() {
        return [litElement._get(litElement._getPrototypeOf(NnButton), "styles", this) || []];
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          stylesheet: {
            type: String
          },
          customCSS: {
            type: Object
          },
          raised: {
            type: Boolean,
            reflect: true
          }
        };
      }
    }]);

    return NnButton;
  }(ThemeableMixin.ThemeableMixin('nn-button')(FormElementMixin.FormElementMixin(StyleableMixin.StyleableMixin(NativeReflectorMixin.NativeReflectorMixin(litElement.LitElement)))));

  customElements.define('nn-button', NnButton);

});
