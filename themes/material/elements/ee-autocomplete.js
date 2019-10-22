import { html, css } from 'lit-element'

export const EeAutocomplete = (base) => {
  return class Base extends base {
    static get styles () {
      return [
        ...super.styles || [],
        css`
        `
      ]
    }

    // @tony
    render () {
      console.log('No template')
      return html`
      `
    }
  }
}
