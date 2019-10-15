function _typeof(a){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}function _templateObject(){var a=_taggedTemplateLiteral(["\n      ","\n      <form id=\"native\">\n        <slot></slot>\n      </form>\n    "]);return _templateObject=function(){return a},a}function _taggedTemplateLiteral(a,b){return b||(b=a.slice(0)),Object.freeze(Object.defineProperties(a,{raw:{value:Object.freeze(b)}}))}function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(b,!0).forEach(function(c){_defineProperty(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(b).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function asyncGeneratorStep(a,b,c,d,e,f,g){try{var h=a[f](g),i=h.value}catch(a){return void c(a)}h.done?b(i):Promise.resolve(i).then(d,e)}function _asyncToGenerator(a){return function(){var b=this,c=arguments;return new Promise(function(d,e){function f(a){asyncGeneratorStep(h,d,e,f,g,"next",a)}function g(a){asyncGeneratorStep(h,d,e,f,g,"throw",a)}var h=a.apply(b,c);f(void 0)})}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(a,b){return b&&("object"===_typeof(b)||"function"==typeof b)?b:_assertThisInitialized(a)}function _assertThisInitialized(a){if(void 0===a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return a}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),a}function _inherits(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function");a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,writable:!0,configurable:!0}}),b&&_setPrototypeOf(a,b)}function _setPrototypeOf(a,b){return _setPrototypeOf=Object.setPrototypeOf||function(a,b){return a.__proto__=b,a},_setPrototypeOf(a,b)}function _get(a,b,c){return _get="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(a,b,c){var d=_superPropBase(a,b);if(d){var e=Object.getOwnPropertyDescriptor(d,b);return e.get?e.get.call(c):e.value}},_get(a,b,c||a)}function _superPropBase(a,b){for(;!Object.prototype.hasOwnProperty.call(a,b)&&(a=_getPrototypeOf(a),null!==a););return a}function _getPrototypeOf(a){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(a){return a.__proto__||Object.getPrototypeOf(a)},_getPrototypeOf(a)}import{h as html}from"./lit-element-97ae09cb.js";import"./StyleableMixin-6a125586.js";import{T as ThemeableMixin}from"./ThemeableMixin-af62e1ed.js";import"./NativeReflectorMixin-c4e18588.js";import{NnForm}from"./nn-form.js";/* globals customElements CustomEvent */var EnForm=/*#__PURE__*/function(a){function b(){var a;return _classCallCheck(this,b),a=_possibleConstructorReturn(this,_getPrototypeOf(b).call(this)),a.validateOnLoad=!1,a.validateOnRender=!1,a.fetchingElement=null,a.submitCheckboxesAsNative=!1,a._boundRealtimeSubmitter=a._realTimeSubmitter.bind(_assertThisInitialized(a)),a.inFlight=!1,a.attemptedFlight=!1,a.inFlightMap=new WeakMap,a.attemptedFlightMap=new WeakMap,a}return _inherits(b,a),_createClass(b,[{key:"reflectProperties",get:function get(){// The `submit` and `elements` properties have been redefined
return _get(_getPrototypeOf(b.prototype),"reflectProperties",this).filter(function(a){return"submit"!==a})}}],[{key:"properties",get:function get(){return{fetchingElement:{type:String,attribute:"fetching-element"},recordId:{type:String,attribute:"record-id"},setFormAfterSubmit:{type:Boolean,attribute:"set-form-after-submit"},resetFormAfterSubmit:{type:Boolean,attribute:"reset-form-after-submit"},validateOnLoad:{type:Boolean,attribute:"validate-on-load"},validateOnRender:{type:Boolean,attribute:"validate-on-render"},submitCheckboxesAsNative:{type:Boolean,attribute:"submit-checkboxes-as-native"},noAutoload:{type:Boolean,attribute:"no-autoload"},// This will allow users to redefine methods declaratively
createSubmitObject:Function,presubmit:Function,response:Function,setFormElementValues:Function,extrapolateErrors:Function}}}]),_createClass(b,[{key:"_allChildrenCompleted",value:function(){var a=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function a(){var b,c,d,e,f,g;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:b=!0,c=!1,d=void 0,a.prev=3,e=this.elements[Symbol.iterator]();case 5:if(b=(f=e.next()).done){a.next=13;break}if(g=f.value,"undefined"==typeof g.updateComplete){a.next=10;break}return a.next=10,g.updateComplete;case 10:b=!0,a.next=5;break;case 13:a.next=19;break;case 15:a.prev=15,a.t0=a["catch"](3),c=!0,d=a.t0;case 19:a.prev=19,a.prev=20,b||null==e["return"]||e["return"]();case 22:if(a.prev=22,!c){a.next=25;break}throw d;case 25:return a.finish(22);case 26:return a.finish(19);case 27:case"end":return a.stop();}},a,this,[[3,15,19,27],[20,,22,26]])}));return function _allChildrenCompleted(){return a.apply(this,arguments)}}()},{key:"_realTimeSubmitter",value:function _realTimeSubmitter(a){this.submit(a.target)}},{key:"connectedCallback",value:function connectedCallback(){var a=this;_get(_getPrototypeOf(b.prototype),"connectedCallback",this).call(this),this._allChildrenCompleted().then(function(){var b=!0,c=!1,d=void 0;try{for(var e,f=a.elements[Symbol.iterator]();!(b=(e=f.next()).done);b=!0){var g=e.value,h=null!==g.getAttribute("real-time"),i=g.getAttribute("real-time-event")||"input";!h||!i||a.addEventListener(i,a._boundRealtimeSubmitter)}}catch(a){c=!0,d=a}finally{try{b||null==f["return"]||f["return"]()}finally{if(c)throw d}}})}},{key:"disconnectedCallback",value:function disconnectedCallback(){_get(_getPrototypeOf(b.prototype),"disconnectedCallback",this).call(this);var a=!0,c=!1,d=void 0;try{for(var e,f=this.elements[Symbol.iterator]();!(a=(e=f.next()).done);a=!0){var g=e.value,h=g.getAttribute("real-time");if(null!==h){var i=g.getAttribute("real-time-event");i&&this.removeEventListener(i,this._boundRealtimeSubmitter)}}}catch(a){c=!0,d=a}finally{try{a||null==f["return"]||f["return"]()}finally{if(c)throw d}}}},{key:"firstUpdated",value:function(){var a=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function a(){return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(_get(_getPrototypeOf(b.prototype),"firstUpdated",this).call(this),!this.validateOnRender){a.next=5;break}return a.next=4,this._allChildrenCompleted();case 4:this.reportValidity();case 5:case"end":return a.stop();}},a,this)}));return function firstUpdated(){return a.apply(this,arguments)}}()},{key:"setFormElementValues",value:function setFormElementValues(a){for(var b in a)this.setFormElementValue(b,a[b])}},{key:"setRecordObject",value:function setRecordObject(a){a=_objectSpread({},a);var b={},c=!0,d=!1,e=void 0;try{for(var f,g,h=this.elements[Symbol.iterator]();!(c=(f=h.next()).done);c=!0)g=f.value,b[g.name]=g}catch(a){d=!0,e=a}finally{try{c||null==h["return"]||h["return"]()}finally{if(d)throw e}}for(var i,j=0,l=Object.keys(b);j<l.length;j++)i=l[j],a[i]=this.getFormElementValue(i);return a}},{key:"extrapolateErrors",value:function extrapolateErrors(a){return a}},{key:"createSubmitObject",value:function createSubmitObject(a){var b={},c=!0,d=!1,e=void 0;try{for(var f,g,h=a[Symbol.iterator]();!(c=(f=h.next()).done);c=!0)// Radio will only happen once thanks to checking for undefined
if(g=f.value,"undefined"==typeof b[g.name]&&null===g.getAttribute("no-submit"))// Checkboxes are special: they might be handled as native ones,
// (NOTHING set if unchecked, and their value set if checked) or
// as booleans (true for checked, or false for unchecked)
if(!this._checkboxElement(g))b[g.name]=this.getFormElementValue(g.name);else if(this.submitCheckboxesAsNative){// As native checkboxes.
var i=this.getFormElementValue(g.name);i&&(b[g.name]=i)}else// As more app-friendly boolean value
b[g.name]=!!this.getFormElementValue(g.name)}catch(a){d=!0,e=a}finally{try{c||null==h["return"]||h["return"]()}finally{if(d)throw e}}return b}},{key:"presubmit",value:function presubmit(){}},{key:"response",value:function response(){}},{key:"_disableElements",value:function _disableElements(a){var b=!0,c=!1,d=void 0;try{for(var e,f,g=a[Symbol.iterator]();!(b=(e=g.next()).done);b=!0)f=e.value,f.disabled||f.setAttribute("disabled",!0)}catch(a){c=!0,d=a}finally{try{b||null==g["return"]||g["return"]()}finally{if(c)throw d}}}},{key:"_enableElements",value:function _enableElements(a){var b=!0,c=!1,d=void 0;try{for(var e,f,g=a[Symbol.iterator]();!(b=(e=g.next()).done);b=!0)f=e.value,f.removeAttribute("disabled")}catch(a){c=!0,d=a}finally{try{b||null==g["return"]||g["return"]()}finally{if(c)throw d}}}},{key:"_fetchEl",value:function _fetchEl(a){// Tries to figure out what the fetching element is.
// if fetching-element was passed, then it's either considered an ID
// or the element itself.
// Otherwise it will look for an ee-network or with an element with class
// .network. Finally, it will use `window`
if(a){var c=a;for(;c.parentElement;)if(c=c.parentElement,"EE-NETWORK"===c.tagName||c.classList.contains("network")){break}return found?c:window}if(this.fetchingElement)return"string"==typeof this.fetchingElement?this.querySelector("#".concat(this.fetchingElement)):this.fetchingElement;var b=this.querySelector("ee-network");return b||(b=this.querySelector(".network")),b||window}},{key:"submit",value:function(){var a=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function a(b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(!b){a.next=7;break}if("function"==typeof b.setCustomValidity&&b.setCustomValidity(""),b.reportValidity()){a.next=4;break}return a.abrupt("return");case 4:c=this.createSubmitObject([b]),a.next=29;break;case 7:for(d=!0,e=!1,f=void 0,a.prev=10,g=this.elements[Symbol.iterator]();!(d=(h=g.next()).done);d=!0)i=h.value,"function"==typeof i.setCustomValidity&&i.setCustomValidity("");a.next=18;break;case 14:a.prev=14,a.t0=a["catch"](10),e=!0,f=a.t0;case 18:a.prev=18,a.prev=19,d||null==g["return"]||g["return"]();case 21:if(a.prev=21,!e){a.next=24;break}throw f;case 24:return a.finish(21);case 25:return a.finish(18);case 26:if(this.reportValidity()){a.next=28;break}return a.abrupt("return");case 28:c=this.createSubmitObject(this.elements);case 29:if(j=b||this,!this.inFlightMap.has(j)){a.next=33;break}return this.inFlightMap.set(j,{attempted:!0}),a.abrupt("return");case 33:if(this.inFlightMap.set(j,{attempted:!1}),k=this.getAttribute("method"),k&&"PUT"!==k.toUpperCase()&&(k="POST"),l=null===k?this.recordId?"PUT":"POST":k,m=this.getAttribute("action"),m){a.next=40;break}throw new Error("The submitted form has no action URL set");case 40:return n=m+(this.recordId?"/".concat(this.recordId):""),o={url:n,method:l,headers:{"Content-Type":"application/json"},redirect:"follow",// manual, *follow, error
body:c// body data type must match "Content-Type" header
},this.presubmit(o),b||this._disableElements(this.elements),o.body=JSON.stringify(o.body),p=!1,a.prev=46,s=this._fetchEl(b),a.next=50,s.fetch(o.url,o);case 50:q=a.sent,a.next=57;break;case 53:a.prev=53,a.t1=a["catch"](46),console.log("ERROR!",a.t1),p=!0;case 57:if(!p){a.next=65;break}console.log("Network error!"),b||this._enableElements(this.elements),t=new CustomEvent("form-error",{detail:{type:"network"},bubbles:!0,composed:!0}),this.dispatchEvent(t),this.response(null,null),a.next=126;break;case 65:if(q.ok){a.next=116;break}return a.next=68,q.json();case 68:if(u=a.sent,r=this.extrapolateErrors(u)||{},w=new CustomEvent("form-error",{detail:{type:"http",response:q,errs:r},bubbles:!0,composed:!0}),this.dispatchEvent(w),b||this._enableElements(this.elements),!(r.errors&&r.errors.length)){a.next=113;break}for(x={},y=!0,z=!1,A=void 0,a.prev=78,B=this.elements[Symbol.iterator]();!(y=(C=B.next()).done);y=!0)D=C.value,x[D.name]=D;a.next=86;break;case 82:a.prev=82,a.t2=a["catch"](78),z=!0,A=a.t2;case 86:a.prev=86,a.prev=87,y||null==B["return"]||B["return"]();case 89:if(a.prev=89,!z){a.next=92;break}throw A;case 92:return a.finish(89);case 93:return a.finish(86);case 94:for(E=!0,F=!1,G=void 0,a.prev=97,H=r.errors[Symbol.iterator]();!(E=(I=H.next()).done);E=!0)J=I.value,K=x[J.field],K&&(K.setCustomValidity(J.message),K.reportValidity());a.next=105;break;case 101:a.prev=101,a.t3=a["catch"](97),F=!0,G=a.t3;case 105:a.prev=105,a.prev=106,E||null==H["return"]||H["return"]();case 108:if(a.prev=108,!F){a.next=111;break}throw G;case 111:return a.finish(108);case 112:return a.finish(105);case 113:this.response(q,r),a.next=126;break;case 116:return a.next=118,q.json();case 118:L=a.sent,this.inFlightMap.has(j)&&(M=this.inFlightMap.get(j).attempted),this.setFormAfterSubmit&&!M&&(b?(N=j.name,this.setFormElementValues(_defineProperty({},N,L[N]))):this.setFormElementValues(L)),!this.resetFormAfterSubmit||M||b||this.reset(),b||this._enableElements(this.elements),O=new CustomEvent("form-ok",{detail:{response:q},bubbles:!0,composed:!0}),this.dispatchEvent(O),this.response(q,L);case 126:this.inFlightMap.has(j)&&(P=this.inFlightMap.get(j).attempted,this.inFlightMap["delete"](j),P&&this.submit(b));case 127:case"end":return a.stop();}},a,this,[[10,14,18,26],[19,,21,25],[46,53],[78,82,86,94],[87,,89,93],[97,101,105,113],[106,,108,112]])}));return function submit(){return a.apply(this,arguments)}}()},{key:"updated",value:function(){var a=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function a(c){var d,e,f,g;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(_get(_getPrototypeOf(b.prototype),"updated",this).call(this),!this.noAutoload&&c.has("recordId")){a.next=3;break}return a.abrupt("return");case 3:if("undefined"!=typeof this.recordId&&null!==this.recordId){a.next=5;break}return a.abrupt("return");case 5:if(d=this.getAttribute("action"),!d){a.next=27;break}return a.next=9,this.updateComplete;case 9:return this._disableElements(this.elements),a.prev=10,g=this._fetchEl(),a.next=14,g.fetch(d+"/"+this.recordId);case 14:return e=a.sent,a.next=17,e.json();case 17:f=a.sent,a.next=24;break;case 20:a.prev=20,a.t0=a["catch"](10),console.error("WARNING: Fetching element failed to fetch"),f={};case 24:this.setFormElementValues(f),this._enableElements(this.elements),this.validateOnLoad&&this.reportValidity();case 27:case"end":return a.stop();}},a,this,[[10,20]])}));return function updated(){return a.apply(this,arguments)}}()},{key:"render",value:function render(){return html(_templateObject(),this.customStyle)}}]),b}(ThemeableMixin("en-form")(NnForm));customElements.define("en-form",EnForm);