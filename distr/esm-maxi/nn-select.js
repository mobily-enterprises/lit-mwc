import {L as LitElement,c as css,h as html}from'./lit-element-97ae09cb.js';import {L as LabelsMixin}from'./LabelsMixin-c00a1c1e.js';import {T as ThemeableMixin}from'./ThemeableMixin-af62e1ed.js';import {N as NativeReflectorMixin}from'./NativeReflectorMixin-c4e18588.js';import {I as InputMixin}from'./InputMixin-83f5b637.js';import {F as FormElementMixin}from'./FormElementMixin-78f38eb0.js';class NnSelect extends ThemeableMixin('nn-select')(FormElementMixin(LabelsMixin(InputMixin(NativeReflectorMixin(LitElement))))) {
  static get styles () {
    return [
      super.styles || [],
      css`
        /* :host {
          display: flex;
          height: 30px;
        } */

        /* select {
          display: inline-flex;
          border-radius: var(--nn-select-border-radius, 0 4px 4px 0);
          border: var(--nn-select-border, 1px solid #dddddd);
          color: var(--nn-select-color, inherit);
          background-color: var(--nn-select-background, initial);
          -webkit-appearance: select;
          width: 100%;
          float: right;
          font-size: 1em;
          padding-left: 10px;
          margin-left: 4px;
        } */
      `
    ]
  }

  get reflectProperties () {
    return [
      ...super.reflectProperties,
      // FROM https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement -checkValidity -form
      ...['autofocus', 'disabled', 'labels', 'length', 'multiple', 'name', 'options', 'required', 'selectedIndex', 'selectedOptions', 'size', 'type', 'validationMessage', 'validity', 'value', 'willValidate', 'add', 'blur', 'focus', 'item', 'namedItem', 'remove', 'reportValidity', 'setCustomValidity']
    ]
  }

  constructor () {
    super();
    this.options = [];
  }

  render () {
    return html`
      ${this.customStyle}
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <slot @slotchange="${this.addSlotToSelect}"></slot>
      <select id="native" real-time-event="selected"></select>
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }

  addSlotToSelect (e) {
    const select = this.shadowRoot.querySelector('#native');
    for (const option of e.srcElement.assignedElements()) {
      select.appendChild(option);
    }
  }
}
customElements.define('nn-select', NnSelect);export{NnSelect};