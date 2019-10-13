const AddHasValueAttributeMixin = base => {
  return class Base extends base {
    _observeInput(e) {
      const target = e.currentTarget;
      this.toggleAttribute('has-value', !!target.value.length);
    }

    _observeFocus(e) {
      this.toggleAttribute('has-focus', true);
    }

    _observeBlur(e) {
      this.toggleAttribute('has-focus', false);
    }

    firstUpdated() {
      super.firstUpdated();
      this.native.addEventListener('input', this._observeInput);
      this.native.addEventListener('focus', this._observeFocus);
      this.native.addEventListener('blur', this._observeBlur);
    } // It needs to have a specific setter fo the 'value' property. This means
    // that `value` will need to be out of the reflected properties list, and
    // everything that NativeRefletorMixin does, needs to be re-done -- plus
    // the setting of the attribute
    //


    get reflectProperties() {
      return super.reflectProperties.filter(prop => prop !== 'value');
    }

    set value(newValue) {
      // This is what the setter by nativeReflectorMixin does
      // (But doesn't do it anymore for 'value')
      const dst = this.native;
      const prop = 'value';
      const oldValue = dst.value[prop];
      dst[prop] = newValue; // This needs to happen manually to keep litElement happy

      this._requestUpdate(prop, oldValue); // And finally, set the infamous attribute


      this.toggleAttribute('has-value', !!newValue);
    }

    get value() {
      return this.native.value;
    }

  };
};

var AddHasValueAttributeMixin$1 = {
  AddHasValueAttributeMixin: AddHasValueAttributeMixin
};
export { AddHasValueAttributeMixin$1 as $AddHasValueAttributeMixin, AddHasValueAttributeMixin };