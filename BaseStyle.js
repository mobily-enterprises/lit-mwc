import { css } from "lit-element";

//In Material Design color tool: https://material.io/tools/color/#!/?view.left=0&view.right=0&primary.color=616161&secondary.color=512DA8

export const DefaultTheme = css`
  :host {
    display: block;
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
    --error-color: #b71c1c;
    --error-text: #fff;
    --theme-border-style: solid; 
    --theme-border-width: 1px;
    --theme-border-color: var(--primary-color-light);
    --theme-border-radius: 4px;
    --theme-border: var(--theme-border-width) var(--theme-border-style) var(--theme-border-color);
    --theme-box-shadow: 
  }

  :host[hidden] {
    display: none;
  }
`