import { LitElement, html } from './node_modules/lit-element/lit-element.js';
import { NativeReflectorMixin } from './mixins/NativeReflectorMixin.js';
import { StyleableMixin } from './mixins/StyleableMixin.js';
import { ThemeableMixin } from './mixins/ThemeableMixin.js';

class NnForm extends ThemeableMixin('nn-form')(StyleableMixin(NativeReflectorMixin(LitElement))) {
  get reflectProperties() {
    return [...super.reflectProperties, // https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement -checkValidity -reportValidity -reset -elements
    ...['length', 'name', 'method', 'target', 'action', 'encoding', 'enctype', 'acceptCharset', 'autocomplete', 'noValidate', 'requestAutocomplete', 'submit']];
  }

  reportValidity() {
    // Check validity in form
    let valid = true;

    for (const el of this.elements) {
      if (typeof el.reportValidity === 'function') {
        // Native element may have customValidity set
        // by a server response. Clear any existing custom
        // errors and report validity
        el.setCustomValidity('');

        if (!el.reportValidity()) {
          valid = false;
        }
      }
    }

    return valid;
  }

  checkValidity() {
    // Check validity in form
    let valid = true; // if (!this.native.checkValidity()) valid = false

    for (const el of this.elements) {
      if (typeof el.checkValidity === 'function') {
        // Native element may have customValidity set
        // by a server response. Clear any existing custom
        // errors and report validity
        el.setCustomValidity('');

        if (!el.checkValidity()) {
          valid = false;
        }
      }
    }

    return valid;
  }

  setFormElementValue(elName, value) {
    const el = [...this.elements].find(el => {
      if (this._radioElement(el)) {
        return el.name === elName && el.value === value;
      } else {
        return el.name === elName;
      }
    });
    if (!el) return; // Get the original value

    const valueSource = this._getElementValueSource(el); // CHECKBOXES


    if (this._checkboxElement(el)) {
      el[valueSource] = !!value; // RADIO
      // Radio elements
    } else if (this._radioElement(el)) {
      el[valueSource] = true;
      const others = [...this.elements].filter(e => el !== e && this._radioElement(el));

      for (const other of others) other[valueSource] = false; // SELECT
      // Selectable elements (with prop selectedIndex)

    } else if (this._selectElement(el)) {
      if (!value) el.selectedIndex = 0;else el[valueSource] = value; // Any other case
    } else {
      el[valueSource] = value;
    }
  }

  getFormElementValue(elName) {
    const elements = [...this.elements].filter(el => el.name === elName);

    if (!elements.length) {
      console.error('Trying to set', elName, 'but no such element in form');
      return;
    }

    if (elements.length === 1) {
      const el = elements[0];

      const valueSource = this._getElementValueSource(el);

      if (this._checkboxElement(el)) {
        return el[valueSource] ? el.value ? el.value : 'on' : undefined;
      } else if (this._selectElement(el)) {
        return el[valueSource];
      } else {
        return el[valueSource];
      }
    } else {
      const nonRadio = elements.filter(el => !this._radioElement(el));

      if (nonRadio.length) {
        console.error('Duplicate name', elName, 'for non-radio elements');
        return;
      }

      const checked = elements.find(el => {
        const valueSource = this._getElementValueSource(el);

        return el[valueSource];
      });
      if (checked) return checked.value;else return undefined;
    }
  }

  reset() {
    if (!this.native) return;
    this.native.reset(); // TODO: Adjust this for radios in a nice sensible way

    for (const el of this.elements) {
      const valueSource = this._getElementValueSource(el);

      if (this._radioElement(el)) {
        el[valueSource] = el.getAttribute(valueSource) !== null;
      } else if (this._checkboxElement(el)) {
        el[valueSource] = el.getAttribute(valueSource) !== null;
      } else {
        el[valueSource] = el.getAttribute(valueSource);
      }
    }
  }

  _selectElement(el) {
    if (typeof el.selectedIndex !== 'undefined' || el.getAttribute('as-select') !== null) return true;
    return false;
  }

  _checkboxElement(el) {
    if (el.type === 'checkbox') return true;
    if (el.getAttribute('as-checkbox') !== null) return true;
    return false;
  }

  _radioElement(el) {
    if (el.type === 'radio') return true;
    if (el.getAttribute('as-radio') !== null) return true;
    return false;
  }

  _getElementValueSource(el) {
    if (el.type === 'checkbox' || el.type === 'radio') return 'checked';
    if (el.getAttribute('value-source')) return el.getAttribute('value-source');
    return 'value';
  }

  get elements() {
    // A tags (links) can have "name", filter them out
    return [...this.querySelectorAll('[name]')].filter(el => el.tagName !== 'A');
  }

  render() {
    return html`
      ${this.customStyle}
      <form id="native">
        <slot></slot>
      </form>
    `;
  }

}

customElements.define('nn-form', NnForm);
var nnForm = {
  NnForm: NnForm
};
export { nnForm as $nnForm, NnForm };