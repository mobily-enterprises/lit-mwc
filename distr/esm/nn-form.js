import{LitElement,html}from"./node_modules/lit-element/lit-element.js";import{NativeReflectorMixin}from"./mixins/NativeReflectorMixin.js";import{StyleableMixin}from"./mixins/StyleableMixin.js";import{ThemeableMixin}from"./mixins/ThemeableMixin.js";class NnForm extends ThemeableMixin("nn-form")(StyleableMixin(NativeReflectorMixin(LitElement))){get reflectProperties(){return[...super.reflectProperties,// https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement -checkValidity -reportValidity -reset -elements
...["length","name","method","target","action","encoding","enctype","acceptCharset","autocomplete","noValidate","requestAutocomplete","submit"]]}reportValidity(){// Check validity in form
let valid=!0;for(const el of this.elements){if("function"===typeof el.reportValidity){// Native element may have customValidity set
// by a server response. Clear any existing custom
// errors and report validity
el.setCustomValidity("");if(!el.reportValidity()){valid=!1}}}return valid}checkValidity(){// Check validity in form
let valid=!0;// if (!this.native.checkValidity()) valid = false
for(const el of this.elements){if("function"===typeof el.checkValidity){// Native element may have customValidity set
// by a server response. Clear any existing custom
// errors and report validity
el.setCustomValidity("");if(!el.checkValidity()){valid=!1}}}return valid}setFormElementValue(elName,value){const el=[...this.elements].find(el=>{if(this._radioElement(el)){return el.name===elName&&el.value===value}else{return el.name===elName}});if(!el)return;// Get the original value
const valueSource=this._getElementValueSource(el);// CHECKBOXES
if(this._checkboxElement(el)){el[valueSource]=!!value;// RADIO
// Radio elements
}else if(this._radioElement(el)){el[valueSource]=!0;const others=[...this.elements].filter(e=>el!==e&&this._radioElement(el));for(const other of others)other[valueSource]=!1;// SELECT
// Selectable elements (with prop selectedIndex)
}else if(this._selectElement(el)){if(!value)el.selectedIndex=0;else el[valueSource]=value;// Any other case
}else{el[valueSource]=value}}getFormElementValue(elName){const elements=[...this.elements].filter(el=>el.name===elName);if(!elements.length){console.error("Trying to set",elName,"but no such element in form");return}if(1===elements.length){const el=elements[0],valueSource=this._getElementValueSource(el);if(this._checkboxElement(el)){return el[valueSource]?el.value?el.value:"on":void 0}else if(this._selectElement(el)){return el[valueSource]}else{return el[valueSource]}}else{const nonRadio=elements.filter(el=>!this._radioElement(el));if(nonRadio.length){console.error("Duplicate name",elName,"for non-radio elements");return}const checked=elements.find(el=>{const valueSource=this._getElementValueSource(el);return el[valueSource]});if(checked)return checked.value;else return void 0}}reset(){if(!this.native)return;this.native.reset();// TODO: Adjust this for radios in a nice sensible way
for(const el of this.elements){const valueSource=this._getElementValueSource(el);if(this._radioElement(el)){el[valueSource]=null!==el.getAttribute(valueSource)}else if(this._checkboxElement(el)){el[valueSource]=null!==el.getAttribute(valueSource)}else{el[valueSource]=el.getAttribute(valueSource)}}}_selectElement(el){if("undefined"!==typeof el.selectedIndex||null!==el.getAttribute("as-select"))return!0;return!1}_checkboxElement(el){if("checkbox"===el.type)return!0;if(null!==el.getAttribute("as-checkbox"))return!0;return!1}_radioElement(el){if("radio"===el.type)return!0;if(null!==el.getAttribute("as-radio"))return!0;return!1}_getElementValueSource(el){if("checkbox"===el.type||"radio"===el.type)return"checked";if(el.getAttribute("value-source"))return el.getAttribute("value-source");return"value"}get elements(){// A tags (links) can have "name", filter them out
return[...this.querySelectorAll("[name]")].filter(el=>"A"!==el.tagName)}render(){return html`
      ${this.customStyle}
      <form id="native">
        <slot></slot>
      </form>
    `}}customElements.define("nn-form",NnForm);var nnForm={NnForm:NnForm};export{nnForm as $nnForm,NnForm};