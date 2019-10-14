define(['exports', './lit-element-34339bae', './StyleableMixin-9aebdd05', './ThemeableMixin-c1113bda', './ee-toolbar'], function (exports, litElement, StyleableMixin, ThemeableMixin, eeToolbar) { 'use strict';

  function _templateObject9() {
    var data = litElement._taggedTemplateLiteral(["\n              <slot name=\"header-title\"></slot>\n            "]);

    _templateObject9 = function _templateObject9() {
      return data;
    };

    return data;
  }

  function _templateObject8() {
    var data = litElement._taggedTemplateLiteral(["<div class=\"subtitle\">", "</div>"]);

    _templateObject8 = function _templateObject8() {
      return data;
    };

    return data;
  }

  function _templateObject7() {
    var data = litElement._taggedTemplateLiteral(["\n                ", "\n                ", "\n            "]);

    _templateObject7 = function _templateObject7() {
      return data;
    };

    return data;
  }

  function _templateObject6() {
    var data = litElement._taggedTemplateLiteral(["<button class=\"icon\" title=\"Back\" @click=\"", "\">", "</button>"]);

    _templateObject6 = function _templateObject6() {
      return data;
    };

    return data;
  }

  function _templateObject5() {
    var data = litElement._taggedTemplateLiteral(["<button class=\"icon\" title=\"Menu\" @click=\"", "\">", "</button>"]);

    _templateObject5 = function _templateObject5() {
      return data;
    };

    return data;
  }

  function _templateObject4() {
    var data = litElement._taggedTemplateLiteral(["\n      <div id=\"header\">\n        <ee-toolbar class=\"toolbar\">\n          <div class=\"controls\">\n            ", "\n            ", "\n            <slot name=\"controls\"></slot>\n          </div>\n          <div title>\n          ", "\n          </div>\n          <div class=\"actions\">\n            <slot name=\"actions\"></slot>\n          </div>\n        </ee-toolbar>\n        <slot name=\"sub-toolbar\"></slot>\n      </div>\n    "]);

    _templateObject4 = function _templateObject4() {
      return data;
    };

    return data;
  }

  function _templateObject3() {
    var data = litElement._taggedTemplateLiteral(["\n        :host {\n          display: block;\n          width: 100%;\n        }\n\n        div#header {\n          display: flex;\n          width: 100%;\n          position: sticky;\n          top: 0;\n          right: 0;\n          width: 100%;\n          text-align: center;\n          background-color: var(--header-background, var(--app-header-background-color));\n          color: var(--header-color, var(--app-header-text-color));\n          border-bottom: 1px solid #eee;\n        }\n\n        :host([menu]) div[title], \n        :host([back]) div[title] {\n          padding-right: 46px;\n        }\n\n        :host([menu][back]) div[title]{\n          padding-right: 92px;\n        }\n\n        .toolbar .subtitle {\n          color: rgba(255, 255, 255, 0.75);\n        }\n        .toolbar button.icon {\n          appearance: none;\n          -webkit-appearance: none;\n          font-size: inherit;\n          vertical-align: middle;\n          background: transparent;\n          border: none;\n          cursor: pointer;\n          -webkit-appearance: none;\n          height: 40px;\n          width: 40px;\n          padding: 6px ;\n          margin: auto 3px;\n        }\n\n        .toolbar button.icon:focus, .toolbar button.icon:hover {\n          outline: 0;\n          background: #eeeeee;\n          /* border: 1px solid #bdbdbd; */\n        }\n\n        .toolbar button.icon:active {\n          outline: 0;\n          background: #cccccc;\n          border: 1px solid #bdbdbd;\n          box-shadow: none\n          /* animation: fadeIn 0.1s ease-in; */\n        }\n\n        .toolbar button, .toolbar button svg {\n          color: var(--app-header-text-color);\n          fill: var(--app-header-text-color);\n        }\n\n        .toolbar div.actions {\n          position: absolute;\n          right: 20px;\n          display: inline;\n        }\n\n        ::slotted([slot=actions]) {\n          display: flex\n        }\n\n        .toolbar div.actions ::slotted(*[slot=\"actions\"]) a {\n          line-height: unset\n        }\n\n        .toolbar div.controls {\n          align-items: left;\n        }\n\n        .toolbar div.controls ::slotted(*[slot=\"controls\"]) {\n        }\n\n      "]);

    _templateObject3 = function _templateObject3() {
      return data;
    };

    return data;
  }

  function _templateObject2() {
    var data = litElement._taggedTemplateLiteral(["<svg class=\"icon\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><path d=\"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z\"></path></svg>"]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["<svg class=\"icon\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><path d=\"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z\"></path></svg>"]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }
  var arrowback = litElement.html(_templateObject());
  var menu = litElement.html(_templateObject2());
  var EeHeader =
  /*#__PURE__*/
  function (_LitElement) {
    litElement._inherits(EeHeader, _LitElement);

    litElement._createClass(EeHeader, null, [{
      key: "styles",
      get: function get() {
        return [litElement._get(litElement._getPrototypeOf(EeHeader), "styles", this) || [], litElement.css(_templateObject3())];
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          // Users can set these attributes to get built-in basic controls and title text. 
          // Otherwise, they can user their own with slot="controls" and slot="header-title"
          back: {
            type: Boolean,
            reflect: true
          },
          menu: {
            type: Boolean,
            reflect: true
          },
          headerTitle: {
            type: String,
            attribute: 'header-title'
          },
          headerSubtitle: {
            type: String,
            attribute: 'header-subtitle'
          }
        };
      }
    }]);

    function EeHeader() {
      var _this;

      litElement._classCallCheck(this, EeHeader);

      _this = litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(EeHeader).call(this));
      _this.headerTitle = '';
      return _this;
    }

    litElement._createClass(EeHeader, [{
      key: "render",
      value: function render() {
        return litElement.html(_templateObject4(), this.menu ? litElement.html(_templateObject5(), this._menuEvent, menu) : '', this.back || this.history.length > 1 ? litElement.html(_templateObject6(), this._backEvent, arrowback) : '', this.headerTitle ? litElement.html(_templateObject7(), this.headerTitle, this.headerSubtitle ? litElement.html(_templateObject8(), this.headerSubtitle) : '') : litElement.html(_templateObject9()));
      }
    }, {
      key: "_menuEvent",
      value: function _menuEvent() {
        this.dispatchEvent(new CustomEvent('menu-clicked'));
      }
    }, {
      key: "_backEvent",
      value: function _backEvent() {
        this.dispatchEvent(new CustomEvent('back-clicked'));
      }
    }]);

    return EeHeader;
  }(litElement.LitElement);
  customElements.define('ee-header', EeHeader);

  exports.EeHeader = EeHeader;

  Object.defineProperty(exports, '__esModule', { value: true });

});
