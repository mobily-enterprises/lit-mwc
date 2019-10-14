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
    var data = litElement._taggedTemplateLiteral(["\n    <li>", "</li>\n    "]);

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
  var EeAutocompleteItemEmail =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(EeAutocompleteItemEmail, _ThemeableMixin);

    litElement._createClass(EeAutocompleteItemEmail, null, [{
      key: "styles",
      get: function get() {
        return [litElement._get(litElement._getPrototypeOf(EeAutocompleteItemEmail), "styles", this) || [], litElement.css(_templateObject())];
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

    function EeAutocompleteItemEmail() {
      var _this;

      litElement._classCallCheck(this, EeAutocompleteItemEmail);

      _this = litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(EeAutocompleteItemEmail).call(this));
      _this.config = {
        id: 'id',
        emailName: 'name',
        emailAddress: 'email'
      };
      return _this;
    }

    litElement._createClass(EeAutocompleteItemEmail, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject2(), this.textValue);
      }
      /* API */

    }, {
      key: "_textValueGetter",
      value: function _textValueGetter() {
        var short = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        if (short) return this.data[this.config.emailName] || this.data[this.config.emailAddress];
        var name = this.data[this.config.emailName];
        var address = this.data[this.config.emailAddress];
        if (name && address) return "".concat(name, " <").concat(address, ">");else if (name) return name;else if (address) return address;else return '';
      }
    }, {
      key: "stringToData",
      value: function stringToData(string) {
        var _ref2;

        var emailName;
        var emailAddress;

        if (!string.match('@')) {
          var _ref;

          return _ref = {}, litElement._defineProperty(_ref, this.config.emailName, string), litElement._defineProperty(_ref, this.config.emailAddress, ''), litElement._defineProperty(_ref, "valid", false), _ref;
        }

        var emails = string.match(/[^@<\s]+@[^@\s>]+/g);

        if (emails) {
          emailAddress = emails[0];
        }

        var names = string.split(/\s+/);

        if (names.length > 1) {
          names.pop();
          emailName = names.join(' ').replace(/"/g, '');
        }

        var valid = !!emailAddress;
        return _ref2 = {}, litElement._defineProperty(_ref2, this.config.emailName, emailName), litElement._defineProperty(_ref2, this.config.emailAddress, emailAddress), litElement._defineProperty(_ref2, "valid", valid), _ref2;
      }
    }, {
      key: "idValue",
      get: function get() {
        return this.data[this.config.id];
      }
    }, {
      key: "textValue",
      get: function get() {
        return this._textValueGetter();
      }
    }], [{
      key: "PickedElement",
      get: function get() {
        return EeAutocompleteItemEmailView;
      }
    }]);

    return EeAutocompleteItemEmail;
  }(ThemeableMixin.ThemeableMixin('ee-autocomplete-item-email')(StyleableMixin.StyleableMixin(litElement.LitElement)));
  customElements.define('ee-autocomplete-item-email', EeAutocompleteItemEmail);

  var EeAutocompleteItemEmailView =
  /*#__PURE__*/
  function (_ThemeableMixin2) {
    litElement._inherits(EeAutocompleteItemEmailView, _ThemeableMixin2);

    function EeAutocompleteItemEmailView() {
      litElement._classCallCheck(this, EeAutocompleteItemEmailView);

      return litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(EeAutocompleteItemEmailView).apply(this, arguments));
    }

    litElement._createClass(EeAutocompleteItemEmailView, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject3(), this._textValueGetter(true));
      }
    }], [{
      key: "styles",
      get: function get() {
        return [litElement.css(_templateObject4())];
      }
    }]);

    return EeAutocompleteItemEmailView;
  }(ThemeableMixin.ThemeableMixin('ee-autocomplete-item-email-view')(EeAutocompleteItemEmail));

  customElements.define('ee-autocomplete-item-email-view', EeAutocompleteItemEmailView);

  exports.EeAutocompleteItemEmail = EeAutocompleteItemEmail;

  Object.defineProperty(exports, '__esModule', { value: true });

});
