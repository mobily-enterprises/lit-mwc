define(['exports'], function (exports) { 'use strict';

  var ThemeableMixin = function ThemeableMixin(path) {
    return function (base) {
      var common = window.TP_THEME && window.TP_THEME.common || function (p) {
        return p;
      };

      var theme = window.TP_THEME && window.TP_THEME[path] || function (p) {
        return p;
      };

      return theme(common(base));
    };
  };

  exports.ThemeableMixin = ThemeableMixin;

});
