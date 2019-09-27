import { css } from 'lit-element'

export const inputLabel = css`
   label {
    position: absolute;
    font-size: 1em;
    border: var(--nn-label-border, none);
    color: var(--nn-label-color,  var(--nn-primary-color-light));
    background-color: var(--nn-label-background, transparent);
    border-radius: var(--nn-label-border-radius, var(--nn-theme-border-radius));
    padding-left: 8px;
    padding-right: 8px;
    min-width: fit-content;
    white-space: nowrap;
    top: 50%;
    transform: translateY(-50%);
    will-change: transform, background-color;
    transition: all 0.3s ease-in-out;
  }

  #native:invalid + label,
  #native:invalid ~ label {
    background-color: none;
    --nn-label-color: darkred;
  }

  #native:required ~ label::after {
    content: '*';
    padding-left: 2px;
    position: relative;
  }
`

export const floatingLabel = css`
  label::before {
    position: absolute;
    content: '';
    transform: translateY(-100%);
    transition: all 0.4s ease-in-out;
    opacity: 0;
    user-select: none;
    pointer-events: none;
    z-index: -1;
    will-change: transform;
    transition: all 0.35s ease-in-out;
  }

  :host([has-value]) label::before,
  #native:focus ~ label::before {
    left: 0;
    content: '';
    transform: translateY(0);
    background-color: var(--nn-floating-label-background, white);
    border-radius: var(--nn-label-border-radius, 0 0 12px 0);
    opacity: 1;
    width: 100%;
    height: 100%;
    transition: all 0.35s ease-in-out;
  }

  :host([has-value]) label, 
  #native:focus ~ label  {
    transform: translateY(-155%);
    font-size: 80%;
    transition: all 0.3s ease-in-out;
    margin-left: 0px;
  }

`

export const fixedLabel = css`
  label, #native:focus ~ label,
  :host([has-value]) label {
    top: 12px !important;
    transform: translateY(-50%);;
    font-size: 80%;
    transition: all 0.3s ease-in-out;
  }

  label::before,
  :host([has-value]) label::before,
  select:focus ~ label::before {
    left: 0;
    content: '';
    transform: translateY(0);
    background-color: var(--nn-floating-label-background, white);
    border-radius: var(--nn-label-border-radius, 0 0 12px 0);
    opacity: 1;
    width: 100%;
    height: 100%;
    transition: all 0.35s ease-in-out;
    user-select: none;
    pointer-events: none;
    z-index: -1;
    will-change: transform;
  }

`

export const inputField = css`
  :host {
    position: relative;
    height: var(--nn-form-element-height);
    padding: 12px;
    margin: 10px;
    width: fit-content;
    font-family: var(--font-family);
  }

  #native {
    display: inline-flex;
    border-radius: var(--nn-input-border-radius, 4px 4px 0 0);
    border: unset;
    border-bottom: var(--nn-input-border, var(--nn-theme-border));
    color: var(--nn-input-color, inherit);
    background-color: var(--nn-input-background, var(--nn-input-background));
    width: 100%;
    font-size: 1em;
    padding-left: 10px;
    height: var(--nn-form-element-height)
  }

  #native:focus,
  #native:active {
    outline: none
  }

  #native:invalid {
    background-color: var(--nn-error-color);
    color: var(--nn-error-text);
    border-color: var(--nn-error-text);
  }

`
export const errorMessage = css`
  span.error-message {
    position: absolute;
    top: calc(100% - 3px);
    /* transform: translateY(0px); */
    left: 16px;
    font-size: 80%;
    white-space:nowrap;
    opacity: 0;
    will-change: transform, opacity;
    transition: all 0.3s ease-in-out;
  }

  #native:invalid ~ span.error-message {
    transform: translateY(-6px);
    opacity: 1;
    transition: all 0.3s ease-in-out;
  }
`
