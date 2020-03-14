import { LitElement, css, html } from 'lit-element'

export const ThemeableMixin = (path) => (base) => {
  const common = (window.TP_THEME && window.TP_THEME.common) || (p => p)
  const theme = (window.TP_THEME && window.TP_THEME[path]) || (p => p)
  return theme(common(LitBits(base)))
}

export const LitBits = (base) => {
  return class Base extends base {
    static get lit () {
      return {
        LitElement,
        css,
        html
      }
    }

    get lit () {
      return {
        LitElement,
        css,
        html
      }
    }
  }
}
