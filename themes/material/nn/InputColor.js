import { css } from 'lit-element'

export const NnInputColor = (base) => {
  return class Base extends base {
    static get styles () {
      return [
        ...super.styles || [],
        css`
        `
      ]
    }
  }
}
