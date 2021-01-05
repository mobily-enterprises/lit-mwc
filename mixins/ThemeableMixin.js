import { LitElement, css, html, unsafeCSS } from 'lit-element'

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

    //  customStyles allows us to dynamically update the shadowRoot adopted StyleSheets by setting this.customStyles with a CSSResult object
    get customStyles () {
      return this._customStyles || css``
    }

    set customStyles (cssTemplate) {
      if (typeof cssTemplate === 'string') {
        cssTemplate = unsafeCSS`${cssTemplate}`
      }
      this._customStyles = cssTemplate
      this.constructor._styles = [...this.constructor._styles, this._customStyles]
      this.adoptStyles()
      this.requestUpdate()
    }

  }
}
