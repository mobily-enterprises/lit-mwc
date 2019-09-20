import { css } from 'lit-element'

// In Material Design color tool: https://material.io/tools/color/#!/?view.left=0&view.right=0&primary.color=616161&secondary.color=512DA8

export const CommonStyle = (base) => {
  return class Base extends base {
    static get styles () {
      return [
        ...super.styles,
        css`

        @-webkit-keyframes fadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
        @-moz-keyframes fadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
        @-o-keyframes fadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes fadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }

        @-webkit-keyframes fadeOut {
          0%   { opacity: 1; }
          100% { opacity: 0; }
        }
        @-moz-keyframes fadeOut {
          0%   { opacity: 1; }
          100% { opacity: 0; }
        }
        @-o-keyframes fadeOut {
          0%   { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes fadeOut {
          0%   { opacity: 1; }
          100% { opacity: 0; }
        }

        :host {
          display: block;
          --font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          --primary-color: #616161;
          --primary-color-light: #8e8e8e;
          --primary-color-dark: #373737;
          --secondary-color: #512da8;
          --secondary-color-light: #8559da;
          --secondary-color-dark: #140078;
          --primary-text: #fff;
          --secondary-text: #000;
          --text-on-dark: #fff;
          --text-on-light: #000;
          --error-color: pink;
          --error-text: darkred;
          --theme-border-style: solid;
          --theme-border-width: 1px;
          --theme-border-color: var(--primary-color);
          --theme-border-radius: 5px;
          --theme-border: var(--theme-border-width) var(--theme-border-style) var(--theme-border-color);
          --theme-box-shadow1: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          --theme-box-shadow2: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          --theme-box-shadow3: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          --theme-box-shadow4: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          --theme-box-shadow5: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          --theme-shadow-transition: box-shadow 0.3s cubic-bezier(.25,.8,.25,1);
          --form-element-height: 40px;
          --input-background: #eeeeee;
        }

        :host[hidden] {
          display: none;
        }

        body {
          font-family: var(--font-family)
        }
      `
    ]
    }
  }
}
