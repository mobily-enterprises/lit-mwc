define(['exports', './lit-element-aa931cb5'], function (exports, litElement) { 'use strict';

  function _templateObject2() {
    var data = litElement._taggedTemplateLiteral(["\n        <label id=\"label\" for=\"", "\">\n          <div id=\"label-text\">", "</div>\n          <slot id=\"label-slot\" name=\"label\"></slot>\n        </label>\n      "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n          label div#label-text, ::slotted(*) {\n            align-self: center;\n            width: var(--nn-input-label-width, auto);\n          }\n\n        "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }
  var LabelsMixin = function LabelsMixin(base) {
    return (
      /*#__PURE__*/
      function (_base) {
        litElement._inherits(Base, _base);

        litElement._createClass(Base, null, [{
          key: "styles",
          get: function get() {
            return [litElement._get(litElement._getPrototypeOf(Base), "styles", this) || [], litElement.css(_templateObject())];
          }
        }, {
          key: "properties",
          get: function get() {
            return {
              label: {
                type: String
              },
              labelPosition: {
                type: String,
                attribute: 'label-position'
              },
              labelForElement: {
                type: String,
                attribute: 'false'
              }
            };
          }
        }]);

        function Base() {
          var _this;

          litElement._classCallCheck(this, Base);

          _this = litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(Base).call(this));
          _this.labelPosition = 'before';
          _this.labelForElement = 'native';
          return _this;
        }

        litElement._createClass(Base, [{
          key: "labelTemplate",
          get: function get() {
            return litElement.html(_templateObject2(), this.labelForElement, this.label);
          }
        }, {
          key: "ifLabelBefore",
          get: function get() {
            if (this.labelPosition === 'after') return '';
            return this.labelTemplate;
          }
        }, {
          key: "ifLabelAfter",
          get: function get() {
            if (this.labelPosition === 'before') return '';
            return this.labelTemplate;
          }
        }]);

        return Base;
      }(base)
    );
  };

  exports.LabelsMixin = LabelsMixin;

});
