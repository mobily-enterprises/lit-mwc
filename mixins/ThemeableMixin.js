export const ThemeableMixin = (path) => (base) => {
  const theme = window.TP_THEME && window.TP_THEME[path]
  if (theme) return theme(base)
  else return base
}
