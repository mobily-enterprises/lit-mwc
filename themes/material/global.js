import { css } from 'lit-element'

// In Material Design color tool: https://material.io/tools/color/#!/?view.left=0&view.right=0&primary.color=616161&secondary.color=512DA8

export const Global = (base) => {
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
            appearance: none;
            -moz-appearance: none;
            -webkit-appearance: none;
            box-sizing: border-box;
            --nn-font-family: var(--app-font-family, Roboto, sans-serif);
            --nn-primary-color: var(--app-primary-color, #455a64);
            --nn-primary-color-light: var(--app-primary-color-light, #718792);
            --nn-primary-color-dark: var(--app-primary-color-dark, #1c313a);
            --nn-secondary-color: var(--app-secondary-color, #512da8);
            --nn-secondary-color-light: var(--app-secondary-color-light, #8559da);
            --nn-secondary-color-dark: var(--app-secondary-color-dark, #140078);
            --nn-boundaries-color: var(--app-boundaries-color, #777);
            --nn-primary-text: var(--app-primary-text, #777);
            --nn-secondary-text: var(--app-secondary-text, #000);
            --nn-text-on-dark: var(--app-text-on-dark, #fff);
            --nn-text-on-light: var(--app-text-on-light, #000);
            --nn-error-color: var(--app-error-color, pink);
            --nn-error-text: var(--app-error-text, darkred);
            --nn-theme-border-style: var(--app-theme-border-style, solid);
            --nn-theme-border-width: var(--app-theme-border-width, 1px);
            --nn-theme-border-color: var(--nn-boundaries-color);
            --nn-theme-border-radius: var(--app-theme-border-radius, 5px);
            --nn-theme-border: var(--app-theme-border, var(--nn-theme-border-width) var(--nn-theme-border-style) var(--nn-theme-border-color));
            --nn-theme-box-shadow: var(--app-theme-box-shadow, none);
            --nn-theme-box-shadow1: var(--app-theme-box-shadow1, 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06));
            --nn-theme-box-shadow2: var(--app-theme-box-shadow2, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06));
            --nn-theme-box-shadow3: var(--app-theme-box-shadow3, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05));
            --nn-theme-box-shadow4: var(--app-theme-box-shadow4, 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04));
            --nn-theme-box-shadow5: var(--app-theme-box-shadow5, 0 25px 50px -12px rgba(0, 0, 0, 0.25));
            --nn-theme-shadow-transition: var(--app-theme-shadow-transition, box-shadow 0.3s cubic-bezier(.25,.8,.25,1));
            --nn-form-element-height: var(--app-form-element-height, 56px);
            --nn-form-element-min-width: var(--app-form-element-height, 280px);
            --nn-background: var(--app-background, #eee);
            --nn-background-dark: var(--app-background-dark, #ccc);
          }

          :host([hidden]) {
            display: none;
          }
        `
      ]
    }
  }
}
