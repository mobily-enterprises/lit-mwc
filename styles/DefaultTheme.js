import { css } from 'lit-element'

// In Material Design color tool: https://material.io/tools/color/#!/?view.left=0&view.right=0&primary.color=616161&secondary.color=512DA8

export const BaseStyle = css`

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
    --error-text: #fff;
    --theme-border-style: solid;
    --theme-border-width: 1px;
    --theme-border-color: var(--primary-color-light);
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
`

export const defaultLabel = css`
  label {
    display: inline-flex;
    position: absolute;
    font-size: 1em;
    border: var(--nn-label-border, none);
    color: var(--nn-label-color,  var(--primary-color-light));
    background-color: var(--nn-label-background, transparent);
    border-radius: var(--nn-label-border-radius, var(--theme-border-radius));
    padding-left: 4px;
    padding-right: 4px;
    min-width: fit-content;
    white-space: nowrap;
    top: 50%;
    transform: translateY(-50%);
  }

  :host([label-position='after']) label {
    border-radius: var(--nn-label-border-radius, 0 4px 4px 0 );
    margin-left: -5px;
    margin-right: unset;
  }

  label div#label-text, ::slotted(*) {
    align-self: center;
    width: var(--nn-input-label-width, auto);
  }

  input:invalid + label, input:invalid ~ label {
    background-color: var(--nn-label-background-invalid, #dd9999);
  }

  :host([label-position='after']) input{
    border-radius: var(--nn-input-border-radius, 4px 0 0 4px );
    margin-right: 4px;
    margin-left: unset;
  }
`

export const InputTextStyle = css`
  :host {
    position: relative;
    height: var(--form-element-height);
    padding: 5px 12px;
  }

  input {
    display: inline-flex;
    border-radius: var(--nn-input-border-radius, 4px 4px 0 0);
    border: unset;
    border-bottom: var(--nn-input-border, var(--theme-border));
    color: var(--nn-input-color, inherit);
    background-color: var(--nn-input-background, var(--input-background));
    -webkit-appearance: none;
    width: 100%;
    float: right;
    font-size: 1em;
    padding-left: 10px;
    margin-left: 4px;
    height: var(--form-element-height)
  }

  input:focus, input:active {
    outline: none
  }

  /* We might decide to keep this */
  /* input:valid {
  border: var(--nn-input-border-invalid, 1px solid green);
  } */

  input:invalid {
    background-color: var(--error-color);
    color: var(--error-text);
    border: var(--nn-input-border-invalid, var(--theme-border));
  }
`

export const ButtonStyle = css `

`
