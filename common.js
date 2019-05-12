// ALL VISIBLE FORM ELEMENTS https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Forms
// - button        https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement
// - input (HUGE)  https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
// - meter N       https://developer.mozilla.org/en-US/docs/Web/API/HTMLMeterElement
// - progress N    https://developer.mozilla.org/en-US/docs/Web/API/HTMLProgressElement
// - select        https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement
// - textarea      https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement
// * They all implement 'setCustomValidity', 'checkValidity', 'reportValidity' except meter and progress
//

//
// HTML Methods from HTMLElements https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement#Methods
export const HTMLBasePropsAndMethods = ['blur', 'click', 'focus']

// COMMON PROPERTIES AND METHODS FOR INPUT FORM ELEMENTS
//  - name and value
//  - validation methods common to ALL input forms (setCustomValidity, checkValidity, reportValidity)
//  - common IDL fields (disalbled, hidden)
export const HTMLFormElementPropsAndMethods = [ 'name', 'value', 'setCustomValidity', 'checkValidity', 'reportValidity', 'disabled', 'hidden' ]

// Attributes that makes sense to reflect
export const defaultReflectedAttributes = ['autocomplete', 'autofocus', 'disabled', 'name', 'readonly', 'required', 'tabindex', 'value'] /* type, */
