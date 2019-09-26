import { css } from 'lit-element'

export const EnForm = (base) => {
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
