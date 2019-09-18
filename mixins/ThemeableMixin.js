// Ideally, the mixin would be able "mix" any properties in theme. We might need to use older syntax for that.
const themeMixin = (base, theme) => {
  return class Base extends base {

    static get styles () {
      return [
        super.styles || [],
        ...theme.styles
      ]
    }

    static get properties () {
      return { 
        ...super.properties,
        ...theme.properties || {}
      }
    }
    
  }
}

export const ThemeableMixin = (path) => (base) => {
  const theme = window.TP_THEME && window.TP_THEME[path]
  console.log(theme);
  if (theme) return themeMixin(base, theme)
  else return base
}
