define(['exports', './lit-element-34339bae'], function (exports, litElement) { 'use strict';

  var InputMixin = function InputMixin(base) {
    return (
      /*#__PURE__*/
      function (_base) {
        litElement._inherits(Base, _base);

        function Base() {
          litElement._classCallCheck(this, Base);

          return litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(Base).apply(this, arguments));
        }

        litElement._createClass(Base, [{
          key: "skipAttributes",
          get: function get() {
            return [].concat(litElement._toConsumableArray(litElement._get(litElement._getPrototypeOf(Base.prototype), "skipAttributes", this)), ['type']);
          }
        }, {
          key: "reflectProperties",
          get: function get() {
            return [].concat(litElement._toConsumableArray(litElement._get(litElement._getPrototypeOf(Base.prototype), "reflectProperties", this)), ['formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget', 'name', 'type', 'disabled', 'autofocus', 'required', 'value', 'validity', 'validationMessage', 'willValidate', 'checked', 'defaultChecked', 'indeterminate', 'alt', 'height', 'src', 'width', 'accept', 'allowdirs ', 'files', 'webkitdirectory ', 'webkitEntries ', 'autocomplete', 'max', 'maxLength', 'min', 'minLength', 'pattern', 'placeholder', 'readOnly', 'size', 'selectionStart', 'selectionEnd', 'selectionDirection', 'defaultValue', 'dirName', 'accessKey', 'list', 'multiple', 'files', 'labels', 'step', 'valueAsDate', 'valueAsNumber', 'autocapitalize ', 'inputmode', 'align ', 'useMap ', 'blur', 'click', 'focus', 'select', 'setSelectionRange', 'setRangeText', 'setCustomValidity', 'reportValidity', 'stepDown', 'stepUp']);
          }
        }]);

        return Base;
      }(base)
    );
  };

  exports.InputMixin = InputMixin;

});
