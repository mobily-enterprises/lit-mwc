define(['exports', './lit-element-aa931cb5'], function (exports, litElement) { 'use strict';

  function _templateObject3() {
    var data = litElement._taggedTemplateLiteral(["", ""]);

    _templateObject3 = function _templateObject3() {
      return data;
    };

    return data;
  }

  function _templateObject2() {
    var data = litElement._taggedTemplateLiteral(["<link rel=\"stylesheet\" href=\"", "\">"]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n          ", "\n          ", "\n        "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }
  var StyleableMixin = function StyleableMixin(base) {
    return (
      /*#__PURE__*/
      function (_base) {
        litElement._inherits(Base, _base);

        function Base() {
          litElement._classCallCheck(this, Base);

          return litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(Base).apply(this, arguments));
        }

        litElement._createClass(Base, [{
          key: "customStyle",
          get: function get() {
            return litElement.html(_templateObject(), this.stylesheet ? litElement.html(_templateObject2(), this.stylesheet) : '', this.elementStyle ? litElement.html(_templateObject3(), this.elementStyle) : '');
          }
        }], [{
          key: "properties",
          get: function get() {
            return {
              /* This is for non-developers consumers, using attribute */
              stylesheet: {
                type: String
              },

              /* This is for developers, assigning property */
              elementStyle: {
                type: Object,
                attribute: false
              }
            };
          }
        }, {
          key: "styles",
          get: function get() {
            return [litElement._get(litElement._getPrototypeOf(Base), "styles", this) || []];
          }
        }]);

        return Base;
      }(base)
    );
  };

  exports.StyleableMixin = StyleableMixin;

});
