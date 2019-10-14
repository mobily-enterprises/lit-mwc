define(['exports', './lit-element-aa931cb5', './LabelsMixin-8c5eaa35', './StyleableMixin-6ddce7d4', './ThemeableMixin-c1113bda', './NativeReflectorMixin-3fb8ab21', './InputMixin-7662a43a', './FormElementMixin-c7714e77'], function (exports, litElement, LabelsMixin, StyleableMixin, ThemeableMixin, NativeReflectorMixin, InputMixin, FormElementMixin) { 'use strict';

  function _templateObject2() {
    var data = litElement._taggedTemplateLiteral(["\n      ", "\n      ", "\n      ", "\n      <input type=\"file\" id=\"native\" @change=\"", "\" hidden>\n      ", "\n      ", "\n      ", "\n    "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    var data = litElement._taggedTemplateLiteral(["\n        /* :host {\n          display: flex;\n          height: 30px;\n        } */\n\n        /* From https://zellwk.com/blog/hide-content-accessibly/ */\n        [hidden] {\n          border: 0;\n          clip: rect(0 0 0 0);\n          height: auto; /* new - was 1px */\n          margin: 0; /* new - was -1px */\n          overflow: hidden;\n          padding: 0;\n          position: absolute;\n          width: 1px;\n          white-space: nowrap; /* 1 */\n        }\n      "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }
  var NnInputFile =
  /*#__PURE__*/
  function (_ThemeableMixin) {
    litElement._inherits(NnInputFile, _ThemeableMixin);

    litElement._createClass(NnInputFile, null, [{
      key: "styles",
      get: function get() {
        return [litElement._get(litElement._getPrototypeOf(NnInputFile), "styles", this) || [], litElement.css(_templateObject())];
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          fileName: {
            type: String
          },
          manyFilesText: {
            type: String,
            attribute: 'many-files-text'
          }
        };
      }
    }]);

    function NnInputFile() {
      var _this;

      litElement._classCallCheck(this, NnInputFile);

      _this = litElement._possibleConstructorReturn(this, litElement._getPrototypeOf(NnInputFile).call(this));
      _this.manyFilesText = 'Many';
      return _this;
    }

    litElement._createClass(NnInputFile, [{
      key: "render",
      value: function render() {
        // From https://stackoverflow.com/a/25825731/829771
        return litElement.html(_templateObject2(), this.customStyle, this.ifLabelBefore, this.ifValidationMessageBefore, this.fileNameChanged, this.ifValidationMessageAfter, this.fileName, this.ifLabelAfter);
      }
    }, {
      key: "fileNameChanged",
      value: function fileNameChanged(e) {
        var native = this.shadowRoot.querySelector('#native');
        this.fileName = native.files.length > 1 ? this.manyFilesText : native.value;
      }
    }]);

    return NnInputFile;
  }(ThemeableMixin.ThemeableMixin('nn-input-file')(FormElementMixin.FormElementMixin(StyleableMixin.StyleableMixin(LabelsMixin.LabelsMixin(InputMixin.InputMixin(NativeReflectorMixin.NativeReflectorMixin(litElement.LitElement)))))));
  customElements.define('nn-input-file', NnInputFile);

  exports.NnInputFile = NnInputFile;

  Object.defineProperty(exports, '__esModule', { value: true });

});
