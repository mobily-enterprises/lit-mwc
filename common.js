
// HTML Methods (no properties) from HTMLElements https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement#Methods
export const HTMLBasePropsAndMethods = ['blur', 'click', 'focus']

// COMMON PROPERTIES AND METHODS FOR INPUT FORM ELEMENTS
//  - name and value
//  - validation methods common to ALL input forms (setCustomValidity, checkValidity, reportValidity)
//  - common IDL fields (disalbled, hidden)
export const HTMLFormElementPropsAndMethods = [ 'name', 'value', 'setCustomValidity', 'checkValidity', 'reportValidity', 'disabled', 'hidden' ]

// Attributes that makes sense to reflect
export const defaultReflectedAttributes = ['autocomplete', 'autofocus', 'disabled', 'name', 'readonly', 'required', 'tabindex', 'value'] /* type, */
