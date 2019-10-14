define(['exports', './lit-element-aa931cb5', './StyleableMixin-6ddce7d4', './ThemeableMixin-c1113bda'], function (exports, litElement, StyleableMixin, ThemeableMixin) { 'use strict';

  function _templateObject4() {
    var data = litElement._taggedTemplateLiteral(["<button id=\"close\" @click=\"", "\">", "</button>"]);

    _templateObject4 = function _templateObject4() {
      return data;
    };

    return data;
  }

  function _templateObject3() {
    var data = litElement._taggedTemplateLiteral(["\n      <div class=\"container\">\n        ", "\n        <nav>\n          <slot></slot>\n        </nav>\n      </div>\n    "]);

    _templateObject3 = function _templateObject3() {
      return data;
    };

    return data;
  }

  function _templateObject2() {
    var data = litElement._taggedTemplateLiteral(["\n        :host {\n          display: block;\n          position: fixed;\n          top: 0;\n          left: 0;\n        }\n\n        :host([opened]) {\n          width: 100vw;\n          height: 100vh;\n        }\n\n        div.container {\n          height: 100vh;\n          position: fixed;\n          top: 0;\n          left: 0;\n          will-change: transform;\n          transform: translateX(-100%);\n          overflow-x: hidden;\n          transition: transform 0.3s ease-out;\n          background-color: var(--drawer-background, initial);\n        }\n\n        :host([opened]) div.container {\n          will-change: transform;\n          transform: translateX(0);\n        }\n\n        :host([modal][opened]) div.container {\n          box-shadow: var(--drawer-shadow, 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.14), 0 0 0 100vw rgba(0, 0, 0, 0.15)) \n        }\n\n        #close {\n          -webkit-appearance: none;\n          color: white;\n          fill: white;\n          position: absolute;\n          top: 5px;\n          right: 5px;\n          z-index: 10;\n          background: transparent;\n          border: none;\n        }\n\n        button#close:focus, button#close:active {\n            outline: none !important;\n          }\n\n        button#close:active {\n          filter: brightness(50%)\n        }\n\n\n        .container > nav  {\n          box-sizing: border-box;\n          width: 100%;\n          min-width: 300px;\n          height: 100%;\n          padding: 24px;\n          background: var(--app-drawer-background-color);\n          position: relative;\n          overflow: scroll;\n          padding-bottom: 64px;\n        }\n\n        .container > nav ::slotted(a),\n        .container > nav ::slotted(.drawer-item) {\n          display: block;\n          text-decoration: none;\n          color: var(--app-drawer-text-color);\n          line-height: 40px;\n          padding: 0 24px;\n          cursor: pointer;\n        }\n\n        .container  > nav ::slotted(a[selected]),\n        .container  > nav ::slotted(.drawer-item[selected]) {\n          color: var(--app-drawer-selected-color);\n          font-weight: bolder;\n          border-left: 3px solid var(--app-drawer-selected-color);\n          background-color: rgba(255,255,255, 0.1);\n        }\n\n        .container  > nav ::slotted(a:hover),\n        .container  > nav ::slotted(.drawer-item:hover) {\n          background-color: rgba(255,255,255, 0.05);\n        }\n\n        .container  > nav ::slotted(* .head) {\n          color: white;\n          width: 100%;\n          border-bottom: 1px solid white;\n          padding: 6px 70% 6px 0;\n          font-size: 1.15em;\n          margin: 10px auto;\n        }\n      "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["<svg class=\"icon\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"></path></svg>"]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }
  var close = litElement.html(_templateObject());
  var EeDrawer =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(EeDrawer, _ThemeableMixin);

    litElement._createClass(EeDrawer, null, [{
      key: "styles",
      get: function get() {
        return [litElement.css(_templateObject2())];
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          opened: {
            type: Boolean,
            reflect: true
          },
          modal: {
            type: Boolean
          },
          closeButton: {
            type: Boolean,
            attribute: 'close-button'
          }
        };
      }
    }]);

    function EeDrawer() {
      var _this;

      litElement._classCallCheck(this, EeDrawer);

      _this = litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(EeDrawer).call(this));
      _this.modal = false;
      _this.closeButton = true;
      _this.opened = false;
      return _this;
    }

    litElement._createClass(EeDrawer, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        litElement._get(litElement._getPrototypeOf(EeDrawer.prototype), "connectedCallback", this).call(this);

        this.addEventListener('click', this._handleOutsideClick);
      }
    }, {
      key: "render",
      value: function render() {
        return litElement.html(_templateObject3(), this.closeButton ? litElement.html(_templateObject4(), this.close, close) : '');
      }
    }, {
      key: "open",
      value: function open() {
        this.opened = true;
      }
    }, {
      key: "_handleOutsideClick",
      value: function _handleOutsideClick(e) {
        if (e.target.nodeName === 'EE-DRAWER') this.close();
      }
    }, {
      key: "close",
      value: function close() {
        this.opened = false;
      }
    }]);

    return EeDrawer;
  }(ThemeableMixin.ThemeableMixin('ee-drawer')(StyleableMixin.StyleableMixin(litElement.LitElement)));
  customElements.define('ee-drawer', EeDrawer);

  exports.EeDrawer = EeDrawer;

  Object.defineProperty(exports, '__esModule', { value: true });

});
