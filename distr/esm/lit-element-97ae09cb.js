function asyncGeneratorStep(e,t,n,a,r,o,s){try{var l=e[o](s),i=l.value}catch(e){return void n(e)}l.done?t(i):Promise.resolve(i).then(a,r)}function _asyncToGenerator(e){return function(){var t=this,n=arguments;return new Promise(function(a,r){function o(e){asyncGeneratorStep(l,a,r,o,s,"next",e)}function s(e){asyncGeneratorStep(l,a,r,o,s,"throw",e)}var l=e.apply(t,n);o(void 0)})}}function _wrapNativeSuper(e){var t="function"==typeof Map?new Map:void 0;return _wrapNativeSuper=function(e){function n(){return _construct(e,arguments,_getPrototypeOf(this).constructor)}if(null===e||!_isNativeFunction(e))return e;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if("undefined"!=typeof t){if(t.has(e))return t.get(e);t.set(e,n)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),_setPrototypeOf(n,e)},_wrapNativeSuper(e)}function isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}function _construct(){return _construct=isNativeReflectConstruct()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var a=Function.bind.apply(e,r),o=new a;return n&&_setPrototypeOf(o,n.prototype),o},_construct.apply(null,arguments)}function _isNativeFunction(e){return-1!==Function.toString.call(e).indexOf("[native code]")}function _possibleConstructorReturn(e,t){return t&&("object"===_typeof(t)||"function"==typeof t)?t:_assertThisInitialized(e)}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _get(e,t,n){return _get="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var a=_superPropBase(e,t);if(a){var r=Object.getOwnPropertyDescriptor(a,t);return r.get?r.get.call(n):r.value}},_get(e,t,n||e)}function _superPropBase(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&(e=_getPrototypeOf(e),null!==e););return e}function _getPrototypeOf(e){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},_getPrototypeOf(e)}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return _setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},_setPrototypeOf(e,t)}function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}}function _defineProperties(e,t){for(var n,a=0;a<t.length;a++)n=t[a],n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */var directives=new WeakMap,isDirective=function(e){return"function"==typeof e&&directives.has(e)},isCEPolyfill=window.customElements!==void 0&&window.customElements.polyfillWrapFlushCallback!==void 0,removeNodes=function(e,t){for(var a=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null,r=t;r!==a;){var o=r.nextSibling;e.removeChild(r),r=o}},noChange={},nothing={},marker="{{lit-".concat((Math.random()+"").slice(2),"}}"),nodeMarker="<!--".concat(marker,"-->"),markerRegex=new RegExp("".concat(marker,"|").concat(nodeMarker)),boundAttributeSuffix="$lit$",Template=function e(t,a){var r=this;_classCallCheck(this,e),this.parts=[],this.element=a;var o=-1,s=0,l=[],d=function(e){for(var n=e.content,a=document.createTreeWalker(n,133/* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */,null,!1),p=0// Edge needs all 4 parameters present; IE11 needs 3rd parameter to be
// null
;a.nextNode();){o++;var x=a.currentNode;if(1===x.nodeType/* Node.ELEMENT_NODE */){if(x.hasAttributes()){for(var u=x.attributes,c=0,y=0;y<u.length;y++)0<=u[y].value.indexOf(marker)&&c++;for(;0<c--;){// Get the template literal section leading up to the first
// expression in this attribute
var m=t.strings[s],g=lastAttributeNameRegex.exec(m)[2],_=g.toLowerCase()+boundAttributeSuffix,v=x.getAttribute(_),h=v.split(markerRegex);// Find the attribute name
r.parts.push({type:"attribute",index:o,name:g,strings:h}),x.removeAttribute(_),s+=h.length-1}}"TEMPLATE"===x.tagName&&d(x)}else if(3===x.nodeType/* Node.TEXT_NODE */){var P=x.data;if(0<=P.indexOf(marker)){// Generate a new text node for each literal section
// These nodes are also used as the markers for node parts
for(var f=x.parentNode,S=P.split(markerRegex),k=S.length-1,b=0;b<k;b++)f.insertBefore(""===S[b]?createMarker():document.createTextNode(S[b]),x),r.parts.push({type:"node",index:++o});// If there's no text, we must insert a comment to mark our place.
// Else, we can trust it will stick around after cloning.
// We have a part for each match found
""===S[k]?(f.insertBefore(createMarker(),x),l.push(x)):x.data=S[k],s+=k}}else if(8===x.nodeType/* Node.COMMENT_NODE */)if(x.data===marker){var C=x.parentNode;// Add a new marker node to be the startNode of the Part if any of
// the following are true:
//  * We don't have a previousSibling
//  * The previousSibling is already the start of a previous part
(null===x.previousSibling||o===p)&&(o++,C.insertBefore(createMarker(),x)),p=o,r.parts.push({type:"node",index:o}),null===x.nextSibling?x.data="":(l.push(x),o--),s++}else for(var N=-1;-1!==(N=x.data.indexOf(marker,N+1));)// Comment node has a binding marker inside, make an inactive part
// The binding won't work, but subsequent bindings will
// TODO (justinfagnani): consider whether it's even worth it to
// make bindings in comments work
r.parts.push({type:"node",index:-1})}};d(a);// Remove text binding nodes after the walk to not disturb the TreeWalker
for(var p,i=0,u=l;i<u.length;i++)p=u[i],p.parentNode.removeChild(p)},isTemplatePartActive=function(e){return-1!==e.index},createMarker=function(){return document.createComment("")},lastAttributeNameRegex=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/,TemplateInstance=/*#__PURE__*/function(){function e(t,n,a){_classCallCheck(this,e),this._parts=[],this.template=t,this.processor=n,this.options=a}return _createClass(e,[{key:"update",value:function update(e){var t=0,n=!0,a=!1,r=void 0;try{for(var o,s,l=this._parts[Symbol.iterator]();!(n=(o=l.next()).done);n=!0)s=o.value,void 0!==s&&s.setValue(e[t]),t++}catch(e){a=!0,r=e}finally{try{n||null==l["return"]||l["return"]()}finally{if(a)throw r}}var d=!0,p=!1,u=void 0;try{for(var c,y,m=this._parts[Symbol.iterator]();!(d=(c=m.next()).done);d=!0)y=c.value,void 0!==y&&y.commit()}catch(e){p=!0,u=e}finally{try{d||null==m["return"]||m["return"]()}finally{if(p)throw u}}}},{key:"_clone",value:function _clone(){var e=this,t=isCEPolyfill?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),n=this.template.parts,a=0,r=0,o=function(t){// Edge needs all 4 parameters present; IE11 needs 3rd parameter to be
// null
// Loop through all the nodes and parts of a template
for(var s,l=document.createTreeWalker(t,133/* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */,null,!1),i=l.nextNode();a<n.length&&null!==i;)// Consecutive Parts may have the same node index, in the case of
// multiple bound attributes on an element. So each iteration we either
// increment the nodeIndex, if we aren't on a node with a part, or the
// partIndex if we are. By not incrementing the nodeIndex when we find a
// part, we allow for the next part to be associated with the current
// node if neccessasry.
if(s=n[a],!isTemplatePartActive(s))e._parts.push(void 0),a++;else if(r===s.index){if("node"===s.type){var p=e.processor.handleTextExpression(e.options);p.insertAfterNode(i.previousSibling),e._parts.push(p)}else{var d;(d=e._parts).push.apply(d,_toConsumableArray(e.processor.handleAttributeExpressions(i,s.name,s.strings,e.options)))}a++}else r++,"TEMPLATE"===i.nodeName&&o(i.content),i=l.nextNode()};return o(t),isCEPolyfill&&(document.adoptNode(t),customElements.upgrade(t)),t}}]),e}(),TemplateResult=/*#__PURE__*/function(){function e(t,n,a,r){_classCallCheck(this,e),this.strings=t,this.values=n,this.type=a,this.processor=r}/**
     * Returns a string of HTML used to create a `<template>` element.
     */return _createClass(e,[{key:"getHTML",value:function getHTML(){for(var e=this.strings.length-1,t="",n=0;n<e;n++){var a=this.strings[n],r=lastAttributeNameRegex.exec(a);// This exec() call does two things:
// 1) Appends a suffix to the bound attribute name to opt out of special
// attribute value parsing that IE11 and Edge do, like for style and
// many SVG attributes. The Template class also appends the same suffix
// when looking up attributes to create Parts.
// 2) Adds an unquoted-attribute-safe marker for the first expression in
// an attribute. Subsequent attribute expressions will use node markers,
// and this is safe since attributes with multiple expressions are
// guaranteed to be quoted.
t+=r?a.substr(0,r.index)+r[1]+r[2]+boundAttributeSuffix+r[3]+marker:a+nodeMarker}return t+this.strings[e]}},{key:"getTemplateElement",value:function getTemplateElement(){var e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}]),e}(),isPrimitive=function(e){return null===e||"object"!==_typeof(e)&&"function"!=typeof e},AttributeCommitter=/*#__PURE__*/function(){function e(t,n,a){_classCallCheck(this,e),this.dirty=!0,this.element=t,this.name=n,this.strings=a,this.parts=[];for(var r=0;r<a.length-1;r++)this.parts[r]=this._createPart()}/**
     * Creates a single part. Override this to create a differnt type of part.
     */return _createClass(e,[{key:"_createPart",value:function _createPart(){return new AttributePart(this)}},{key:"_getValue",value:function _getValue(){for(var e=this.strings,n=e.length-1,a="",r=0;r<n;r++){a+=e[r];var c=this.parts[r];if(void 0!==c){var y=c.value;if(null!=y&&(Array.isArray(y)||// tslint:disable-next-line:no-any
"string"!=typeof y&&y[Symbol.iterator])){var o=!0,s=!1,l=void 0;try{for(var d,p,u=y[Symbol.iterator]();!(o=(d=u.next()).done);o=!0)p=d.value,a+="string"==typeof p?p:p+""}catch(e){s=!0,l=e}finally{try{o||null==u["return"]||u["return"]()}finally{if(s)throw l}}}else a+="string"==typeof y?y:y+""}}return a+=e[n],a}},{key:"commit",value:function commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}]),e}(),AttributePart=/*#__PURE__*/function(){function e(t){_classCallCheck(this,e),this.value=void 0,this.committer=t}return _createClass(e,[{key:"setValue",value:function setValue(e){e===noChange||isPrimitive(e)&&e===this.value||(this.value=e,!isDirective(e)&&(this.committer.dirty=!0))}},{key:"commit",value:function commit(){for(;isDirective(this.value);){var e=this.value;this.value=noChange,e(this)}this.value===noChange||this.committer.commit()}}]),e}(),NodePart=/*#__PURE__*/function(){function e(t){_classCallCheck(this,e),this.value=void 0,this._pendingValue=void 0,this.options=t}/**
     * Inserts this part into a container.
     *
     * This part must be empty, as its contents are not automatically moved.
     */return _createClass(e,[{key:"appendInto",value:function appendInto(e){this.startNode=e.appendChild(createMarker()),this.endNode=e.appendChild(createMarker())}/**
     * Inserts this part between `ref` and `ref`'s next sibling. Both `ref` and
     * its next sibling must be static, unchanging nodes such as those that appear
     * in a literal section of a template.
     *
     * This part must be empty, as its contents are not automatically moved.
     */},{key:"insertAfterNode",value:function insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}/**
     * Appends this part into a parent part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */},{key:"appendIntoPart",value:function appendIntoPart(e){e._insert(this.startNode=createMarker()),e._insert(this.endNode=createMarker())}/**
     * Appends this part after `ref`
     *
     * This part must be empty, as its contents are not automatically moved.
     */},{key:"insertAfterPart",value:function insertAfterPart(e){e._insert(this.startNode=createMarker()),this.endNode=e.endNode,e.endNode=this.startNode}},{key:"setValue",value:function setValue(e){this._pendingValue=e}},{key:"commit",value:function commit(){for(;isDirective(this._pendingValue);){var t=this._pendingValue;this._pendingValue=noChange,t(this)}var e=this._pendingValue;e===noChange||(isPrimitive(e)?e!==this.value&&this._commitText(e):e instanceof TemplateResult?this._commitTemplateResult(e):e instanceof Node?this._commitNode(e):Array.isArray(e)||// tslint:disable-next-line:no-any
e[Symbol.iterator]?this._commitIterable(e):e===nothing?(this.value=nothing,this.clear()):this._commitText(e))}},{key:"_insert",value:function _insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}},{key:"_commitNode",value:function _commitNode(e){this.value===e||(this.clear(),this._insert(e),this.value=e)}},{key:"_commitText",value:function _commitText(e){var t=this.startNode.nextSibling;e=null==e?"":e,t===this.endNode.previousSibling&&3===t.nodeType/* Node.TEXT_NODE */?t.data=e:this._commitNode(document.createTextNode("string"==typeof e?e:e+"")),this.value=e}},{key:"_commitTemplateResult",value:function _commitTemplateResult(e){var t=this.options.templateFactory(e);if(this.value instanceof TemplateInstance&&this.value.template===t)this.value.update(e.values);else{// Make sure we propagate the template processor from the TemplateResult
// so that we use its syntax extension, etc. The template factory comes
// from the render function options so that it can control template
// caching and preprocessing.
var n=new TemplateInstance(t,e.processor,this.options),a=n._clone();n.update(e.values),this._commitNode(a),this.value=n}}},{key:"_commitIterable",value:function _commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());// Lets us keep track of how many items we stamped so we can clear leftover
// items from a previous render
var n,a=this.value,r=0,o=!0,s=!1,l=void 0;try{for(var i,d,p=t[Symbol.iterator]();!(o=(i=p.next()).done);o=!0)// Try to reuse an existing part
d=i.value,n=a[r],void 0===n&&(n=new e(this.options),a.push(n),0===r?n.appendIntoPart(this):n.insertAfterPart(a[r-1])),n.setValue(d),n.commit(),r++}catch(e){s=!0,l=e}finally{try{o||null==p["return"]||p["return"]()}finally{if(s)throw l}}r<a.length&&(a.length=r,this.clear(n&&n.endNode))}},{key:"clear",value:function clear(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:this.startNode;removeNodes(this.startNode.parentNode,e.nextSibling,this.endNode)}}]),e}(),BooleanAttributePart=/*#__PURE__*/function(){function e(t,n,a){if(_classCallCheck(this,e),this.value=void 0,this._pendingValue=void 0,2!==a.length||""!==a[0]||""!==a[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=n,this.strings=a}return _createClass(e,[{key:"setValue",value:function setValue(e){this._pendingValue=e}},{key:"commit",value:function commit(){for(;isDirective(this._pendingValue);){var t=this._pendingValue;this._pendingValue=noChange,t(this)}if(this._pendingValue!==noChange){var e=!!this._pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=e,this._pendingValue=noChange}}}]),e}(),PropertyCommitter=/*#__PURE__*/function(e){function t(e,n,a){var r;return _classCallCheck(this,t),r=_possibleConstructorReturn(this,_getPrototypeOf(t).call(this,e,n,a)),r.single=2===a.length&&""===a[0]&&""===a[1],r}return _inherits(t,e),_createClass(t,[{key:"_createPart",value:function _createPart(){return new PropertyPart(this)}},{key:"_getValue",value:function _getValue(){return this.single?this.parts[0].value:_get(_getPrototypeOf(t.prototype),"_getValue",this).call(this)}},{key:"commit",value:function commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}]),t}(AttributeCommitter),PropertyPart=/*#__PURE__*/function(e){function t(){return _classCallCheck(this,t),_possibleConstructorReturn(this,_getPrototypeOf(t).apply(this,arguments))}return _inherits(t,e),t}(AttributePart),eventOptionsSupported=!1;try{var options={get capture(){return eventOptionsSupported=!0,!1}};// tslint:disable-next-line:no-any
// tslint:disable-next-line:no-any
window.addEventListener("test",options,options),window.removeEventListener("test",options,options)}catch(e){}var EventPart=/*#__PURE__*/function(){function e(t,n,a){var r=this;_classCallCheck(this,e),this.value=void 0,this._pendingValue=void 0,this.element=t,this.eventName=n,this.eventContext=a,this._boundHandleEvent=function(t){return r.handleEvent(t)}}return _createClass(e,[{key:"setValue",value:function setValue(e){this._pendingValue=e}},{key:"commit",value:function commit(){for(;isDirective(this._pendingValue);){var a=this._pendingValue;this._pendingValue=noChange,a(this)}if(this._pendingValue!==noChange){var e=this._pendingValue,t=this.value,n=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive);n&&this.element.removeEventListener(this.eventName,this._boundHandleEvent,this._options),null!=e&&(null==t||n)&&(this._options=getOptions(e),this.element.addEventListener(this.eventName,this._boundHandleEvent,this._options)),this.value=e,this._pendingValue=noChange}}},{key:"handleEvent",value:function handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}]),e}(),getOptions=function(e){return e&&(eventOptionsSupported?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)},DefaultTemplateProcessor=/*#__PURE__*/function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"handleAttributeExpressions",/**
     * Create parts for an attribute-position binding, given the event, attribute
     * name, and string literals.
     *
     * @param element The element containing the binding
     * @param name  The attribute name
     * @param strings The string literals. There are always at least two strings,
     *   event for fully-controlled bindings with a single expression.
     */value:function handleAttributeExpressions(e,t,n,a){var r=t[0];if("."===r){var s=new PropertyCommitter(e,t.slice(1),n);return s.parts}if("@"===r)return[new EventPart(e,t.slice(1),a.eventContext)];if("?"===r)return[new BooleanAttributePart(e,t.slice(1),n)];var o=new AttributeCommitter(e,t,n);return o.parts}/**
     * Create parts for a text-position binding.
     * @param templateFactory
     */},{key:"handleTextExpression",value:function handleTextExpression(e){return new NodePart(e)}}]),e}(),defaultTemplateProcessor=new DefaultTemplateProcessor;// We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */ /**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */function templateFactory(e){var t=templateCaches.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},templateCaches.set(e.type,t));var n=t.stringsArray.get(e.strings);if(void 0!==n)return n;// If the TemplateStringsArray is new, generate a key from the strings
// This key is shared between all templates with identical content
var a=e.strings.join(marker);// Check if we already have a Template for this key
return n=t.keyString.get(a),void 0===n&&(n=new Template(e,e.getTemplateElement()),t.keyString.set(a,n)),t.stringsArray.set(e.strings,n),n}var templateCaches=new Map,parts=new WeakMap,render=function(e,t,n){var a=parts.get(t);a===void 0&&(removeNodes(t,t.firstChild),parts.set(t,a=new NodePart(Object.assign({templateFactory:templateFactory},n))),a.appendInto(t)),a.setValue(e),a.commit()};/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.0.0");/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */var html=function(e){for(var t=arguments.length,n=Array(1<t?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];return new TemplateResult(e,n,"html",defaultTemplateProcessor)},walkerNodeFilter=133/* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */;/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */ /**
 * Removes the list of nodes from a Template safely. In addition to removing
 * nodes from the Template, the Template part indices are updated to match
 * the mutated Template DOM.
 *
 * As the template is walked the removal state is tracked and
 * part indices are adjusted as needed.
 *
 * div
 *   div#1 (remove) <-- start removing (removing node is div#1)
 *     div
 *       div#2 (remove)  <-- continue removing (removing node is still div#1)
 *         div
 * div <-- stop removing since previous sibling is the removing node (div#1,
 * removed 4 nodes)
 */function removeNodesFromTemplate(e,t){for(var n=e.element.content,a=e.parts,r=document.createTreeWalker(n,walkerNodeFilter,null,!1),o=nextActiveIndexInTemplateParts(a),s=a[o],l=-1,i=0,d=[],p=null;r.nextNode();){l++;var u=r.currentNode;// End removal if stepped past the removing node
for(u.previousSibling===p&&(p=null),t.has(u)&&(d.push(u),null===p&&(p=u)),null!==p&&i++;s!==void 0&&s.index===l;)// If part is in a removed node deactivate it by setting index to -1 or
// adjust the index as needed.
// go to the next active part.
s.index=null===p?s.index-i:-1,o=nextActiveIndexInTemplateParts(a,o),s=a[o]}d.forEach(function(e){return e.parentNode.removeChild(e)})}var countNodes=function(e){for(var t=11===e.nodeType/* Node.DOCUMENT_FRAGMENT_NODE */?0:1,n=document.createTreeWalker(e,walkerNodeFilter,null,!1);n.nextNode();)t++;return t},nextActiveIndexInTemplateParts=function(e){for(var t,n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:-1,a=n+1;a<e.length;a++)if(t=e[a],isTemplatePartActive(t))return a;return-1};/**
 * Inserts the given node into the Template, optionally before the given
 * refNode. In addition to inserting the node into the Template, the Template
 * part indices are updated to match the mutated Template DOM.
 */function insertNodeIntoTemplate(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null,a=e.element.content,r=e.parts;// If there's no refNode, then put node at end of template.
// No part indices need to be shifted in this case.
if(null===n||void 0===n)return void a.appendChild(t);for(var o=document.createTreeWalker(a,walkerNodeFilter,null,!1),s=nextActiveIndexInTemplateParts(r),l=0,i=-1;o.nextNode();){i++;var d=o.currentNode;for(d===n&&(l=countNodes(t),n.parentNode.insertBefore(t,n));-1!==s&&r[s].index===i;){// If we've inserted the node, simply adjust all subsequent parts
if(0<l){for(;-1!==s;)r[s].index+=l,s=nextActiveIndexInTemplateParts(r,s);return}s=nextActiveIndexInTemplateParts(r,s)}}}/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */ // Get a key to lookup in `templateCaches`.
var getTemplateCacheKey=function(e,t){return"".concat(e,"--").concat(t)},compatibleShadyCSSVersion=!0;"undefined"==typeof window.ShadyCSS?compatibleShadyCSSVersion=!1:"undefined"==typeof window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected.Please update to at least @webcomponents/webcomponentsjs@2.0.2 and@webcomponents/shadycss@1.3.1."),compatibleShadyCSSVersion=!1);/**
 * Template factory which scopes template DOM using ShadyCSS.
 * @param scopeName {string}
 */var shadyTemplateFactory=function(e){return function(t){var n=getTemplateCacheKey(t.type,e),a=templateCaches.get(n);void 0===a&&(a={stringsArray:new WeakMap,keyString:new Map},templateCaches.set(n,a));var r=a.stringsArray.get(t.strings);if(void 0!==r)return r;var o=t.strings.join(marker);if(r=a.keyString.get(o),void 0===r){var s=t.getTemplateElement();compatibleShadyCSSVersion&&window.ShadyCSS.prepareTemplateDom(s,e),r=new Template(t,s),a.keyString.set(o,r)}return a.stringsArray.set(t.strings,r),r}},TEMPLATE_TYPES=["html","svg"],removeStylesFromLitTemplates=function(e){TEMPLATE_TYPES.forEach(function(t){var n=templateCaches.get(getTemplateCacheKey(t,e));n!==void 0&&n.keyString.forEach(function(e){var t=e.element.content,n=new Set;// IE 11 doesn't support the iterable param Set constructor
Array.from(t.querySelectorAll("style")).forEach(function(e){n.add(e)}),removeNodesFromTemplate(e,n)})})},shadyRenderSet=new Set,prepareTemplateStyles=function(e,t,n){shadyRenderSet.add(n);// Move styles out of rendered DOM and store.
var a=e.querySelectorAll("style");// If there are no styles, skip unnecessary work
if(0===a.length)return void window.ShadyCSS.prepareTemplateStyles(t.element,n);// Collect styles into a single style. This helps us make sure ShadyCSS
// manipulations will not prevent us from being able to fix up template
// part indices.
// NOTE: collecting styles is inefficient for browsers but ShadyCSS
// currently does this anyway. When it does not, this should be changed.
for(var r,o=document.createElement("style"),s=0;s<a.length;s++)r=a[s],r.parentNode.removeChild(r),o.textContent+=r.textContent;// Remove styles from nested templates in this scope.
if(removeStylesFromLitTemplates(n),insertNodeIntoTemplate(t,o,t.element.content.firstChild),window.ShadyCSS.prepareTemplateStyles(t.element,n),window.ShadyCSS.nativeShadow){// When in native Shadow DOM, re-add styling to rendered content using
// the style ShadyCSS produced.
var l=t.element.content.querySelector("style");e.insertBefore(l.cloneNode(!0),e.firstChild)}else{t.element.content.insertBefore(o,t.element.content.firstChild);var d=new Set;d.add(o),removeNodesFromTemplate(t,d)}},render$1=function(e,t,n){var a=n.scopeName,r=parts.has(t),o=t instanceof ShadowRoot&&compatibleShadyCSSVersion&&e instanceof TemplateResult,s=o&&!shadyRenderSet.has(a),l=s?document.createDocumentFragment():t;// When performing first scope render,
// (1) We've rendered into a fragment so that there's a chance to
// `prepareTemplateStyles` before sub-elements hit the DOM
// (which might cause them to render based on a common pattern of
// rendering in a custom element's `connectedCallback`);
// (2) Scope the template with ShadyCSS one time only for this scope.
// (3) Render the fragment into the container and make sure the
// container knows its `part` is the one we just rendered. This ensures
// DOM will be re-used on subsequent renders.
if(render(e,l,Object.assign({templateFactory:shadyTemplateFactory(a)},n)),s){var i=parts.get(l);parts["delete"](l),i.value instanceof TemplateInstance&&prepareTemplateStyles(l,i.value.template,a),removeNodes(t,t.firstChild),t.appendChild(l),parts.set(t,i)}// After elements have hit the DOM, update styling if this is the
// initial render to this container.
// This is needed whenever dynamic changes are made so it would be
// safest to do every render; however, this would regress performance
// so we leave it up to the user to call `ShadyCSSS.styleElement`
// for dynamic changes.
!r&&o&&window.ShadyCSS.styleElement(t.host)};window.JSCompiler_renameProperty=function(e){return e};var defaultConverter={toAttribute:function toAttribute(e,t){return t===Boolean?e?"":null:t===Object||t===Array?null==e?e:JSON.stringify(e):e},fromAttribute:function fromAttribute(e,t){return t===Boolean?null!==e:t===Number?null===e?null:+e:t===Object||t===Array?JSON.parse(e):e}},notEqual=function(e,t){// This ensures (old==NaN, value==NaN) always returns false
return t!==e&&(t===t||e===e)},defaultPropertyDeclaration={attribute:!0,type:String,converter:defaultConverter,reflect:!1,hasChanged:notEqual},microtaskPromise=Promise.resolve(!0),STATE_HAS_UPDATED=1,STATE_UPDATE_REQUESTED=4,STATE_IS_REFLECTING_TO_ATTRIBUTE=8,STATE_IS_REFLECTING_TO_PROPERTY=16,STATE_HAS_CONNECTED=32,UpdatingElement=/*#__PURE__*/function(e){function t(){var e;return _classCallCheck(this,t),e=_possibleConstructorReturn(this,_getPrototypeOf(t).call(this)),e._updateState=0,e._instanceProperties=void 0,e._updatePromise=microtaskPromise,e._hasConnectedResolver=void 0,e._changedProperties=new Map,e._reflectingProperties=void 0,e.initialize(),e}/**
     * Returns a list of attributes corresponding to the registered properties.
     * @nocollapse
     */return _inherits(t,e),_createClass(t,[{key:"initialize",/**
     * Performs element initialization. By default captures any pre-set values for
     * registered properties.
     */value:function initialize(){this._saveInstanceProperties(),this._requestUpdate()}/**
     * Fixes any properties set on the instance before upgrade time.
     * Otherwise these would shadow the accessor and break these properties.
     * The properties are stored in a Map which is played back after the
     * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
     * (<=41), properties created for native platform properties like (`id` or
     * `name`) may not have default values set in the element constructor. On
     * these browsers native properties appear on instances and therefore their
     * default value will overwrite any element default (e.g. if the element sets
     * this.id = 'id' in the constructor, the 'id' will become '' since this is
     * the native platform default).
     */},{key:"_saveInstanceProperties",value:function _saveInstanceProperties(){var e=this;this.constructor._classProperties.forEach(function(t,n){if(e.hasOwnProperty(n)){var a=e[n];delete e[n],e._instanceProperties||(e._instanceProperties=new Map),e._instanceProperties.set(n,a)}})}/**
     * Applies previously saved instance properties.
     */},{key:"_applyInstanceProperties",value:function _applyInstanceProperties(){var e=this;this._instanceProperties.forEach(function(t,n){return e[n]=t}),this._instanceProperties=void 0}},{key:"connectedCallback",value:function connectedCallback(){this._updateState|=STATE_HAS_CONNECTED,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}/**
     * Allows for `super.disconnectedCallback()` in extensions while
     * reserving the possibility of making non-breaking feature additions
     * when disconnecting at some point in the future.
     */},{key:"disconnectedCallback",value:function disconnectedCallback(){}/**
     * Synchronizes property values when attributes change.
     */},{key:"attributeChangedCallback",value:function attributeChangedCallback(e,t,n){t!==n&&this._attributeToProperty(e,n)}},{key:"_propertyToAttribute",value:function _propertyToAttribute(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:defaultPropertyDeclaration,a=this.constructor,r=a._attributeNameForProperty(e,n);if(void 0!==r){var o=a._propertyValueToAttribute(t,n);// an undefined value does not change the attribute.
if(void 0===o)return;// Track if the property is being reflected to avoid
// setting the property again via `attributeChangedCallback`. Note:
// 1. this takes advantage of the fact that the callback is synchronous.
// 2. will behave incorrectly if multiple attributes are in the reaction
// stack at time of calling. However, since we process attributes
// in `update` this should not be possible (or an extreme corner case
// that we'd like to discover).
// mark state reflecting
this._updateState|=STATE_IS_REFLECTING_TO_ATTRIBUTE,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._updateState&=~STATE_IS_REFLECTING_TO_ATTRIBUTE}}},{key:"_attributeToProperty",value:function _attributeToProperty(e,t){// Use tracking info to avoid deserializing attribute value if it was
// just set from a property setter.
if(!(this._updateState&STATE_IS_REFLECTING_TO_ATTRIBUTE)){var n=this.constructor,a=n._attributeToPropertyMap.get(e);if(void 0!==a){var r=n._classProperties.get(a)||defaultPropertyDeclaration;// mark state reflecting
this._updateState|=STATE_IS_REFLECTING_TO_PROPERTY,this[a]=// tslint:disable-next-line:no-any
n._propertyValueFromAttribute(t,r),this._updateState&=~STATE_IS_REFLECTING_TO_PROPERTY}}}/**
     * This private version of `requestUpdate` does not access or return the
     * `updateComplete` promise. This promise can be overridden and is therefore
     * not free to access.
     */},{key:"_requestUpdate",value:function _requestUpdate(e,t){var n=!0;// If we have a property key, perform property update steps.
if(void 0!==e){var a=this.constructor,r=a._classProperties.get(e)||defaultPropertyDeclaration;a._valueHasChanged(this[e],t,r.hasChanged)?(!this._changedProperties.has(e)&&this._changedProperties.set(e,t),!0===r.reflect&&!(this._updateState&STATE_IS_REFLECTING_TO_PROPERTY)&&(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,r))):n=!1}!this._hasRequestedUpdate&&n&&this._enqueueUpdate()}/**
     * Requests an update which is processed asynchronously. This should
     * be called when an element should update based on some state not triggered
     * by setting a property. In this case, pass no arguments. It should also be
     * called when manually implementing a property setter. In this case, pass the
     * property `name` and `oldValue` to ensure that any configured property
     * options are honored. Returns the `updateComplete` Promise which is resolved
     * when the update completes.
     *
     * @param name {PropertyKey} (optional) name of requesting property
     * @param oldValue {any} (optional) old value of requesting property
     * @returns {Promise} A Promise that is resolved when the update completes.
     */},{key:"requestUpdate",value:function requestUpdate(e,t){return this._requestUpdate(e,t),this.updateComplete}/**
     * Sets up the element to asynchronously update.
     */},{key:"_enqueueUpdate",value:function(){var e=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function e(){var t,n,a,r,o=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this._updateState|=STATE_UPDATE_REQUESTED,a=this._updatePromise,this._updatePromise=new Promise(function(e,a){t=e,n=a}),e.prev=3,e.next=6,a;case 6:e.next=10;break;case 8:e.prev=8,e.t0=e["catch"](3);case 10:if(this._hasConnected){e.next=13;break}return e.next=13,new Promise(function(e){return o._hasConnectedResolver=e});case 13:if(e.prev=13,r=this.performUpdate(),null==r){e.next=18;break}return e.next=18,r;case 18:e.next=23;break;case 20:e.prev=20,e.t1=e["catch"](13),n(e.t1);case 23:t(!this._hasRequestedUpdate);case 24:case"end":return e.stop();}},e,this,[[3,8],[13,20]])}));return function _enqueueUpdate(){return e.apply(this,arguments)}}()},{key:"performUpdate",/**
     * Performs an element update. Note, if an exception is thrown during the
     * update, `firstUpdated` and `updated` will not be called.
     *
     * You can override this method to change the timing of updates. If this
     * method is overridden, `super.performUpdate()` must be called.
     *
     * For instance, to schedule updates to occur just before the next frame:
     *
     * ```
     * protected async performUpdate(): Promise<unknown> {
     *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
     *   super.performUpdate();
     * }
     * ```
     */value:function performUpdate(){this._instanceProperties&&this._applyInstanceProperties();var t=!1,n=this._changedProperties;try{t=this.shouldUpdate(n),t&&this.update(n)}catch(n){throw t=!1,n}finally{this._markUpdated()}t&&(!(this._updateState&STATE_HAS_UPDATED)&&(this._updateState|=STATE_HAS_UPDATED,this.firstUpdated(n)),this.updated(n))}},{key:"_markUpdated",value:function _markUpdated(){this._changedProperties=new Map,this._updateState&=~STATE_UPDATE_REQUESTED}/**
     * Returns a Promise that resolves when the element has completed updating.
     * The Promise value is a boolean that is `true` if the element completed the
     * update without triggering another update. The Promise result is `false` if
     * a property was set inside `updated()`. If the Promise is rejected, an
     * exception was thrown during the update. This getter can be implemented to
     * await additional state. For example, it is sometimes useful to await a
     * rendered element before fulfilling this Promise. To do this, first await
     * `super.updateComplete` then any subsequent state.
     *
     * @returns {Promise} The Promise returns a boolean that indicates if the
     * update resolved without triggering another update.
     */},{key:"shouldUpdate",/**
     * Controls whether or not `update` should be called when the element requests
     * an update. By default, this method always returns `true`, but this can be
     * customized to control when to update.
     *
     * * @param _changedProperties Map of changed properties with old values
     */value:function shouldUpdate(){return!0}/**
     * Updates the element. This method reflects property values to attributes.
     * It can be overridden to render and keep updated element DOM.
     * Setting properties inside this method will *not* trigger
     * another update.
     *
     * * @param _changedProperties Map of changed properties with old values
     */},{key:"update",value:function update(){var e=this;void 0!==this._reflectingProperties&&0<this._reflectingProperties.size&&(this._reflectingProperties.forEach(function(t,n){return e._propertyToAttribute(n,e[n],t)}),this._reflectingProperties=void 0)}/**
     * Invoked whenever the element is updated. Implement to perform
     * post-updating tasks via DOM APIs, for example, focusing an element.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * * @param _changedProperties Map of changed properties with old values
     */},{key:"updated",value:function updated(){}/**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * * @param _changedProperties Map of changed properties with old values
     */},{key:"firstUpdated",value:function firstUpdated(){}},{key:"_hasConnected",get:function get(){return this._updateState&STATE_HAS_CONNECTED}},{key:"_hasRequestedUpdate",get:function get(){return this._updateState&STATE_UPDATE_REQUESTED}},{key:"hasUpdated",get:function get(){return this._updateState&STATE_HAS_UPDATED}},{key:"updateComplete",get:function get(){return this._updatePromise}}],[{key:"_ensureClassProperties",/**
     * Ensures the private `_classProperties` property metadata is created.
     * In addition to `finalize` this is also called in `createProperty` to
     * ensure the `@property` decorator can add property metadata.
     */ /** @nocollapse */value:function _ensureClassProperties(){var e=this;// ensure private storage for property declarations.
if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;// NOTE: Workaround IE11 not supporting Map constructor argument.
var t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach(function(t,n){return e._classProperties.set(n,t)})}}/**
     * Creates a property accessor on the element prototype if one does not exist.
     * The property setter calls the property's `hasChanged` property option
     * or uses a strict identity check to determine whether or not to request
     * an update.
     * @nocollapse
     */},{key:"createProperty",value:function createProperty(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:defaultPropertyDeclaration;// Do not generate an accessor if the prototype already has one, since
// it would be lost otherwise and that would never be the user's intention;
// Instead, we expect users to call `requestUpdate` themselves from
// user-defined accessors. Note that if the super has an accessor we will
// still overwrite it
if(this._ensureClassProperties(),this._classProperties.set(e,t),!(t.noAccessor||this.prototype.hasOwnProperty(e))){var n="symbol"===_typeof(e)?Symbol():"__".concat(e);Object.defineProperty(this.prototype,e,{// tslint:disable-next-line:no-any no symbol in index
get:function get(){return this[n]},set:function set(t){// tslint:disable-next-line:no-any no symbol in index
var a=this[e];// tslint:disable-next-line:no-any no symbol in index
this[n]=t,this._requestUpdate(e,a)},configurable:!0,enumerable:!0})}}/**
     * Creates property accessors for registered properties and ensures
     * any superclasses are also finalized.
     * @nocollapse
     */},{key:"finalize",value:function finalize(){if(!(this.hasOwnProperty(JSCompiler_renameProperty("finalized",this))&&this.finalized)){// finalize any superclasses
var e=Object.getPrototypeOf(this);// make any properties
// Note, only process "own" properties since this element will inherit
// any properties defined on the superClass, and finalization ensures
// the entire prototype chain is finalized.
if("function"==typeof e.finalize&&e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){var t=this.properties,n=[].concat(_toConsumableArray(Object.getOwnPropertyNames(t)),_toConsumableArray("function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[])),a=!0,r=!1,o=void 0;// support symbols in properties (IE11 does not support this)
try{// This for/of is ok because propKeys is an array
for(var s,l,i=n[Symbol.iterator]();!(a=(s=i.next()).done);a=!0)// note, use of `any` is due to TypeSript lack of support for symbol in
// index types
// tslint:disable-next-line:no-any no symbol in index
l=s.value,this.createProperty(l,t[l])}catch(e){r=!0,o=e}finally{try{a||null==i["return"]||i["return"]()}finally{if(r)throw o}}}}}/**
     * Returns the property name for the given attribute `name`.
     * @nocollapse
     */},{key:"_attributeNameForProperty",value:function _attributeNameForProperty(e,t){var n=t.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof e?e.toLowerCase():void 0}/**
     * Returns true if a property should request an update.
     * Called when a property value is set and uses the `hasChanged`
     * option for the property if present or a strict identity check.
     * @nocollapse
     */},{key:"_valueHasChanged",value:function _valueHasChanged(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:notEqual;return n(e,t)}/**
     * Returns the property value for the given attribute value.
     * Called via the `attributeChangedCallback` and uses the property's
     * `converter` or `converter.fromAttribute` property option.
     * @nocollapse
     */},{key:"_propertyValueFromAttribute",value:function _propertyValueFromAttribute(e,t){var n=t.type,a=t.converter||defaultConverter,r="function"==typeof a?a:a.fromAttribute;return r?r(e,n):e}/**
     * Returns the attribute value for the given property value. If this
     * returns undefined, the property will *not* be reflected to an attribute.
     * If this returns null, the attribute will be removed, otherwise the
     * attribute will be set to the value.
     * This uses the property's `reflect` and `type.toAttribute` property options.
     * @nocollapse
     */},{key:"_propertyValueToAttribute",value:function _propertyValueToAttribute(e,t){if(void 0!==t.reflect){var n=t.type,a=t.converter,r=a&&a.toAttribute||defaultConverter.toAttribute;return r(e,n)}}},{key:"observedAttributes",get:function get(){var e=this;this.finalize();var t=[];// Use forEach so this works even if for/of loops are compiled to for loops
// expecting arrays
return this._classProperties.forEach(function(n,a){var r=e._attributeNameForProperty(a,n);void 0!==r&&(e._attributeToPropertyMap.set(r,a),t.push(r))}),t}}]),t}(_wrapNativeSuper(HTMLElement));/**
 * Change function that returns true if `value` is different from `oldValue`.
 * This method is used as the default for a property's `hasChanged` function.
 */UpdatingElement.finalized=!0;/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/var supportsAdoptingStyleSheets="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,constructionToken=Symbol(),CSSResult=/*#__PURE__*/function(){function e(t,n){if(_classCallCheck(this,e),n!==constructionToken)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}// Note, this is a getter so that it's lazy. In practice, this means
// stylesheets are not created until the first element instance is made.
return _createClass(e,[{key:"toString",value:function toString(){return this.cssText}},{key:"styleSheet",get:function get(){return void 0===this._styleSheet&&(supportsAdoptingStyleSheets?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}}]),e}(),textFromCSSResult=function(e){if(e instanceof CSSResult)return e.cssText;throw new Error("Value passed to 'css' function must be a 'css' function result: ".concat(e,". Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security."))},css=function(e){for(var t=arguments.length,n=Array(1<t?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];var r=n.reduce(function(t,n,a){return t+textFromCSSResult(n)+e[a+1]},e[0]);return new CSSResult(r,constructionToken)};(window.litElementVersions||(window.litElementVersions=[])).push("2.0.1");/**
 * Minimal implementation of Array.prototype.flat
 * @param arr the array to flatten
 * @param result the accumlated result
 */function arrayFlat(e){for(var t,n=1<arguments.length&&arguments[1]!==void 0?arguments[1]:[],a=0,r=e.length;a<r;a++)t=e[a],Array.isArray(t)?arrayFlat(t,n):n.push(t);return n}/** Deeply flattens styles array. Uses native flat if available. */var flattenStyles=function(e){return e.flat?e.flat(1/0):arrayFlat(e)},LitElement=/*#__PURE__*/function(e){function t(){return _classCallCheck(this,t),_possibleConstructorReturn(this,_getPrototypeOf(t).apply(this,arguments))}return _inherits(t,e),_createClass(t,[{key:"initialize",/**
     * Performs element initialization. By default this calls `createRenderRoot`
     * to create the element `renderRoot` node and captures any pre-set values for
     * registered properties.
     */value:function initialize(){_get(_getPrototypeOf(t.prototype),"initialize",this).call(this),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}/**
     * Returns the node into which the element should render and by default
     * creates and returns an open shadowRoot. Implement to customize where the
     * element's DOM is rendered. For example, to render into the element's
     * childNodes, return `this`.
     * @returns {Element|DocumentFragment} Returns a node into which to render.
     */},{key:"createRenderRoot",value:function createRenderRoot(){return this.attachShadow({mode:"open"})}/**
     * Applies styling to the element shadowRoot using the `static get styles`
     * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
     * available and will fallback otherwise. When Shadow DOM is polyfilled,
     * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
     * is available but `adoptedStyleSheets` is not, styles are appended to the
     * end of the `shadowRoot` to [mimic spec
     * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
     */},{key:"adoptStyles",value:function adoptStyles(){var e=this.constructor._styles;0===e.length||(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?supportsAdoptingStyleSheets?this.renderRoot.adoptedStyleSheets=e.map(function(e){return e.styleSheet}):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(function(e){return e.cssText}),this.localName))}},{key:"connectedCallback",value:function connectedCallback(){_get(_getPrototypeOf(t.prototype),"connectedCallback",this).call(this),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}/**
     * Updates the element. This method reflects property values to attributes
     * and calls `render` to render DOM via lit-html. Setting properties inside
     * this method will *not* trigger another update.
     * * @param _changedProperties Map of changed properties with old values
     */},{key:"update",value:function update(e){var n=this;_get(_getPrototypeOf(t.prototype),"update",this).call(this,e);var a=this.render();a instanceof TemplateResult&&this.constructor.render(a,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(function(e){var t=document.createElement("style");t.textContent=e.cssText,n.renderRoot.appendChild(t)}))}/**
     * Invoked on each update to perform rendering tasks. This method must return
     * a lit-html TemplateResult. Setting properties inside this method will *not*
     * trigger the element to update.
     */},{key:"render",value:function(){}}],[{key:"finalize",/** @nocollapse */value:function finalize(){_get(_getPrototypeOf(t),"finalize",this).call(this),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}/** @nocollapse */},{key:"_getUniqueStyles",value:function _getUniqueStyles(){// Take care not to call `this.styles` multiple times since this generates
// new CSSResults each time.
// TODO(sorvell): Since we do not cache CSSResults by input, any
// shared styles will generate new stylesheet objects, which is wasteful.
// This should be addressed when a browser ships constructable
// stylesheets.
var e=this.styles,t=[];if(Array.isArray(e)){var n=flattenStyles(e),a=n.reduceRight(function(e,t){// on IE set.add does not return the set.
return e.add(t),e},new Set);// As a performance optimization to avoid duplicated styling that can
// occur especially when composing via subclassing, de-duplicate styles
// preserving the last item in the list. The last item is kept to
// try to preserve cascade order with the assumption that it's most
// important that last added styles override previous styles.
a.forEach(function(e){return t.unshift(e)})}else e&&t.push(e);return t}}]),t}(UpdatingElement);LitElement.finalized=!0,LitElement.render=render$1;export{LitElement as L,css as c,html as h};