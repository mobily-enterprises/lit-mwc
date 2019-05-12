
// ALL VISIBLE FORM ELEMENTS https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Forms
// - input
//    - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
//    - https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
// - button
//     - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
//     - https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement
// - meter
//     - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter
//     - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMeterElement
// - progress
//     - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress
//     - https://developer.mozilla.org/en-US/docs/Web/API/HTMLProgressElement
// - select
//     - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
//     - https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement
// - textarea
//     - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea
//     - https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement

// HTML Methods from HTMLElements https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement#Methods
export const baseProperties = ['blur', 'click', 'focus', 'forceSpellCheck']

// - ALL IDL attributes listed in MDN
//   - https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
// - PLUS ALL methods and properties for the Constraint validation API
//   - https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation
//   - Applicable to Button, Input, Select, Textarea
// - PLUS ALL extra properties found here
//   - <input> https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
//   - <button> https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement
// - MINUS
//    - `form`, which is set by the constructor in CommonMixin
export const buttonIDLProperties = [ 'autoFocus', 'disabled', 'formAction', 'formNoValidate', 'name', 'type', 'value', 'validity', 'validationMessage', 'willValidate', 'checkValidity', 'reportValidity', 'setCustomValidity', 'formEncType', 'formMethod', 'formTarget', 'labels', 'menu' ]
export const inputIDLProperties = [ 'accept', 'alt', 'autocomplete', 'autofocus', 'checked', 'dirName', 'disabled', 'formAction', 'height', 'list', 'max', 'maxLength', 'minLength', 'min', 'multiple', 'name', 'pattern', 'placeholder', 'readOnly', 'required', 'size', 'src', 'step', 'type', 'usemap', 'value', 'width', 'validity', 'validationMessage', 'willValidate', 'setCustomValidity', 'checkValidity', 'reportValidity', 'formEncType', 'formenctype', 'formMethod', 'formNoValidate', 'formTarget', 'defaultChecked', 'indeterminate', 'allowdirs', 'files', 'select', 'selectionStart', 'selectionEnd', 'selectionDirection', 'defaultValue', 'labels', 'valueAsDate', 'valueAsNumber', 'autocapitalize', 'select', 'setSelectionRange', 'setRangeText' ]
export const meterIDLProperties = [ 'high', 'low', 'max', 'min', 'optimum', 'value' ]
export const progressIDLProperties = [ 'max', 'value' ]
export const selectIDLProperties = [ 'autocomplete', 'autofocus', 'disabled', 'multiple', 'name', 'required', 'size', 'validity', 'validationMessage', 'willValidate', 'checkValidity', 'reportValidity', 'setCustomValidity' ]
export const textAreaIDLProperties = [ 'autofocus', 'cols', 'dirName', 'disabled', 'enterKeyHint', 'inputmode', 'maxLength', 'minLength', 'name', 'placeholder', 'readOnly', 'required', 'rows', 'wrap', 'validity', 'validationMessage', 'willValidate', 'checkValidity', 'reportValidity', 'setCustomValidity' ]

export const skipAttributes = ['id', 'style', 'class']
