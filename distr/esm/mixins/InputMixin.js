const InputMixin = base => {
  return class Base extends base {
    get skipAttributes() {
      return [...super.skipAttributes, ...['type']];
    }

    get reflectProperties() {
      return [...super.reflectProperties, // From https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement -checkValidity -form
      ...['formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget', 'name', 'type', 'disabled', 'autofocus', 'required', 'value', 'validity', 'validationMessage', 'willValidate', 'checked', 'defaultChecked', 'indeterminate', 'alt', 'height', 'src', 'width', 'accept', 'allowdirs ', 'files', 'webkitdirectory ', 'webkitEntries ', 'autocomplete', 'max', 'maxLength', 'min', 'minLength', 'pattern', 'placeholder', 'readOnly', 'size', 'selectionStart', 'selectionEnd', 'selectionDirection', 'defaultValue', 'dirName', 'accessKey', 'list', 'multiple', 'files', 'labels', 'step', 'valueAsDate', 'valueAsNumber', 'autocapitalize ', 'inputmode', 'align ', 'useMap ', 'blur', 'click', 'focus', 'select', 'setSelectionRange', 'setRangeText', 'setCustomValidity', 'reportValidity', 'stepDown', 'stepUp']];
    }

  };
};

var InputMixin$1 = {
  InputMixin: InputMixin
};
export { InputMixin$1 as $InputMixin, InputMixin };