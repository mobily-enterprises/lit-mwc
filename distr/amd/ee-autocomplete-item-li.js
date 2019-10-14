define(['exports', './lit-element-aa931cb5', './StyleableMixin-6ddce7d4', './ThemeableMixin-c1113bda'], function (exports, litElement, StyleableMixin, ThemeableMixin) { 'use strict';

  function _templateObject4() {
    var data = litElement._taggedTemplateLiteral(["\n      -", "-\n    "]);

    _templateObject4 = function _templateObject4() {
      return data;
    };

    return data;
  }

  function _templateObject3() {
    var data = litElement._taggedTemplateLiteral(["\n        :host {\n          display: inline-block;\n        }\n      "]);

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
  var EeAutocompleteItemLi =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(EeAutocompleteItemLi, _ThemeableMixin);

    litElement._createClass(EeAutocompleteItemLi, null, [{
      key: "styles",
      get: function get() {
        return [litElement._get(litElement._getPrototypeOf(EeAutocompleteItemLi), "styles", this) || [], litElement.css(_templateObject())];
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

    function EeAutocompleteItemLi() {
      var _this;

      litElement._classCallCheck(this, EeAutocompleteItemLi);

      _this = litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(EeAutocompleteItemLi).call(this));
      _this.config = {
        id: 'id',
        path: 'name'
      };
      return _this;
    }

    litElement._createClass(EeAutocompleteItemLi, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject2(), this.data[this.config.path]);
      }
      /* API */

    }, {
      key: "stringToData",
      value: function stringToData(string) {
        return litElement._defineProperty({}, this.config.path, string);
      }
    }, {
      key: "idValue",
      get: function get() {
        return this.data[this.config.id];
      }
    }, {
      key: "textValue",
      get: function get() {
        return this.data[this.config.path];
      }
    }], [{
      key: "PickedElement",
      get: function get() {
        return EeAutocompleteItemLiView;
      }
    }]);

    return EeAutocompleteItemLi;
  }(ThemeableMixin.ThemeableMixin('ee-autocomplete-item-li')(StyleableMixin.StyleableMixin(litElement.LitElement)));
  customElements.define('ee-autocomplete-item-li', ThemeableMixin.ThemeableMixin('ee-autocomplete-item-li-view')(EeAutocompleteItemLi));

  var EeAutocompleteItemLiView =
  /*#__PURE__*/
  function (_LitElement) {
    litElement._inherits(EeAutocompleteItemLiView, _LitElement);

    litElement._createClass(EeAutocompleteItemLiView, null, [{
      key: "styles",
      get: function get() {
        return [litElement._get(litElement._getPrototypeOf(EeAutocompleteItemLiView), "styles", this) || [], litElement.css(_templateObject3())];
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

    function EeAutocompleteItemLiView() {
      var _this2;

      litElement._classCallCheck(this, EeAutocompleteItemLiView);

      _this2 = litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(EeAutocompleteItemLiView).call(this));
      _this2.config = {
        id: 'id',
        path: 'name'
      };
      return _this2;
    }

    litElement._createClass(EeAutocompleteItemLiView, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject4(), this.data[this.config.path]);
      }
    }]);

    return EeAutocompleteItemLiView;
  }(litElement.LitElement);

  customElements.define('ee-autocomplete-item-li-view', EeAutocompleteItemLiView);

  exports.EeAutocompleteItemLi = EeAutocompleteItemLi;

  Object.defineProperty(exports, '__esModule', { value: true });

});
