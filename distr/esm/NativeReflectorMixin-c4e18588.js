function _typeof(a){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(a){if(Symbol.iterator in Object(a)||"[object Arguments]"===Object.prototype.toString.call(a))return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),a}function _possibleConstructorReturn(a,b){return b&&("object"===_typeof(b)||"function"==typeof b)?b:_assertThisInitialized(a)}function _assertThisInitialized(a){if(void 0===a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return a}function _get(a,b,c){return _get="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(a,b,c){var d=_superPropBase(a,b);if(d){var e=Object.getOwnPropertyDescriptor(d,b);return e.get?e.get.call(c):e.value}},_get(a,b,c||a)}function _superPropBase(a,b){for(;!Object.prototype.hasOwnProperty.call(a,b)&&(a=_getPrototypeOf(a),null!==a););return a}function _getPrototypeOf(a){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(a){return a.__proto__||Object.getPrototypeOf(a)},_getPrototypeOf(a)}function _inherits(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function");a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,writable:!0,configurable:!0}}),b&&_setPrototypeOf(a,b)}function _setPrototypeOf(a,b){return _setPrototypeOf=Object.setPrototypeOf||function(a,b){return a.__proto__=b,a},_setPrototypeOf(a,b)}// NativeReflectorMixin
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
var NativeReflectorMixin=function(a){return(/*#__PURE__*/function(a){function b(){return _classCallCheck(this,b),_possibleConstructorReturn(this,_getPrototypeOf(b).apply(this,arguments))}return _inherits(b,a),_createClass(b,[{key:"firstUpdated",// eslint-disable-line
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
value:function firstUpdated(){this.native=this.shadowRoot.querySelector("#native");/* Get the boot property values which may have been set before the element */ /* had a chance to listen to property changes */var a=this._getBootProperties(),b={},c=!0,d=!1,e=void 0;try{for(var f,g,h=a[Symbol.iterator]();!(c=(f=h.next()).done);c=!0)g=f.value,"undefined"!=typeof this[g]&&(b[g]=this[g]);/* Reflect all attributes and properties */ /*  - all properties are reflected except some (listed in skipAttributes) */ /*  - only elected properties are reflected (listed in reflectProperties) */}catch(a){d=!0,e=a}finally{try{c||null==h["return"]||h["return"]()}finally{if(d)throw e}}this._reflectAttributesAndProperties();/* Set the boot properties for the element */for(var i,j=0,k=Object.keys(b);j<k.length;j++)i=k[j],this[i]=b[i]}// As mentoned above, boot properties are defined in the element, but
// users are able to add more by setting the attribute
// `extra-boot-properties`:
},{key:"_getBootProperties",value:function _getBootProperties(){// Assign "boot properties". This is an unfortunate hack that is
// necessary in order to assign custom properties added *before* the
// observer was on
var a=this.bootProperties,b=this.getAttribute("extra-boot-properties");/* Users can have attribute `extra-boot-properties` */ /* to add boot properties */return b&&"string"==typeof b&&(a=[].concat(_toConsumableArray(a),_toConsumableArray(b.split(" ")))),a}// From https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
},{key:"getAttribute",value:function getAttribute(a){if(-1!==this.skipAttributes.indexOf(a))return _get(_getPrototypeOf(b.prototype),"getAttribute",this).call(this,a);var c=this.native.getAttribute(a);return null===c?_get(_getPrototypeOf(b.prototype),"getAttribute",this).call(this,a):c;// This shouldn't really happen, but it's here as a fallback
// TODO: Maybe delete it and always return the native's value regardless
}},{key:"setAttribute",value:function setAttribute(a,c){_get(_getPrototypeOf(b.prototype),"setAttribute",this).call(this,a,c),-1!==this.skipAttributes.indexOf(a)||// Assign the same attribute to the contained native
// element, taking care of the 'nn' syntax
//
this._setSubAttr(a,c)}},{key:"removeAttribute",value:function removeAttribute(a){_get(_getPrototypeOf(b.prototype),"removeAttribute",this).call(this,a),-1!==this.skipAttributes.indexOf(a)||// Assign the same attribute to the contained native
// element, taking care of the 'nn' syntax
//
this._setSubAttr(a,null)}},{key:"_setSubAttr",value:function _setSubAttr(a,b){var c=a.split("::");// Safeguard: if this.native is not yet set, it means that
// an attribute was set BEFORE the element was rendered. If that
// is the case, simply give up. _reflectAttributesAndProperties() will
// be run afterwards to sync things up anyway
if(this.native)// No :: found, simply change attribute in `native`
if(1===c.length)null===b?this.native.removeAttribute(a):this.native.setAttribute(a,b);else if(2===c.length){var d=this.shadowRoot.querySelector("#".concat(c[0]));d&&(null===b?d.removeAttribute(c[1]):d.setAttribute(c[1],b))}}},{key:"_reflectAttributesAndProperties",value:function _reflectAttributesAndProperties(){var a=this,c=this.native,d=!0,e=!1,f=void 0;try{// STEP #1: ATTRIBUTES FIRST
// Assign all starting attribute to the destination element
for(var g,h=this.attributes[Symbol.iterator]();!(d=(g=h.next()).done);d=!0){var i=g.value,j=i.name;-1===this.skipAttributes.indexOf(j)&&this._setSubAttr(j,_get(_getPrototypeOf(b.prototype),"getAttribute",this).call(this,j))}// Observe changes in attribute from the source element, and reflect
// them to the destination element
}catch(a){e=!0,f=a}finally{try{d||null==h["return"]||h["return"]()}finally{if(e)throw f}}var k=new MutationObserver(function(c){c.forEach(function(c){if("attributes"===c.type){var f=c.attributeName;// Don't reflect forbidden attributes
if(-1!==a.skipAttributes.indexOf(f))return;// Don't reflect attributes with ::
if(-1!==f.indexOf("::"))return;// Check if the value has changed. If it hasn't, there is no
// point in re-assigning it, especially since the observer
// might have been triggered by this very mixin
var d=a.native.getAttribute(f),e=_get(_getPrototypeOf(b.prototype),"getAttribute",a).call(a,f);if(d===e)return;// Assign the new value
null===d?_get(_getPrototypeOf(b.prototype),"removeAttribute",a).call(a,f):_get(_getPrototypeOf(b.prototype),"setAttribute",a).call(a,f,d)}})});k.observe(this.native,{attributes:!0});// STEP #2: METHODS (as bound functions) AND PROPERTIES (as getters/setters)
var l=_toConsumableArray(new Set(this.reflectProperties));l.forEach(function(b){Object.defineProperty(a,b,{get:function get(){return"function"==typeof c[b]?c[b].bind(c):c[b]},set:function set(a){if("function"!=typeof c[b]){var d=c[b];// Set the new value
c[b]=a,this._requestUpdate(b,d)}},configurable:!0,enumerable:!0})})}},{key:"reflectProperties",get:function get(){return["accessKey","accessKeyLabel","contentEditable","isContentEditable","contextMenu ","dataset","dir","draggable","dropzone","hidden","inert","innerText","itemScope ","itemType","itemId ","itemRef","itemProp","itemValue ","lang","noModule","nonce","offsetHeight","offsetLeft","offsetParent","offsetTop","offsetWidth","properties","spellcheck","style","tabIndex","title","translate","attachInternals","blur","click","focus","forceSpellCheck"]}},{key:"skipAttributes",get:function get(){return["id","style","class"]}},{key:"bootProperties",get:function get(){return["value"]}}]),b}(a))};export{NativeReflectorMixin as N};