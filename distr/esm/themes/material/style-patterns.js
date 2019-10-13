import{css}from"../../node_modules/lit-element/lit-element.js";// It does not aim to be a complete, comprehensive, Material Design components library, but to showcase the flexiblity of the TPE theming system.
// Guidelines can be found in: https://material.io/components
const requiredLabelAsterisk=css`
  #native:required ~ label div#label-text::after {
    content: '*';
    padding-left: 2px;
    position: relative;
  }
`,hoverStyle=css`
  :host(:hover) {
    --nn-background: var(--nn-background-dark);
    --nn-theme-box-shadow: var(--nn-theme-box-shadow2);
  }
`,focusStyle=css`
  :host([has-focus]) {
    --nn-theme-border: 2px solid var(--nn-primary-color);
    --nn-background: var(--nn-background-dark);
    --nn-label-color: var(--nn-primary-color);
  }

  :host([has-focus]) #native {
    padding-bottom: 5px;
  }
`,inputField=css`
  :host {
    position: relative;
    padding: 0 12px;
    padding-bottom: 16px;
    margin: 10px;
    min-width: var(--nn-form-element-min-width, fit-content);
    font-family: var(--font-family);
    transition: all 0.3s ease-in-out;
  }

  #native {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    box-sizing: border-box;
    display: block;
    border-radius: var(--nn-input-border-radius, 4px 4px 0 0);
    border-width: 0;
    border-style: none;
    border-color: transparent; 
    border-bottom: var(--nn-input-border, var(--nn-theme-border));
    color: var(--nn-input-color, inherit);
    background-color: var(--nn-background, #eee);
    width: 100%;
    font-size: 1em;
    padding: 20px 16px 6px;
    height: var(--nn-form-element-height);
    box-shadow: var(--nn-theme-box-shadow);
    transition: all 0.3s ease-in-out;
  }

  #native:focus,
  #native:active {
    outline: none
  }

  #native::selection {
    background-color: var(--nn-background-dark);
  }

  #native:invalid {
    background-color: var(--nn-error-color);
    color: var(--nn-error-text);
    border-color: var(--nn-error-text);
  }

  ${hoverStyle}
  ${focusStyle}
`,inputLabel=css`
   label {
    position: absolute;
    display: inline-flex;
    font-size: 1em;
    border: var(--nn-label-border, none);
    color: var(--nn-label-color,  var(--nn-primary-color-light));
    padding-left: 12px;
    padding-right: 12px;
    min-width: fit-content;
    white-space: nowrap;
    top: calc(50% - 8px);
    transform: translateY(-50%);
    will-change: transform, background-color;
    transition: all 0.3s ease-in-out;
  }

  #native:invalid + label,
  #native:invalid ~ label {
    background-color: none;
    --nn-label-color: darkred;
  }

  ${requiredLabelAsterisk}
`,floatingLabel=css`
 
  :host([has-value]) label, 
  #native:focus ~ label, 
  #native:placeholder-shown ~ label {
    transform: translateY(-130%);
    font-size: 80%;
    transition: all 0.3s ease-in-out;
    margin-left: 0px;
  }

`,fixedLabel=css`
  label, #native:focus ~ label,
  :host([has-value]) label,
  #native:placeholder-shown ~ label {
    top: 12px !important;
    transform: translateY(-50%);;
    font-size: 80%;
    transition: all 0.3s ease-in-out;
  }

`,errorMessage=css`
  span.error-message {
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
    left: 16px;
    font-size: 80%;
    white-space:nowrap;
    opacity: 0;
    will-change: transform, opacity;
    transition: all 0.3s ease-in-out;
  }

  #native:invalid ~ span.error-message {
    opacity: 1;
    transform: translateY(10%);
    transition: all 0.3s ease-in-out;
  }
`,hideNativeWidget=css`
  input {
    position: unset;
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
`;// export const requiredStyle
// export const invalidStyle
var stylePatterns={requiredLabelAsterisk:requiredLabelAsterisk,hoverStyle:hoverStyle,focusStyle:focusStyle,inputField:inputField,inputLabel:inputLabel,floatingLabel:floatingLabel,fixedLabel:fixedLabel,errorMessage:errorMessage,hideNativeWidget:hideNativeWidget};export{stylePatterns as $stylePatterns,errorMessage,fixedLabel,floatingLabel,focusStyle,hideNativeWidget,hoverStyle,inputField,inputLabel,requiredLabelAsterisk};