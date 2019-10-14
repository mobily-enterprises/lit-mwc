define(['exports', './lit-element-aa931cb5', './StyleableMixin-6ddce7d4', './ThemeableMixin-c1113bda'], function (exports, litElement, StyleableMixin, ThemeableMixin) { 'use strict';

  function _templateObject4() {
    var data = litElement._taggedTemplateLiteral(["\n        :host {\n          position: relative;\n          display: inline-block;\n          font-size: 0.9em;\n        }\n      "]);

    _templateObject4 = function _templateObject4() {
      return data;
    };

    return data;
  }

  function _templateObject3() {
    var data = litElement._taggedTemplateLiteral(["\n      ", "\n      <slot></slot>\n    "]);

    _templateObject3 = function _templateObject3() {
      return data;
    };

    return data;
  }

  function _templateObject2() {
    var data = litElement._taggedTemplateLiteral(["\n    <li>", " (Capital: ", ")</li>\n    "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n        :host {\n          display: block;\n          padding: 10px;\n          border-bottom: 1px solid #ddd;\n        }\n\n        :host(:last-child) {\n          border-bottom: unset;\n        }\n\n        :host(:hover) {\n          background-color: #eee;\n        }\n\n        li {\n          list-style: none;\n        }\n\n      "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }
  var EeAutocompleteItemCountry =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(EeAutocompleteItemCountry, _ThemeableMixin);

    litElement._createClass(EeAutocompleteItemCountry, null, [{
      key: "styles",
      get: function get() {
        return [litElement._get(litElement._getPrototypeOf(EeAutocompleteItemCountry), "styles", this) || [], litElement.css(_templateObject())];
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          data: {
            type: Object,
            attribute: false
          },
          config: {
            type: Object,
            attribute: false
          }
        };
      }
    }]);

    function EeAutocompleteItemCountry() {
      var _this;

      litElement._classCallCheck(this, EeAutocompleteItemCountry);

      _this = litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(EeAutocompleteItemCountry).call(this));
      _this.config = {
        id: 'id',
        countryName: 'name',
        countryCapital: 'capital'
      };
      return _this;
    }

    litElement._createClass(EeAutocompleteItemCountry, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject2(), this.data[this.config.countryName], this.data[this.config.countryCapital]);
      }
      /* API */

    }, {
      key: "stringToData",
      value: function stringToData(string) {
        var _ref;

        return _ref = {}, litElement._defineProperty(_ref, this.config.countryName, string), litElement._defineProperty(_ref, "valid", true), _ref;
      }
    }, {
      key: "idValue",
      get: function get() {
        return this.data[this.config.id];
      }
    }, {
      key: "textValue",
      get: function get() {
        return this.data[this.config.countryName];
      }
    }], [{
      key: "PickedElement",
      get: function get() {
        return EeAutocompleteItemCountryView;
      }
    }]);

    return EeAutocompleteItemCountry;
  }(ThemeableMixin.ThemeableMixin('ee-autocomplete-item-country')(StyleableMixin.StyleableMixin(litElement.LitElement)));
  customElements.define('ee-autocomplete-item-country', EeAutocompleteItemCountry);

  var EeAutocompleteItemCountryView =
  /*#__PURE__*/
  function (_ThemeableMixin2) {
    litElement._inherits(EeAutocompleteItemCountryView, _ThemeableMixin2);

    function EeAutocompleteItemCountryView() {
      litElement._classCallCheck(this, EeAutocompleteItemCountryView);

      return litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(EeAutocompleteItemCountryView).apply(this, arguments));
    }

    litElement._createClass(EeAutocompleteItemCountryView, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject3(), this.data[this.config.countryName]);
      }
    }], [{
      key: "styles",
      get: function get() {
        return [litElement.css(_templateObject4())];
      }
    }]);

    return EeAutocompleteItemCountryView;
  }(ThemeableMixin.ThemeableMixin('ee-autocomplete-item-country-view')(EeAutocompleteItemCountry));

  customElements.define('ee-autocomplete-item-country-view', EeAutocompleteItemCountryView);

  exports.EeAutocompleteItemCountry = EeAutocompleteItemCountry;

  Object.defineProperty(exports, '__esModule', { value: true });

});
