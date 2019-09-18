import { BaseStyle, InputTextStyle, ButtonStyle } from '../styles/DefaultTheme'

window.TP_THEME = {
  'nn/InputText': (base) => {
    return class Base extends base {
      static get styles () {
        return [ ...super.styles, BaseStyle, InputTextStyle]
      }
    }
  },
  'nn/InputButton': (base) => {
    return class Base extends base {
      static get styles () {
        return [ ...super.styles, BaseStyle, ButtonStyle]
      }
    }
  }
}