define(["exports","./lit-element-34339bae"],function(a,b){'use strict';// NativeReflectorMixin
// ====================
//
// This is the centrepiece of the `nn-`` elements. Every `nn-` element has the
// characteristic of being basically a native element with theming steroids.
// Each `nn-` element has, in its template, a native element marked as
// `id="native"` which identifies the element they represent. For example
// the `Button.js` file will implement `nn-button` element, which in turn will
// have `<button id="native"` in its template.
//
// The approach to `nn-` elements is to reflect as much as possible, in terms
// of properties and attributes, from the `nn-` element down to the `native` one.
//
// This means that the `nn-` element is a "gateway" to properties and attributes
// of the actual native element inside.
//
// For example writing:
//
//     <nn-button label="Some label"></nn-button>
//
// Will imply that the contained `<button>` element (which is marked as
// `native`) also has the `label` attribute set to `Some label`.
//
// The idea is that between `<nn-button>` and `<button>` _everything_ is
// reflected. This is great in theory, but there is a level of trickery
// required to make things work properly. For example some attributes will
// _always_ need to be skipped (`id`, `style`, `class`). Also, it's impossible
// to simply reflect every property, since 1) they could be anywhere in the
// prototype chain 2) Some properties should never be reflected (see:
// `setAttribute()`, `hasChildNodes()`, and so on).
//
// So, the approach is:
//
//  * All attributes are reflected, _except_ some that are blacklisted (in
//    `this.skipAttributes`)
//  * Only properties/methods listed in `this.reflectProperties` are reflected.
//    Each element will provide a comprehensive list of reflected properties, which
//    will depend on the HTML specs of the targeted `native` element.
//  * Some "boot" properties are assigned when the element is first updated.
//
// "Boot properties" are those properties (stressing _proproperties_, not
// _attributes_!) that are meaningful to the element and might be set when
// the element is declared -- and _before_ the element has a chance to run its
// code and therefore listen to property changes. For example:
//
//     <nn-input name="description" .value="${this.info.dbDescription}">
//
// In this case, the _property_ `value` of the input element is set before
// the element is declared. Therefore, `value` must be set as a boot property,
// guaranteeing that the `value` property will be assigned to the targeted
// `native` element.
//
// ## Into the code
//
// First of all, NativeRefletorMixin is declared as a mixing in function:
a.NativeReflectorMixin=function(a){return(/*#__PURE__*/function(a){function c(){return b._classCallCheck(this,c),b._possibleConstructorReturn(this,b._getPrototypeOf(c).apply(this,arguments))}return b._inherits(c,a),b._createClass(c,[{key:"firstUpdated",// eslint-disable-line
// The firstUpdated method is used to perform one-time work after the element's
// template has been created. In this case, it will need to:
//
// 1) Find the native element (marked with `id="native"`)
// 2) Map the values of the boot properties. At this stage, the property `value`
//    for example might have already been set.
// 3) Start reflection of attributes and properties
// 4) Assign boot properties to the element. NOTE: since reflection has
//    started, assigning `this[prop] = bootPropertiesValues[prop]` will also
//    assign the corresponding property down to the `native` element
//
// Boot properties are stored in `this.bootProperties`. However, users are given
// the option to add last-minute boot properties with the attribute
// `extra-boot-properties`. This is done by `_getBootProperties()`,
// explained shortly.
value:function(){this.native=this.shadowRoot.querySelector("#native");/* Get the boot property values which may have been set before the element */ /* had a chance to listen to property changes */var a=this._getBootProperties(),b={},c=!0,d=!1,e=void 0;try{for(var f,g,h=a[Symbol.iterator]();!(c=(f=h.next()).done);c=!0)g=f.value,"undefined"!=typeof this[g]&&(b[g]=this[g]);/* Reflect all attributes and properties */ /*  - all properties are reflected except some (listed in skipAttributes) */ /*  - only elected properties are reflected (listed in reflectProperties) */}catch(a){d=!0,e=a}finally{try{c||null==h["return"]||h["return"]()}finally{if(d)throw e}}this._reflectAttributesAndProperties();/* Set the boot properties for the element */for(var i,j=0,k=Object.keys(b);j<k.length;j++)i=k[j],this[i]=b[i]}// As mentoned above, boot properties are defined in the element, but
// users are able to add more by setting the attribute
// `extra-boot-properties`:
},{key:"_getBootProperties",value:function(){// Assign "boot properties". This is an unfortunate hack that is
// necessary in order to assign custom properties added *before* the
// observer was on
var a=this.bootProperties,c=this.getAttribute("extra-boot-properties");/* Users can have attribute `extra-boot-properties` */ /* to add boot properties */return c&&"string"==typeof c&&(a=[].concat(b._toConsumableArray(a),b._toConsumableArray(c.split(" ")))),a}// From https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
},{key:"getAttribute",value:function(a){if(-1!==this.skipAttributes.indexOf(a))return b._get(b._getPrototypeOf(c.prototype),"getAttribute",this).call(this,a);var d=this.native.getAttribute(a);return null===d?b._get(b._getPrototypeOf(c.prototype),"getAttribute",this).call(this,a):d;// This shouldn't really happen, but it's here as a fallback
// TODO: Maybe delete it and always return the native's value regardless
}},{key:"setAttribute",value:function(a,d){b._get(b._getPrototypeOf(c.prototype),"setAttribute",this).call(this,a,d),-1!==this.skipAttributes.indexOf(a)||// Assign the same attribute to the contained native
// element, taking care of the 'nn' syntax
//
this._setSubAttr(a,d)}},{key:"removeAttribute",value:function(a){b._get(b._getPrototypeOf(c.prototype),"removeAttribute",this).call(this,a),-1!==this.skipAttributes.indexOf(a)||// Assign the same attribute to the contained native
// element, taking care of the 'nn' syntax
//
this._setSubAttr(a,null)}},{key:"_setSubAttr",value:function(a,b){var c=a.split("::");// Safeguard: if this.native is not yet set, it means that
// an attribute was set BEFORE the element was rendered. If that
// is the case, simply give up. _reflectAttributesAndProperties() will
// be run afterwards to sync things up anyway
if(this.native)// No :: found, simply change attribute in `native`
if(1===c.length)null===b?this.native.removeAttribute(a):this.native.setAttribute(a,b);else if(2===c.length){var d=this.shadowRoot.querySelector("#".concat(c[0]));d&&(null===b?d.removeAttribute(c[1]):d.setAttribute(c[1],b))}}},{key:"_reflectAttributesAndProperties",value:function(){var a=this,d=this.native,e=!0,f=!1,g=void 0;try{for(var h,i=this.attributes[Symbol.iterator]();!(e=(h=i.next()).done);e=!0){var j=h.value,k=j.name;-1===this.skipAttributes.indexOf(k)&&this._setSubAttr(k,b._get(b._getPrototypeOf(c.prototype),"getAttribute",this).call(this,k))}// Observe changes in attribute from the source element, and reflect
// them to the destination element
}catch(a){f=!0,g=a}finally{try{e||null==i["return"]||i["return"]()}finally{if(f)throw g}}var l=new MutationObserver(function(d){d.forEach(function(d){if("attributes"===d.type){var e=d.attributeName;// Don't reflect forbidden attributes
if(-1!==a.skipAttributes.indexOf(e))return;// Don't reflect attributes with ::
if(-1!==e.indexOf("::"))return;// Check if the value has changed. If it hasn't, there is no
// point in re-assigning it, especially since the observer
// might have been triggered by this very mixin
var f=a.native.getAttribute(e),g=b._get(b._getPrototypeOf(c.prototype),"getAttribute",a).call(a,e);if(f===g)return;// Assign the new value
null===f?b._get(b._getPrototypeOf(c.prototype),"removeAttribute",a).call(a,e):b._get(b._getPrototypeOf(c.prototype),"setAttribute",a).call(a,e,f)}})});l.observe(this.native,{attributes:!0});// STEP #2: METHODS (as bound functions) AND PROPERTIES (as getters/setters)
var m=b._toConsumableArray(new Set(this.reflectProperties));m.forEach(function(b){Object.defineProperty(a,b,{get:function(){return"function"==typeof d[b]?d[b].bind(d):d[b]},set:function(a){if("function"!=typeof d[b]){var c=d[b];// Set the new value
d[b]=a,this._requestUpdate(b,c)}},configurable:!0,enumerable:!0})})}},{key:"reflectProperties",get:function(){return["accessKey","accessKeyLabel","contentEditable","isContentEditable","contextMenu ","dataset","dir","draggable","dropzone","hidden","inert","innerText","itemScope ","itemType","itemId ","itemRef","itemProp","itemValue ","lang","noModule","nonce","offsetHeight","offsetLeft","offsetParent","offsetTop","offsetWidth","properties","spellcheck","style","tabIndex","title","translate","attachInternals","blur","click","focus","forceSpellCheck"]}},{key:"skipAttributes",get:function(){return["id","style","class"]}},{key:"bootProperties",get:function(){return["value"]}}]),c}(a))}});
