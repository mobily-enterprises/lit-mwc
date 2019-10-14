function _typeof2(e){return _typeof2="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof2(e)}define(["exports"],function(e){'use strict';function t(e){return t="function"==typeof Symbol&&"symbol"===_typeof2(Symbol.iterator)?function(e){return _typeof2(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":_typeof2(e)},t(e)}function n(e,t,n,r,a,o,s){try{var l=e[o](s),i=l.value}catch(e){return void n(e)}l.done?t(i):Promise.resolve(i).then(r,a)}function r(e){return function(){var t=this,r=arguments;return new Promise(function(a,o){function s(e){n(i,a,o,s,l,"next",e)}function l(e){n(i,a,o,s,l,"throw",e)}var i=e.apply(t,r);s(void 0)})}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){for(var n,r=0;r<t.length;r++)n=t[r],n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}function s(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function p(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&c(e,t)}function u(e){return u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},u(e)}function c(e,t){return c=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},c(e,t)}function y(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}function m(){return m=y()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var a=Function.bind.apply(e,r),o=new a;return n&&c(o,n.prototype),o},m.apply(null,arguments)}function g(e){return-1!==Function.toString.call(e).indexOf("[native code]")}function _(e){var t="function"==typeof Map?new Map:void 0;return _=function(e){function n(){return m(e,arguments,u(this).constructor)}if(null===e||!g(e))return e;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if("undefined"!=typeof t){if(t.has(e))return t.get(e);t.set(e,n)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),c(n,e)},_(e)}function h(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function v(e,t){return t&&("object"===_typeof2(t)||"function"==typeof t)?t:h(e)}function f(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&(e=u(e),null!==e););return e}function S(e,t,n){return S="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=f(e,t);if(r){var a=Object.getOwnPropertyDescriptor(r,t);return a.get?a.get.call(n):a.value}},S(e,t,n||e)}function k(e){return b(e)||P(e)||x()}function b(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}}function P(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function x(){throw new TypeError("Invalid attempt to spread non-iterable instance")}/**
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
   */function C(e){var t=ae.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},ae.set(e.type,t));var n=t.stringsArray.get(e.strings);if(void 0!==n)return n;// If the TemplateStringsArray is new, generate a key from the strings
// This key is shared between all templates with identical content
var r=e.strings.join(I);// Check if we already have a Template for this key
return n=t.keyString.get(r),void 0===n&&(n=new H(e,e.getTemplateElement()),t.keyString.set(r,n)),t.stringsArray.set(e.strings,n),n}/**
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
   */function N(e,t){for(var n=e.element.content,r=e.parts,a=document.createTreeWalker(n,133,null,!1),o=ie(r),s=r[o],l=-1,i=0,d=[],p=null;a.nextNode();){l++;var u=a.currentNode;// End removal if stepped past the removing node
for(u.previousSibling===p&&(p=null),t.has(u)&&(d.push(u),null===p&&(p=u)),null!==p&&i++;s!==void 0&&s.index===l;)// If part is in a removed node deactivate it by setting index to -1 or
// adjust the index as needed.
// go to the next active part.
s.index=null===p?s.index-i:-1,o=ie(r,o),s=r[o]}d.forEach(function(e){return e.parentNode.removeChild(e)})}/**
   * Inserts the given node into the Template, optionally before the given
   * refNode. In addition to inserting the node into the Template, the Template
   * part indices are updated to match the mutated Template DOM.
   */function T(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null,r=e.element.content,a=e.parts;// If there's no refNode, then put node at end of template.
// No part indices need to be shifted in this case.
if(null===n||void 0===n)return void r.appendChild(t);for(var o=document.createTreeWalker(r,133,null,!1),s=ie(a),l=0,i=-1;o.nextNode();){i++;var d=o.currentNode;for(d===n&&(l=le(t),n.parentNode.insertBefore(t,n));-1!==s&&a[s].index===i;){// If we've inserted the node, simply adjust all subsequent parts
if(0<l){for(;-1!==s;)a[s].index+=l,s=ie(a,s);return}s=ie(a,s)}}}/**
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
   * Minimal implementation of Array.prototype.flat
   * @param arr the array to flatten
   * @param result the accumlated result
   */function A(e){for(var t,n=1<arguments.length&&arguments[1]!==void 0?arguments[1]:[],r=0,a=e.length;r<a;r++)t=e[r],Array.isArray(t)?A(t,n):n.push(t);return n}/** Deeply flattens styles array. Uses native flat if available. */var E=new WeakMap,V=function(e){return"function"==typeof e&&E.has(e)},w=window.customElements!==void 0&&window.customElements.polyfillWrapFlushCallback!==void 0,O=function(e,t){for(var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null,a=t;a!==r;){var o=a.nextSibling;e.removeChild(a),a=o}},U={},R={},I="{{lit-".concat((Math.random()+"").slice(2),"}}"),z="<!--".concat(I,"-->"),q=new RegExp("".concat(I,"|").concat(z)),L="$lit$",H=function e(t,r){var o=this;a(this,e),this.parts=[],this.element=r;var s=-1,l=0,i=[],d=function e(n){for(var r=n.content,a=document.createTreeWalker(r,133/* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */,null,!1),d=0// Edge needs all 4 parameters present; IE11 needs 3rd parameter to be
// null
;a.nextNode();){s++;var p=a.currentNode;if(1===p.nodeType/* Node.ELEMENT_NODE */){if(p.hasAttributes()){for(var u=p.attributes,c=0,y=0;y<u.length;y++)0<=u[y].value.indexOf(I)&&c++;for(;0<c--;){// Get the template literal section leading up to the first
// expression in this attribute
var m=t.strings[l],g=B.exec(m)[2],_=g.toLowerCase()+L,h=p.getAttribute(_),v=h.split(q);// Find the attribute name
o.parts.push({type:"attribute",index:s,name:g,strings:v}),p.removeAttribute(_),l+=v.length-1}}"TEMPLATE"===p.tagName&&e(p)}else if(3===p.nodeType/* Node.TEXT_NODE */){var f=p.data;if(0<=f.indexOf(I)){// Generate a new text node for each literal section
// These nodes are also used as the markers for node parts
for(var S=p.parentNode,k=f.split(q),b=k.length-1,P=0;P<b;P++)S.insertBefore(""===k[P]?M():document.createTextNode(k[P]),p),o.parts.push({type:"node",index:++s});// If there's no text, we must insert a comment to mark our place.
// Else, we can trust it will stick around after cloning.
// We have a part for each match found
""===k[b]?(S.insertBefore(M(),p),i.push(p)):p.data=k[b],l+=b}}else if(8===p.nodeType/* Node.COMMENT_NODE */)if(p.data===I){var x=p.parentNode;// Add a new marker node to be the startNode of the Part if any of
// the following are true:
//  * We don't have a previousSibling
//  * The previousSibling is already the start of a previous part
(null===p.previousSibling||s===d)&&(s++,x.insertBefore(M(),p)),d=s,o.parts.push({type:"node",index:s}),null===p.nextSibling?p.data="":(i.push(p),s--),l++}else for(var C=-1;-1!==(C=p.data.indexOf(I,C+1));)// Comment node has a binding marker inside, make an inactive part
// The binding won't work, but subsequent bindings will
// TODO (justinfagnani): consider whether it's even worth it to
// make bindings in comments work
o.parts.push({type:"node",index:-1})}};d(r);// Remove text binding nodes after the walk to not disturb the TreeWalker
for(var p,u=0,c=i;u<c.length;u++)p=c[u],p.parentNode.removeChild(p)},F=function(e){return-1!==e.index},M=function(){return document.createComment("")},B=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/,D=/*#__PURE__*/function(){function e(t,n,r){a(this,e),this._parts=[],this.template=t,this.processor=n,this.options=r}return s(e,[{key:"update",value:function(e){var t=0,n=!0,r=!1,a=void 0;try{for(var o,s,l=this._parts[Symbol.iterator]();!(n=(o=l.next()).done);n=!0)s=o.value,void 0!==s&&s.setValue(e[t]),t++}catch(e){r=!0,a=e}finally{try{n||null==l["return"]||l["return"]()}finally{if(r)throw a}}var d=!0,p=!1,u=void 0;try{for(var c,y,m=this._parts[Symbol.iterator]();!(d=(c=m.next()).done);d=!0)y=c.value,void 0!==y&&y.commit()}catch(e){p=!0,u=e}finally{try{d||null==m["return"]||m["return"]()}finally{if(p)throw u}}}},{key:"_clone",value:function(){var e=this,t=w?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),n=this.template.parts,r=0,a=0,o=function t(o){// Edge needs all 4 parameters present; IE11 needs 3rd parameter to be
// null
// Loop through all the nodes and parts of a template
for(var s,l=document.createTreeWalker(o,133/* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */,null,!1),i=l.nextNode();r<n.length&&null!==i;)// Consecutive Parts may have the same node index, in the case of
// multiple bound attributes on an element. So each iteration we either
// increment the nodeIndex, if we aren't on a node with a part, or the
// partIndex if we are. By not incrementing the nodeIndex when we find a
// part, we allow for the next part to be associated with the current
// node if neccessasry.
if(s=n[r],!F(s))e._parts.push(void 0),r++;else if(a===s.index){if("node"===s.type){var d=e.processor.handleTextExpression(e.options);d.insertAfterNode(i.previousSibling),e._parts.push(d)}else{var p;(p=e._parts).push.apply(p,k(e.processor.handleAttributeExpressions(i,s.name,s.strings,e.options)))}r++}else a++,"TEMPLATE"===i.nodeName&&t(i.content),i=l.nextNode()};// When using the Custom Elements polyfill, clone the node, rather than
// importing it, to keep the fragment in the template's document. This
// leaves the fragment inert so custom elements won't upgrade and
// potentially modify their contents by creating a polyfilled ShadowRoot
// while we traverse the tree.
return o(t),w&&(document.adoptNode(t),customElements.upgrade(t)),t}}]),e}(),j=/*#__PURE__*/function(){function e(t,n,r,o){a(this,e),this.strings=t,this.values=n,this.type=r,this.processor=o}/**
     * Returns a string of HTML used to create a `<template>` element.
     */return s(e,[{key:"getHTML",value:function(){for(var e=this.strings.length-1,t="",n=0;n<e;n++){var r=this.strings[n],a=B.exec(r);// This exec() call does two things:
// 1) Appends a suffix to the bound attribute name to opt out of special
// attribute value parsing that IE11 and Edge do, like for style and
// many SVG attributes. The Template class also appends the same suffix
// when looking up attributes to create Parts.
// 2) Adds an unquoted-attribute-safe marker for the first expression in
// an attribute. Subsequent attribute expressions will use node markers,
// and this is safe since attributes with multiple expressions are
// guaranteed to be quoted.
t+=a?r.substr(0,a.index)+a[1]+a[2]+L+a[3]+I:r+z}return t+this.strings[e]}},{key:"getTemplateElement",value:function(){var e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}]),e}(),W=function(e){return null===e||"object"!==t(e)&&"function"!=typeof e},$=/*#__PURE__*/function(){function e(t,n,r){a(this,e),this.dirty=!0,this.element=t,this.name=n,this.strings=r,this.parts=[];for(var o=0;o<r.length-1;o++)this.parts[o]=this._createPart()}/**
     * Creates a single part. Override this to create a differnt type of part.
     */return s(e,[{key:"_createPart",value:function(){return new G(this)}},{key:"_getValue",value:function(){for(var e=this.strings,n=e.length-1,r="",a=0;a<n;a++){r+=e[a];var o=this.parts[a];if(void 0!==o){var s=o.value;if(null!=s&&(Array.isArray(s)||// tslint:disable-next-line:no-any
"string"!=typeof s&&s[Symbol.iterator])){var l=!0,d=!1,p=void 0;try{for(var u,c,y=s[Symbol.iterator]();!(l=(u=y.next()).done);l=!0)c=u.value,r+="string"==typeof c?c:c+""}catch(e){d=!0,p=e}finally{try{l||null==y["return"]||y["return"]()}finally{if(d)throw p}}}else r+="string"==typeof s?s:s+""}}return r+=e[n],r}},{key:"commit",value:function(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}]),e}(),G=/*#__PURE__*/function(){function e(t){a(this,e),this.value=void 0,this.committer=t}return s(e,[{key:"setValue",value:function(e){e===U||W(e)&&e===this.value||(this.value=e,!V(e)&&(this.committer.dirty=!0))}},{key:"commit",value:function(){for(;V(this.value);){var e=this.value;this.value=U,e(this)}this.value===U||this.committer.commit()}}]),e}(),J=/*#__PURE__*/function(){function e(t){a(this,e),this.value=void 0,this._pendingValue=void 0,this.options=t}/**
     * Inserts this part into a container.
     *
     * This part must be empty, as its contents are not automatically moved.
     */return s(e,[{key:"appendInto",value:function(e){this.startNode=e.appendChild(M()),this.endNode=e.appendChild(M())}/**
       * Inserts this part between `ref` and `ref`'s next sibling. Both `ref` and
       * its next sibling must be static, unchanging nodes such as those that appear
       * in a literal section of a template.
       *
       * This part must be empty, as its contents are not automatically moved.
       */},{key:"insertAfterNode",value:function(e){this.startNode=e,this.endNode=e.nextSibling}/**
       * Appends this part into a parent part.
       *
       * This part must be empty, as its contents are not automatically moved.
       */},{key:"appendIntoPart",value:function(e){e._insert(this.startNode=M()),e._insert(this.endNode=M())}/**
       * Appends this part after `ref`
       *
       * This part must be empty, as its contents are not automatically moved.
       */},{key:"insertAfterPart",value:function(e){e._insert(this.startNode=M()),this.endNode=e.endNode,e.endNode=this.startNode}},{key:"setValue",value:function(e){this._pendingValue=e}},{key:"commit",value:function(){for(;V(this._pendingValue);){var e=this._pendingValue;this._pendingValue=U,e(this)}var t=this._pendingValue;t===U||(W(t)?t!==this.value&&this._commitText(t):t instanceof j?this._commitTemplateResult(t):t instanceof Node?this._commitNode(t):Array.isArray(t)||// tslint:disable-next-line:no-any
t[Symbol.iterator]?this._commitIterable(t):t===R?(this.value=R,this.clear()):this._commitText(t))}},{key:"_insert",value:function(e){this.endNode.parentNode.insertBefore(e,this.endNode)}},{key:"_commitNode",value:function(e){this.value===e||(this.clear(),this._insert(e),this.value=e)}},{key:"_commitText",value:function(e){var t=this.startNode.nextSibling;e=null==e?"":e,t===this.endNode.previousSibling&&3===t.nodeType/* Node.TEXT_NODE */?t.data=e:this._commitNode(document.createTextNode("string"==typeof e?e:e+"")),this.value=e}},{key:"_commitTemplateResult",value:function(e){var t=this.options.templateFactory(e);if(this.value instanceof D&&this.value.template===t)this.value.update(e.values);else{// Make sure we propagate the template processor from the TemplateResult
// so that we use its syntax extension, etc. The template factory comes
// from the render function options so that it can control template
// caching and preprocessing.
var n=new D(t,e.processor,this.options),r=n._clone();n.update(e.values),this._commitNode(r),this.value=n}}},{key:"_commitIterable",value:function(t){Array.isArray(this.value)||(this.value=[],this.clear());// Lets us keep track of how many items we stamped so we can clear leftover
// items from a previous render
var n,r=this.value,a=0,o=!0,s=!1,l=void 0;try{for(var i,d,p=t[Symbol.iterator]();!(o=(i=p.next()).done);o=!0)// Try to reuse an existing part
d=i.value,n=r[a],void 0===n&&(n=new e(this.options),r.push(n),0===a?n.appendIntoPart(this):n.insertAfterPart(r[a-1])),n.setValue(d),n.commit(),a++}catch(e){s=!0,l=e}finally{try{o||null==p["return"]||p["return"]()}finally{if(s)throw l}}a<r.length&&(r.length=a,this.clear(n&&n.endNode))}},{key:"clear",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:this.startNode;O(this.startNode.parentNode,e.nextSibling,this.endNode)}}]),e}(),Q=/*#__PURE__*/function(){function e(t,n,r){if(a(this,e),this.value=void 0,this._pendingValue=void 0,2!==r.length||""!==r[0]||""!==r[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=n,this.strings=r}return s(e,[{key:"setValue",value:function(e){this._pendingValue=e}},{key:"commit",value:function(){for(;V(this._pendingValue);){var e=this._pendingValue;this._pendingValue=U,e(this)}if(this._pendingValue!==U){var t=!!this._pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=t,this._pendingValue=U}}}]),e}(),K=/*#__PURE__*/function(e){function t(e,n,r){var o;return a(this,t),o=v(this,u(t).call(this,e,n,r)),o.single=2===r.length&&""===r[0]&&""===r[1],o}return p(t,e),s(t,[{key:"_createPart",value:function(){return new X(this)}},{key:"_getValue",value:function(){return this.single?this.parts[0].value:S(u(t.prototype),"_getValue",this).call(this)}},{key:"commit",value:function(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}]),t}($),X=/*#__PURE__*/function(e){function t(){return a(this,t),v(this,u(t).apply(this,arguments))}return p(t,e),t}(G),Y=!1;try{var Z={get capture(){return Y=!0,!1}};// tslint:disable-next-line:no-any
// tslint:disable-next-line:no-any
window.addEventListener("test",Z,Z),window.removeEventListener("test",Z,Z)}catch(e){}var ee=/*#__PURE__*/function(){function e(t,n,r){var o=this;a(this,e),this.value=void 0,this._pendingValue=void 0,this.element=t,this.eventName=n,this.eventContext=r,this._boundHandleEvent=function(t){return o.handleEvent(t)}}return s(e,[{key:"setValue",value:function(e){this._pendingValue=e}},{key:"commit",value:function(){for(;V(this._pendingValue);){var e=this._pendingValue;this._pendingValue=U,e(this)}if(this._pendingValue!==U){var t=this._pendingValue,n=this.value,r=null==t||null!=n&&(t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive);r&&this.element.removeEventListener(this.eventName,this._boundHandleEvent,this._options),null!=t&&(null==n||r)&&(this._options=te(t),this.element.addEventListener(this.eventName,this._boundHandleEvent,this._options)),this.value=t,this._pendingValue=U}}},{key:"handleEvent",value:function(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}]),e}(),te=function(e){return e&&(Y?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)},ne=/*#__PURE__*/function(){function e(){a(this,e)}return s(e,[{key:"handleAttributeExpressions",/**
       * Create parts for an attribute-position binding, given the event, attribute
       * name, and string literals.
       *
       * @param element The element containing the binding
       * @param name  The attribute name
       * @param strings The string literals. There are always at least two strings,
       *   event for fully-controlled bindings with a single expression.
       */value:function(e,t,n,r){var a=t[0];if("."===a){var o=new K(e,t.slice(1),n);return o.parts}if("@"===a)return[new ee(e,t.slice(1),r.eventContext)];if("?"===a)return[new Q(e,t.slice(1),n)];var s=new $(e,t,n);return s.parts}/**
       * Create parts for a text-position binding.
       * @param templateFactory
       */},{key:"handleTextExpression",value:function(e){return new J(e)}}]),e}(),re=new ne,ae=new Map,oe=new WeakMap,se=function(e,t,n){var r=oe.get(t);r===void 0&&(O(t,t.firstChild),oe.set(t,r=new J(Object.assign({templateFactory:C},n))),r.appendInto(t)),r.setValue(e),r.commit()};// We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.
(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.0.0");/**
   * Interprets a template literal as an HTML template that can efficiently
   * render to and update a container.
   */var le=function(e){for(var t=11===e.nodeType/* Node.DOCUMENT_FRAGMENT_NODE */?0:1,n=document.createTreeWalker(e,133,null,!1);n.nextNode();)t++;return t},ie=function(e){for(var t,n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:-1,r=n+1;r<e.length;r++)if(t=e[r],F(t))return r;return-1},de=function(e,t){return"".concat(e,"--").concat(t)},pe=!0;/**
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
   */"undefined"==typeof window.ShadyCSS?pe=!1:"undefined"==typeof window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected.Please update to at least @webcomponents/webcomponentsjs@2.0.2 and@webcomponents/shadycss@1.3.1."),pe=!1);/**
   * Template factory which scopes template DOM using ShadyCSS.
   * @param scopeName {string}
   */var ue=function(e){return function(t){var n=de(t.type,e),r=ae.get(n);void 0===r&&(r={stringsArray:new WeakMap,keyString:new Map},ae.set(n,r));var a=r.stringsArray.get(t.strings);if(void 0!==a)return a;var o=t.strings.join(I);if(a=r.keyString.get(o),void 0===a){var s=t.getTemplateElement();pe&&window.ShadyCSS.prepareTemplateDom(s,e),a=new H(t,s),r.keyString.set(o,a)}return r.stringsArray.set(t.strings,a),a}},ce=["html","svg"],ye=function(e){ce.forEach(function(t){var n=ae.get(de(t,e));n!==void 0&&n.keyString.forEach(function(e){var t=e.element.content,n=new Set;// IE 11 doesn't support the iterable param Set constructor
Array.from(t.querySelectorAll("style")).forEach(function(e){n.add(e)}),N(e,n)})})},me=new Set,ge=function(e,t,n){me.add(n);// Move styles out of rendered DOM and store.
var r=e.querySelectorAll("style");// If there are no styles, skip unnecessary work
if(0===r.length)return void window.ShadyCSS.prepareTemplateStyles(t.element,n);// Collect styles into a single style. This helps us make sure ShadyCSS
// manipulations will not prevent us from being able to fix up template
// part indices.
// NOTE: collecting styles is inefficient for browsers but ShadyCSS
// currently does this anyway. When it does not, this should be changed.
for(var a,o=document.createElement("style"),s=0;s<r.length;s++)a=r[s],a.parentNode.removeChild(a),o.textContent+=a.textContent;// Remove styles from nested templates in this scope.
if(ye(n),T(t,o,t.element.content.firstChild),window.ShadyCSS.prepareTemplateStyles(t.element,n),window.ShadyCSS.nativeShadow){// When in native Shadow DOM, re-add styling to rendered content using
// the style ShadyCSS produced.
var l=t.element.content.querySelector("style");e.insertBefore(l.cloneNode(!0),e.firstChild)}else{t.element.content.insertBefore(o,t.element.content.firstChild);var d=new Set;d.add(o),N(t,d)}},_e=function(e,t,n){var r=n.scopeName,a=oe.has(t),o=t instanceof ShadowRoot&&pe&&e instanceof j,s=o&&!me.has(r),l=s?document.createDocumentFragment():t;// When performing first scope render,
// (1) We've rendered into a fragment so that there's a chance to
// `prepareTemplateStyles` before sub-elements hit the DOM
// (which might cause them to render based on a common pattern of
// rendering in a custom element's `connectedCallback`);
// (2) Scope the template with ShadyCSS one time only for this scope.
// (3) Render the fragment into the container and make sure the
// container knows its `part` is the one we just rendered. This ensures
// DOM will be re-used on subsequent renders.
if(se(e,l,Object.assign({templateFactory:ue(r)},n)),s){var i=oe.get(l);oe["delete"](l),i.value instanceof D&&ge(l,i.value.template,r),O(t,t.firstChild),t.appendChild(l),oe.set(t,i)}// After elements have hit the DOM, update styling if this is the
// initial render to this container.
// This is needed whenever dynamic changes are made so it would be
// safest to do every render; however, this would regress performance
// so we leave it up to the user to call `ShadyCSSS.styleElement`
// for dynamic changes.
!a&&o&&window.ShadyCSS.styleElement(t.host)};window.JSCompiler_renameProperty=function(e){return e};var he={toAttribute:function(e,t){return t===Boolean?e?"":null:t===Object||t===Array?null==e?e:JSON.stringify(e):e},fromAttribute:function(e,t){return t===Boolean?null!==e:t===Number?null===e?null:+e:t===Object||t===Array?JSON.parse(e):e}},ve=function(e,t){// This ensures (old==NaN, value==NaN) always returns false
return t!==e&&(t===t||e===e)},fe={attribute:!0,type:String,converter:he,reflect:!1,hasChanged:ve},Se=Promise.resolve(!0),ke=1,be=4,Pe=8,xe=16,Ce=32,Ne=/*#__PURE__*/function(e){function n(){var e;return a(this,n),e=v(this,u(n).call(this)),e._updateState=0,e._instanceProperties=void 0,e._updatePromise=Se,e._hasConnectedResolver=void 0,e._changedProperties=new Map,e._reflectingProperties=void 0,e.initialize(),e}/**
     * Returns a list of attributes corresponding to the registered properties.
     * @nocollapse
     */return p(n,e),s(n,[{key:"initialize",/**
       * Performs element initialization. By default captures any pre-set values for
       * registered properties.
       */value:function(){this._saveInstanceProperties(),this._requestUpdate()}/**
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
       */},{key:"_saveInstanceProperties",value:function(){var e=this;// Use forEach so this works even if for/of loops are compiled to for loops
// expecting arrays
this.constructor._classProperties.forEach(function(t,n){if(e.hasOwnProperty(n)){var r=e[n];delete e[n],e._instanceProperties||(e._instanceProperties=new Map),e._instanceProperties.set(n,r)}})}/**
       * Applies previously saved instance properties.
       */},{key:"_applyInstanceProperties",value:function(){var e=this;// Use forEach so this works even if for/of loops are compiled to for loops
// expecting arrays
// tslint:disable-next-line:no-any
this._instanceProperties.forEach(function(t,n){return e[n]=t}),this._instanceProperties=void 0}},{key:"connectedCallback",value:function(){this._updateState|=Ce,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}/**
       * Allows for `super.disconnectedCallback()` in extensions while
       * reserving the possibility of making non-breaking feature additions
       * when disconnecting at some point in the future.
       */},{key:"disconnectedCallback",value:function(){}/**
       * Synchronizes property values when attributes change.
       */},{key:"attributeChangedCallback",value:function(e,t,n){t!==n&&this._attributeToProperty(e,n)}},{key:"_propertyToAttribute",value:function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:fe,r=this.constructor,a=r._attributeNameForProperty(e,n);if(void 0!==a){var o=r._propertyValueToAttribute(t,n);// an undefined value does not change the attribute.
if(void 0===o)return;// Track if the property is being reflected to avoid
// setting the property again via `attributeChangedCallback`. Note:
// 1. this takes advantage of the fact that the callback is synchronous.
// 2. will behave incorrectly if multiple attributes are in the reaction
// stack at time of calling. However, since we process attributes
// in `update` this should not be possible (or an extreme corner case
// that we'd like to discover).
// mark state reflecting
this._updateState|=Pe,null==o?this.removeAttribute(a):this.setAttribute(a,o),this._updateState&=~Pe}}},{key:"_attributeToProperty",value:function(e,t){// Use tracking info to avoid deserializing attribute value if it was
// just set from a property setter.
if(!(this._updateState&Pe)){var n=this.constructor,r=n._attributeToPropertyMap.get(e);if(void 0!==r){var a=n._classProperties.get(r)||fe;// mark state reflecting
this._updateState|=xe,this[r]=// tslint:disable-next-line:no-any
n._propertyValueFromAttribute(t,a),this._updateState&=~xe}}}/**
       * This private version of `requestUpdate` does not access or return the
       * `updateComplete` promise. This promise can be overridden and is therefore
       * not free to access.
       */},{key:"_requestUpdate",value:function(e,t){var n=!0;// If we have a property key, perform property update steps.
if(void 0!==e){var r=this.constructor,a=r._classProperties.get(e)||fe;r._valueHasChanged(this[e],t,a.hasChanged)?(!this._changedProperties.has(e)&&this._changedProperties.set(e,t),!0===a.reflect&&!(this._updateState&xe)&&(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,a))):n=!1}!this._hasRequestedUpdate&&n&&this._enqueueUpdate()}/**
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
       */},{key:"requestUpdate",value:function(e,t){return this._requestUpdate(e,t),this.updateComplete}/**
       * Sets up the element to asynchronously update.
       */},{key:"_enqueueUpdate",value:function(){var e=r(/*#__PURE__*/regeneratorRuntime.mark(function e(){var t,n,r,a,o=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this._updateState|=be,r=this._updatePromise,this._updatePromise=new Promise(function(e,r){t=e,n=r}),e.prev=3,e.next=6,r;case 6:e.next=10;break;case 8:e.prev=8,e.t0=e["catch"](3);case 10:if(this._hasConnected){e.next=13;break}return e.next=13,new Promise(function(e){return o._hasConnectedResolver=e});case 13:// If `performUpdate` returns a Promise, we await it. This is done to
// enable coordinating updates with a scheduler. Note, the result is
// checked to avoid delaying an additional microtask unless we need to.
if(e.prev=13,a=this.performUpdate(),null==a){e.next=18;break}return e.next=18,a;case 18:e.next=23;break;case 20:e.prev=20,e.t1=e["catch"](13),n(e.t1);case 23:t(!this._hasRequestedUpdate);case 24:case"end":return e.stop();}},e,this,[[3,8],[13,20]])}));return function(){return e.apply(this,arguments)}}()},{key:"performUpdate",/**
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
       */value:function(){this._instanceProperties&&this._applyInstanceProperties();var t=!1,n=this._changedProperties;try{t=this.shouldUpdate(n),t&&this.update(n)}catch(n){throw t=!1,n}finally{this._markUpdated()}t&&(!(this._updateState&ke)&&(this._updateState|=ke,this.firstUpdated(n)),this.updated(n))}},{key:"_markUpdated",value:function(){this._changedProperties=new Map,this._updateState&=~be}/**
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
       */value:function(){return!0}/**
       * Updates the element. This method reflects property values to attributes.
       * It can be overridden to render and keep updated element DOM.
       * Setting properties inside this method will *not* trigger
       * another update.
       *
       * * @param _changedProperties Map of changed properties with old values
       */},{key:"update",value:function(){var e=this;void 0!==this._reflectingProperties&&0<this._reflectingProperties.size&&(this._reflectingProperties.forEach(function(t,n){return e._propertyToAttribute(n,e[n],t)}),this._reflectingProperties=void 0)}/**
       * Invoked whenever the element is updated. Implement to perform
       * post-updating tasks via DOM APIs, for example, focusing an element.
       *
       * Setting properties inside this method will trigger the element to update
       * again after this update cycle completes.
       *
       * * @param _changedProperties Map of changed properties with old values
       */},{key:"updated",value:function(){}/**
       * Invoked when the element is first updated. Implement to perform one time
       * work on the element after update.
       *
       * Setting properties inside this method will trigger the element to update
       * again after this update cycle completes.
       *
       * * @param _changedProperties Map of changed properties with old values
       */},{key:"firstUpdated",value:function(){}},{key:"_hasConnected",get:function(){return this._updateState&Ce}},{key:"_hasRequestedUpdate",get:function(){return this._updateState&be}},{key:"hasUpdated",get:function(){return this._updateState&ke}},{key:"updateComplete",get:function(){return this._updatePromise}}],[{key:"_ensureClassProperties",/**
       * Ensures the private `_classProperties` property metadata is created.
       * In addition to `finalize` this is also called in `createProperty` to
       * ensure the `@property` decorator can add property metadata.
       */ /** @nocollapse */value:function(){var e=this;// ensure private storage for property declarations.
if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;// NOTE: Workaround IE11 not supporting Map constructor argument.
var t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach(function(t,n){return e._classProperties.set(n,t)})}}/**
       * Creates a property accessor on the element prototype if one does not exist.
       * The property setter calls the property's `hasChanged` property option
       * or uses a strict identity check to determine whether or not to request
       * an update.
       * @nocollapse
       */},{key:"createProperty",value:function(e){var n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:fe;// Note, since this can be called by the `@property` decorator which
// is called before `finalize`, we ensure storage exists for property
// metadata.
// Do not generate an accessor if the prototype already has one, since
// it would be lost otherwise and that would never be the user's intention;
// Instead, we expect users to call `requestUpdate` themselves from
// user-defined accessors. Note that if the super has an accessor we will
// still overwrite it
if(this._ensureClassProperties(),this._classProperties.set(e,n),!(n.noAccessor||this.prototype.hasOwnProperty(e))){var r="symbol"===t(e)?Symbol():"__".concat(e);Object.defineProperty(this.prototype,e,{// tslint:disable-next-line:no-any no symbol in index
get:function(){return this[r]},set:function(t){// tslint:disable-next-line:no-any no symbol in index
var n=this[e];// tslint:disable-next-line:no-any no symbol in index
this[r]=t,this._requestUpdate(e,n)},configurable:!0,enumerable:!0})}}/**
       * Creates property accessors for registered properties and ensures
       * any superclasses are also finalized.
       * @nocollapse
       */},{key:"finalize",value:function(){if(!(this.hasOwnProperty(JSCompiler_renameProperty("finalized",this))&&this.finalized)){// finalize any superclasses
var e=Object.getPrototypeOf(this);// make any properties
// Note, only process "own" properties since this element will inherit
// any properties defined on the superClass, and finalization ensures
// the entire prototype chain is finalized.
if("function"==typeof e.finalize&&e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){var t=this.properties,n=[].concat(k(Object.getOwnPropertyNames(t)),k("function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[])),r=!0,a=!1,o=void 0;// support symbols in properties (IE11 does not support this)
try{for(var s,l,i=n[Symbol.iterator]();!(r=(s=i.next()).done);r=!0)// note, use of `any` is due to TypeSript lack of support for symbol in
// index types
// tslint:disable-next-line:no-any no symbol in index
l=s.value,this.createProperty(l,t[l])}catch(e){a=!0,o=e}finally{try{r||null==i["return"]||i["return"]()}finally{if(a)throw o}}}}}/**
       * Returns the property name for the given attribute `name`.
       * @nocollapse
       */},{key:"_attributeNameForProperty",value:function(e,t){var n=t.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof e?e.toLowerCase():void 0}/**
       * Returns true if a property should request an update.
       * Called when a property value is set and uses the `hasChanged`
       * option for the property if present or a strict identity check.
       * @nocollapse
       */},{key:"_valueHasChanged",value:function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:ve;return n(e,t)}/**
       * Returns the property value for the given attribute value.
       * Called via the `attributeChangedCallback` and uses the property's
       * `converter` or `converter.fromAttribute` property option.
       * @nocollapse
       */},{key:"_propertyValueFromAttribute",value:function(e,t){var n=t.type,r=t.converter||he,a="function"==typeof r?r:r.fromAttribute;return a?a(e,n):e}/**
       * Returns the attribute value for the given property value. If this
       * returns undefined, the property will *not* be reflected to an attribute.
       * If this returns null, the attribute will be removed, otherwise the
       * attribute will be set to the value.
       * This uses the property's `reflect` and `type.toAttribute` property options.
       * @nocollapse
       */},{key:"_propertyValueToAttribute",value:function(e,t){if(void 0!==t.reflect){var n=t.type,r=t.converter,a=r&&r.toAttribute||he.toAttribute;return a(e,n)}}},{key:"observedAttributes",get:function(){var e=this;// note: piggy backing on this to ensure we're finalized.
this.finalize();var t=[];// Use forEach so this works even if for/of loops are compiled to for loops
// expecting arrays
return this._classProperties.forEach(function(n,r){var a=e._attributeNameForProperty(r,n);void 0!==a&&(e._attributeToPropertyMap.set(a,r),t.push(a))}),t}}]),n}(_(HTMLElement));/**
   * Change function that returns true if `value` is different from `oldValue`.
   * This method is used as the default for a property's `hasChanged` function.
   */Ne.finalized=!0;/**
  @license
  Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at
  http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
  http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
  found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
  part of the polymer project is also subject to an additional IP rights grant
  found at http://polymer.github.io/PATENTS.txt
  */var Te="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ae=Symbol(),Ee=/*#__PURE__*/function(){function e(t,n){if(a(this,e),n!==Ae)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}// Note, this is a getter so that it's lazy. In practice, this means
// stylesheets are not created until the first element instance is made.
return s(e,[{key:"toString",value:function(){return this.cssText}},{key:"styleSheet",get:function(){return void 0===this._styleSheet&&(Te?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}}]),e}(),Ve=function(e){if(e instanceof Ee)return e.cssText;throw new Error("Value passed to 'css' function must be a 'css' function result: ".concat(e,". Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security."))};(window.litElementVersions||(window.litElementVersions=[])).push("2.0.1");var we=function(e){return e.flat?e.flat(1/0):A(e)},Oe=/*#__PURE__*/function(e){function t(){return a(this,t),v(this,u(t).apply(this,arguments))}return p(t,e),s(t,[{key:"initialize",/**
       * Performs element initialization. By default this calls `createRenderRoot`
       * to create the element `renderRoot` node and captures any pre-set values for
       * registered properties.
       */value:function(){S(u(t.prototype),"initialize",this).call(this),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}/**
       * Returns the node into which the element should render and by default
       * creates and returns an open shadowRoot. Implement to customize where the
       * element's DOM is rendered. For example, to render into the element's
       * childNodes, return `this`.
       * @returns {Element|DocumentFragment} Returns a node into which to render.
       */},{key:"createRenderRoot",value:function(){return this.attachShadow({mode:"open"})}/**
       * Applies styling to the element shadowRoot using the `static get styles`
       * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
       * available and will fallback otherwise. When Shadow DOM is polyfilled,
       * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
       * is available but `adoptedStyleSheets` is not, styles are appended to the
       * end of the `shadowRoot` to [mimic spec
       * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
       */},{key:"adoptStyles",value:function(){var e=this.constructor._styles;0===e.length||(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Te?this.renderRoot.adoptedStyleSheets=e.map(function(e){return e.styleSheet}):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(function(e){return e.cssText}),this.localName))}},{key:"connectedCallback",value:function(){S(u(t.prototype),"connectedCallback",this).call(this),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}/**
       * Updates the element. This method reflects property values to attributes
       * and calls `render` to render DOM via lit-html. Setting properties inside
       * this method will *not* trigger another update.
       * * @param _changedProperties Map of changed properties with old values
       */},{key:"update",value:function(e){var n=this;S(u(t.prototype),"update",this).call(this,e);var r=this.render();r instanceof j&&this.constructor.render(r,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(function(e){var t=document.createElement("style");t.textContent=e.cssText,n.renderRoot.appendChild(t)}))}/**
       * Invoked on each update to perform rendering tasks. This method must return
       * a lit-html TemplateResult. Setting properties inside this method will *not*
       * trigger the element to update.
       */},{key:"render",value:function(){}}],[{key:"finalize",/** @nocollapse */value:function(){S(u(t),"finalize",this).call(this),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}/** @nocollapse */},{key:"_getUniqueStyles",value:function(){// Take care not to call `this.styles` multiple times since this generates
// new CSSResults each time.
// TODO(sorvell): Since we do not cache CSSResults by input, any
// shared styles will generate new stylesheet objects, which is wasteful.
// This should be addressed when a browser ships constructable
// stylesheets.
var e=this.styles,t=[];if(Array.isArray(e)){var n=we(e),r=n.reduceRight(function(e,t){// on IE set.add does not return the set.
return e.add(t),e},new Set);// As a performance optimization to avoid duplicated styling that can
// occur especially when composing via subclassing, de-duplicate styles
// preserving the last item in the list. The last item is kept to
// try to preserve cascade order with the assumption that it's most
// important that last added styles override previous styles.
r.forEach(function(e){return t.unshift(e)})}else e&&t.push(e);return t}}]),t}(Ne);/**
   * Ensure this class is marked as `finalized` as an optimization ensuring
   * it will not needlessly try to `finalize`.
   */ /**
   * Render method used to render the lit-html TemplateResult to the element's
   * DOM.
   * @param {TemplateResult} Template to render.
   * @param {Element|DocumentFragment} Node into which to render.
   * @param {String} Element name.
   * @nocollapse
   */Oe.finalized=!0,Oe.render=_e,e.LitElement=Oe,e._assertThisInitialized=h,e._asyncToGenerator=r,e._classCallCheck=a,e._createClass=s,e._defineProperty=l,e._get=S,e._getPrototypeOf=u,e._inherits=p,e._objectSpread2=function(e){for(var t,n=1;n<arguments.length;n++)t=null==arguments[n]?{}:arguments[n],n%2?d(t,!0).forEach(function(n){l(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):d(t).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))});return e},e._possibleConstructorReturn=v,e._taggedTemplateLiteral=function(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))},e._toConsumableArray=k,e._typeof=t,e.css=function(e){for(var t=arguments.length,n=Array(1<t?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var a=n.reduce(function(t,n,r){return t+Ve(n)+e[r+1]},e[0]);return new Ee(a,Ae)},e.html=function(e){for(var t=arguments.length,n=Array(1<t?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return new j(e,n,"html",re)}});
