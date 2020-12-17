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
 */
/**
 * True if the custom elements polyfill is in use.
 */
const isCEPolyfill = typeof window !== 'undefined' &&
    window.customElements != null &&
    window.customElements.polyfillWrapFlushCallback !==
        undefined;
/**
 * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
 * `container`.
 */
const removeNodes = (container, start, end = null) => {
    while (start !== end) {
        const n = start.nextSibling;
        container.removeChild(start);
        start = n;
    }
};

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
 */
/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */
const nodeMarker = `<!--${marker}-->`;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
/**
 * Suffix appended to all bound attribute names.
 */
const boundAttributeSuffix = '$lit$';
/**
 * An updatable Template that tracks the location of dynamic parts.
 */
class Template {
    constructor(result, element) {
        this.parts = [];
        this.element = element;
        const nodesToRemove = [];
        const stack = [];
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(element.content, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        // Keeps track of the last index associated with a part. We try to delete
        // unnecessary nodes, but we never want to associate two different parts
        // to the same index. They must have a constant node between.
        let lastPartIndex = 0;
        let index = -1;
        let partIndex = 0;
        const { strings, values: { length } } = result;
        while (partIndex < length) {
            const node = walker.nextNode();
            if (node === null) {
                // We've exhausted the content inside a nested template element.
                // Because we still have parts (the outer for-loop), we know:
                // - There is a template in the stack
                // - The walker will find a nextNode outside the template
                walker.currentNode = stack.pop();
                continue;
            }
            index++;
            if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {
                if (node.hasAttributes()) {
                    const attributes = node.attributes;
                    const { length } = attributes;
                    // Per
                    // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
                    // attributes are not guaranteed to be returned in document order.
                    // In particular, Edge/IE can return them out of order, so we cannot
                    // assume a correspondence between part index and attribute index.
                    let count = 0;
                    for (let i = 0; i < length; i++) {
                        if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                            count++;
                        }
                    }
                    while (count-- > 0) {
                        // Get the template literal section leading up to the first
                        // expression in this attribute
                        const stringForPart = strings[partIndex];
                        // Find the attribute name
                        const name = lastAttributeNameRegex.exec(stringForPart)[2];
                        // Find the corresponding attribute
                        // All bound attributes have had a suffix added in
                        // TemplateResult#getHTML to opt out of special attribute
                        // handling. To look up the attribute value we also need to add
                        // the suffix.
                        const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                        const attributeValue = node.getAttribute(attributeLookupName);
                        node.removeAttribute(attributeLookupName);
                        const statics = attributeValue.split(markerRegex);
                        this.parts.push({ type: 'attribute', index, name, strings: statics });
                        partIndex += statics.length - 1;
                    }
                }
                if (node.tagName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
            }
            else if (node.nodeType === 3 /* Node.TEXT_NODE */) {
                const data = node.data;
                if (data.indexOf(marker) >= 0) {
                    const parent = node.parentNode;
                    const strings = data.split(markerRegex);
                    const lastIndex = strings.length - 1;
                    // Generate a new text node for each literal section
                    // These nodes are also used as the markers for node parts
                    for (let i = 0; i < lastIndex; i++) {
                        let insert;
                        let s = strings[i];
                        if (s === '') {
                            insert = createMarker();
                        }
                        else {
                            const match = lastAttributeNameRegex.exec(s);
                            if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                                s = s.slice(0, match.index) + match[1] +
                                    match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                            }
                            insert = document.createTextNode(s);
                        }
                        parent.insertBefore(insert, node);
                        this.parts.push({ type: 'node', index: ++index });
                    }
                    // If there's no text, we must insert a comment to mark our place.
                    // Else, we can trust it will stick around after cloning.
                    if (strings[lastIndex] === '') {
                        parent.insertBefore(createMarker(), node);
                        nodesToRemove.push(node);
                    }
                    else {
                        node.data = strings[lastIndex];
                    }
                    // We have a part for each match found
                    partIndex += lastIndex;
                }
            }
            else if (node.nodeType === 8 /* Node.COMMENT_NODE */) {
                if (node.data === marker) {
                    const parent = node.parentNode;
                    // Add a new marker node to be the startNode of the Part if any of
                    // the following are true:
                    //  * We don't have a previousSibling
                    //  * The previousSibling is already the start of a previous part
                    if (node.previousSibling === null || index === lastPartIndex) {
                        index++;
                        parent.insertBefore(createMarker(), node);
                    }
                    lastPartIndex = index;
                    this.parts.push({ type: 'node', index });
                    // If we don't have a nextSibling, keep this node so we have an end.
                    // Else, we can remove it to save future costs.
                    if (node.nextSibling === null) {
                        node.data = '';
                    }
                    else {
                        nodesToRemove.push(node);
                        index--;
                    }
                    partIndex++;
                }
                else {
                    let i = -1;
                    while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
                        // Comment node has a binding marker inside, make an inactive part
                        // The binding won't work, but subsequent bindings will
                        // TODO (justinfagnani): consider whether it's even worth it to
                        // make bindings in comments work
                        this.parts.push({ type: 'node', index: -1 });
                        partIndex++;
                    }
                }
            }
        }
        // Remove text binding nodes after the walk to not disturb the TreeWalker
        for (const n of nodesToRemove) {
            n.parentNode.removeChild(n);
        }
    }
}
const endsWith = (str, suffix) => {
    const index = str.length - suffix.length;
    return index >= 0 && str.slice(index) === suffix;
};
const isTemplatePartActive = (part) => part.index !== -1;
// Allows `document.createComment('')` to be renamed for a
// small manual size-savings.
const createMarker = () => document.createComment('');
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-characters
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
 * space character except " ".
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */
const lastAttributeNameRegex = 
// eslint-disable-next-line no-control-regex
/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;

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
 */
const walkerNodeFilter = 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */;
/**
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
 */
function removeNodesFromTemplate(template, nodesToRemove) {
    const { element: { content }, parts } = template;
    const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    let partIndex = nextActiveIndexInTemplateParts(parts);
    let part = parts[partIndex];
    let nodeIndex = -1;
    let removeCount = 0;
    const nodesToRemoveInTemplate = [];
    let currentRemovingNode = null;
    while (walker.nextNode()) {
        nodeIndex++;
        const node = walker.currentNode;
        // End removal if stepped past the removing node
        if (node.previousSibling === currentRemovingNode) {
            currentRemovingNode = null;
        }
        // A node to remove was found in the template
        if (nodesToRemove.has(node)) {
            nodesToRemoveInTemplate.push(node);
            // Track node we're removing
            if (currentRemovingNode === null) {
                currentRemovingNode = node;
            }
        }
        // When removing, increment count by which to adjust subsequent part indices
        if (currentRemovingNode !== null) {
            removeCount++;
        }
        while (part !== undefined && part.index === nodeIndex) {
            // If part is in a removed node deactivate it by setting index to -1 or
            // adjust the index as needed.
            part.index = currentRemovingNode !== null ? -1 : part.index - removeCount;
            // go to the next active part.
            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
            part = parts[partIndex];
        }
    }
    nodesToRemoveInTemplate.forEach((n) => n.parentNode.removeChild(n));
}
const countNodes = (node) => {
    let count = (node.nodeType === 11 /* Node.DOCUMENT_FRAGMENT_NODE */) ? 0 : 1;
    const walker = document.createTreeWalker(node, walkerNodeFilter, null, false);
    while (walker.nextNode()) {
        count++;
    }
    return count;
};
const nextActiveIndexInTemplateParts = (parts, startIndex = -1) => {
    for (let i = startIndex + 1; i < parts.length; i++) {
        const part = parts[i];
        if (isTemplatePartActive(part)) {
            return i;
        }
    }
    return -1;
};
/**
 * Inserts the given node into the Template, optionally before the given
 * refNode. In addition to inserting the node into the Template, the Template
 * part indices are updated to match the mutated Template DOM.
 */
function insertNodeIntoTemplate(template, node, refNode = null) {
    const { element: { content }, parts } = template;
    // If there's no refNode, then put node at end of template.
    // No part indices need to be shifted in this case.
    if (refNode === null || refNode === undefined) {
        content.appendChild(node);
        return;
    }
    const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    let partIndex = nextActiveIndexInTemplateParts(parts);
    let insertCount = 0;
    let walkerIndex = -1;
    while (walker.nextNode()) {
        walkerIndex++;
        const walkerNode = walker.currentNode;
        if (walkerNode === refNode) {
            insertCount = countNodes(node);
            refNode.parentNode.insertBefore(node, refNode);
        }
        while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
            // If we've inserted the node, simply adjust all subsequent parts
            if (insertCount > 0) {
                while (partIndex !== -1) {
                    parts[partIndex].index += insertCount;
                    partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
                }
                return;
            }
            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
        }
    }
}

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
 */
const directives = new WeakMap();
/**
 * Brands a function as a directive factory function so that lit-html will call
 * the function during template rendering, rather than passing as a value.
 *
 * A _directive_ is a function that takes a Part as an argument. It has the
 * signature: `(part: Part) => void`.
 *
 * A directive _factory_ is a function that takes arguments for data and
 * configuration and returns a directive. Users of directive usually refer to
 * the directive factory as the directive. For example, "The repeat directive".
 *
 * Usually a template author will invoke a directive factory in their template
 * with relevant arguments, which will then return a directive function.
 *
 * Here's an example of using the `repeat()` directive factory that takes an
 * array and a function to render an item:
 *
 * ```js
 * html`<ul><${repeat(items, (item) => html`<li>${item}</li>`)}</ul>`
 * ```
 *
 * When `repeat` is invoked, it returns a directive function that closes over
 * `items` and the template function. When the outer template is rendered, the
 * return directive function is called with the Part for the expression.
 * `repeat` then performs it's custom logic to render multiple items.
 *
 * @param f The directive factory function. Must be a function that returns a
 * function of the signature `(part: Part) => void`. The returned function will
 * be called with the part object.
 *
 * @example
 *
 * import {directive, html} from 'lit-html';
 *
 * const immutable = directive((v) => (part) => {
 *   if (part.value !== v) {
 *     part.setValue(v)
 *   }
 * });
 */
const directive = (f) => ((...args) => {
    const d = f(...args);
    directives.set(d, true);
    return d;
});
const isDirective = (o) => {
    return typeof o === 'function' && directives.has(o);
};

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = {};
/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */
const nothing = {};

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
 */
/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
class TemplateInstance {
    constructor(template, processor, options) {
        this.__parts = [];
        this.template = template;
        this.processor = processor;
        this.options = options;
    }
    update(values) {
        let i = 0;
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.setValue(values[i]);
            }
            i++;
        }
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.commit();
            }
        }
    }
    _clone() {
        // There are a number of steps in the lifecycle of a template instance's
        // DOM fragment:
        //  1. Clone - create the instance fragment
        //  2. Adopt - adopt into the main document
        //  3. Process - find part markers and create parts
        //  4. Upgrade - upgrade custom elements
        //  5. Update - set node, attribute, property, etc., values
        //  6. Connect - connect to the document. Optional and outside of this
        //     method.
        //
        // We have a few constraints on the ordering of these steps:
        //  * We need to upgrade before updating, so that property values will pass
        //    through any property setters.
        //  * We would like to process before upgrading so that we're sure that the
        //    cloned fragment is inert and not disturbed by self-modifying DOM.
        //  * We want custom elements to upgrade even in disconnected fragments.
        //
        // Given these constraints, with full custom elements support we would
        // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
        //
        // But Safari does not implement CustomElementRegistry#upgrade, so we
        // can not implement that order and still have upgrade-before-update and
        // upgrade disconnected fragments. So we instead sacrifice the
        // process-before-upgrade constraint, since in Custom Elements v1 elements
        // must not modify their light DOM in the constructor. We still have issues
        // when co-existing with CEv0 elements like Polymer 1, and with polyfills
        // that don't strictly adhere to the no-modification rule because shadow
        // DOM, which may be created in the constructor, is emulated by being placed
        // in the light DOM.
        //
        // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
        // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
        // in one step.
        //
        // The Custom Elements v1 polyfill supports upgrade(), so the order when
        // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
        // Connect.
        const fragment = isCEPolyfill ?
            this.template.element.content.cloneNode(true) :
            document.importNode(this.template.element.content, true);
        const stack = [];
        const parts = this.template.parts;
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(fragment, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        let partIndex = 0;
        let nodeIndex = 0;
        let part;
        let node = walker.nextNode();
        // Loop through all the nodes and parts of a template
        while (partIndex < parts.length) {
            part = parts[partIndex];
            if (!isTemplatePartActive(part)) {
                this.__parts.push(undefined);
                partIndex++;
                continue;
            }
            // Progress the tree walker until we find our next part's node.
            // Note that multiple parts may share the same node (attribute parts
            // on a single element), so this loop may not run at all.
            while (nodeIndex < part.index) {
                nodeIndex++;
                if (node.nodeName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
                if ((node = walker.nextNode()) === null) {
                    // We've exhausted the content inside a nested template element.
                    // Because we still have parts (the outer for-loop), we know:
                    // - There is a template in the stack
                    // - The walker will find a nextNode outside the template
                    walker.currentNode = stack.pop();
                    node = walker.nextNode();
                }
            }
            // We've arrived at our part's node.
            if (part.type === 'node') {
                const part = this.processor.handleTextExpression(this.options);
                part.insertAfterNode(node.previousSibling);
                this.__parts.push(part);
            }
            else {
                this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
            }
            partIndex++;
        }
        if (isCEPolyfill) {
            document.adoptNode(fragment);
            customElements.upgrade(fragment);
        }
        return fragment;
    }
}

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
 */
const commentMarker = ` ${marker} `;
/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */
class TemplateResult {
    constructor(strings, values, type, processor) {
        this.strings = strings;
        this.values = values;
        this.type = type;
        this.processor = processor;
    }
    /**
     * Returns a string of HTML used to create a `<template>` element.
     */
    getHTML() {
        const l = this.strings.length - 1;
        let html = '';
        let isCommentBinding = false;
        for (let i = 0; i < l; i++) {
            const s = this.strings[i];
            // For each binding we want to determine the kind of marker to insert
            // into the template source before it's parsed by the browser's HTML
            // parser. The marker type is based on whether the expression is in an
            // attribute, text, or comment position.
            //   * For node-position bindings we insert a comment with the marker
            //     sentinel as its text content, like <!--{{lit-guid}}-->.
            //   * For attribute bindings we insert just the marker sentinel for the
            //     first binding, so that we support unquoted attribute bindings.
            //     Subsequent bindings can use a comment marker because multi-binding
            //     attributes must be quoted.
            //   * For comment bindings we insert just the marker sentinel so we don't
            //     close the comment.
            //
            // The following code scans the template source, but is *not* an HTML
            // parser. We don't need to track the tree structure of the HTML, only
            // whether a binding is inside a comment, and if not, if it appears to be
            // the first binding in an attribute.
            const commentOpen = s.lastIndexOf('<!--');
            // We're in comment position if we have a comment open with no following
            // comment close. Because <-- can appear in an attribute value there can
            // be false positives.
            isCommentBinding = (commentOpen > -1 || isCommentBinding) &&
                s.indexOf('-->', commentOpen + 1) === -1;
            // Check to see if we have an attribute-like sequence preceding the
            // expression. This can match "name=value" like structures in text,
            // comments, and attribute values, so there can be false-positives.
            const attributeMatch = lastAttributeNameRegex.exec(s);
            if (attributeMatch === null) {
                // We're only in this branch if we don't have a attribute-like
                // preceding sequence. For comments, this guards against unusual
                // attribute values like <div foo="<!--${'bar'}">. Cases like
                // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
                // below.
                html += s + (isCommentBinding ? commentMarker : nodeMarker);
            }
            else {
                // For attributes we use just a marker sentinel, and also append a
                // $lit$ suffix to the name to opt-out of attribute-specific parsing
                // that IE and Edge do for style and certain SVG attributes.
                html += s.substr(0, attributeMatch.index) + attributeMatch[1] +
                    attributeMatch[2] + boundAttributeSuffix + attributeMatch[3] +
                    marker;
            }
        }
        html += this.strings[l];
        return html;
    }
    getTemplateElement() {
        const template = document.createElement('template');
        template.innerHTML = this.getHTML();
        return template;
    }
}

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
 */
const isPrimitive = (value) => {
    return (value === null ||
        !(typeof value === 'object' || typeof value === 'function'));
};
const isIterable = (value) => {
    return Array.isArray(value) ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        !!(value && value[Symbol.iterator]);
};
/**
 * Writes attribute values to the DOM for a group of AttributeParts bound to a
 * single attribute. The value is only set once even if there are multiple parts
 * for an attribute.
 */
class AttributeCommitter {
    constructor(element, name, strings) {
        this.dirty = true;
        this.element = element;
        this.name = name;
        this.strings = strings;
        this.parts = [];
        for (let i = 0; i < strings.length - 1; i++) {
            this.parts[i] = this._createPart();
        }
    }
    /**
     * Creates a single part. Override this to create a differnt type of part.
     */
    _createPart() {
        return new AttributePart(this);
    }
    _getValue() {
        const strings = this.strings;
        const l = strings.length - 1;
        let text = '';
        for (let i = 0; i < l; i++) {
            text += strings[i];
            const part = this.parts[i];
            if (part !== undefined) {
                const v = part.value;
                if (isPrimitive(v) || !isIterable(v)) {
                    text += typeof v === 'string' ? v : String(v);
                }
                else {
                    for (const t of v) {
                        text += typeof t === 'string' ? t : String(t);
                    }
                }
            }
        }
        text += strings[l];
        return text;
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            this.element.setAttribute(this.name, this._getValue());
        }
    }
}
/**
 * A Part that controls all or part of an attribute value.
 */
class AttributePart {
    constructor(committer) {
        this.value = undefined;
        this.committer = committer;
    }
    setValue(value) {
        if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
            this.value = value;
            // If the value is a not a directive, dirty the committer so that it'll
            // call setAttribute. If the value is a directive, it'll dirty the
            // committer if it calls setValue().
            if (!isDirective(value)) {
                this.committer.dirty = true;
            }
        }
    }
    commit() {
        while (isDirective(this.value)) {
            const directive = this.value;
            this.value = noChange;
            directive(this);
        }
        if (this.value === noChange) {
            return;
        }
        this.committer.commit();
    }
}
/**
 * A Part that controls a location within a Node tree. Like a Range, NodePart
 * has start and end locations and can set and update the Nodes between those
 * locations.
 *
 * NodeParts support several value types: primitives, Nodes, TemplateResults,
 * as well as arrays and iterables of those types.
 */
class NodePart {
    constructor(options) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.options = options;
    }
    /**
     * Appends this part into a container.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendInto(container) {
        this.startNode = container.appendChild(createMarker());
        this.endNode = container.appendChild(createMarker());
    }
    /**
     * Inserts this part after the `ref` node (between `ref` and `ref`'s next
     * sibling). Both `ref` and its next sibling must be static, unchanging nodes
     * such as those that appear in a literal section of a template.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterNode(ref) {
        this.startNode = ref;
        this.endNode = ref.nextSibling;
    }
    /**
     * Appends this part into a parent part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendIntoPart(part) {
        part.__insert(this.startNode = createMarker());
        part.__insert(this.endNode = createMarker());
    }
    /**
     * Inserts this part after the `ref` part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterPart(ref) {
        ref.__insert(this.startNode = createMarker());
        this.endNode = ref.endNode;
        ref.endNode = this.startNode;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        if (this.startNode.parentNode === null) {
            return;
        }
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        const value = this.__pendingValue;
        if (value === noChange) {
            return;
        }
        if (isPrimitive(value)) {
            if (value !== this.value) {
                this.__commitText(value);
            }
        }
        else if (value instanceof TemplateResult) {
            this.__commitTemplateResult(value);
        }
        else if (value instanceof Node) {
            this.__commitNode(value);
        }
        else if (isIterable(value)) {
            this.__commitIterable(value);
        }
        else if (value === nothing) {
            this.value = nothing;
            this.clear();
        }
        else {
            // Fallback, will render the string representation
            this.__commitText(value);
        }
    }
    __insert(node) {
        this.endNode.parentNode.insertBefore(node, this.endNode);
    }
    __commitNode(value) {
        if (this.value === value) {
            return;
        }
        this.clear();
        this.__insert(value);
        this.value = value;
    }
    __commitText(value) {
        const node = this.startNode.nextSibling;
        value = value == null ? '' : value;
        // If `value` isn't already a string, we explicitly convert it here in case
        // it can't be implicitly converted - i.e. it's a symbol.
        const valueAsString = typeof value === 'string' ? value : String(value);
        if (node === this.endNode.previousSibling &&
            node.nodeType === 3 /* Node.TEXT_NODE */) {
            // If we only have a single text node between the markers, we can just
            // set its value, rather than replacing it.
            // TODO(justinfagnani): Can we just check if this.value is primitive?
            node.data = valueAsString;
        }
        else {
            this.__commitNode(document.createTextNode(valueAsString));
        }
        this.value = value;
    }
    __commitTemplateResult(value) {
        const template = this.options.templateFactory(value);
        if (this.value instanceof TemplateInstance &&
            this.value.template === template) {
            this.value.update(value.values);
        }
        else {
            // Make sure we propagate the template processor from the TemplateResult
            // so that we use its syntax extension, etc. The template factory comes
            // from the render function options so that it can control template
            // caching and preprocessing.
            const instance = new TemplateInstance(template, value.processor, this.options);
            const fragment = instance._clone();
            instance.update(value.values);
            this.__commitNode(fragment);
            this.value = instance;
        }
    }
    __commitIterable(value) {
        // For an Iterable, we create a new InstancePart per item, then set its
        // value to the item. This is a little bit of overhead for every item in
        // an Iterable, but it lets us recurse easily and efficiently update Arrays
        // of TemplateResults that will be commonly returned from expressions like:
        // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
        // If _value is an array, then the previous render was of an
        // iterable and _value will contain the NodeParts from the previous
        // render. If _value is not an array, clear this part and make a new
        // array for NodeParts.
        if (!Array.isArray(this.value)) {
            this.value = [];
            this.clear();
        }
        // Lets us keep track of how many items we stamped so we can clear leftover
        // items from a previous render
        const itemParts = this.value;
        let partIndex = 0;
        let itemPart;
        for (const item of value) {
            // Try to reuse an existing part
            itemPart = itemParts[partIndex];
            // If no existing part, create a new one
            if (itemPart === undefined) {
                itemPart = new NodePart(this.options);
                itemParts.push(itemPart);
                if (partIndex === 0) {
                    itemPart.appendIntoPart(this);
                }
                else {
                    itemPart.insertAfterPart(itemParts[partIndex - 1]);
                }
            }
            itemPart.setValue(item);
            itemPart.commit();
            partIndex++;
        }
        if (partIndex < itemParts.length) {
            // Truncate the parts array so _value reflects the current state
            itemParts.length = partIndex;
            this.clear(itemPart && itemPart.endNode);
        }
    }
    clear(startNode = this.startNode) {
        removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
    }
}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */
class BooleanAttributePart {
    constructor(element, name, strings) {
        this.value = undefined;
        this.__pendingValue = undefined;
        if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
            throw new Error('Boolean attributes can only contain a single expression');
        }
        this.element = element;
        this.name = name;
        this.strings = strings;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        if (this.__pendingValue === noChange) {
            return;
        }
        const value = !!this.__pendingValue;
        if (this.value !== value) {
            if (value) {
                this.element.setAttribute(this.name, '');
            }
            else {
                this.element.removeAttribute(this.name);
            }
            this.value = value;
        }
        this.__pendingValue = noChange;
    }
}
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */
class PropertyCommitter extends AttributeCommitter {
    constructor(element, name, strings) {
        super(element, name, strings);
        this.single =
            (strings.length === 2 && strings[0] === '' && strings[1] === '');
    }
    _createPart() {
        return new PropertyPart(this);
    }
    _getValue() {
        if (this.single) {
            return this.parts[0].value;
        }
        return super._getValue();
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.element[this.name] = this._getValue();
        }
    }
}
class PropertyPart extends AttributePart {
}
// Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the third
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.
let eventOptionsSupported = false;
// Wrap into an IIFE because MS Edge <= v41 does not support having try/catch
// blocks right into the body of a module
(() => {
    try {
        const options = {
            get capture() {
                eventOptionsSupported = true;
                return false;
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.addEventListener('test', options, options);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.removeEventListener('test', options, options);
    }
    catch (_e) {
        // event options not supported
    }
})();
class EventPart {
    constructor(element, eventName, eventContext) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.element = element;
        this.eventName = eventName;
        this.eventContext = eventContext;
        this.__boundHandleEvent = (e) => this.handleEvent(e);
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        if (this.__pendingValue === noChange) {
            return;
        }
        const newListener = this.__pendingValue;
        const oldListener = this.value;
        const shouldRemoveListener = newListener == null ||
            oldListener != null &&
                (newListener.capture !== oldListener.capture ||
                    newListener.once !== oldListener.once ||
                    newListener.passive !== oldListener.passive);
        const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
        if (shouldRemoveListener) {
            this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        if (shouldAddListener) {
            this.__options = getOptions(newListener);
            this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        this.value = newListener;
        this.__pendingValue = noChange;
    }
    handleEvent(event) {
        if (typeof this.value === 'function') {
            this.value.call(this.eventContext || this.element, event);
        }
        else {
            this.value.handleEvent(event);
        }
    }
}
// We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.
const getOptions = (o) => o &&
    (eventOptionsSupported ?
        { capture: o.capture, passive: o.passive, once: o.once } :
        o.capture);

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
 */
/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */
function templateFactory(result) {
    let templateCache = templateCaches.get(result.type);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        templateCaches.set(result.type, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
        return template;
    }
    // If the TemplateStringsArray is new, generate a key from the strings
    // This key is shared between all templates with identical content
    const key = result.strings.join(marker);
    // Check if we already have a Template for this key
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        // If we have not seen this key before, create a new Template
        template = new Template(result, result.getTemplateElement());
        // Cache the Template for this key
        templateCache.keyString.set(key, template);
    }
    // Cache all future queries for this TemplateStringsArray
    templateCache.stringsArray.set(result.strings, template);
    return template;
}
const templateCaches = new Map();

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
 */
const parts = new WeakMap();
/**
 * Renders a template result or other value to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result Any value renderable by NodePart - typically a TemplateResult
 *     created by evaluating a template tag like `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */
const render = (result, container, options) => {
    let part = parts.get(container);
    if (part === undefined) {
        removeNodes(container, container.firstChild);
        parts.set(container, part = new NodePart(Object.assign({ templateFactory }, options)));
        part.appendInto(container);
    }
    part.setValue(result);
    part.commit();
};

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
 */
/**
 * Creates Parts when a template is instantiated.
 */
class DefaultTemplateProcessor {
    /**
     * Create parts for an attribute-position binding, given the event, attribute
     * name, and string literals.
     *
     * @param element The element containing the binding
     * @param name  The attribute name
     * @param strings The string literals. There are always at least two strings,
     *   event for fully-controlled bindings with a single expression.
     */
    handleAttributeExpressions(element, name, strings, options) {
        const prefix = name[0];
        if (prefix === '.') {
            const committer = new PropertyCommitter(element, name.slice(1), strings);
            return committer.parts;
        }
        if (prefix === '@') {
            return [new EventPart(element, name.slice(1), options.eventContext)];
        }
        if (prefix === '?') {
            return [new BooleanAttributePart(element, name.slice(1), strings)];
        }
        const committer = new AttributeCommitter(element, name, strings);
        return committer.parts;
    }
    /**
     * Create parts for a text-position binding.
     * @param templateFactory
     */
    handleTextExpression(options) {
        return new NodePart(options);
    }
}
const defaultTemplateProcessor = new DefaultTemplateProcessor();

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
 */
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
if (typeof window !== 'undefined') {
    (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.2.1');
}
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */
const html = (strings, ...values) => new TemplateResult(strings, values, 'html', defaultTemplateProcessor);

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
 */
// Get a key to lookup in `templateCaches`.
const getTemplateCacheKey = (type, scopeName) => `${type}--${scopeName}`;
let compatibleShadyCSSVersion = true;
if (typeof window.ShadyCSS === 'undefined') {
    compatibleShadyCSSVersion = false;
}
else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
    console.warn(`Incompatible ShadyCSS version detected. ` +
        `Please update to at least @webcomponents/webcomponentsjs@2.0.2 and ` +
        `@webcomponents/shadycss@1.3.1.`);
    compatibleShadyCSSVersion = false;
}
/**
 * Template factory which scopes template DOM using ShadyCSS.
 * @param scopeName {string}
 */
const shadyTemplateFactory = (scopeName) => (result) => {
    const cacheKey = getTemplateCacheKey(result.type, scopeName);
    let templateCache = templateCaches.get(cacheKey);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        templateCaches.set(cacheKey, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
        return template;
    }
    const key = result.strings.join(marker);
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        const element = result.getTemplateElement();
        if (compatibleShadyCSSVersion) {
            window.ShadyCSS.prepareTemplateDom(element, scopeName);
        }
        template = new Template(result, element);
        templateCache.keyString.set(key, template);
    }
    templateCache.stringsArray.set(result.strings, template);
    return template;
};
const TEMPLATE_TYPES = ['html', 'svg'];
/**
 * Removes all style elements from Templates for the given scopeName.
 */
const removeStylesFromLitTemplates = (scopeName) => {
    TEMPLATE_TYPES.forEach((type) => {
        const templates = templateCaches.get(getTemplateCacheKey(type, scopeName));
        if (templates !== undefined) {
            templates.keyString.forEach((template) => {
                const { element: { content } } = template;
                // IE 11 doesn't support the iterable param Set constructor
                const styles = new Set();
                Array.from(content.querySelectorAll('style')).forEach((s) => {
                    styles.add(s);
                });
                removeNodesFromTemplate(template, styles);
            });
        }
    });
};
const shadyRenderSet = new Set();
/**
 * For the given scope name, ensures that ShadyCSS style scoping is performed.
 * This is done just once per scope name so the fragment and template cannot
 * be modified.
 * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
 * to be scoped and appended to the document
 * (2) removes style elements from all lit-html Templates for this scope name.
 *
 * Note, <style> elements can only be placed into templates for the
 * initial rendering of the scope. If <style> elements are included in templates
 * dynamically rendered to the scope (after the first scope render), they will
 * not be scoped and the <style> will be left in the template and rendered
 * output.
 */
const prepareTemplateStyles = (scopeName, renderedDOM, template) => {
    shadyRenderSet.add(scopeName);
    // If `renderedDOM` is stamped from a Template, then we need to edit that
    // Template's underlying template element. Otherwise, we create one here
    // to give to ShadyCSS, which still requires one while scoping.
    const templateElement = !!template ? template.element : document.createElement('template');
    // Move styles out of rendered DOM and store.
    const styles = renderedDOM.querySelectorAll('style');
    const { length } = styles;
    // If there are no styles, skip unnecessary work
    if (length === 0) {
        // Ensure prepareTemplateStyles is called to support adding
        // styles via `prepareAdoptedCssText` since that requires that
        // `prepareTemplateStyles` is called.
        //
        // ShadyCSS will only update styles containing @apply in the template
        // given to `prepareTemplateStyles`. If no lit Template was given,
        // ShadyCSS will not be able to update uses of @apply in any relevant
        // template. However, this is not a problem because we only create the
        // template for the purpose of supporting `prepareAdoptedCssText`,
        // which doesn't support @apply at all.
        window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
        return;
    }
    const condensedStyle = document.createElement('style');
    // Collect styles into a single style. This helps us make sure ShadyCSS
    // manipulations will not prevent us from being able to fix up template
    // part indices.
    // NOTE: collecting styles is inefficient for browsers but ShadyCSS
    // currently does this anyway. When it does not, this should be changed.
    for (let i = 0; i < length; i++) {
        const style = styles[i];
        style.parentNode.removeChild(style);
        condensedStyle.textContent += style.textContent;
    }
    // Remove styles from nested templates in this scope.
    removeStylesFromLitTemplates(scopeName);
    // And then put the condensed style into the "root" template passed in as
    // `template`.
    const content = templateElement.content;
    if (!!template) {
        insertNodeIntoTemplate(template, condensedStyle, content.firstChild);
    }
    else {
        content.insertBefore(condensedStyle, content.firstChild);
    }
    // Note, it's important that ShadyCSS gets the template that `lit-html`
    // will actually render so that it can update the style inside when
    // needed (e.g. @apply native Shadow DOM case).
    window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
    const style = content.querySelector('style');
    if (window.ShadyCSS.nativeShadow && style !== null) {
        // When in native Shadow DOM, ensure the style created by ShadyCSS is
        // included in initially rendered output (`renderedDOM`).
        renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
    }
    else if (!!template) {
        // When no style is left in the template, parts will be broken as a
        // result. To fix this, we put back the style node ShadyCSS removed
        // and then tell lit to remove that node from the template.
        // There can be no style in the template in 2 cases (1) when Shady DOM
        // is in use, ShadyCSS removes all styles, (2) when native Shadow DOM
        // is in use ShadyCSS removes the style if it contains no content.
        // NOTE, ShadyCSS creates its own style so we can safely add/remove
        // `condensedStyle` here.
        content.insertBefore(condensedStyle, content.firstChild);
        const removes = new Set();
        removes.add(condensedStyle);
        removeNodesFromTemplate(template, removes);
    }
};
/**
 * Extension to the standard `render` method which supports rendering
 * to ShadowRoots when the ShadyDOM (https://github.com/webcomponents/shadydom)
 * and ShadyCSS (https://github.com/webcomponents/shadycss) polyfills are used
 * or when the webcomponentsjs
 * (https://github.com/webcomponents/webcomponentsjs) polyfill is used.
 *
 * Adds a `scopeName` option which is used to scope element DOM and stylesheets
 * when native ShadowDOM is unavailable. The `scopeName` will be added to
 * the class attribute of all rendered DOM. In addition, any style elements will
 * be automatically re-written with this `scopeName` selector and moved out
 * of the rendered DOM and into the document `<head>`.
 *
 * It is common to use this render method in conjunction with a custom element
 * which renders a shadowRoot. When this is done, typically the element's
 * `localName` should be used as the `scopeName`.
 *
 * In addition to DOM scoping, ShadyCSS also supports a basic shim for css
 * custom properties (needed only on older browsers like IE11) and a shim for
 * a deprecated feature called `@apply` that supports applying a set of css
 * custom properties to a given location.
 *
 * Usage considerations:
 *
 * * Part values in `<style>` elements are only applied the first time a given
 * `scopeName` renders. Subsequent changes to parts in style elements will have
 * no effect. Because of this, parts in style elements should only be used for
 * values that will never change, for example parts that set scope-wide theme
 * values or parts which render shared style elements.
 *
 * * Note, due to a limitation of the ShadyDOM polyfill, rendering in a
 * custom element's `constructor` is not supported. Instead rendering should
 * either done asynchronously, for example at microtask timing (for example
 * `Promise.resolve()`), or be deferred until the first time the element's
 * `connectedCallback` runs.
 *
 * Usage considerations when using shimmed custom properties or `@apply`:
 *
 * * Whenever any dynamic changes are made which affect
 * css custom properties, `ShadyCSS.styleElement(element)` must be called
 * to update the element. There are two cases when this is needed:
 * (1) the element is connected to a new parent, (2) a class is added to the
 * element that causes it to match different custom properties.
 * To address the first case when rendering a custom element, `styleElement`
 * should be called in the element's `connectedCallback`.
 *
 * * Shimmed custom properties may only be defined either for an entire
 * shadowRoot (for example, in a `:host` rule) or via a rule that directly
 * matches an element with a shadowRoot. In other words, instead of flowing from
 * parent to child as do native css custom properties, shimmed custom properties
 * flow only from shadowRoots to nested shadowRoots.
 *
 * * When using `@apply` mixing css shorthand property names with
 * non-shorthand names (for example `border` and `border-width`) is not
 * supported.
 */
const render$1 = (result, container, options) => {
    if (!options || typeof options !== 'object' || !options.scopeName) {
        throw new Error('The `scopeName` option is required.');
    }
    const scopeName = options.scopeName;
    const hasRendered = parts.has(container);
    const needsScoping = compatibleShadyCSSVersion &&
        container.nodeType === 11 /* Node.DOCUMENT_FRAGMENT_NODE */ &&
        !!container.host;
    // Handle first render to a scope specially...
    const firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName);
    // On first scope render, render into a fragment; this cannot be a single
    // fragment that is reused since nested renders can occur synchronously.
    const renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
    render(result, renderContainer, Object.assign({ templateFactory: shadyTemplateFactory(scopeName) }, options));
    // When performing first scope render,
    // (1) We've rendered into a fragment so that there's a chance to
    // `prepareTemplateStyles` before sub-elements hit the DOM
    // (which might cause them to render based on a common pattern of
    // rendering in a custom element's `connectedCallback`);
    // (2) Scope the template with ShadyCSS one time only for this scope.
    // (3) Render the fragment into the container and make sure the
    // container knows its `part` is the one we just rendered. This ensures
    // DOM will be re-used on subsequent renders.
    if (firstScopeRender) {
        const part = parts.get(renderContainer);
        parts.delete(renderContainer);
        // ShadyCSS might have style sheets (e.g. from `prepareAdoptedCssText`)
        // that should apply to `renderContainer` even if the rendered value is
        // not a TemplateInstance. However, it will only insert scoped styles
        // into the document if `prepareTemplateStyles` has already been called
        // for the given scope name.
        const template = part.value instanceof TemplateInstance ?
            part.value.template :
            undefined;
        prepareTemplateStyles(scopeName, renderContainer, template);
        removeNodes(container, container.firstChild);
        container.appendChild(renderContainer);
        parts.set(container, part);
    }
    // After elements have hit the DOM, update styling if this is the
    // initial render to this container.
    // This is needed whenever dynamic changes are made so it would be
    // safest to do every render; however, this would regress performance
    // so we leave it up to the user to call `ShadyCSS.styleElement`
    // for dynamic changes.
    if (!hasRendered && needsScoping) {
        window.ShadyCSS.styleElement(container.host);
    }
};

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
 */
var _a;
/**
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */
window.JSCompiler_renameProperty =
    (prop, _obj) => prop;
const defaultConverter = {
    toAttribute(value, type) {
        switch (type) {
            case Boolean:
                return value ? '' : null;
            case Object:
            case Array:
                // if the value is `null` or `undefined` pass this through
                // to allow removing/no change behavior.
                return value == null ? value : JSON.stringify(value);
        }
        return value;
    },
    fromAttribute(value, type) {
        switch (type) {
            case Boolean:
                return value !== null;
            case Number:
                return value === null ? null : Number(value);
            case Object:
            case Array:
                return JSON.parse(value);
        }
        return value;
    }
};
/**
 * Change function that returns true if `value` is different from `oldValue`.
 * This method is used as the default for a property's `hasChanged` function.
 */
const notEqual = (value, old) => {
    // This ensures (old==NaN, value==NaN) always returns false
    return old !== value && (old === old || value === value);
};
const defaultPropertyDeclaration = {
    attribute: true,
    type: String,
    converter: defaultConverter,
    reflect: false,
    hasChanged: notEqual
};
const STATE_HAS_UPDATED = 1;
const STATE_UPDATE_REQUESTED = 1 << 2;
const STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
const STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
/**
 * The Closure JS Compiler doesn't currently have good support for static
 * property semantics where "this" is dynamic (e.g.
 * https://github.com/google/closure-compiler/issues/3177 and others) so we use
 * this hack to bypass any rewriting by the compiler.
 */
const finalized = 'finalized';
/**
 * Base element class which manages element properties and attributes. When
 * properties change, the `update` method is asynchronously called. This method
 * should be supplied by subclassers to render updates as desired.
 */
class UpdatingElement extends HTMLElement {
    constructor() {
        super();
        this._updateState = 0;
        this._instanceProperties = undefined;
        // Initialize to an unresolved Promise so we can make sure the element has
        // connected before first update.
        this._updatePromise = new Promise((res) => this._enableUpdatingResolver = res);
        /**
         * Map with keys for any properties that have changed since the last
         * update cycle with previous values.
         */
        this._changedProperties = new Map();
        /**
         * Map with keys of properties that should be reflected when updated.
         */
        this._reflectingProperties = undefined;
        this.initialize();
    }
    /**
     * Returns a list of attributes corresponding to the registered properties.
     * @nocollapse
     */
    static get observedAttributes() {
        // note: piggy backing on this to ensure we're finalized.
        this.finalize();
        const attributes = [];
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        this._classProperties.forEach((v, p) => {
            const attr = this._attributeNameForProperty(p, v);
            if (attr !== undefined) {
                this._attributeToPropertyMap.set(attr, p);
                attributes.push(attr);
            }
        });
        return attributes;
    }
    /**
     * Ensures the private `_classProperties` property metadata is created.
     * In addition to `finalize` this is also called in `createProperty` to
     * ensure the `@property` decorator can add property metadata.
     */
    /** @nocollapse */
    static _ensureClassProperties() {
        // ensure private storage for property declarations.
        if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
            this._classProperties = new Map();
            // NOTE: Workaround IE11 not supporting Map constructor argument.
            const superProperties = Object.getPrototypeOf(this)._classProperties;
            if (superProperties !== undefined) {
                superProperties.forEach((v, k) => this._classProperties.set(k, v));
            }
        }
    }
    /**
     * Creates a property accessor on the element prototype if one does not exist
     * and stores a PropertyDeclaration for the property with the given options.
     * The property setter calls the property's `hasChanged` property option
     * or uses a strict identity check to determine whether or not to request
     * an update.
     *
     * This method may be overridden to customize properties; however,
     * when doing so, it's important to call `super.createProperty` to ensure
     * the property is setup correctly. This method calls
     * `getPropertyDescriptor` internally to get a descriptor to install.
     * To customize what properties do when they are get or set, override
     * `getPropertyDescriptor`. To customize the options for a property,
     * implement `createProperty` like this:
     *
     * static createProperty(name, options) {
     *   options = Object.assign(options, {myOption: true});
     *   super.createProperty(name, options);
     * }
     *
     * @nocollapse
     */
    static createProperty(name, options = defaultPropertyDeclaration) {
        // Note, since this can be called by the `@property` decorator which
        // is called before `finalize`, we ensure storage exists for property
        // metadata.
        this._ensureClassProperties();
        this._classProperties.set(name, options);
        // Do not generate an accessor if the prototype already has one, since
        // it would be lost otherwise and that would never be the user's intention;
        // Instead, we expect users to call `requestUpdate` themselves from
        // user-defined accessors. Note that if the super has an accessor we will
        // still overwrite it
        if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
            return;
        }
        const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
        const descriptor = this.getPropertyDescriptor(name, key, options);
        if (descriptor !== undefined) {
            Object.defineProperty(this.prototype, name, descriptor);
        }
    }
    /**
     * Returns a property descriptor to be defined on the given named property.
     * If no descriptor is returned, the property will not become an accessor.
     * For example,
     *
     *   class MyElement extends LitElement {
     *     static getPropertyDescriptor(name, key, options) {
     *       const defaultDescriptor =
     *           super.getPropertyDescriptor(name, key, options);
     *       const setter = defaultDescriptor.set;
     *       return {
     *         get: defaultDescriptor.get,
     *         set(value) {
     *           setter.call(this, value);
     *           // custom action.
     *         },
     *         configurable: true,
     *         enumerable: true
     *       }
     *     }
     *   }
     *
     * @nocollapse
     */
    static getPropertyDescriptor(name, key, _options) {
        return {
            // tslint:disable-next-line:no-any no symbol in index
            get() {
                return this[key];
            },
            set(value) {
                const oldValue = this[name];
                this[key] = value;
                this._requestUpdate(name, oldValue);
            },
            configurable: true,
            enumerable: true
        };
    }
    /**
     * Returns the property options associated with the given property.
     * These options are defined with a PropertyDeclaration via the `properties`
     * object or the `@property` decorator and are registered in
     * `createProperty(...)`.
     *
     * Note, this method should be considered "final" and not overridden. To
     * customize the options for a given property, override `createProperty`.
     *
     * @nocollapse
     * @final
     */
    static getPropertyOptions(name) {
        return this._classProperties && this._classProperties.get(name) ||
            defaultPropertyDeclaration;
    }
    /**
     * Creates property accessors for registered properties and ensures
     * any superclasses are also finalized.
     * @nocollapse
     */
    static finalize() {
        // finalize any superclasses
        const superCtor = Object.getPrototypeOf(this);
        if (!superCtor.hasOwnProperty(finalized)) {
            superCtor.finalize();
        }
        this[finalized] = true;
        this._ensureClassProperties();
        // initialize Map populated in observedAttributes
        this._attributeToPropertyMap = new Map();
        // make any properties
        // Note, only process "own" properties since this element will inherit
        // any properties defined on the superClass, and finalization ensures
        // the entire prototype chain is finalized.
        if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
            const props = this.properties;
            // support symbols in properties (IE11 does not support this)
            const propKeys = [
                ...Object.getOwnPropertyNames(props),
                ...(typeof Object.getOwnPropertySymbols === 'function') ?
                    Object.getOwnPropertySymbols(props) :
                    []
            ];
            // This for/of is ok because propKeys is an array
            for (const p of propKeys) {
                // note, use of `any` is due to TypeSript lack of support for symbol in
                // index types
                // tslint:disable-next-line:no-any no symbol in index
                this.createProperty(p, props[p]);
            }
        }
    }
    /**
     * Returns the property name for the given attribute `name`.
     * @nocollapse
     */
    static _attributeNameForProperty(name, options) {
        const attribute = options.attribute;
        return attribute === false ?
            undefined :
            (typeof attribute === 'string' ?
                attribute :
                (typeof name === 'string' ? name.toLowerCase() : undefined));
    }
    /**
     * Returns true if a property should request an update.
     * Called when a property value is set and uses the `hasChanged`
     * option for the property if present or a strict identity check.
     * @nocollapse
     */
    static _valueHasChanged(value, old, hasChanged = notEqual) {
        return hasChanged(value, old);
    }
    /**
     * Returns the property value for the given attribute value.
     * Called via the `attributeChangedCallback` and uses the property's
     * `converter` or `converter.fromAttribute` property option.
     * @nocollapse
     */
    static _propertyValueFromAttribute(value, options) {
        const type = options.type;
        const converter = options.converter || defaultConverter;
        const fromAttribute = (typeof converter === 'function' ? converter : converter.fromAttribute);
        return fromAttribute ? fromAttribute(value, type) : value;
    }
    /**
     * Returns the attribute value for the given property value. If this
     * returns undefined, the property will *not* be reflected to an attribute.
     * If this returns null, the attribute will be removed, otherwise the
     * attribute will be set to the value.
     * This uses the property's `reflect` and `type.toAttribute` property options.
     * @nocollapse
     */
    static _propertyValueToAttribute(value, options) {
        if (options.reflect === undefined) {
            return;
        }
        const type = options.type;
        const converter = options.converter;
        const toAttribute = converter && converter.toAttribute ||
            defaultConverter.toAttribute;
        return toAttribute(value, type);
    }
    /**
     * Performs element initialization. By default captures any pre-set values for
     * registered properties.
     */
    initialize() {
        this._saveInstanceProperties();
        // ensures first update will be caught by an early access of
        // `updateComplete`
        this._requestUpdate();
    }
    /**
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
     */
    _saveInstanceProperties() {
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        this.constructor
            ._classProperties.forEach((_v, p) => {
            if (this.hasOwnProperty(p)) {
                const value = this[p];
                delete this[p];
                if (!this._instanceProperties) {
                    this._instanceProperties = new Map();
                }
                this._instanceProperties.set(p, value);
            }
        });
    }
    /**
     * Applies previously saved instance properties.
     */
    _applyInstanceProperties() {
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        // tslint:disable-next-line:no-any
        this._instanceProperties.forEach((v, p) => this[p] = v);
        this._instanceProperties = undefined;
    }
    connectedCallback() {
        // Ensure first connection completes an update. Updates cannot complete
        // before connection.
        this.enableUpdating();
    }
    enableUpdating() {
        if (this._enableUpdatingResolver !== undefined) {
            this._enableUpdatingResolver();
            this._enableUpdatingResolver = undefined;
        }
    }
    /**
     * Allows for `super.disconnectedCallback()` in extensions while
     * reserving the possibility of making non-breaking feature additions
     * when disconnecting at some point in the future.
     */
    disconnectedCallback() {
    }
    /**
     * Synchronizes property values when attributes change.
     */
    attributeChangedCallback(name, old, value) {
        if (old !== value) {
            this._attributeToProperty(name, value);
        }
    }
    _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
        const ctor = this.constructor;
        const attr = ctor._attributeNameForProperty(name, options);
        if (attr !== undefined) {
            const attrValue = ctor._propertyValueToAttribute(value, options);
            // an undefined value does not change the attribute.
            if (attrValue === undefined) {
                return;
            }
            // Track if the property is being reflected to avoid
            // setting the property again via `attributeChangedCallback`. Note:
            // 1. this takes advantage of the fact that the callback is synchronous.
            // 2. will behave incorrectly if multiple attributes are in the reaction
            // stack at time of calling. However, since we process attributes
            // in `update` this should not be possible (or an extreme corner case
            // that we'd like to discover).
            // mark state reflecting
            this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;
            if (attrValue == null) {
                this.removeAttribute(attr);
            }
            else {
                this.setAttribute(attr, attrValue);
            }
            // mark state not reflecting
            this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
        }
    }
    _attributeToProperty(name, value) {
        // Use tracking info to avoid deserializing attribute value if it was
        // just set from a property setter.
        if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
            return;
        }
        const ctor = this.constructor;
        // Note, hint this as an `AttributeMap` so closure clearly understands
        // the type; it has issues with tracking types through statics
        // tslint:disable-next-line:no-unnecessary-type-assertion
        const propName = ctor._attributeToPropertyMap.get(name);
        if (propName !== undefined) {
            const options = ctor.getPropertyOptions(propName);
            // mark state reflecting
            this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
            this[propName] =
                // tslint:disable-next-line:no-any
                ctor._propertyValueFromAttribute(value, options);
            // mark state not reflecting
            this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
        }
    }
    /**
     * This private version of `requestUpdate` does not access or return the
     * `updateComplete` promise. This promise can be overridden and is therefore
     * not free to access.
     */
    _requestUpdate(name, oldValue) {
        let shouldRequestUpdate = true;
        // If we have a property key, perform property update steps.
        if (name !== undefined) {
            const ctor = this.constructor;
            const options = ctor.getPropertyOptions(name);
            if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
                if (!this._changedProperties.has(name)) {
                    this._changedProperties.set(name, oldValue);
                }
                // Add to reflecting properties set.
                // Note, it's important that every change has a chance to add the
                // property to `_reflectingProperties`. This ensures setting
                // attribute + property reflects correctly.
                if (options.reflect === true &&
                    !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
                    if (this._reflectingProperties === undefined) {
                        this._reflectingProperties = new Map();
                    }
                    this._reflectingProperties.set(name, options);
                }
            }
            else {
                // Abort the request if the property should not be considered changed.
                shouldRequestUpdate = false;
            }
        }
        if (!this._hasRequestedUpdate && shouldRequestUpdate) {
            this._updatePromise = this._enqueueUpdate();
        }
    }
    /**
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
     */
    requestUpdate(name, oldValue) {
        this._requestUpdate(name, oldValue);
        return this.updateComplete;
    }
    /**
     * Sets up the element to asynchronously update.
     */
    async _enqueueUpdate() {
        this._updateState = this._updateState | STATE_UPDATE_REQUESTED;
        try {
            // Ensure any previous update has resolved before updating.
            // This `await` also ensures that property changes are batched.
            await this._updatePromise;
        }
        catch (e) {
            // Ignore any previous errors. We only care that the previous cycle is
            // done. Any error should have been handled in the previous update.
        }
        const result = this.performUpdate();
        // If `performUpdate` returns a Promise, we await it. This is done to
        // enable coordinating updates with a scheduler. Note, the result is
        // checked to avoid delaying an additional microtask unless we need to.
        if (result != null) {
            await result;
        }
        return !this._hasRequestedUpdate;
    }
    get _hasRequestedUpdate() {
        return (this._updateState & STATE_UPDATE_REQUESTED);
    }
    get hasUpdated() {
        return (this._updateState & STATE_HAS_UPDATED);
    }
    /**
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
     */
    performUpdate() {
        // Mixin instance properties once, if they exist.
        if (this._instanceProperties) {
            this._applyInstanceProperties();
        }
        let shouldUpdate = false;
        const changedProperties = this._changedProperties;
        try {
            shouldUpdate = this.shouldUpdate(changedProperties);
            if (shouldUpdate) {
                this.update(changedProperties);
            }
            else {
                this._markUpdated();
            }
        }
        catch (e) {
            // Prevent `firstUpdated` and `updated` from running when there's an
            // update exception.
            shouldUpdate = false;
            // Ensure element can accept additional updates after an exception.
            this._markUpdated();
            throw e;
        }
        if (shouldUpdate) {
            if (!(this._updateState & STATE_HAS_UPDATED)) {
                this._updateState = this._updateState | STATE_HAS_UPDATED;
                this.firstUpdated(changedProperties);
            }
            this.updated(changedProperties);
        }
    }
    _markUpdated() {
        this._changedProperties = new Map();
        this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
    }
    /**
     * Returns a Promise that resolves when the element has completed updating.
     * The Promise value is a boolean that is `true` if the element completed the
     * update without triggering another update. The Promise result is `false` if
     * a property was set inside `updated()`. If the Promise is rejected, an
     * exception was thrown during the update.
     *
     * To await additional asynchronous work, override the `_getUpdateComplete`
     * method. For example, it is sometimes useful to await a rendered element
     * before fulfilling this Promise. To do this, first await
     * `super._getUpdateComplete()`, then any subsequent state.
     *
     * @returns {Promise} The Promise returns a boolean that indicates if the
     * update resolved without triggering another update.
     */
    get updateComplete() {
        return this._getUpdateComplete();
    }
    /**
     * Override point for the `updateComplete` promise.
     *
     * It is not safe to override the `updateComplete` getter directly due to a
     * limitation in TypeScript which means it is not possible to call a
     * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
     * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
     * This method should be overridden instead. For example:
     *
     *   class MyElement extends LitElement {
     *     async _getUpdateComplete() {
     *       await super._getUpdateComplete();
     *       await this._myChild.updateComplete;
     *     }
     *   }
     */
    _getUpdateComplete() {
        return this._updatePromise;
    }
    /**
     * Controls whether or not `update` should be called when the element requests
     * an update. By default, this method always returns `true`, but this can be
     * customized to control when to update.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    shouldUpdate(_changedProperties) {
        return true;
    }
    /**
     * Updates the element. This method reflects property values to attributes.
     * It can be overridden to render and keep updated element DOM.
     * Setting properties inside this method will *not* trigger
     * another update.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    update(_changedProperties) {
        if (this._reflectingProperties !== undefined &&
            this._reflectingProperties.size > 0) {
            // Use forEach so this works even if for/of loops are compiled to for
            // loops expecting arrays
            this._reflectingProperties.forEach((v, k) => this._propertyToAttribute(k, this[k], v));
            this._reflectingProperties = undefined;
        }
        this._markUpdated();
    }
    /**
     * Invoked whenever the element is updated. Implement to perform
     * post-updating tasks via DOM APIs, for example, focusing an element.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    updated(_changedProperties) {
    }
    /**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    firstUpdated(_changedProperties) {
    }
}
_a = finalized;
/**
 * Marks class as having finished creating properties.
 */
UpdatingElement[_a] = true;

/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const supportsAdoptingStyleSheets = ('adoptedStyleSheets' in Document.prototype) &&
    ('replace' in CSSStyleSheet.prototype);
const constructionToken = Symbol();
class CSSResult {
    constructor(cssText, safeToken) {
        if (safeToken !== constructionToken) {
            throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
        }
        this.cssText = cssText;
    }
    // Note, this is a getter so that it's lazy. In practice, this means
    // stylesheets are not created until the first element instance is made.
    get styleSheet() {
        if (this._styleSheet === undefined) {
            // Note, if `adoptedStyleSheets` is supported then we assume CSSStyleSheet
            // is constructable.
            if (supportsAdoptingStyleSheets) {
                this._styleSheet = new CSSStyleSheet();
                this._styleSheet.replaceSync(this.cssText);
            }
            else {
                this._styleSheet = null;
            }
        }
        return this._styleSheet;
    }
    toString() {
        return this.cssText;
    }
}
const textFromCSSResult = (value) => {
    if (value instanceof CSSResult) {
        return value.cssText;
    }
    else if (typeof value === 'number') {
        return value;
    }
    else {
        throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
    }
};
/**
 * Template tag which which can be used with LitElement's `style` property to
 * set element styles. For security reasons, only literal string values may be
 * used. To incorporate non-literal values `unsafeCSS` may be used inside a
 * template string part.
 */
const css = (strings, ...values) => {
    const cssText = values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
    return new CSSResult(cssText, constructionToken);
};

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
 */
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for LitElement usage.
// TODO(justinfagnani): inject version number at build time
(window['litElementVersions'] || (window['litElementVersions'] = []))
    .push('2.3.1');
/**
 * Sentinal value used to avoid calling lit-html's render function when
 * subclasses do not implement `render`
 */
const renderNotImplemented = {};
class LitElement extends UpdatingElement {
    /**
     * Return the array of styles to apply to the element.
     * Override this method to integrate into a style management system.
     *
     * @nocollapse
     */
    static getStyles() {
        return this.styles;
    }
    /** @nocollapse */
    static _getUniqueStyles() {
        // Only gather styles once per class
        if (this.hasOwnProperty(JSCompiler_renameProperty('_styles', this))) {
            return;
        }
        // Take care not to call `this.getStyles()` multiple times since this
        // generates new CSSResults each time.
        // TODO(sorvell): Since we do not cache CSSResults by input, any
        // shared styles will generate new stylesheet objects, which is wasteful.
        // This should be addressed when a browser ships constructable
        // stylesheets.
        const userStyles = this.getStyles();
        if (userStyles === undefined) {
            this._styles = [];
        }
        else if (Array.isArray(userStyles)) {
            // De-duplicate styles preserving the _last_ instance in the set.
            // This is a performance optimization to avoid duplicated styles that can
            // occur especially when composing via subclassing.
            // The last item is kept to try to preserve the cascade order with the
            // assumption that it's most important that last added styles override
            // previous styles.
            const addStyles = (styles, set) => styles.reduceRight((set, s) => 
            // Note: On IE set.add() does not return the set
            Array.isArray(s) ? addStyles(s, set) : (set.add(s), set), set);
            // Array.from does not work on Set in IE, otherwise return
            // Array.from(addStyles(userStyles, new Set<CSSResult>())).reverse()
            const set = addStyles(userStyles, new Set());
            const styles = [];
            set.forEach((v) => styles.unshift(v));
            this._styles = styles;
        }
        else {
            this._styles = [userStyles];
        }
    }
    /**
     * Performs element initialization. By default this calls `createRenderRoot`
     * to create the element `renderRoot` node and captures any pre-set values for
     * registered properties.
     */
    initialize() {
        super.initialize();
        this.constructor._getUniqueStyles();
        this.renderRoot =
            this.createRenderRoot();
        // Note, if renderRoot is not a shadowRoot, styles would/could apply to the
        // element's getRootNode(). While this could be done, we're choosing not to
        // support this now since it would require different logic around de-duping.
        if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
            this.adoptStyles();
        }
    }
    /**
     * Returns the node into which the element should render and by default
     * creates and returns an open shadowRoot. Implement to customize where the
     * element's DOM is rendered. For example, to render into the element's
     * childNodes, return `this`.
     * @returns {Element|DocumentFragment} Returns a node into which to render.
     */
    createRenderRoot() {
        return this.attachShadow({ mode: 'open' });
    }
    /**
     * Applies styling to the element shadowRoot using the `static get styles`
     * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
     * available and will fallback otherwise. When Shadow DOM is polyfilled,
     * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
     * is available but `adoptedStyleSheets` is not, styles are appended to the
     * end of the `shadowRoot` to [mimic spec
     * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
     */
    adoptStyles() {
        const styles = this.constructor._styles;
        if (styles.length === 0) {
            return;
        }
        // There are three separate cases here based on Shadow DOM support.
        // (1) shadowRoot polyfilled: use ShadyCSS
        // (2) shadowRoot.adoptedStyleSheets available: use it.
        // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
        // rendering
        if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
            window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map((s) => s.cssText), this.localName);
        }
        else if (supportsAdoptingStyleSheets) {
            this.renderRoot.adoptedStyleSheets =
                styles.map((s) => s.styleSheet);
        }
        else {
            // This must be done after rendering so the actual style insertion is done
            // in `update`.
            this._needsShimAdoptedStyleSheets = true;
        }
    }
    connectedCallback() {
        super.connectedCallback();
        // Note, first update/render handles styleElement so we only call this if
        // connected after first update.
        if (this.hasUpdated && window.ShadyCSS !== undefined) {
            window.ShadyCSS.styleElement(this);
        }
    }
    /**
     * Updates the element. This method reflects property values to attributes
     * and calls `render` to render DOM via lit-html. Setting properties inside
     * this method will *not* trigger another update.
     * @param _changedProperties Map of changed properties with old values
     */
    update(changedProperties) {
        // Setting properties in `render` should not trigger an update. Since
        // updates are allowed after super.update, it's important to call `render`
        // before that.
        const templateResult = this.render();
        super.update(changedProperties);
        // If render is not implemented by the component, don't call lit-html render
        if (templateResult !== renderNotImplemented) {
            this.constructor
                .render(templateResult, this.renderRoot, { scopeName: this.localName, eventContext: this });
        }
        // When native Shadow DOM is used but adoptedStyles are not supported,
        // insert styling after rendering to ensure adoptedStyles have highest
        // priority.
        if (this._needsShimAdoptedStyleSheets) {
            this._needsShimAdoptedStyleSheets = false;
            this.constructor._styles.forEach((s) => {
                const style = document.createElement('style');
                style.textContent = s.cssText;
                this.renderRoot.appendChild(style);
            });
        }
    }
    /**
     * Invoked on each update to perform rendering tasks. This method may return
     * any value renderable by lit-html's NodePart - typically a TemplateResult.
     * Setting properties inside this method will *not* trigger the element to
     * update.
     */
    render() {
        return renderNotImplemented;
    }
}
/**
 * Ensure this class is marked as `finalized` as an optimization ensuring
 * it will not needlessly try to `finalize`.
 *
 * Note this property name is a string to prevent breaking Closure JS Compiler
 * optimizations. See updating-element.ts for more information.
 */
LitElement['finalized'] = true;
/**
 * Render method used to render the value to the element's DOM.
 * @param result The value to render.
 * @param container Node into which to render.
 * @param options Element name.
 * @nocollapse
 */
LitElement.render = render$1;

const LabelsMixin = (base) => {
  return class Base extends base {
    static get styles () {
      return [
        super.styles || [],
        css`
          label div#label-text, ::slotted(*) {
            align-self: center;
            width: var(--labels-mixin-input-label-width, auto);
            overflow: hidden;
            text-overflow: ellipsis;
          }

        `
      ]
    }

    static get properties () {
      return {
        label: { type: String },
        labelPosition: {
          type: String,
          attribute: 'label-position'
        },
        labelForElement: {
          type: String,
          attribute: 'false'
        }

      }
    }

    constructor () {
      super();
      this.labelPosition = 'before';
      this.labelForElement = 'native';
    }

    get labelTemplate () {
      return html`
        <label id="label" for="${this.labelForElement}">
          <div id="label-text">${this.label}</div>
          <slot id="label-slot" name="label"></slot>
        </label>
      `
    }

    get ifLabelBefore () {
      if (this.labelPosition === 'after') return ''
      return this.labelTemplate
    }

    get ifLabelAfter () {
      if (this.labelPosition === 'before') return ''
      return this.labelTemplate
    }
  }
};

const SyntheticValidatorMixin = (base) => {
  return class Base extends base {
    static get properties () {
      return {
        validationMessagePosition: {
          type: String,
          attribute: 'validation-message-position'
        },
        shownValidationMessage: {
          type: String,
          attribute: false
        },
        validity: {
          type: Object,
          attribute: false
        },
        validator: { type: Function }
      }
    }

    constructor () {
      super();
      this.shownValidationMessage = '';
      this.validator = () => '';
      this.validationMessagePosition = 'before';
      this.validity = { valid: true, _customValidationMessage: '' };
    }

    setCustomValidity (m) {
      if (m === '') {
        this.validity = {
          valid: true,
          _customValidationMessage: ''
        };
        this.toggleAttribute('valid', true);
        if (m === '') this.shownValidationMessage = '';
      } else {
        this.validity = {
          valid: false,
          customError: true,
          _customValidationMessage: m
        };
        this.toggleAttribute('valid', false);
      }
    }

    reportValidity () {
      // Run custom validator. Note that custom validator
      // will only ever run on filed without an existing customError.
      if (!this.validity.customError) {
        const ownErrorMessage = this._runValidator();
        if (ownErrorMessage) this.setCustomValidity(ownErrorMessage);
      }

      // Hide the error message by default
      this.shownValidationMessage = '';

      if (!this.validity.valid) {
        this.toggleAttribute('valid', false);
        this.shownValidationMessage = this.validity._customValidationMessage;
        this.dispatchEvent(new CustomEvent('invalid', {
          cancelable: true,
          bubbles: false,
          composed: true
        }));
        return false
      } else {
        this.toggleAttribute('valid', true);
        return true
      }
    }

    _runValidator () {
      // Call the validator with a value. Here an element could be a checkbox,
      // a select, an simple text input, etc.
      // If the containing form has _getElementValueSource, that is used to
      // figure out what to pass to the validato (as well as _submitObject)
      let value;
      let submitObject;
      if (this.form && this.form._getElementValueSource) {
        value = this[this.form._getElementValueSource(this)];
        submitObject = this.form.submitObject;
      }
      const ownErrorMessage = this.validator(value, submitObject);
      if (ownErrorMessage) this.setCustomValidity(ownErrorMessage);
    }

    checkValidity () {
      if (!this.validity.customError) {
        const ownErrorMessage = this._runValidator();
        if (ownErrorMessage) this.setCustomValidity(ownErrorMessage);
      }

      if (!this.validity.valid) {
        this.dispatchEvent(new CustomEvent('invalid', {
          cancelable: true,
          bubbles: false,
          composed: true
        }));
        return false
      }
      return true
    }

    get ifValidationMessageBefore () {
      if (this.validationMessagePosition === 'after') return ''
      return this.validationMessageTemplate
    }

    get ifValidationMessageAfter () {
      if (this.validationMessagePosition === 'before') return ''
      return this.validationMessageTemplate
    }

    get validationMessageTemplate () {
      return html`
        <span class="error-message">
          ${this.shownValidationMessage}
        </span>
      `
    }
  }
};

const StyleableMixin = (base) => {
  return class Base extends base {
    static get styles () {
      return []
    }

    firstUpdated () {
      super.firstUpdated();

      // Add the equivalent of
      // <slot name="style" id="style-slot"></slot>
      // To the shadow DOM
      const styleSlot = document.createElement('slot');
      styleSlot.setAttribute('name', 'style');
      styleSlot.setAttribute('id', 'style-slot');
      this.shadowRoot.appendChild(styleSlot);

      // If an element has one or more <any-tag slot="style"> in its
      // light DOM, the newly added styleSlot will have
      // them  as an assigned element.
      // Clone over all of the ones where any-tag is `style`.
      // So, any <style slot="style"> will be cloned over
      for (const styleElement of styleSlot.assignedElements()) {
        if (styleElement.tagName === 'STYLE') {
          this.shadowRoot.appendChild(styleElement);
        }
      }
    }
  }
};

const ThemeableMixin = (path) => (base) => {
  const common = (window.TP_THEME && window.TP_THEME.common) || (p => p);
  const theme = (window.TP_THEME && window.TP_THEME[path]) || (p => p);
  return theme(common(LitBits(base)))
};

const LitBits = (base) => {
  return class Base extends base {
    static get lit () {
      return {
        LitElement,
        css,
        html
      }
    }

    get lit () {
      return {
        LitElement,
        css,
        html
      }
    }

    //  customStyles allows us to dynamically update the shadowRoot adopted StyleSheets by setting this.customStyles with a CSSResult object
    get customStyles () {
      return this._customStyles || css``
    }

    set customStyles (cssTemplate) {
      if (typeof cssTemplate === 'string') {
        cssTemplate = unsafeCSS`${cssTemplate}`; 
      }
      this._customStyles = cssTemplate;
      this.constructor._styles = [...this.constructor._styles, this._customStyles];
      this.adoptStyles();
      this.requestUpdate();
    }

  }
};

class EeAutocompleteInputSpans extends ThemeableMixin('ee-autocomplete-input-spans')(SyntheticValidatorMixin(StyleableMixin(LabelsMixin(LitElement)))) {
  static get properties () {
    return {
      name: {
        type: String
      },
      valueAs: {
        type: String,
        attribute: 'value-as'
      },
      valueSeparator: {
        type: String,
        attribute: 'value-separator'
      }
    }
  }

  constructor () {
    super();
    this.labelForElement = 'ni';
    this.valueAs = 'text'; // can be text, ids, json
    this.removeIcon = '<svg class="icon" height="15" viewBox="0 0 24 24" width="15"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>';
    this.itemElement = '';
    this.itemElementConfig = {};
    this.itemElementAttributes = {};
    this.valueSeparator = ',';
  }

  static get styles () {
    return [
      super.styles,
      css`
        :host {
          display: inline;
        }
        :host(:focus) {
          outline: none;
        }

        #list > span {
          position: relative;
          display: inline-block;
        }

        #list > span > *:not(button) {
          position: relative;
          display: inline-block;
          padding: 3px 6px;
          padding-right: 24px;
          border: 1px solid #ddd;
          border-radius: 1em;
          margin: 2px;
          vertical-align: middle;
          line-height: 1em;
        }

        #list > span > *:not(button)[invalid] {
          background-color: pink;
          border-color: red;
        }

        #list > span:active > *:not(button), #list > span:focus > *:not(button), #list > span:hover > *:not(button) {
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          background-color: #eee;
          outline: none;
        }
        #list > span:active > *:not(button), #list > span:focus > *:not(button) {
          border-color: #ccc;
        }

        #list > span button.remove {
          appearance: none;
          -moz-appearance: none;
          -webkit-appearance: none;
          fill: #999;
          border: none;
          padding: 0;
          display: inline-block;
          position: absolute;
          top: 55%;
          right: 4px;
          transform: translateY(-50%);
          background: none;
          z-index:0;
        }

        #list > *:focus, #list > span *:active {
          outline: none;
        }

        #list > span button.remove svg {
          z-index: -1;
        }

        #list > span button.remove:hover {
          fill: #555;
        }

        input {
          box-sizing: border-box;
          display: inline-block;
          outline: none;
          vertical-align: middle;
          height: 1.5em;
          border: none;
          font-size: 0.9em;
          width: 120px;
        }

        input:focus, input:hover {
          outline: none
        }

        span.error-message {
          color: red;
        }

        :invalid {
          background-color: pink;
          border: 1px solid #bb7777;
        }
      `
    ]
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <div id="list" @click="${this._listClicked}">
        <input @keydown="${this._handleKeyEvents}" @input="${this._inputReceived}" rows="1" id="ta" spellcheck="false" autocomplete="false" autocapitalize="off" autocorrect="off" dir="ltr" role="combobox" aria-autocomplete="list">
      </div>
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
      <input id="ni" type="hidden" name="${this.name}">
    `
  }

  connectedCallback () {
    super.connectedCallback();
    this.addEventListener('click', this.focus);
  }

  disconnectedCallback () {
    super.connectedCallback();
    this.removeEventListener('click', this.focus);
  }

  firstUpdated () {
    this._updateNativeInputValue();
  }

  focus () {
    this.shadowRoot.querySelector('#ta').focus();
  }

  _listClicked (e) {
    e.stopPropagation();
  }

  get value () {
    let r;
    let list;
    switch (this.valueAs) {
    case 'json':
      r = {};
      list = this.shadowRoot.querySelector('#list');
      for (const span of list.children) {
        if (span.id === 'ta') continue
        const idValue = span.firstChild.idValue;
        r[idValue] = span.firstChild.data;
      }
      return r
    default:
      r = [];
      list = this.shadowRoot.querySelector('#list');
      for (const span of list.children) {
        if (span.id === 'ta') continue
        if (this.valueAs === 'text') {
          // Won't push invalid spans to the final value
          if (span.getAttribute('invalid') === null) r.push(span.firstChild.textValue);
        } else {
          r.push(span.firstChild.idValue);
        }
      }
      return r.join(this.valueSeparator)
    }
  }

  set value (v) {
    const list = this.shadowRoot.querySelector('#list');

    // Remove all children
    while (list.firstChild) {
      if (list.firstChild.id === 'ta') break
      list.removeChild(list.firstChild);
    }

    // Assign all children using pickedElement
    if (Array.isArray(v)) {
      for (const o of v) {
        this.pickedElement(o, false, true);
      }
    } else if (typeof v === 'object' && v !== null) {
      for (const k of Object.keys(v)) {
        const $o = v[k];
        this.pickedElement($o, false, true);
      }
    } else if (typeof v === 'string') {
      for (const s of v.split(this.valueSeparator)) {
        this.pickedElement(s, false, true);
      }
    }
    // Sets the native input
    this._updateNativeInputValue();

    // Rerun validator
    this.setCustomValidity('');
    this.reportValidity();
  }

  get validationMessage () {
    return this.validity._customValidationMessage
  }

  get autocompleteValue () {
    const ta = this.shadowRoot.querySelector('#ta');
    if (ta) return ta.value
    return ''
  }

  /* END OF CONSTRAINTS API */

  // Run this when there are no suggestions and the user hits Tab or Enter in #ta
  // This will run pickElement with a STRING, which will get the element to
  // work out a data structure based on the string
  _pickCurrentValue () {
    if (this.valueAs === 'text') {
      this.pickedElement(this.shadowRoot.querySelector('#ta').value, true);
    }
  }

  _askToRemove (e) {
    const target = e.currentTarget;
    this._removeItem(target.parentElement.parentElement);
  }

  _updateNativeInputValue () {
    const ni = this.shadowRoot.querySelector('#ni');
    ni.value = this.value;
  }

  _removeItem (target, which = 'previous') {
    // Focus previous item before deleting target. If it's the first/only, select the input
    const previous = target.previousElementSibling || target.nextElementSibling;
    previous.focus();
    target.remove();
    this._updateNativeInputValue();
    // Rerun validator
    this.setCustomValidity('');
    this.reportValidity();
  }

  _createRemoveBtn () {
    const el = document.createElement('button');
    el.innerHTML = this.removeIcon;
    el.onclick = this._askToRemove.bind(this);
    el.classList.add('remove');
    return el
  }

  _handleKeyEvents (e) {
    const target = e.currentTarget;

    switch (e.key) {
    case 'ArrowLeft':
      if (target.previousElementSibling) {
        e.preventDefault();
        target.previousElementSibling.focus();
      }
      break

    case 'ArrowRight':
      if (target.id !== 'ta') {
        e.preventDefault();
        target.nextElementSibling
          ? target.nextElementSibling.focus()
          : target.parentElement.firstElementChild.focus();
      }
      break

    case 'ArrowDown':
      if (this.parentElement.suggestions.length) {
        e.preventDefault();
        this.parentElement.focusNext();
      }
      break
    case 'Backspace':
    case 'Delete':
      if (target.id === 'ta' && target.parentElement.children.length > 1 && !target.value) {
        this._removeItem(target.previousElementSibling);
      } else if (target.id !== 'ta') {
        this._removeItem(target);
      }
      break
    case 'Tab':
    case 'Enter':
      if (!this.autocompleteValue) break
      if (!this.parentElement.suggestions.length) {
        e.preventDefault();
        this._pickCurrentValue();
      } else {
        e.preventDefault();
        this.parentElement.pickFirst();
      }
    }
  }

  /* API */
  get multiInputApi () { return true }

  pickedElement (data, force = false, skipValidation = false) {
    const parentEl = document.createElement(this.itemElement);
    const el = new parentEl.constructor.PickedElement();

    el.config = { ...el.config, ...this.itemElementConfig };
    for (const k of Object.keys(this.itemElementAttributes)) el.setAttribute(k, this.itemElementAttributes[k]);

    // Convert string into data if necessary
    if (typeof data === 'string') {
      if (!data.length) return
      data = parentEl.stringToData(data);
      if (!data.valid) {
        el.toggleAttribute('invalid', true);
        if (!force) return
      }
    }
    el.data = data;

    const list = this.shadowRoot.querySelector('#list');
    const span = document.createElement('span');
    // -1 means that it will not in the list of tabs, but
    // it will be focusable (spans aren't by default)
    span.setAttribute('tabindex', -1);
    const ta = this.shadowRoot.querySelector('#ta');
    const removeBtn = this._createRemoveBtn();

    span.onkeydown = this._handleKeyEvents.bind(this);
    // Span will be not in the list of tabs
    // Necessary since this is a button and it IS
    // in tab list by default
    removeBtn.setAttribute('tabindex', -1);
    span.appendChild(el);
    el.appendChild(removeBtn);

    list.insertBefore(span, ta);
    ta.value = '';

    this._updateNativeInputValue();

    // Rerun validator
    if (!skipValidation) {
      this.setCustomValidity('');
      this.reportValidity();
    }
  }

  get textInputValue () {
    const targetElementTextArea = this.shadowRoot.querySelector('#ta');
    return targetElementTextArea
      ? targetElementTextArea.value
      : ''
  }

  setPickedElement (itemElement, itemElementConfig, itemElementAttributes) {
    this.itemElement = itemElement;
    this.itemElementConfig = itemElementConfig;
    this.itemElementAttributes = itemElementAttributes;
  }
}

window.customElements.define('ee-autocomplete-input-spans', EeAutocompleteInputSpans);

class EeAutocompleteItemCountry extends ThemeableMixin('ee-autocomplete-item-country')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      super.styles,
      css`
        :host {
          display: block;
          padding: 10px;
          border-bottom: 1px solid #ddd;
        }

        :host(:last-child) {
          border-bottom: unset;
        }

        :host(:hover) {
          background-color: #eee;
        }

        li {
          list-style: none;
        }

      `
    ]
  }

  static get properties () {
    return {
      data: {
        type: Object,
        attribute: false
      },
      config: {
        type: Object,
        attribute: false
      }
    }
  }

  constructor () {
    super();
    this.config = {
      id: 'id',
      countryName: 'name',
      countryCapital: 'capital'
    };
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
    <li>${this.data[this.config.countryName]} (Capital: ${this.data[this.config.countryCapital]})</li>
    `
  }

  /* API */

  get idValue () {
    return this.data[this.config.id]
  }

  get textValue () {
    return this.data[this.config.countryName]
  }

  stringToData (string) {
    return {
      [this.config.countryName]: string,
      valid: true
    }
  }

  static get PickedElement () {
    return EeAutocompleteItemCountryView
  }
}
customElements.define('ee-autocomplete-item-country', EeAutocompleteItemCountry);

class EeAutocompleteItemCountryView extends ThemeableMixin('ee-autocomplete-item-country-view')(EeAutocompleteItemCountry) {
  static get styles () {
    return [
      css`
        :host {
          position: relative;
          display: inline-block;
          font-size: 0.9em;
        }
      `
    ]
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.data[this.config.countryName]}
      <slot></slot>
    `
  }
}
customElements.define('ee-autocomplete-item-country-view', EeAutocompleteItemCountryView);

class EeAutocompleteItemEmail extends ThemeableMixin('ee-autocomplete-item-email')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      super.styles,
      css`
        :host {
          display: block;
          padding: 10px;
          border-bottom: 1px solid #ddd;
        }

        :host(:last-child) {
          border-bottom: unset;
        }

        :host(:hover) {
          background-color: #eee;
        }

        li {
          list-style: none;
        }

      `
    ]
  }

  static get properties () {
    return {
      data: {
        type: Object,
        attribute: false
      },
      config: {
        type: Object,
        attribute: false
      }
    }
  }

  constructor () {
    super();
    this.config = {
      id: 'id',
      emailName: 'name',
      emailAddress: 'email'
    };
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
    <li>${this.textValue}</li>
    `
  }

  /* API */
  get idValue () {
    return this.data[this.config.id]
  }

  get textValue () {
    return this._textValueGetter()
  }

  _textValueGetter (short = false) {
    if (short) return this.data[this.config.emailName] || this.data[this.config.emailAddress]
    const name = this.data[this.config.emailName];
    const address = this.data[this.config.emailAddress];
    if (name && address) return `${name} <${address}>`
    else if (name) return name
    else if (address) return address
    else return ''
  }

  stringToData (string) {
    let emailName;
    let emailAddress;

    if (!string.match('@')) {
      return {
        [this.config.emailName]: string,
        [this.config.emailAddress]: '',
        valid: false
      }
    }

    const emails = string.match(/[^@<\s]+@[^@\s>]+/g);
    if (emails) {
      emailAddress = emails[0];
    }

    const names = string.split(/\s+/);

    if (names.length > 1) {
      names.pop();
      emailName = names.join(' ').replace(/"/g, '');
    }

    const valid = !!emailAddress;

    return {
      [this.config.emailName]: emailName,
      [this.config.emailAddress]: emailAddress,
      valid: valid
    }
  }

  static get PickedElement () {
    return EeAutocompleteItemEmailView
  }
}
customElements.define('ee-autocomplete-item-email', EeAutocompleteItemEmail);

class EeAutocompleteItemEmailView extends ThemeableMixin('ee-autocomplete-item-email-view')(EeAutocompleteItemEmail) {
  static get styles () {
    return [
      css`
        :host {
          position: relative;
          display: inline-block;
          font-size: 0.9em;
        }
      `
    ]
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this._textValueGetter(true)}
      <slot></slot>
    `
  }
}
customElements.define('ee-autocomplete-item-email-view', EeAutocompleteItemEmailView);

class EeAutocompleteItemLi extends ThemeableMixin('ee-autocomplete-item-li')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      super.styles,
      css`
        :host {
          display: block;
          padding: 10px;
          border-bottom: 1px solid #ddd;
        }

        :host(:last-child) {
          border-bottom: unset;
        }

        :host(:hover) {
          background-color: #eee;
        }

        li {
          list-style: none;
          text-align: left;
        }

      `
    ]
  }

  static get properties () {
    return {
      data: {
        type: Object,
        attribute: false
      },
      config: {
        type: Object,
        attribute: false
      }
    }
  }

  constructor () {
    super();
    this.config = {
      id: 'id',
      path: 'name'
    };
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
    <li>${this.data[this.config.path]}</li>
    `
  }

  /* API */

  get idValue () {
    return this.data[this.config.id]
  }

  get textValue () {
    return this.data[this.config.path]
  }

  stringToData (string) {
    return {
      [this.config.path]: string
    }
  }

  static get PickedElement () {
    return EeAutocompleteItemLiView
  }
}
customElements.define('ee-autocomplete-item-li', EeAutocompleteItemLi);

class EeAutocompleteItemLiView extends ThemeableMixin('ee-autocomplete-item-li-view')(EeAutocompleteItemLi) {
  static get styles () {
    return [
      super.styles,
      css`
        :host {
          display: inline-block;
        }
      `
    ]
  }

  static get properties () {
    return {
      data: {
        type: Object,
        attribute: false
      },
      config: {
        type: Object,
        attribute: false
      }
    }
  }

  constructor () {
    super();
    this.config = {
      id: 'id',
      path: 'name'
    };
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      -${this.data[this.config.path]}-
    `
  }
}
customElements.define('ee-autocomplete-item-li-view', EeAutocompleteItemLiView);

class EeAutocomplete extends ThemeableMixin('ee-autocomplete')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      super.styles,
      css`
        :host {
          display: block;
          position: relative;
        }

        #suggestions-elements {
          box-sizing: border-box;
          background-color: white;
          position: absolute;
          z-index: 1000;
          max-height: 200px;
          max-width: calc(95% - 17px);
          overflow-y: scroll;
          top: 90%;
          left: 17px;
          box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.2), 0 0 2px 2px rgba(0, 0, 0, 0.05);
          visibility: hidden;
        }

        #suggestions-elements[populated] {
          width: auto;
          min-width: var(--ee-autocomplete-suggestions-min-width, 400px);
          padding: 10px;
        }

        #suggestions-elements > *[selected], #suggestions-elements > *:focus, #suggestions-elements > *:hover  {
          background-color: #eee;
        }

        [hidden] {
          display: none !important;
        }
      `
    ]
  }

  static get properties () {
    return {
      url: {
        type: String
      },
      informational: {
        type: Boolean
      },
      target: {
        type: String
      },
      targetForId: {
        type: String,
        attribute: 'target-for-id'
      },
      displaySingleSuggestion: {
        type: Boolean, attribute: 'display-single-suggestion'
      },
      picked: {
        type: Boolean,
        reflect: true
      },
      pickedData: {
        type: Object
      },
      suggestions: {
        type: Array,
        attribute: false
      },
      itemElement: {
        type: String,
        attribute: 'item-element'
      },
      itemElementConfig: {
        type: Object,
        attribute: 'item-element-config'
      },
      itemElementAttributes: {
        type: Object,
        attribute: 'item-element-attributes'
      }
    }
  }

  constructor () {
    super();
    this.url = '';
    this.target = null;
    this.targetForId = null;
    this.suggestions = [];
    this.pickedData = {};
    this.itemElement = 'ee-autocomplete-item-li';
    this.itemElementConfig = {};
    this.itemElementAttributes = {};

    this._boundInputEvent = this._inputEvent.bind(this);
    this._boundKeydownEvent = this._keydownEvent.bind(this);
  }

  // If if's not set, return the first child
  // If it's set:
  //   If it's a string, return the #element
  //   If it's an object, return it directly (assumption that it's an element)
  _findTarget (target) {
    if (target !== null) {
      if (typeof target === 'string') return this.querySelector(`#${target}`)
      else if (typeof target === 'object') return target
    } else {
      return this.children[0]
    }
    return null
  }

  // If if's not set, don't do anything
  // If it's set:
  //   If it's an empty string, look for the first [name] element without no-submit,
  //   If it's a string, return the #element
  //   If it's an object, return it  directly (assumption that it's an element)
  _findTargetForId (target) {
    if (target !== 'null') {
      if (typeof target === 'string') {
        return target === ''
          ? this.querySelector('[name]:not([no-submit])')
          : this.querySelector(`#${target}`)
      } else if (typeof target === 'object') return target
    }
    return null
  }

  connectedCallback () {
    super.connectedCallback();

    this.targetElement = this._findTarget(this.target);
    this.targetForId = this._findTargetForId(this.targetForId);

    // The target for Id is the true source of the value
    // in case of ID submission. So, two things must happen:
    // 1) If it has a value already (it might have been set by a data load before the autocomplete), then picked is true
    // 2) Its value needs to be observed, so that if a value is set at any point, picked becomes true
    if (this.targetForId) {
      this.picked = !!this.targetForId.getAttribute('value');

      const thisObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'value') {
            this.picked = !!this.targetForId.getAttribute('value');
            if (!this.targetForId.getAttribute('value')) {
              this.pickedData = null;
            }
          }
        });
      });
      thisObserver.observe(this.targetForId, { attributes: true });
    }

    if (!this.targetElement) {
      console.error('Target element not found');
      return
    }

    this.targetElement.addEventListener('input', this._boundInputEvent);
    this.targetElement.addEventListener('keydown', this._boundKeydownEvent);

    // API USE: If the target input element implements multiInputApi,
    // then set the basic parameters for all
    // picked items (element name, config and attributes)
    if (this.targetElement.multiInputApi) {
      this.targetElement.setPickedElement(this.itemElement, this.itemElementConfig, this.itemElementAttributes);
    }

    // Setup ARIA attributes on target
    this.targetElement.setAttribute('aria-autocomplete', 'list');
    this.targetElement.setAttribute('aria-controls', 'suggestions');
    this.targetElement.toggleAttribute('aria-activedescendant', true);
    // Setup ARIA attributes on ee-autocomplete
    this.setAttribute('role', 'combobox');
    this.setAttribute('aria-owns', 'suggestions');
  }

  disconnectedCallback () {
    if (!this.targetElement) return

    this.targetElement.removeEventListener('input', this._boundInputEvent);
    this.targetElement.removeEventListener('keydown', this._boundKeydownEvent);
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      <slot></slot>
      <div @click="${this._picked}" id="suggestions" role="listbox" @keydown=${this._handleKeyEvents}>
        <div id="suggestions-elements"></div>
      </div>
    `
  }

  _keydownEvent (e) {
    switch (e.key) {
    case 'Escape':
      this._dismissSuggestions();
      break
    case 'KeyDown':
      if (this.suggestions.length) {
        const suggestionsDiv = this.shadowRoot.querySelector('#suggestions-elements');
        suggestionsDiv.firstChild.focus();
      }
    }
  }

  pickFirst () {
    const suggestionsDiv = this.shadowRoot.querySelector('#suggestions-elements');
    suggestionsDiv.querySelector('[selected]').click();
  }

  focusNext () {
    if (!this.suggestions.length) return
    const suggestionsDiv = this.shadowRoot.querySelector('#suggestions-elements');
    let selected = suggestionsDiv.querySelector('[selected]') || suggestionsDiv.firstElementChild;
    if (this.suggestions.length > 1) {
      selected.toggleAttribute('selected', false);
      selected = selected.nextElementSibling || selected.previousElementSibling;
    }
    if (selected) selected.focus();
  }

  _picked (e) {
    if (this.informational || !this.targetElement) return

    if (this.targetElement.multiInputApi) {
      this.targetElement.pickedElement(e.target.data);
    } else {
      this.targetElement.value = e.target.textValue;
      if (this.targetForId) {
        this.targetForId.value = e.target.idValue;
        this.picked = true;
        this.pickedData = e.target.data;
      }
    }
    this._dismissSuggestions();
    this.targetElement.focus();

    // Dispatch input event since input happened
    this._dispatchPickedEvent();
  }

  _dispatchPickedEvent () {
    if (!this.picked) return
    const inputEvent = new CustomEvent('input', { composed: true, bubbles: true, cancelable: false, detail: { synthetic: true, data: this.pickedData } });
    this.targetElement.dispatchEvent(inputEvent);
  }

  _jsonCopy (o) {
    return JSON.parse(JSON.stringify(o))
  }

  async updated (cp) {
    if (!cp.has('suggestions')) return

    const suggestionsDiv = this.shadowRoot.querySelector('#suggestions-elements');

    // while (suggestionsDiv.firstChild) { suggestionsDiv.removeChild(suggestionsDiv.firstChild) }
    suggestionsDiv.innerHTML = '';

    if (this._autocompleteInFlight) return

    if (this.targetElement.multiInputApi) {
      if (this.targetElement.textInputValue === '') {
        suggestionsDiv.toggleAttribute('populated', false);
        return
      }
    }

    for (const suggestion of this.suggestions) {
      const el = document.createElement(this.itemElement);
      el.config = { ...this._jsonCopy(el.config), ...this._jsonCopy(this.itemElementConfig) };
      for (const k of Object.keys(this.itemElementAttributes)) el.setAttribute(k, this.itemElementAttributes[k]);
      el.data = this._jsonCopy(suggestion);
      // el.onkeydown = this._handleKeyEvents.bind(this)
      // Make span focusable AND in the tab list
      el.setAttribute('tabindex', 0);
      suggestionsDiv.appendChild(el);
    }

    // Only 1 response and it's a plain text input? Autocomplete if text fully matches
    // beginning of the only result
    if (
      this.suggestions.length === 1 &&
      !this.targetElement.multiInputApi &&
      typeof this.targetElement.setSelectionRange === 'function'
    ) {
      const firstOption = suggestionsDiv.firstChild;
      const textValue = firstOption.textValue;
      if (textValue.toUpperCase().startsWith(this.targetElement.value.toUpperCase())) {
        const oldValue = this.targetElement.value;
        this.targetElement.value = textValue;
        this.targetElement.setSelectionRange(oldValue.length, textValue.length);
        if (this.targetForId) {
          this.targetForId.value = firstOption.idValue;
          this.picked = true;
          this.pickedData = firstOption.data;
          if (!this.displaySingleSuggestion) {
            this._dismissSuggestions();
            this._dispatchPickedEvent();
          }
        }
      }
    }

    if (!this.suggestions.length) {
      suggestionsDiv.toggleAttribute('populated', false);
    }

    if (this.suggestions.length) {
      suggestionsDiv.toggleAttribute('populated', true);
      suggestionsDiv.firstChild.toggleAttribute('selected', true);
      const bounding = this._isOutOfViewport(suggestionsDiv);
      if (bounding.any) {
        console.log(bounding);
        console.log(suggestionsDiv);
        suggestionsDiv.style.transform = `translateY(${this._calcTranslateY(bounding.top, bounding.bottom, suggestionsDiv)}px) translateX(${this._calcTranslateX(bounding.left, bounding.right)}px)`;
      }
      suggestionsDiv.style.visibility = 'unset';
    }
  }

  _calcTranslateY (top, bottom, el) {
    top = Number(top) * -1;
    bottom = Number(bottom) * -1;
    const inputOffset = el && bottom ? el.offsetHeight * -1 + this.targetElement.offsetHeight * -1 : 0;
    return top + inputOffset
  }

  _calcTranslateX (left, right) {
    left = Number(left) * -1;
    right = Number(right) * -1;
    return left + right
  }

  _isOutOfViewport (elem) {
    // Get element's bounding
    const bounding = elem.getBoundingClientRect();

    // Check if it's out of the viewport on each side
    const out = {};
    out.top = bounding.top < 0 ? bounding.top : false;
    out.left = bounding.left < 0 ? bounding.left : false;
    out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight) ? bounding.bottom - window.innerHeight : false;
    out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth) ? bounding.right - window.innerWidth : false;
    out.any = !!(out.top || out.left || out.bottom || out.right);
    out.all = !!(out.top && out.left && out.bottom && out.right);
    return out
  }

  _dismissSuggestions () {
    const suggestionsDiv = this.shadowRoot.querySelector('#suggestions');
    suggestionsDiv.toggleAttribute('populated', false);
    this.suggestions = [];
  }

  _handleKeyEvents (e) {
    const target = e.currentTarget.getRootNode().activeElement;

    if (!this.suggestions.length || !target.parentElement) return

    switch (e.key) {
    case 'ArrowUp':
      e.preventDefault();
      target.previousElementSibling
        ? target.previousElementSibling.focus()
        : target.parentElement.lastElementChild.focus();
      break
    case 'ArrowDown':
      e.preventDefault();
      target.nextElementSibling
        ? target.nextElementSibling.focus()
        : target.parentElement.firstElementChild.focus();
      break
    case 'Tab':
    case 'Enter':
      this._picked(e);
      e.preventDefault();
      this.targetElement.focus();
      break
    case 'Escape':
      this._dismissSuggestions();
      this.targetElement.focus();
      break
    }
  }

  async _inputEvent (e) {
    // This is a synthetic event triggered by autocomplete itself
    // once a selection was made: ignore
    if (e.detail && e.detail.synthetic) return

    // Nothing can nor should happen without a target
    const target = this.targetElement;
    if (!target) return

    // There is more input: a new query will be made,
    // so the list is now stale
    this._dismissSuggestions();

    // If the target element is not valid, don't take off at all
    // TAKEN OUT as autocomplete might be necessary to actually make
    // it valid
    // if (!target.validity.valid) {
    //  this.suggestions = []
    //  return
    // }

    // Check if it's inflight. If so, queue up an autocomplete
    // with the same 'e'
    if (this._autocompleteInFlight) {
      this._attemptedAutocompleteFlight = e;
      return
    }

    if (this.targetForId) {
      this.targetForId.value = '';
      this.picked = false;
      this.pickedData = null;
    }

    // No input: do not run a wide search
    if (!this.targetElement.value) return

    // IN FLIGHT!
    this._autocompleteInFlight = true;

    // Set the url, which will also depend on recordId
    const value = target.autocompleteValue || target.value;
    const url = this.url + value;

    const fetchOptions = {
      method: 'GET',
      redirect: 'follow' // manual, *follow, error
    };

    // Attempt the submission
    let networkError = false;
    let response;
    try {
      response = await fetch(url, fetchOptions);
    } catch (e) {
      console.log('ERROR!', e);
      networkError = true;
    }

    // CASE #1: network error.
    if (networkError) {
      console.log('Network error!');

      // Emit event to make it possible to tell the user via UI about the problem
      const event = new CustomEvent('autocomplete-error', { detail: { type: 'network' }, bubbles: true, composed: true });
      this.dispatchEvent(event);

    //
    // CASE #2: HTTP error.
    // Invalidate the problem fields
    } else if (!response.ok) {
      console.log('Fetch error!');

      const errs = await response.json();
      // Emit event to make it possible to tell the user via UI about the problem
      const event = new CustomEvent('autocomplete-error', { detail: { type: 'http', response, errs }, bubbles: true, composed: true });
      this.dispatchEvent(event);

    // CASE #3: NO error. Set fields to their
    // new values
    } else {
      // Convert the result to JSON
      const v = await response.json();

      this.suggestions = v;

      // Emit event to make it possible to tell the user via UI about the problem
      const event = new CustomEvent('form-ok', { detail: { response }, bubbles: true, composed: true });
      this.dispatchEvent(event);
    }

    this._autocompleteInFlight = false;
    if (this._attemptedAutocompleteFlight) {
      const oldE = this._attemptedAutocompleteFlight;
      this._attemptedAutocompleteFlight = false;
      this._inputEvent(oldE);
    }
  }
}
customElements.define('ee-autocomplete', EeAutocomplete);

// const close = html`<svg class="icon" height="24" viewBox="0 0 24 24" width="24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>`
const chevronLeft = html`<svg class="icon" height="24" viewBox="0 0 24 24" width="24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>`;

class EeDrawer extends ThemeableMixin('ee-drawer')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      css`
       :host {
          --ee-drawer-width: 300px;
          --ee-drawer-background-color: #393939;
          display: block;
          position: fixed;
          box-sizing: border-box;
          top: 0;
          left: 0;
          z-index: 1;
          width: 20px;
          height: 100vh;
          user-select: none;
        }

        :host([opened]) {
          width: 100vw;
          height: 100vh;
        }

        div.container {
          height: 100vh;
          position: absolute;
          top: 0;
          left: 0;
          will-change: transform;
          transform: translateX(-100%);
          overflow-x: hidden;
          transition: transform 0.3s ease-out;
          background-color: var(--ee-drawer-background-color, #393939);
        }

        :host([opened]) div.container {
          will-change: transform;
          transform: translateX(0);
        }

        :host([modal][opened]) div.container {
          box-shadow: var(--ee-drawer-shadow, 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.14), 0 0 0 100vw rgba(0, 0, 0, 0.15))
        }

        #close {
          -webkit-appearance: none;
          color: var(--ee-drawer-background-color, #393939);
          fill: var(--ee-drawer-background-color, #393939);
          position: absolute;
          top: 5px;
          right: 5px;
          z-index: 10;
          background-color: var(--ee-drawer-background-color, #393939);
          border: none;
          cursor: pointer;
          right: 0;
          height: 99%;
          box-sizing: border-box;
          padding: 0 2px;
        }

        #close svg {
          height: 20px;
          width: 20px;
        }

        #close:focus, #close:active {
          outline: none !important;
        }

        #close:active, #close:hover {
          filter: brightness(120%);
          fill: var(--ee-drawer-selected-color, white);
          color: var(--ee-drawer-selected-color, white);
        }

        .container > nav  {
          box-sizing: border-box;
          width: 100%;
          min-width: 300px;
          height: 100%;
          padding: 30px 24px;
          background: var(--ee-drawer-background-color);
          position: relative;
          overflow: auto;
          padding-bottom: 64px;
        }

        .container > nav ::slotted(a),
        .container > nav ::slotted(.drawer-item) {
          display: block;
          text-decoration: none;
          color: var(--ee-drawer-color, #ddd);
          line-height: 32px;
          padding: 0 24px;
          cursor: pointer;
          font-size: 0.9em;
        }

        .container  > nav ::slotted(a[selected]),
        .container  > nav ::slotted(.drawer-item[selected]) {
          color: var(--ee-drawer-selected-color);
          font-weight: bolder;
          border-left: 3px solid var(--ee-drawer-selected-color, white);
          background-color: rgba(255,255,255, 0.1);
        }

        .container  > nav ::slotted(a:hover),
        .container  > nav ::slotted(.drawer-item:hover) {
          background-color: rgba(255,255,255, 0.05);
        }

        .container  > nav ::slotted(.head) {
          color: var(--ee-drawer-color, white);
          box-sizing: border-box
          width: 100%;
          border-bottom: 1px solid var(--ee-drawer-selected-color, white);
          padding: 6px 70% 6px 0;
          font-size: 1.15em;
          margin: 10px auto;
        }
      `
    ]
  }

  static get properties () {
    return {
      opened: { type: Boolean, reflect: true },
      modal: { type: Boolean },
      closeButton: { type: Boolean, attribute: 'close-button' },
      closeThreshold: { type: Number },
      openThreshold: { type: Number }
    }
  }

  constructor () {
    super();
    this.modal = false;
    this.closeButton = true;
    this.opened = false;
    this.closeThreshold = 0.25;
    this.openThreshold = 0.8;
  }

  connectedCallback () {
    super.connectedCallback();
    this.addEventListener('click', this._handleOutsideClick);
    this.addEventListener('touchstart', this._handleDragStart);
    this.addEventListener('touchmove', this._handleDrag);
    this.addEventListener('touchend', this._handleDragEnd);
    // Will add these in the future to support dragging in desktop
    // this.addEventListener('mousedown', this._handleDragStart)
    // this.addEventListener('mousemove', this._handleDrag)
    // this.addEventListener('mouseup', this._handleDragEnd)
  }

  disconnectedCallback () {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleOutsideClick);
    this.removeEventListener('touchstart', this._handleDragStart);
    this.removeEventListener('touchmove', this._handleDrag);
    this.removeEventListener('touchend', this._handleDragEnd);
    // Will add these in the future to support dragging in desktop
    // this.removeEventListener('mousedown', this._handleDragStart)
    // this.removeEventListener('mousemove', this._handleDrag)
    // this.removeEventListener('mouseup', this._handleDragEnd)
  }

  firstUpdated () {
    this.container = this.shadowRoot.querySelector('div.container');
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      <div class="container">
        ${this.closeButton ? html`<button id="close" @click="${this.close}">${chevronLeft}</button>` : ''}
        <nav>
          <slot></slot>
        </nav>
      </div>
    `
  }

  open () {
    this.opened = true;
  }

  close () {
    this.opened = false;
  }

  toggle () {
    this.opened = !this.opened;
  }

  _handleOutsideClick (e) {
    if (e.target.nodeName === 'EE-DRAWER') this.close();
  }

  _handleDragStart (e) {
    e.preventDefault();
    this.dragStart = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    console.log(this.dragStart);
    if (!this.opened) this.style.width = '100vw';
    return false
  }

  _handleDrag (e) {
    if (e.type === 'touchmove') e.preventDefault();
    console.log(this.dragStart);
    const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const offset = x - this.dragStart;
    const w = this.container.getBoundingClientRect().width;
    if (offset < -w + this.openThreshold * w) {
      this.close();
      return
    }
    if (offset > w - this.closeThreshold * w) {
      this.open();
      this.container.style.transform = '';
      return
    }
    requestAnimationFrame(() => {
      this.container.style.transform = `translateX(calc(-100% + ${offset}px))`;
    });
    return false
  }

  _handleDragEnd (e) {
    this.dragStart = undefined;
    e.preventDefault();
    requestAnimationFrame(() => {
      this.container.style.transform = '';
    });
    this.style.width = '';
    return false
  }
}
customElements.define('ee-drawer', EeDrawer);

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement
const element = ['accessKey', 'accessKeyLabel', 'contentEditable', 'isContentEditable', 'contextMenu ', 'dataset', 'dir', 'draggable', 'dropzone', 'hidden', 'inert', 'innerText', 'itemScope ', 'itemType', 'itemId ', 'itemRef', 'itemProp', 'itemValue ', 'lang', 'noModule', 'nonce', 'offsetHeight', 'offsetLeft', 'offsetParent', 'offsetTop', 'offsetWidth', 'properties', 'spellcheck', 'tabIndex', 'title', 'translate', 'attachInternals', 'blur', 'click', 'focus', 'forceSpellCheck', 'style'];

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement
const formElement = ['length', 'name', 'method', 'target', 'action', 'encoding', 'enctype', 'acceptCharset', 'autocomplete', 'noValidate', 'requestAutocomplete', 'submit', 'checkValidity', 'reportValidity', 'reset', 'elements'];

// From https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
const inputElement = ['form', 'formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget', 'name', 'type', 'disabled', 'autofocus', 'required', 'value', 'checkValidity', 'validity', 'validationMessage', 'willValidate', 'checked', 'defaultChecked', 'indeterminate', 'alt', 'height', 'src', 'width', 'accept', 'allowdirs ', 'files', 'webkitdirectory ', 'webkitEntries ', 'autocomplete', 'max', 'maxLength', 'min', 'minLength', 'pattern', 'placeholder', 'readOnly', 'size', 'selectionStart', 'selectionEnd', 'selectionDirection', 'defaultValue', 'dirName', 'accessKey', 'list', 'multiple', 'files', 'labels', 'step', 'valueAsDate', 'valueAsNumber', 'autocapitalize ', 'inputmode', 'align ', 'useMap ', 'blur', 'click', 'focus', 'select', 'setSelectionRange', 'setRangeText', 'setCustomValidity', 'reportValidity', 'stepDown', 'stepUp'];

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement
const buttonElement = ['accessKey', 'autofocus', 'disabled', 'form', 'formAction', 'formEnctype', 'formMethod', 'formNoValidate', 'formTarget', 'labels', 'menu ', 'name', 'tabIndex', 'type', 'willValidate', 'validationMessage', 'validity', 'value', 'checkValidity', 'reportValidity', 'setCustomValidity'];

// FROM https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement
const selectElement = ['autofocus', 'disabled', 'labels', 'length', 'multiple', 'name', 'options', 'required', 'selectedIndex', 'selectedOptions', 'size', 'type', 'validationMessage', 'validity', 'value', 'willValidate', 'add', 'blur', 'focus', 'item', 'namedItem', 'remove', 'checkValidity', 'reportValidity', 'setCustomValidity', 'form'];

// From https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement
const textAreaElement = ['type', 'value', 'textLength', 'defaultValue', 'placeholder', 'rows', 'cols', 'autofocus', 'name', 'disabled', 'labels', 'maxLength', 'accessKey', 'readOnly', 'required', 'tabIndex', 'selectionStart', 'selectionEnd', 'selectionDirection', 'validity', 'willValidate', 'validationMessage', 'autocomplete ', 'autocapitalize ', 'inputMode ', 'wrap', 'blur', 'focus', 'select', 'setRangeText', 'setSelectionRange', 'checkValidity', 'reportValidity', 'setCustomValidity', 'form'];

// From https://developer.mozilla.org/en-US/docs/Web/API/HTMLMeterElement
const meterElement = ['high', 'low', 'max', 'min', 'optimum', 'value', 'labels'];

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLProgressElement
const progressElement = ['max', 'position', 'value', 'labels'];

// NativeReflectorMixin

const NativeReflectorMixin = (base) => {
  return class Base extends base { // eslint-disable-line

// The firstUpdated method is used to perform one-time work after the element's
// template has been created. In this case, it will need to:
//
// 1) Find the native element (marked with `id="native"`)
// 3) Start reflection of attributes and properties
//
    firstUpdated () {
      /* Find the native element */
      this.native = this.shadowRoot.querySelector('#native');

      /* Reflect all attributes and properties */
      /*  - all properties are reflected except some (listed in skipAttributes) */
      /*  - only elected properties are reflected (listed in reflectProperties) */
      this._reflectAttributesAndProperties();
    }

    get reflectProperties () {
      return element
    }

    get skipProperties () {
      return ['style']
    }

    get skipAttributes () {
      return ['id', 'style', 'class']
    }

    afterSettingProperty () {}

    getAttribute (attr) {
      if (!this.native || this.skipAttributes.indexOf(attr) !== -1) {
        return super.getAttribute(attr)
      }

      return this.native.getAttribute(attr)

      /*
      const nativeAttribute = this.native.getAttribute(attr)
      if (nativeAttribute !== null) return nativeAttribute

      // This shouldn't really happen, but it's here as a fallback
      // TODO: Maybe delete it and always return the native's value regardless
      return super.getAttribute(attr)
      */
    }

    setAttribute (attr, value) {
      // Set the attribute
      super.setAttribute(attr, value);

      // Skip the ones in the skipAttributes list
      if (this.skipAttributes.indexOf(attr) !== -1) return

      // Assign the same attribute to the contained native
      // element, taking care of the 'nn' syntax
      //
      this._setSubAttr(attr, value);
    }

    removeAttribute (attr) {
      // Set the attribute
      super.removeAttribute(attr);

      // Skip the ones in the skipAttributes list
      if (this.skipAttributes.indexOf(attr) !== -1) return

      // Assign the same attribute to the contained native
      // element, taking care of the 'nn' syntax
      //
      this._setSubAttr(attr, null);
    }

    _setSubAttr (subAttr, attrValue) {
      const tokens = subAttr.split('::');

      // Safeguard: if this.native is not yet set, it means that
      // an attribute was set BEFORE the element was rendered. If that
      // is the case, simply give up. _reflectAttributesAndProperties() will
      // be run afterwards to sync things up anyway
      if (!this.native) return

      // No :: found, simply change attribute in `native`
      if (tokens.length === 1) {
        (attrValue === null)
          ? this.native.removeAttribute(subAttr)
          : this.native.setAttribute(subAttr, attrValue);

      // Yes, :: is there: assign the attribute to the element with the
      // corresponding ID
      } else if (tokens.length === 2) {
        const dstElement = this.shadowRoot.querySelector(`#${tokens[0]}`);
        if (dstElement) {
          attrValue === null
            ? dstElement.removeAttribute(tokens[1])
            : dstElement.setAttribute(tokens[1], attrValue);
        }
      }
    }

    _reflectAttributesAndProperties () {
      // STEP #1: ATTRIBUTES FIRST

      // Assign all starting attribute to the destination element
      for (const attributeObject of this.attributes) {
        const attr = attributeObject.name;

        if (this.skipAttributes.indexOf(attr) !== -1) continue
        this._setSubAttr(attr, super.getAttribute(attr));
      }

      // Observe changes in attribute from the source element, and reflect
      // them to the destination element
      const thisObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes') {
            const attr = mutation.attributeName;

            // Don't reflect forbidden attributes
            if (this.skipAttributes.indexOf(attr) !== -1) return

            // Don't reflect attributes with ::
            if (attr.indexOf('::') !== -1) return

            // Check if the value has changed. If it hasn't, there is no
            // point in re-assigning it, especially since the observer
            // might have been triggered by this very mixin
            const newValue = this.native.getAttribute(attr);
            const thisValue = super.getAttribute(attr);
            if (newValue === thisValue) return

            // Assign the new value
            (newValue === null)
              ? super.removeAttribute(attr)
              : super.setAttribute(attr, newValue);
          }
        });
      });
      thisObserver.observe(this.native, { attributes: true });

      // STEP #2: METHODS (as bound functions) AND PROPERTIES (as getters/setters)

      const uniqProps = [...new Set(this.reflectProperties)];
      const proto = Object.getPrototypeOf(this);

      if (!proto._alreadyReflecting) {
        uniqProps.forEach(prop => {
          if (this.skipProperties.indexOf(prop) !== -1) return
          Object.defineProperty(Object.getPrototypeOf(this), prop, {
            get: function () {
              const dst = this.native;
              if (!this.native) return undefined
              if (typeof dst[prop] === 'function') return dst[prop].bind(dst)
              else return dst[prop]
            },
            set: function (newValue) {
              const dst = this.native;

              // It IS possile that this.native isn't set yet, since the
              // property observer is on the prototype. So, you could have
              // one nn-input-box without a value assigned (and the observer is
              // installed for prototype) and then another one with a property
              // assigned at creation (observer is set, but this.native is not yet set)
              // If that is the case, it will assign the object's prop. Then,
              // when firstUpdated() runs, it will forward-assign this value to
              // this.native
              if (!dst) {
                if (typeof newValue !== 'undefined') {
                  Object.defineProperty(this, prop, { value: newValue, configurable: true, writable: true });
                }
                return
              }

              if (typeof this.beforeSettingProperty === 'function') {
                this.beforeSettingProperty(prop, newValue);
              }
              if (typeof dst[prop] === 'function') return
              const oldValue = dst[prop];

              // Set the new value
              dst[prop] = newValue;

              // This is required by litElement since it won't
              // create a setter if there is already one
              this.requestUpdate(prop, oldValue);

              if (typeof this.afterSettingProperty === 'function') {
                this.afterSettingProperty(prop, newValue);
              }
            },
            configurable: true,
            enumerable: true
          });
        });
        proto._alreadyReflecting = true;
      }

      // Assign existing properties, in case the setter had already been triggered
      // BEFORE firstUpdated() (in which case, the setter would have assigned
      // OBJECT properties, without reflection)
      uniqProps.forEach(prop => {
        if (this.skipProperties.indexOf(prop) !== -1) return

        let propValue;
        if (Object.prototype.hasOwnProperty.call(this, prop)) {
          propValue = this[prop];
          delete this[prop];
          this[prop] = propValue;
        }
      });
    }
  }
};

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const previousValues = new WeakMap();
/**
 * For AttributeParts, sets the attribute if the value is defined and removes
 * the attribute if the value is undefined.
 *
 * For other part types, this directive is a no-op.
 */
const ifDefined = directive((value) => (part) => {
    const previousValue = previousValues.get(part);
    if (value === undefined && part instanceof AttributePart) {
        // If the value is undefined, remove the attribute, but only if the value
        // was previously defined.
        if (previousValue !== undefined || !previousValues.has(part)) {
            const name = part.committer.name;
            part.committer.element.removeAttribute(name);
        }
    }
    else if (value !== previousValue) {
        part.setValue(value);
    }
    previousValues.set(part, value);
});

const plusIcon = html`<svg class="icon" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>`;

class EeFab extends ThemeableMixin('ee-fab')(StyleableMixin(NativeReflectorMixin(LitElement))) {
  static get styles () {
    return [
      super.styles,
      css`
        :host {
          position: fixed;
          right: 16px;
          left: initial;
          bottom: 16px;
          top: initial;
        }
      `
    ]
  }

  static get properties () {
    return {
      icon: { type: Object },
      label: { type: String }
    }
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      <button data-descr=${ifDefined(this.label)} id="native">
        ${this.icon ? this.icon : plusIcon}
      </button>
    `
  }
}
customElements.define('ee-fab', EeFab);

class EeFadeIn extends ThemeableMixin('ee-fade-in')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      super.styles,
      css`
        @-webkit-keyframes fadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
        @-moz-keyframes fadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
        @-o-keyframes fadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes fadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }

        :host(:not([no-animation])) {
          min-height: 100vh;
          overflow-x: hidden;
          -webkit-animation: fadeIn 0.3s ease-in; /* Safari 4+ */
          -moz-animation:    fadeIn 0.3s ease-in; /* Fx 5+ */
          -o-animation:      fadeIn 0.3s ease-in; /* Opera 12+ */
          animation:         fadeIn 0.3s ease-in; /* IE 10+, Fx 29+ */
        }

      `
    ]
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      <slot></slot>
    `
  }
}
customElements.define('ee-fade-in', EeFadeIn);

class EeToolbar extends ThemeableMixin('ee-toolbar')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      super.styles,
      css`
        :host {
          display: flex;
          box-sizing: border-box;
          width: 100%;
          align-items: center;
          position: relative;
          height: var(--ee-toolbar-height, 100%);
          max-height: var(--ee-toolbar-max-height, 96px);
          padding: 0 5px;
          pointer-events: none;
          font-size: var(--ee-toolbar-font-size, 20px);
        }

        :host ::slotted(*) {
          pointer-events: auto;
        }

        :host ::slotted(.icon) {
          font-size: 0;
        }

        :host ::slotted([title]) {
          display: flex;
          margin: auto 20px;
        }

        :host ::slotted([bottom-item]) {
          position: absolute;
          top: unset;
          bottom: 0;
          right: 0;
          left: 0;
        }

        :host ::slotted([top-item]) {
          position: absolute;
          top: 0;
          bottom: unset;
          right: 0;
          left: 0;
        }

        :host ::slotted([spacer]) {
          margin-left: 64px;
        }
      `
    ]
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      <slot></slot>
    `
  }
}
customElements.define('ee-toolbar', EeToolbar);

const arrowback = html`<svg class="icon" height="24" viewBox="0 0 24 24" width="24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>`;
const menu = html`<svg class="icon" height="24" viewBox="0 0 24 24" width="24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>`;

class EeHeader extends ThemeableMixin('ee-header')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      super.styles,
      css`
        :host {
          display: block;
          width: 100%;
        }

        div#header {
          display: flex;
          width: 100%;
          position: sticky;
          top: 0;
          right: 0;
          width: 100%;
          max-width: 100%;
          text-align: center;
        }

        :host([menu]) div[title],
        :host([back]) div[title] {
          padding-right: 46px;
        }

        :host([menu][back]) div[title]{
          padding-right: 92px;
        }

        div[title], div[middle] {
          display: block;
        }

        div[title] h3,
        div[title] h5 {
          margin-block-start: 0.2em;
          margin-block-end: 0.2em;
        }

        div[title] h5 {
          text-align: start;
          display: flex;
        }

        div[middle] h1, div[middle] h2,
        div[middle] h3, div[middle] h4,
        div[middle] h5, div[middle] h6 {
          margin-block-start: 0.1em;
          margin-block-end: 0.1em;
        }

        .toolbar .subtitle {
          color: var(--ee-header-secondary-color, grey);
        }
        .toolbar button.icon {
          appearance: none;
          -webkit-appearance: none;
          font-size: inherit;
          vertical-align: middle;
          background: transparent;
          border: none;
          cursor: pointer;
          -webkit-appearance: none;
          height: 40px;
          width: 40px;
          padding: 4px;
          margin: auto 3px;
          border: 1px solid transparent;
          color: var(--ee-header-color, black);
        }

        .toolbar button.icon:focus, .toolbar button.icon:hover {
          outline: 0;
          border: 1px solid var(--ee-header-lines-color, #bdbdbd);
        }

        .toolbar button.icon:active {
          outline: 0;
          border: 1px solid #bdbdbd;
          box-shadow: none
          /* animation: fadeIn 0.1s ease-in; */
        }

        .toolbar button, .toolbar button svg {
          color: var(--ee-header-color);
          fill: var(--ee-header-color);
        }

        .toolbar div.actions {
          position: absolute;
          right: 20px;
          display: flex;
        }

        ::slotted([slot=actions]) {
          display: flex
        }

        .toolbar div.actions ::slotted(*[slot="actions"]) a {
          line-height: unset
        }

        .toolbar div.controls {
          align-items: left;
        }

        .toolbar div.controls ::slotted(*[slot="actions"]) {
          z-index: var(--ee-header-actions-z-index, 2)
        }

      `
    ]
  }

  static get properties () {
    return {
      // Users can set these attributes to get built-in basic controls and title text.
      // Otherwise, they can user their own with slot="controls" and slot="header-title"
      back: { type: Boolean, reflect: true },
      menu: { type: Boolean, reflect: true },
      backEvent: { type: Function, attribute: 'back-event' },
      menuEvent: { type: Function, attribute: 'menu-event' },
      headerTitle: { type: String, attribute: 'header-title' },
      headerSubtitle: { type: String, attribute: 'header-subtitle' }
    }
  }

  constructor () {
    super();
    this.headerTitle = '';
  }

  menuEvent () {}

  backEvent () {}

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      <div id="header">
        <ee-toolbar class="toolbar">
          <div class="controls">
            ${this.menu ? html`<button class="icon" title="Menu" @click="${this._menuEvent}">${menu}</button>` : ''}
            ${this.back ? html`<button class="icon" title="Back" @click="${this._backEvent}">${arrowback}</button>` : ''}
            <slot name="controls"></slot>
          </div>
          <div title>
          ${this.headerTitle
            ? html`
                <h3>${this.headerTitle}</h3>
                <h5>${this.headerSubtitle ? html`<div class="subtitle">${this.headerSubtitle}</div>` : ''} <slot name="header-subtitle"></slot></h5>
            `
            : html`
              <slot name="header-title"></slot>
            `
          }
          </div>
          <div middle>
            <slot name="middle"></slot>
          </div>
          <div class="actions">
            <slot name="actions"></slot>
          </div>
        </ee-toolbar>
        <slot name="sub-toolbar"></slot>
      </div>
    `
  }

  _menuEvent () {
    this.dispatchEvent(new CustomEvent('menu-clicked', { bubbles: true, composed: true }));
    this.menuEvent();
  }

  _backEvent () {
    this.dispatchEvent(new CustomEvent('back-clicked', { bubbles: true, composed: true }));
    this.backEvent();
  }
}
customElements.define('ee-header', EeHeader);

class EeNavBar extends ThemeableMixin('ee-nav-bar')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      super.styles,
      css`
        :host {
          display: block;
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 56px;
          z-index: 100;
        }

        :host nav {
          display: flex;
          width: 100%;
          height: 56px;
          background: var(--ee-navbar-background, white);
          color: var(--ee-navbar-color, black);
          fill: var(--ee-navbar-color, black);
        }

        :host nav > ::slotted(*[nav-item]) {
          margin: 0 auto;
          padding: 8px 12px;
          display: block;
          position: relative;
          opacity: 0.7;
          height: 24px;
          min-width: 80px;
          max-width: 168px;
          text-align: center;
        }

        :host nav > ::slotted(*[nav-item])::after {
          content: attr(item-label);
          position: absolute;
          top: 24px;
          left: 50%;
          line-height: 12px;
          font-size: 12px;
          transform: translateX(-50%);
          margin-top: 6px;
          padding: 6px;
          white-space: nowrap;
          text-transform: uppercase;
        }

        :host nav > ::slotted(*[selected]) {
          opacity: 1;
        }
      `
    ]
  }

  static get properties () {
    return {
      selected: { type: String, reflect: true },
      selectedAttribute: { type: String },
      eventBubbles: { type: Boolean }
    }
  }

  constructor () {
    super();
    this.selected = '';
    this.eventBubbles = false;
    this.selectedAttribute = 'name';
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      <nav>
        <slot @slotchange="${this._manageSlotted}"></slot>
      </nav>
    `
  }

  connectedCallback () {
    super.connectedCallback();
    // Listen to local clicked-slot event
    this.addEventListener('clicked-slot', this._fireSelectedEvent);
  }

  // This adds a click event listener to all slotted children (the tabs)
  _manageSlotted (e) {
    const slot = e.currentTarget;
    const slotted = slot.assignedNodes();
    for (const element of slotted) {
      element.addEventListener('click', this._clickedSlotted.bind(this));
    }
  }

  // Each tab runs this and fires a clicked-slot event, which carries the selected value, It gets the value from the name attribute of the slotted "tab"
  _clickedSlotted (e) {
    console.log('slot clicked', this.selectedAttribute);
    this.dispatchEvent(new CustomEvent('clicked-slot', { detail: { event: e, selected: e.currentTarget.getAttribute(this.selectedAttribute) } }));
  }

  // This function runs when the host element receives a clicked-slot event from it's children. It sets the selected property and fires a 'selected-changed' event with that value.
  _fireSelectedEvent (e) {
    this.dispatchEvent(new CustomEvent('selected-changed', { detail: { selected: e.detail.selected } }));
    this.selected = e.detail.selected;
  }
}
customElements.define('ee-nav-bar', EeNavBar);

class EeNetwork extends ThemeableMixin('ee-network')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      super.styles,
      css`
        :host {
          display: block;
          position: relative;
        }

        :host([inline]) {
          display: inline-block;
        }

        :host([status="loading"]) ::slotted(*),
        :host([status="saving"]) ::slotted(*),
        :host([status="loading-error"]) ::slotted(*),
        :host([status="saving-error"]) ::slotted(*) {
          z-index: 0;
        }

        #overlay {
          display: none; /* Hide by default */
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          text-align: center;
          transition: background var(--ee-network-transition-duration, 200ms);
        }

        #overlay.overlay-loading {
          display: block;
          color: var(--ee-network-overlay-loading-color, #666);
          background-color: var(--ee-network-overlay-loading-background-color, rgba(190, 190, 190, 0.75));
          z-index: 10;
        }

        #overlay.clear {
        }

        #overlay.overlay-error {
          display: block;
          cursor: pointer; /* Hint that the object is clickable */
          color: var(--ee-network-overlay-error-color, #c00);
          background-color: var(--ee-network-overlay-error-background-color, rgba(255, 0, 0, 0.25));
          z-index: 10;
        }

        #overlay #statusMessage {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
        }

        #content-wrapper.overlay-error,
        :host([status="overlay-error"]) {
          pointer-events: none;
          opacity: 0.25;
          min-height: 1.25rem; /* FIXME: find a proper value, this is made up */
        }
      `
    ]
  }

  static get properties () {
    return {
      manageLoadingErrors: {
        type: Boolean,
        attribute: 'manage-loading-errors'
      },
      manageSavingErrors: {
        type: Boolean,
        attribute: 'manage-saving-errors'
      },
      retryMethod: {
        type: Function,
        attribute: false
      },
      noReloadOnTap: {
        type: Boolean,
        attribute: 'no-reload-on-tap'
      },
      status: {
        type: String,
        reflect: true
      },
      statusMessages: {
        type: Object,
        attribute: 'status-messages'
      },
      messenger: {
        type: Function,
        attribute: false
      },
      overlayClass: {
        type: String,
        attribute: false
      },
      response: { type: Function, attribute: false },
      prefetch: { type: Function, attribute: false }
    }
  }

  constructor () {
    super();
    this.manageLoadingErrors = false;
    this.manageSavingErrors = false;
    this.retryMethod = null;
    this.noReloadOnTap = false;
    this.status = 'loaded';
    this.statusMessages = {
      loading: 'Loading\u2026', // &hellip; equivalent
      saving: 'Saving\u2026', // &hellip; equivalent
      error: 'An error has occurred. Click here to try again.'
    };

    this.lastInitObject = null;
    this.lastUrl = null;
    this.response = this.prefetch = () => {};
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      <slot></slot>
      <div id="overlay" class="${this.overlayClass}" @click="${this._overlayClicked}">
        <div id="statusMessage">${this.statusMessages[this.status]}</div>
      </div>
    `
  }

  firstUpdated () {
    this._setOverlay();
  }

  _setOverlay () {
    switch (this.status) {
    case 'loaded':
    case 'saved':
      this.overlayClass = 'clear';
      break
    case 'loading':
    case 'saving':
      this.overlayClass = 'overlay-loading';
      break
    case 'loading-error':
      this.overlayClass = this.manageLoadingErrors ? 'overlay-error' : 'clear';
      break
    case 'saving-error':
      this.overlayClass = this.manageSavingErrors ? 'overlay-error' : 'clear';
      break
    }
  }

  /*
    TODO DOCUMENTATION:
    // EVENT LISTENING WAY. With @retry-successful="${this._refetched.bind(this)}" in ee-network
    async _retrySuccessful (e) {
      this[this.localDataProperty] = await e.detail.fetched.json()
    }

    // REFETCH WAY. WITH .retryMethod="${this._retry.bind(this)}" in ee-network
    async _retry (status, url, initObject) {
      const job = await this.fetch(url, initObject)
      this.job = await job.json()
    }
 */

  async _overlayClicked (e) {
    if (this.noReloadOnTap) return

    // Stop the event here
    e.stopPropagation();
    e.preventDefault();

    // If the status is 'error', try to reload
    if (this.status === 'loading-error' || this.status === 'saving-error') {
      if (!this.retryMethod) {
        const fetched = await this.fetch(this.lastUrl, this.lastInitObject);
        if (fetched.ok) {
          this.dispatchEvent(new CustomEvent('retry-successful', {
            detail: {
              url: this.lastUrl,
              initObject: this.lastInitObject,
              fetched
            },
            composed: true,
            bubbles: false
          }));
        }
      }
      else this.retryMethod(this.status, this.lastUrl, this.lastInitObject);
    }
  }

  response () {}

  messenger () {}

  async fetch (url, initObject = {}) {
    this.lastUrl = url;
    this.lastInitObject = initObject;

    // Work out manageErrors, which will only ever
    // applu to GET
    const fetchMethod = (initObject && initObject.method && initObject.method.toUpperCase()) || 'GET';
    const isGet = fetchMethod === 'GET';
    initObject.url = url;

    this.status = isGet ? 'loading' : 'saving';
    this._setOverlay();
    this.messenger({
      status: this.status,
      url,
      initObject,
      networkElement: this
    });
    this.prefetch(initObject);

    try {
      const response = await fetch(initObject.url, initObject);

      // console.log('Cloning the response and waiting for the text...')
      // Wait for the _actual_ data to get here
      const r2 = response.clone();
      const v = await r2.json();

      if (response.ok) {
        this.status = isGet ? 'loaded' : 'saved';
      } else {
        this.status = isGet ? 'loading-error' : 'saving-error';
      }
      this._setOverlay();
      this.messenger({
        status: this.status,
        url,
        initObject,
        response,
        networkElement: this
      });
      // Response hook
      this.response(response, v, initObject);

      return response
    } catch (e) {
      this.status = isGet ? 'loading-error' : 'saving-error';
      this._setOverlay();
      this.messenger({
        status: this.status,
        url,
        initObject,
        networkElement: this
      });
      this.response(null, null, initObject);
      throw (e)
    }
  }
}
customElements.define('ee-network', EeNetwork);

class EeSnackBar extends ThemeableMixin('ee-snack-bar')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      super.styles,
      css`
        :host {
          display: block;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 12px;
          background-color: var(--ee-snackbar-background-color);
          color: var(--ee-snackbar-color);
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          text-align: center;
          will-change: transform;
          transform: translate3d(0, 100%, 0);
          transition-property: visibility, transform;
          transition-duration: 0.2s;
          visibility: hidden;
        }

        :host([active]) {
          visibility: visible;
          transform: translate3d(0, 0, 0);
        }

        :host([theme="success"]) {
          background-color: green;
          color: white;
        }

        :host([theme="info"]) {
          background-color: gray;
          color: white;
        }

        :host([theme="error"]) {
          background-color: red;
          color: white;
        }
        @media (min-width: 460px) {
          :host {
            width: 320px;
            margin: auto;
          }
        }
      `
    ]
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.message}
    `
  }

  static get properties () {
    return {
      active: { type: Boolean, reflect: true },
      message: { type: String }
    }
  }

  _eventListener (e) {
    const theme = e.detail.theme || 'info';
    this.setAttribute('theme', theme);
    this.message = e.detail.message;
    this.show();
  }

  connectedCallback () {
    super.connectedCallback();
    document.addEventListener('snack-bar', this.boundEventListener);
  }

  disconnectedCallback () {
    super.disconnectedCallBack();
    document.removeEventListener('snack-bar', this.boundEventListener);
  }

  constructor () {
    super();
    this.active = false;
    this.boundEventListener = this._eventListener.bind(this);
    this.intervalId = null;
  }

  show () {
    this.active = true;
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => { this.active = false; }, 3000);
  }
}

window.customElements.define('ee-snack-bar', EeSnackBar);

class EeTabs extends ThemeableMixin('ee-tabs')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      super.styles,
      css`
        :host {
          position: relative;
          border-bottom: 1px solid var(var(--ee-tabs-lines-color, #bbb));
        }

        :host nav {
          position: var(--ee-tabs-nav-position, sticky);
          top:0;
          width: 100%;
          border-bottom: 1px solid var(--ee-tabs-lines-color, #bbb);
          display: flex;
          height: var(--ee-tabs-height, 32px);
          z-index: var(--ee-tabs-z-index);
          overflow: var(--ee-tabs-nav-overflow);
        }

        :host #contentContainer {
          height: 100%;
        }

        /* TODO: Why don't these selectors work? */
        :host #contentContainer ::slotted(*) {
          display: none;
        }

        :host #contentContainer ::slotted(*[active]) {
          display: initial;
        }

        :host nav ::slotted(*) .icon {
          fill: var(--ee-tabs-color);
        }

        :host nav > ::slotted(*[active]) .icon {
          fill: var(--ee-tabs-active-color, black);
        }

        :host nav > ::slotted(*) {
          color: var(--ee-tabs-color, black);
          text-decoration: none;
          line-height: var(--ee-tabs-height, 20px);
          padding: 4px 12px;
          border: unset;
          border-left: 0.5px solid var(--ee-tabs-lines-color, #bbb);
          border-right: 0.5px solid var(--ee-tabs-lines-color, #bbb);
          border-bottom: 4px solid var(--ee-tabs-background-color, #bbb);
          font-size: 0.9em;
          border-radius: 0;
          width: 100%;
          text-align: center;
          background-color:  var(--ee-tabs-background-color, whitesmoke);
          cursor: default;
        }

        :host([min-width-tabs]) nav > ::slotted(*) {
          max-width: max-content;
        }

        :host nav > ::slotted(*:last-child) {
          border-right-color: var(--ee-tabs-background-color, #bbb)
        }

        :host nav > ::slotted(*:first-child) {
          border-left-color: var(--ee-tabs-background-color, #bbb)
        }

        :host nav > ::slotted(*[active]) {
          color: var(--ee-tabs-active-color);
          border-bottom: 4px solid var(--ee-tabs-active-color, black);
          background-color: var(--ee-tabs-active-background-color, white);
          font-size: bold;
        }

        :host nav > ::slotted(*:focus),
        :host nav > ::slotted(*:hover) {
          /* outline:0 ; */
          border-left: 0.5px solid var(--ee-tabs-lines-color, #bbb);
          border-right: 0.5px solid var(--ee-tabs-lines-color, #bbb);
          border-bottom: 4px solid var(--ee-tabs-active-color, black);
          filter: brightness(115%)
        }

        :host nav > ::slotted(*:active) {
          background: #cccccc;
          border-bottom: 4px solid #bdbdbd;
          box-shadow: none;
        }

        :host nav > ::slotted(*[disabled]) {
          box-shadow: none
        }

        :host nav > ::slotted(*.icon:active) {
          background: #cccccc;
          border: unset;
          border-radius: 50%;
        }

        :host nav > ::slotted(*.icon:hover) svg, :host > ::slotted(*:hover) svg {
          fill: var(--ee-tabs-color, black);
        }
      `
    ]
  }

  static get properties () {
    return {
      useHash: { type: Boolean, attribute: 'use-hash' },
      passive: { type: Boolean },
      default: { type: String },
      nameAttribute: { type: String, attribute: 'name-attribute' },
      minWidthTabs: { type: Boolean, reflect: true, attribute: 'min-width-tabs' }
    }
  }

  constructor () {
    super();
    this.nameAttribute = 'name';
    this.useHash = false;
    this.passive = false;
  }

  /** Tabs usage
   * add elements within the ee-tabs tags to create tabs.
   * Tab elements must have an name attribute, or you can set a custom value to 'active-attribute'. Index support will be added soon
   */
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
    <nav>
      <slot id="tabs" @slotchange="${this._manageSlottedTabs}"></slot>
    </nav>
    <div id="contentContainer">
      <slot name="content"></slot>
    </div>
    `
  }

  _allTabs () {
    return this.shadowRoot.querySelector('slot#tabs').assignedElements()
  }

  _workoutHash () {
    let tab;
    if (this.useHash) {
      if (window.location.hash) tab = window.location.hash.substr(1);
      else if (this.default) tab = this.default;
      else tab = this._allTabs()[0];
    }
    return tab
  }

  firstUpdated () {
    super.firstUpdated();

    const tab = this._workoutHash();
    this.select(tab, false);

    window.addEventListener('popstate', e => {
      const tab = this._workoutHash();
      if (this.useHash) {
        this.select(tab, true);
      }
    });
  }

  _isActive (el) {
    return el.hasAttribute('active')
  }

  select (tab, clearAll = true) {
    let pages;

    // Find the tab. If it can't be found, end of story
    if (typeof tab === 'string') {
      tab = this._allTabs().find(i => i.getAttribute(this.nameAttribute) === tab);
    }
    if (!tab) return

    // If clearAll was passed, clear selection of tabs and (if !passive) pages
    if (clearAll) {
      pages = this.shadowRoot.querySelector('slot[name="content"]').assignedElements();

      if (!this.passive) {
        this._clearAll(this._allTabs(), pages);
      } else {
        this._clearAll(this._allTabs());
      }
    }

    // Activate the tab
    tab.toggleAttribute('active', true);
    tab.active = true;

    // If !passive, activate the corresponding page
    if (!this.passive) {
      const name = tab.getAttribute(this.nameAttribute);
      const activePage = pages.find(el => el.getAttribute(this.nameAttribute) === name);
      if (activePage) {
        activePage.toggleAttribute('active', true);
        activePage.active = true;
      }
    }
  }

  // Clear the seletecAttribute from the current active tab and page
  _clearAll (tabs, pages) {
    //
    const currentTab = tabs.find(this._isActive.bind(this));
    if (currentTab) {
      currentTab.toggleAttribute('active', false);
      currentTab.active = false;
    }

    if (!this.passive) {
      const currentPage = pages.find(this._isActive.bind(this));
      if (currentPage) {
        currentPage.toggleAttribute('active', false);
        currentPage.active = false;
      }
    }
  }

  // This adds a click event listener to all slotted children (the tabs)
  _manageSlottedTabs (e) {
    for (const element of this._allTabs()) {
      element.addEventListener('click', (e) => { this.select.bind(this)(e.currentTarget); });
      element.setAttribute('tabindex', 1);
    }

    if (!this.passive && this.default) {
      this.select(this.default, true);
    }
  }
}
customElements.define('ee-tabs', EeTabs);

// DraggableListMixin

// These are declared outside the mixin to make sure diffrent instances access the same data
window.moving = null;
window.originContainer = null;
window.targetContainer = null;
const targetRows = [];
window.lastEntered = null;

const debounce = (callback, wait, immediate = false) => {
  let timeout = null;
  return function () {
    const callNow = immediate && !timeout;
    const next = () => callback.apply(this, arguments);
    clearTimeout(timeout);
    timeout = setTimeout(next, wait);
    if (callNow) {
      next();
    }
  }
};

const debouncedPortionOfDragenterListener = debounce(async function (e) {
  console.log('Debounced dragenter');
  requestAnimationFrame(() => {
    // The targetRows array might have previous targets in it. Remove the target class from them
    targetRows.forEach(element => {
      element.classList.remove('target');
    });
    targetRows.splice(0, targetRows.length);
    // Add target class and push the current target to the targetRows array
    window.lastEntered.classList.add('target');
    targetRows.push(this);
  });
  await window.targetContainer.dragenterHook(e, window.moving, this);
}, 100, true);

const DraggableListMixin = (base) => {
  return class Base extends base {
    // Necessary styles to be added to the litElement based target element:
    static get styles () {
      return [
        super.styles,
        css`
          @-webkit-keyframes fadeIn {
            0%   { opacity: 0; }
            100% { opacity: 1; }
          }
          @-moz-keyframes fadeIn {
            0%   { opacity: 0; }
            100% { opacity: 1; }
          }
          @-o-keyframes fadeIn {
            0%   { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes fadeIn {
            0%   { opacity: 0; }
            100% { opacity: 1; }
          }

          @-webkit-keyframes flash {
            0%   {opacity: 0}
            70% {opacity: 0.5;}
            100% {opacity: 0;}
          }

          @-moz-keyframes flash {
            0%   {opacity: 0}
            70% {opacity: 0.5;}
            100% {opacity: 0;}
          }

          @-o-keyframes flash {
            0%   {opacity: 0}
            70% {opacity: 0.5;}
            100% {opacity: 0;}
          }

          @keyframes flash {
            0%   {opacity: 0}
            70% {opacity: 0.5;}
            100% {opacity: 0;}
          }

          ::slotted(.success-overlay), ::slotted(.error-overlay) {
            position: relative;
          }

          ::slotted(.success-overlay)::after, ::slotted(.error-overlay)::after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: green;
            opacity: 0;
            animation: flash 0.3s ease;
          }

          ::slotted(.error-overlay)::after {
            background-color: red;
          }

          ::slotted(.target), ::slotted(.moving) {
            /* visibility: hidden; */
            /* height: 0; */
            box-sizing: border-box;
            outline: 6px solid orange;
            background-color: papayawhip;
            opacity: 0.2;
          }

          ::slotted(.target) {
            position: relative;
            box-sizing: border-box;
            background-color: white;
            /* margin-top: 40px; */
          }
/*
          ::slotted(.target)::before {
            content: attr(drop-label);
            font-weight: bold;
            color: white;
            text-align: center;
            vertical-align: middle;
            position: absolute;
            top: -100%;
            bottom: 100%;
            left: 0;
            width: 100%;
            background-color: purple;
            /* animation: fadeIn 0.3s ease-in;*/
          } */
        `
      ]
    }

    static get properties () {
      return {
        dragDrop: { type: Boolean, attribute: 'drag-drop' }
      }
    }

    constructor () {
      super();
      this.addEventListener('enable-dnd', this._enableDndForElement);
    }

    _enableDndForElement (e) {
      const el = e.srcElement;
      // Do not enable if drag-drop attribute is not present in the list element, if
      if (!this.dragDrop) return
      e.stopPropagation();
      const dndHandle = el.querySelector('#dnd-handle');

      // el.dndContainerElement = this // NOT USED ANYWHERE

      // If element is marked as no-drag, skip this block
      if (!el.hasAttribute('no-drag')) {
        // If a DND handle is defined (element with ID dnd-handle), then
        // use THAT as the only option to move elements around
        if (dndHandle) {
          // Hovering the handle will enable dragging the element
          dndHandle.addEventListener('mouseover', () => {
            el.setAttribute('draggable', 'true');
            el.addEventListener('dragstart', this._dragstartListener, false);
          });
          dndHandle.addEventListener('mouseout', () => {
            el.removeAttribute('draggable');
            el.removeEventListener('dragstart', this._dragstartListener);
          });
        } else {
          el.setAttribute('draggable', 'true');
          el.addEventListener('dragstart', this._dragstartListener, false);
        }
      }

      // Enables drop event, in the element is not marked as no-drop
      if (!el.hasAttribute('no-drop')) {
        // Add event listeners to element
        el.addEventListener('dragenter', this._dragenterListener, false);
        el.addEventListener('dragend', this._dragendListener, false);
        el.addEventListener('drop', this._dropListener, false);

        el.addEventListener('dragleave', this._dragleaveListener, false);
        el.addEventListener('dragexit', this._dragexitListener, false);
        el.addEventListener('dragover', this._dragoverListener, false);
      }
    }

    // HOOKS to be redefined by the mixing class

    async dragstartHook (e, moving) { return true }
    async dragenterHook (e, moving, target) { return true }
    async dragendHook (e, moving, target) { return true }
    async dropHook (e, moving, target) { return true }

    async dragexitHook (e, moving) { return true }
    async dragleaveHook (e, moving, target) { return true }
    async dragoverHook (e, moving, target) { return true }
    validDropHook (e, moving, target) { return true }

    // # Drag and Drop Handlers and hooks
    //
    // All the logic used during DnD is defined in these handlers, which are registered as listeners during instantiation.
    // All listeners are private and not supposed to be modified. They call a hook for each type of event.
    // The hooks should be redefined to handle any work that's needed during of in response to the drag event.
    _dragstartListener (e) {
      window.lastEntered = null;
      // Start out by assuming the user is moving, and that moving is allowed. This can be changed in the hook.
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.dropEffect = 'move';
      // The proper way to 'move' data around while dragging is to use the dataTransfer interface. However, webKit based browsers
      // only make that data accessible in the drop event, so getting anything in dragenter or dragover is impossible.
      // To make it simpler and fully intereoperable, we store a reference to the parent of the moving item and the item itself
      // in the Mixin's outer scope
      window.originContainer = this.parentElement;
      window.moving = this;
      // Use requestAnimationFrame API to update styles, toa void performance issues
      requestAnimationFrame(() => {
        window.moving.classList.add('moving');
      });
      // All handler hooks are called from the list parent, which must implement them.
      window.originContainer.dragstartHook(e, window.moving);
    }

    _dragenterListener (e) {
      if (this === window.lastEntered) return

      // Like in dragstart with the moving item, we store the target's parent reference for later use
      window.targetContainer = this.parentElement;
      if (!window.targetContainer.validDropHook(e, window.moving, this)) {
        return
      }

      // preventDefault is necessary to ALLOW custom dragenter handling
      e.preventDefault();
      window.previousLastEntered = window.lastEntered;
      window.lastEntered = this;

      debouncedPortionOfDragenterListener.call(this, e);
    }

    // dragover, dragleave and dragexit listeners are setup and hooks are available, but no work is done here by default
    _dragoverListener (e) {
      // preventDefault is necessary to ALLOW custom dragover and dropping handling
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';

      window.targetContainer.dragoverHook(e, window.moving, this);
    }

    _dragleaveListener (e) {
      window.targetContainer.dragleaveHook(e, window.moving, this);
    }

    _dragexitListener (e) {
      window.targetContainer.dragexitHook(e, window.moving, this);
    }

    _dragendListener (e) {
      // some niche cases might result in this method running when references are empty. Bail to avoid errors
      if (!window.originContainer || !window.targetContainer) return

      if (!window.originContainer.validDropHook(e, window.moving, window.lastEntered)) return

      // This hook needs to be a promise, so references are not cleared before the hook is done
      window.originContainer.dragendHook(e, window.moving).then(() => {
        // only clear styles and references if dropEffect is none, which should be set while validating the target in the hooks
        // if (e.dataTransfer.dropEffect === 'none') {
        requestAnimationFrame(() => {
          this.classList.remove('moving');
          console.log(targetRows);
          targetRows.forEach(element => {
            element.classList.remove('target');
          });
          targetRows.splice(0, targetRows.length);
          window.moving = null;
          window.originContainer = null;
          window.targetContainer = null;
          window.lastEntered = null;
        });
        // }
      });
    }

    _dropListener (e) {
      e.preventDefault();
      // Like with dragend, the hook needs to return a promise to avoid timing issues.
      window.targetContainer.dropHook(e, window.moving, this);
    }
  }
};

// https://css-tricks.com/snippets/css/a-guide-to-flexbox/
// https://dev.to/drews256/ridiculously-easy-row-and-column-layouts-with-flexbox-1k01

// https://github.com/Victor-Bernabe/lit-media-query/blob/master/lit-media-query.js

// eslint-disable-next-line new-cap
class EeTable extends DraggableListMixin(ThemeableMixin('ee-table')(StyleableMixin(LitElement))) {
  static get styles () {
    return [
      super.styles || [],
      css`
        :host {
          display: block;
          width: 100%;
        }

        :host([striped]) ::slotted(ee-row:nth-child(odd)) {
          background-color: var(--ee-table-striped-odd-color, white)
        }

        :host([striped]) ::slotted(ee-row:nth-child(even)) {
          background-color: var(--ee-table-striped-even-color, whitesmoke)
        }
      `
    ]
  }

  static get properties () {
    return {
      small: {
        type: String
      },
      medium: {
        type: String
      }
    }
  }

  constructor () {
    super();
    this.small = 600;
    this.medium = 1024;
  }

  _changeRowsSize (size) {
    const rows = this.shadowRoot.querySelector('slot').assignedElements();
    for (const row of rows) row.setAttribute('size', size);
  }

  _handleResize () {
    if (window.matchMedia(`(max-width: ${this.small}px)`).matches) {
      this._changeRowsSize('small');
    } else if (window.matchMedia(`(max-width: ${this.medium}px)`).matches) {
      this._changeRowsSize('medium');
    } else {
      this._changeRowsSize('large');
    }
  }

  firstUpdated () {
    super.firstUpdated();
    this._handleResize();
  }

  connectedCallback () {
    super.connectedCallback();

    // Check if Visual Viewport API is supported
    const listenObject = window.visualViewport || window;
    listenObject.addEventListener('resize', () => {
      this._handleResize();
    });
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      <slot @slotchange="${this._slotChanged}"></slot>
    `
  }

  _slotChanged () {
    this._handleResize();
    // this._updateDragDrop()
  }
}
customElements.define('ee-table', EeTable);

class EeCell extends ThemeableMixin('ee-cell')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      css`
        :host {
          flex-grow: 1;
          flex-shrink: 1;
          box-sizing: border-box;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 3px;
          border: 1px solid transparent;
        }

        :host([selectable]:hover) {
          border: 1px solid var(--ee-cell-hover-border-color, #ddd);
          background-color: 1px solid var(--ee-cell-hover-background-color, #eee);
        }

        :host([sq]) {
          flex-grow: 0.25;
        }
        :host([sh]) {
          flex-grow: 0.5;
        }
        :host([s1]) {
          flex-grow: 1;
        }
        :host([s2]) {
          flex-grow: 2;
        }
        :host([s3]) {
          flex-grow: 3;
        }
        :host([s4]) {
          flex-grow: 4;
        }
        :host([s5]) {
          flex-grow: 5;
        }

        /*
         ::slotted(#dnd-handle) {
          cursor: pointer;
        }

        ::slotted(*) {
          cursor: pointer;
        }
        */

      `
    ]
  }

  static get properties () {
    return {
    }
  }

  constructor () {
    super();
    this.SOMETHING = false;
  }

  connectedCallback () {
    super.connectedCallback();
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      <slot></slot>
    `
  }
}
customElements.define('ee-cell', EeCell);

// DraggableElement
// ===============
const DraggableElementMixin = (base) => {
  return class Base extends base {
    // Necessary styles to be added to the litElement based target element:
    static get styles () {
      return [
        super.styles
      ]
    }

    // These properties are also added to the target element.
    static get properties () {
      return {
        dragData: { type: Object, attribute: 'drag-data' }
      }
    }

    constructor () {
      super();
      this.dragData = {};
      this.addEventListener('drop', function(e) {
        console.log('DROP EVENT HAPPENED HERE');
      });
    }

    firstUpdated () {
      super.firstUpdated();
      if (this.hasAttribute('enable-dnd')) {
        this.dispatchEvent(new CustomEvent('enable-dnd', { bubbles: true }));
      }
    }
  }
};

class EeRow extends DraggableElementMixin(ThemeableMixin('ee-row')(StyleableMixin(LitElement))) {
  
  static get styles () {
    return [
      css`
        :host {
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: center;
          width: 100%;
          border: 1px solid transparent;
          border-bottom: var(--ee-row-border-bottom, 1px solid #777);
        }

        :host(:last-child) {
          border-color: transparent;
        }

        :host([header]) {
          height: var(--ee-row-header-height, 2em);
          box-sizing: border-box;
          font-weight: bold;
          border-bottom: var(--ee-row-header-border-bottom, 2px solid #777);
        }

        :host(:hover:not([header])) {
          border: 1px solid var(--ee-row-hover-border-color, #ddd);
          background: var(--ee-row-hover-background, #eee) !important;
        }

        :host([frozen]) {
          position: sticky;
          top: 0;
          background: var(--ee-row-background, white);
        }

        :host([frozen][footer]) {
          bottom: 0;
          top: unset;
          border-top: var(--ee-row-border-bottom, 1px solid #777);
        }

        :host([size=small]) ::slotted(ee-cell) {
          flex-basis: 100%;
        }

        :host([size=medium]) ::slotted(ee-cell),
        :host([size=large]) ::slotted(ee-cell) {
          flex-basis: 0;
        }

        :host([size=medium]) ::slotted(ee-cell[extra]),
        :host([size=small]) ::slotted(ee-cell[extra])
        {
          display:none !important;
        }

        :host([size=small]) ::slotted(ee-cell[header]) {
          display: none !important;
        }

        /* Drag and Drop Styles */
        #dnd-handle, ::slotted(#dnd-handle) {
          display: none;
          max-width: 18px;
          height: 18px;
          cursor: move;
        }

        :host([header]) .handle,
        :host([header]) ::slotted(.handle) {
          pointer-events: none;
          visibility: hidden;
        }

        :host([draggable]) .handle,
        :host([draggable]) ::slotted(.handle) {
          display: block;
        }
      `
    ]
  }


  static get properties () {
    return {
      header: { type: Boolean }
    }
  }

  constructor () {
    super();
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      <slot></slot>
    `
  }
}
customElements.define('ee-row', EeRow);

/* globals customElements */
class NnForm extends ThemeableMixin('nn-form')(StyleableMixin(NativeReflectorMixin(LitElement))) {
  get reflectProperties () {
    return [...super.reflectProperties, ...formElement]
  }

  get skipProperties () {
    return [...super.skipProperties, 'elements', 'checkValidity', 'reportValidity', 'reset']
  }

  reportValidity () {
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
    return valid
  }

  clearAllCustomValidity (elements) {
    for (const el of elements) {
      if (typeof el.setCustomValidity === 'function') el.setCustomValidity('');
    }
  }

  checkValidity () {
    // Check validity in form
    let valid = true;
    // if (!this.native.checkValidity()) valid = false

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
    return valid
  }

  reset () {
    if (!this.native) return

    this.native.reset();

    // TODO: Adjust this for radios in a nice sensible way
    for (const el of this.elements) {
      const valueSource = this._getElementValueSource(el);

      // Reset validity, so that error messages are also reset
      if (typeof el.setCustomValidity === 'function') el.setCustomValidity('');

      if (this._radioElement(el)) {
        el[valueSource] = el.getAttribute(valueSource) !== null;
      } else if (this._checkboxElement(el)) {
        el[valueSource] = el.getAttribute(valueSource) !== null;
      } else {
        el[valueSource] = el.getAttribute(valueSource);
      }
    }
  }

  createSubmitObject (elements) {
    const r = {};
    for (const el of elements) {
      const elName = el.getAttribute('name');
      // Every submit element MUST have a name set
      if (typeof elName === 'undefined' || elName === null) continue

      // Radio will only happen once thanks to checking for undefined
      if (typeof r[elName] !== 'undefined') continue
      if (el.getAttribute('no-submit') !== null) continue
      // Checkboxes are special: they might be handled as native ones,
      // (NOTHING set if unchecked, and their value set if checked) or
      // as booleans (true for checked, or false for unchecked)
      if (this._checkboxElement(el)) {
        if (this.submitCheckboxesAsNative) {
          // As native checkboxes.
          const val = this.getFormElementValue(elName);
          if (val) r[elName] = val;
        } else {
          // As more app-friendly boolean value
          r[elName] = !!this.getFormElementValue(elName);
        }
      // For "file" types (uploads), it will
      } else if (el.type === 'file' || el.getAttribute('as-file')) {
        r[elName] = el;
      } else {
        r[elName] = this.getFormElementValue(elName);
      }
    }
    return r
  }

  getFormElementValue (elName) {
    const elements = [...this.elements].filter(el => el.getAttribute('name') === elName);

    if (!elements.length) {
      console.error('Trying to set', elName, 'but no such element in form');
      return
    }

    if (elements.length === 1) {
      const el = elements[0];

      const valueSource = this._getElementValueSource(el);
      if (this._checkboxElement(el)) {
        return el[valueSource]
          ? (el.value ? el.value : 'on')
          : undefined
      } else if (this._selectElement(el)) {
        return el[valueSource]
      } else {
        return el[valueSource]
      }
    } else {
      const nonRadio = elements.filter(el => !this._radioElement(el));
      if (nonRadio.length) {
        console.error('Duplicate name', elName, 'for non-radio elements');
        return
      }

      const checked = elements.find(el => {
        const valueSource = this._getElementValueSource(el);
        return el[valueSource]
      });
      if (checked) return checked.value
      else return undefined
    }
  }

  setFormElementValue (elName, value, skipHiddenElements) {
    const el = [...this.elements].find(el => {
      if (this._radioElement(el)) {
        return el.getAttribute('name') === elName && el.value === value
      } else {
        return el.getAttribute('name') === elName
      }
    });

    // Don't do anything if the element wasn't found OR if the type was hidden
    // (which 99.9% of the time is set by the form)
    if ((!el || (el.getAttribute('type') === 'hidden')) && skipHiddenElements) return
    // Get the original value
    const valueSource = this._getElementValueSource(el);

    // CHECKBOXES
    if (this._checkboxElement(el)) {
      el[valueSource] = !!value;

    // RADIO
    // Radio elements
    } else if (this._radioElement(el)) {
      el[valueSource] = true;
      const others = [...this.elements].filter(e =>
        el !== e &&
        this._radioElement(el)
      );
      for (const other of others) other[valueSource] = false;

    // SELECT
    // Selectable elements (with prop selectedIndex)
    } else if (this._selectElement(el)) {
      if (!value) el.selectedIndex = 0;
      else el[valueSource] = value;

    // Any other case
    } else {
      el[valueSource] = value;
    }
  }

  _selectElement (el) {
    if (typeof el.selectedIndex !== 'undefined' || el.getAttribute('as-select') !== null) return true
    return false
  }

  _checkboxElement (el) {
    if (el.type === 'checkbox') return true
    if (el.getAttribute('as-checkbox') !== null) return true
    return false
  }

  _radioElement (el) {
    if (el.type === 'radio') return true
    if (el.getAttribute('as-radio') !== null) return true
    return false
  }

  _getElementValueSource (el) {
    if (el.type === 'checkbox' || el.type === 'radio') return 'checked'
    if (el.getAttribute('value-source')) return el.getAttribute('value-source')
    return 'value'
  }

  get elements () {
    // A tags (links) can have "name", filter them out
    return [...this.querySelectorAll('[name]')].filter(el => el.tagName !== 'A')
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      <form id="native">
        <slot></slot>
      </form>
    `
  }
}
customElements.define('nn-form', NnForm);

/* globals customElements CustomEvent */
class EnForm extends ThemeableMixin('en-form')(NnForm) {
  get skipProperties () {
    return [...super.skipProperties, 'submit']
  }

  static get properties () {
    return {

      fetchingElement: {
        type: String,
        attribute: 'fetching-element'
      },

      recordId: {
        type: String,
        attribute: 'record-id'
      },

      setFormAfterSubmit: {
        type: Boolean,
        attribute: 'set-form-after-submit'
      },

      resetFormAfterSubmit: {
        type: Boolean,
        attribute: 'reset-form-after-submit'
      },

      validateOnLoad: {
        type: Boolean,
        attribute: 'validate-on-load'
      },

      validateOnRender: {
        type: Boolean,
        attribute: 'validate-on-render'
      },

      submitCheckboxesAsNative: {
        type: Boolean,
        attribute: 'submit-checkboxes-as-native'

      },
      noAutoload: {
        type: Boolean,
        attribute: 'no-autoload'
      },

      // This will allow users to redefine methods declaratively
      presubmit: { type: Function, attribute: false },
      response: { type: Function, attribute: false },
      incomingData: { type: Function, attribute: false },
      dataLoaded: { type: Function, attribute: false },
      extrapolateErrors: { type: Function, attribute: false }

    }
  }

  constructor () {
    super();
    this.validateOnLoad = false;
    this.validateOnRender = false;
    this.fetchingElement = null;
    this.submitCheckboxesAsNative = false;
    this._boundRealtimeSubmitter = this._realTimeSubmitter.bind(this);
    this.inFlight = false;
    this.attemptedFlight = false;
    this.inFlightMap = new WeakMap();
    this.attemptedFlightMap = new WeakMap();
    this.submitObject = {};
  }

  async _allChildrenCompleted () {
    // Wait for all children to be ready to rock and roll
    for (const el of this.elements) {
      // TODO: What about React, Vue, etc.? Uniform API across element libraries?
      if (typeof el.updateComplete !== 'undefined') {
        await el.updateComplete;
      }
    }
  }

  _realTimeSubmitter (e) {
    this.submit(e.target);
  }

  connectedCallback () {
    super.connectedCallback();
    this._allChildrenCompleted().then(() => {
      for (const el of this.elements) {
        const realTime = el.getAttribute('real-time') !== null;
        const realTimeEvent = el.getAttribute('real-time-event') || 'input';
        if (!realTime || !realTimeEvent) continue
        el.addEventListener(realTimeEvent, this._boundRealtimeSubmitter);
      }
    });
  }

  disconnectedCallback () {
    super.disconnectedCallback();
    for (const el of this.elements) {
      const realTime = el.getAttribute('real-time');
      if (realTime === null) continue
      const realTimeEvent = el.getAttribute('real-time-event');
      if (!realTimeEvent) continue

      el.removeEventListener(realTimeEvent, this._boundRealtimeSubmitter);
    }
  }

  async firstUpdated () {
    super.firstUpdated();

    if (this.validateOnRender) {
      await this._allChildrenCompleted();
      // Check validity
      this.reportValidity();
    }
  }

  setFormElementValues (o) {
    for (const k in o) {
      this.setFormElementValue(k, o[k], true);
    }
  }

  setRecordObject (o) {
    o = { ...o };
    const elHash = {};
    for (const el of this.elements) elHash[el.getAttribute('name')] = el;

    for (const k of Object.keys(elHash)) {
      o[k] = this.getFormElementValue(k);
    }
    return o
  }

  extrapolateErrors (o) {
    return o
  }

  async presubmit (fetchOptions) {}

  async response (response, errs, fetchOptions) {} // If (response !== null and response.ok), it worked

  async incomingData (o, op) {} // op can be 'autoload' or 'submit'

  async dataLoaded (o, op) {} // op can be 'autoload' or 'submit'

  // Disabled here is set (and checked) with both the attribute and the property
  // 'disabled' since an element might be disabled in the html, but might
  // not have had a chance to render yet (in which case, for non-native elemtns,
  // it would mean that the property is not yet there, since the reflector hasn't
  // yet run)
  _disableElements (elements) {
    this.__disabled = new WeakMap();
    for (const el of elements) {
      if (!el.disabled && !el.hasAttribute('disabled')) {
        el.setAttribute('disabled', true);
        el.disabled = true;
        this.__disabled.set(el, true);
      }
    }
  }

  _enableElements (elements) {
    this.__disabled = this.__disabled || new WeakMap();
    for (const el of elements) {
      if (this.__disabled.has(el)) {
        el.removeAttribute('disabled');
        el.disabled = false;
        this.__disabled.delete(el);
      }
    }
  }

  _fetchEl (specificElement) {
    // Tries to figure out what the fetching element is.
    // if fetching-element was passed, then it's either considered an ID
    // or the element itself.
    // Otherwise it will look for an ee-network or with an element with class
    // .network. Finally, it will use `window`
    if (specificElement) {
      let pEl;
      pEl = specificElement;
      let found = false;
      while (pEl.parentElement) {
        pEl = pEl.parentElement;
        if (pEl.tagName === 'EE-NETWORK' || pEl.classList.contains('network')) {
          found = true;
          break
        }
      }
      return found ? pEl : window
    } else {
      if (this.fetchingElement) {
        if (typeof this.fetchingElement === 'string') return this.querySelector(`#${this.fetchingElement}`)
        else return this.fetchingElement
      } else {
        let maybeNetwork = this.querySelector('ee-network');
        if (!maybeNetwork) maybeNetwork = this.querySelector('.network');
        return maybeNetwork || window
      }
    }
  }

  async _wait (ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    })
  }

  async submit (specificElement) {
    // Clear all custom validities if they are set
    // Native elements will NEED this, or any invalid state
    // will persist even if validation passes
    // Then, make up submit object and check whether reportValidity returns
    // false (which basically means "abort")
    if (specificElement) {
      this.clearAllCustomValidity([specificElement]);
      this.submitObject = this.createSubmitObject([specificElement]);
      if (typeof specificElement.reportValidity === 'function' && !specificElement.reportValidity()) return
    } else {
      this.clearAllCustomValidity(this.elements);
      this.submitObject = this.createSubmitObject(this.elements);
      if (!this.reportValidity()) return
    }

    // Give users the ability to listen to @submit and then Allow for a presubmit hook
    const submitEvent = new CustomEvent('submit', { cancelable: true, bubbles: true, composed: true });
    this.dispatchEvent(submitEvent);
    if (submitEvent.defaultPrevented) return

    // inFlightMap is a map of all connections, using the specificElement
    // as key (or "window" if there is no specific element)
    const mapIndex = specificElement || this;

    // The connection is ongoing: add a "specificElement" to the attempted
    // field, and simply return.
    // Towards the end, this function will check that "attempted" which,
    // if set, means that the form needs to be resubmitted with that
    // specificElement
    if (this.inFlightMap.has(mapIndex)) {
      this.inFlightMap.set(mapIndex, { attempted: true });
      return
    }
    this.inFlightMap.set(mapIndex, { attempted: false });

    // The element's method can only be null, POST or PUT.
    // If not null, and not "PUT", it's set to "POST"
    let elementMethod = this.getAttribute('method');
    if (elementMethod && elementMethod.toUpperCase() !== 'PUT') {
      elementMethod = 'POST';
    }

    // The 'method' attribute will have priority no matter what.
    // If `method` is not set, then it will depend on recordId (PUT if present,
    // POST if not)
    const method = elementMethod === null
      ? this.recordId ? 'PUT' : 'POST'
      : elementMethod;

    // Set the url, which will also depend on recordId
    const action = this.getAttribute('action');
    if (!action) throw new Error('The submitted form has no action URL set')
    const url = action + (this.recordId ? `/${this.recordId}` : '');

    const fetchOptions = {
      url,
      method,
      headers: { 'Content-Type': this.getAttribute('enctype') || 'application/json' },
      redirect: 'follow', // manual, *follow, error
      body: this.submitObject // body data type must match "Content-Type" header
    };

    // HOOK: Allow devs to customise the request about to be sent to the server
    await this.presubmit(fetchOptions);

    // Disable the elements
    if (!specificElement) this._disableElements(this.elements);

    // Delete the multipart/form-data header if it was set, since
    // the browser will set it (with the right boundary parameter)
    // https://muffinman.io/uploading-files-using-fetch-multipart-form-data/
    // https://stackoverflow.com/questions/35192841/fetch-post-with-multipart-form-data
    //
    // ALSO turn body into a FormData object, with all values appended.
    // Note that for files. createSubmitObject will assign the element itself
    // as the value.
    if (fetchOptions.headers['Content-Type'] === 'multipart/form-data') {
      delete fetchOptions.headers['Content-Type'];

      const body = fetchOptions.body;
      const formData = new FormData();

      for (const k in body) {
        if (body[k] instanceof HTMLElement) {
          const filesInEl = body[k].files;
          for (const f of filesInEl) formData.append(k, f);
        } else {
          formData.append(k, body[k]);
        }
      }
      fetchOptions.body = formData;
    }

    // Attempt the submission
    let networkError = false;
    let response;
    let errs;
    const body =
      fetchOptions.headers['Content-Type'] === 'application/json' &&
      typeof fetchOptions.body === 'object' &&
      fetchOptions.body !== null
        ? JSON.stringify(fetchOptions.body)
        : fetchOptions.body;
    try {
      // fetch() wants a stingified body
      const fo = { ...fetchOptions, ...{ body: body } };
      const el = this._fetchEl(specificElement);
      response = await el.fetch(fetchOptions.url, fo);
    } catch (e) {
      console.log('ERROR!', e);
      networkError = true;
    }

    // CASE #1: network error.
    if (networkError) {
      console.log('Network error!');

      // Re-enable the elements
      if (!specificElement) {
        this._enableElements(this.elements);
        await this._wait(0);
      }

      // Emit event to make it possible to tell the user via UI about the problem
      const event = new CustomEvent('form-error', { detail: { type: 'network' }, bubbles: true, composed: true });
      this.dispatchEvent(event);

      // Response hook
      await this.response(null, null, fetchOptions);
    //
    // CASE #2: HTTP error.
    // Invalidate the problem fields
    } else if (!response.ok) {
      //
      // Try and get the errors object from the reponse's json
      let originalErrs;
      try {
        originalErrs = await response.json();
      } catch (e) {
        originalErrs = {};
      }
      errs = this.extrapolateErrors(originalErrs) || {};

      // Emit event to make it possible to tell the user via UI about the problem
      const event = new CustomEvent('form-error', { detail: { type: 'http', response, errs }, bubbles: true, composed: true });
      this.dispatchEvent(event);

      // Re-enable the elements
      // This must happen before setCustomValidity() and reportValidity()
      if (!specificElement) {
        this._enableElements(this.elements);
        await this._wait(0);
      }

      // Set error messages
      if (errs.errors && errs.errors.length) {
        const elHash = {};
        for (const el of this.elements) {
          elHash[el.getAttribute('name')] = el;
        }
        for (const err of errs.errors) {
          const el = elHash[err.field];
          if (el && el.setCustomValidity) {
            el.setCustomValidity(err.message);
            el.reportValidity();
          }
        }
      }

      // Response hook
      await this.response(response, errs, fetchOptions);
    // CASE #3: NO error. Set fields to their
    // new values
    } else {
      // Convert the result to JSON
      const v = await response.json();

      let attempted;
      if (this.inFlightMap.has(mapIndex)) {
        attempted = this.inFlightMap.get(mapIndex).attempted;
      }

      await this.incomingData(v, 'submit');

      // HOOK Set the form values, in case the server processed some values
      // Note: this is only ever called if set-form-after-submit was
      // passed to the form.
      if (this.setFormAfterSubmit) {
        // Won't overwrite fields if another attempt is queued
        if (!attempted) {
          if (!specificElement) {
            this.setFormElementValues(v);
          } else {
            const name = mapIndex.name;
            this.setFormElementValues({ [name]: v[name] });
          }
        }
      }

      // Re-enable the elements
      if (!specificElement) {
        this._enableElements(this.elements);
        await this._wait(0);
      }

      // Maybe reset the form if it was so required
      if (this.resetFormAfterSubmit && !attempted && !specificElement) this.reset();

      await this.dataLoaded(v, 'submit');

      // Emit event to make it possible to tell the user via UI about the problem
      const event = new CustomEvent('form-ok', { detail: { response }, bubbles: true, composed: true });
      this.dispatchEvent(event);

      // Response hook
      await this.response(response, v, fetchOptions);
    }

    if (this.inFlightMap.has(mapIndex)) {
      const attempted = this.inFlightMap.get(mapIndex).attempted;
      this.inFlightMap.delete(mapIndex);
      if (attempted) {
        this.submit(specificElement);
      }
    }
  }

  async updated (changedProperties) {
    // The 'await' here has the side effect of waiting for the next tick,
    // which means that children elements will have a chance to render
    await super.updated();

    // If no-autoload is set to true, or there is no autoload or no recordId,
    // simply give up: nothing to do
    if (this.noAutoload || !changedProperties.has('recordId')) return

    // Record ID must be "something"
    if (typeof this.recordId === 'undefined' || this.recordId === null) return

    return this.preloadData()
  }

  async preloadData () {
    // Work out the action's URL, adding the record ID  at the end
    // (It will be a get)
    // If there is a result, fetch the element values
    const action = this.getAttribute('action');
    let response;
    if (action) {
      // This will make sure that the element is actually visible
      // before doing the fetch
      await this.updateComplete;

      // Disable elements
      this._disableElements(this.elements);

      // Fetch the data and trasform it to json
      let v;
      try {
        const el = this._fetchEl();
        response = await el.fetch(action + '/' + this.recordId);
        v = await response.json();
      } catch (e) {
        console.error('WARNING: Fetching element failed to fetch');
        v = {};
      }

      await this.incomingData(v, 'autoload');

      // Set values
      this.setFormElementValues(v);

      // Re-enabled all disabled fields
      this._enableElements(this.elements);
      await this._wait(0);

      // Run reportValidity if validateOnLoad is on
      if (this.validateOnLoad) {
        this.reportValidity();
      }

      // Run hook
      await this.dataLoaded(v, 'autoload');
    }
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      <form id="native">
        <slot></slot>
      </form>
    `
  }
}
customElements.define('en-form', EnForm);

const InputMixin = (base) => {
  return class Base extends base {
    get skipAttributes () {
      return [...super.skipAttributes, 'type']
    }

    get reflectProperties () {
      return [...super.reflectProperties, ...inputElement]
    }
  }
};

const FormElementMixin = (base) => {
  return class Base extends base {
    get skipAttributes () {
      return [
        ...super.skipAttributes, 'form'
      ]
    }

    get skipProperties () {
      return [...super.skipProperties, 'form']
    }

    connectedCallback () {
      super.connectedCallback();
      this.assignFormProperty();
    }

    assignFormProperty () {
      // if (this.tagName === 'NN-FORM' || this.tagName === 'EN-FORM') return
      let el = this;
      while ((el = el.parentElement) && (el.tagName !== 'FORM' && el.tagName !== 'NN-FORM' && el.tagName !== 'EN-FORM' && !el.hasAttribute('as-form'))) { } // eslint-disable-line no-empty
      this.form = el;
    }
  }
};

const NativeValidatorMixin = (base) => {
  return class Base extends base {
    static get properties () {
      return {
        nativeErrorMessages: {
          type: Boolean,
          attribute: 'native-error-messages'
        },
        shownValidationMessage: {
          type: String,
          attribute: false
        },
        validator: { type: Function },
        validationMessages: {
          type: Object,
          attribute: 'validition-messages'
        },
        validationMessagePosition: {
          type: String,
          attribute: 'validation-message-position'
        }
      }
    }

    static get styles () {
      return [
        super.styles || [],
        css`

          span.error-message {
            color: red;
          }

          :invalid {
            background-color: pink;
            border: var(--native-validator-mixin-input-border-invalid, 1px solid #bb7777);
          }
        `
      ]
    }

    constructor () {
      super();
      this.validator = () => '';
      this.nativeValidationKeys = [
        'badInput',
        'customError',
        'patternMismatch',
        'rangeOverflow',
        'rangeUnderflow',
        'stepMismatch',
        'valueMissing',
        'tooLong',
        'tooShort',
        'typeMismatch'
      ];
      this.validationMessages = {};
      this.validationMessagePosition = 'before';
      this._showPrettyError = false;
    }

    get skipProperties () {
      return [...super.skipProperties, 'checkValidity', 'reportValidity', 'setCustomValidity']
    }

    get validationMessageTemplate () {
      return html`
        <span class="error-message">
          ${this.shownValidationMessage}
        </span>
      `
    }

    get ifValidationMessageBefore () {
      if (this.validationMessagePosition === 'after') return ''
      return this.validationMessageTemplate
    }

    get ifValidationMessageAfter () {
      if (this.validationMessagePosition === 'before') return ''
      return this.validationMessageTemplate
    }

    setCustomValidity (m) {
      if (!this.native) return
      return this.native.setCustomValidity(m)
    }

    _runValidator () {
      // Call the validator with a value. Here an element could be a checkbox,
      // a select, an simple text input, etc.
      // If the containing form has _getElementValueSource, that is used to
      // figure out what to pass to the validato (as well as _submitObject)
      let value;
      let submitObject;
      if (this.form && this.form._getElementValueSource) {
        value = this[this.form._getElementValueSource(this)];
        submitObject = this.form.submitObject;
      }
      const ownErrorMessage = this.validator(value, submitObject);
      if (ownErrorMessage) this.setCustomValidity(ownErrorMessage);
    }

    reportValidity () {
      if (!this.native) return true

      // Run custom validator. Note that custom validator
      // will only ever run on filed without an existing customError.
      if (!this.native.validity.customError) {
        this._runValidator();
      }

      // Hide the fancy error message by default
      this.shownValidationMessage = '';

      // Run reportValidity which will display the native
      // error messages.
      // Suppress the pretty error messages
      if (this.nativeErrorMessages) {
        this._showPrettyError = false;
        return this.native.reportValidity()
      } else {
        // Since pretty errors will be shown, it will actually
        // return checkValidity() which will not show the
        // error messages
        this._showPrettyError = true;
        return this.native.checkValidity()
      }
    }

    checkValidity () {
      if (!this.native) return true
      // Run custom validator. Note that custom validator
      // will only ever run on filed without an existing customError.
      if (!this.native.validity.customError) {
        this._runValidator();
      }

      this._showPrettyError = false;
      return this.native.checkValidity()
    }

    firstUpdated () {
      super.firstUpdated();
      this.native.oninput = (e) => {
        this.setCustomValidity('');
        this.reportValidity();
      };

      this.native.oninvalid = (e) => {
        // No pretty error to be shown (probably running checkValidity())
        if (!this._showPrettyError) return

        const validity = e.target.validity;

        // Find which one flag in validity is raised
        let found;
        for (const k of this.nativeValidationKeys) {
          if (validity[k]) {
            found = k;
            break
          }
        }

        // Assign shownValidationMessage
        // Allow translating with specific function
        const translator = this.validationMessages[found];
        if (translator) {
          this.shownValidationMessage = (typeof translator === 'function')
            ? translator(e.target.validationMessage)
            : translator;
        } else {
          this.shownValidationMessage = e.target.validationMessage;
        }
      };
    }
  }
};

class EnInputRange extends ThemeableMixin('en-input-range')(FormElementMixin(NativeValidatorMixin(StyleableMixin(LabelsMixin(InputMixin(NativeReflectorMixin(LitElement))))))) {
  static get styles () {
    return [
      super.styles,
      css`
        :host {
          display: flex;
          height: 30px;
        }

        #native {
          margin: auto 20px;
        }
      `
    ]
  }

  static get properties () {
    return {
      shownValue: {
        type: String,
        attribute: false
      }
    }
  }

  firstUpdated () {
    super.firstUpdated();
    this.shownValue = this.shadowRoot.querySelector('#native').value;
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      <slot @slotchange="${this.slotChanged}" id="range-amount-before" name="range-amount-before"></slot>
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input @change=${this.updateShownValue} type="range" id="native" real-time-event="input">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
      <slot @slotchange="${this.slotChanged}" id="range-amount-after" name="range-amount-after"></slot>
    `
  }

  _updateSpanInSlot (slot, value) {
    if (slot) {
      const slotContents = slot.assignedElements()[0];
      if (slotContents) {
        const amountSpan = slotContents.querySelector('span#range-amount');
        if (amountSpan) {
          amountSpan.innerHTML = Number(value);
        }
      }
    }
  }

  updateShownValue (e) {
    let slot;
    this.shownValue = e.srcElement.value;

    slot = this.shadowRoot.querySelector('slot#range-amount-before');
    this._updateSpanInSlot(slot, this.shownValue);

    slot = this.shadowRoot.querySelector('slot#range-amount-after');
    this._updateSpanInSlot(slot, this.shownValue);
  }

  slotChanged (e) {
    this._updateSpanInSlot(e.srcElement, this.shownValue);
  }
}
window.customElements.define('en-input-range', EnInputRange);

class NnButton extends ThemeableMixin('nn-button')(FormElementMixin(NativeValidatorMixin(StyleableMixin(NativeReflectorMixin(LitElement))))) {
  get skipAttributes () {
    return [...super.skipAttributes, 'form']
  }

  get reflectProperties () {
    return [...super.reflectProperties, ...buttonElement]
  }

  // This is necessary as a workaround to this chrome bug:
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1061240&can=2&q=status%3Aunconfirmed&colspec=ID%20Stars%20Area%20Feature%20Status%20Summary%20Modified%20OS&sort=-id
  static get styles () {
    return [
      super.styles || [],
      css`
        :host([disabled]) {
          pointer-events: none;
        }
      `
    ]
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      <button @click="${this._clicked}" id="native">
        <slot></slot>
      </button>
    `
  }

  _clicked (e) {
    if (this.getAttribute('type') === 'submit') this.form.submit();
  }
}
customElements.define('nn-button', NnButton);

class NnInputButton extends ThemeableMixin('nn-input-button')(FormElementMixin(NativeValidatorMixin(InputMixin(NativeReflectorMixin(LitElement))))) {
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      <input type="button" id="native">
        <slot></slot>
     `
  }
}
customElements.define('nn-input-button', NnInputButton);

class NnInputCheckbox extends ThemeableMixin('nn-input-checkbox')(FormElementMixin(NativeValidatorMixin(LabelsMixin(StyleableMixin(InputMixin(NativeReflectorMixin(LitElement))))))) {
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="checkbox" as-checkbox value-source="checked" id="native"  real-time-event="click">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
customElements.define('nn-input-checkbox', NnInputCheckbox);

class NnInputColor extends ThemeableMixin('nn-input-color')(FormElementMixin(NativeValidatorMixin(StyleableMixin(LabelsMixin(InputMixin(NativeReflectorMixin(LitElement))))))) {
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="color" id="native">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
window.customElements.define('nn-input-color', NnInputColor);

class NnInputDatalist extends ThemeableMixin('nn-input-datalist')(FormElementMixin(NativeValidatorMixin(LabelsMixin(StyleableMixin(InputMixin(NativeReflectorMixin(LitElement))))))) {
  get skipAttributes () {
    return [
      ...super.skipAttributes,
      'list'
    ]
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      <slot @slotchange="${this.addSlotToSelect}"></slot>
      ${this.ifValidationMessageBefore}
      <input type="text" id="native" list="_datalist" real-time-event="input">
      ${this.ifValidationMessageAfter}
      <datalist id="_datalist">
      </datalist>
      ${this.ifLabelAfter}
    `
  }

  addSlotToSelect (e) {
    const select = this.shadowRoot.querySelector('#_datalist');
    for (const option of e.srcElement.assignedElements()) {
      select.appendChild(option);
    }
  }
}
customElements.define('nn-input-datalist', NnInputDatalist);

// This element is a thin wrap to `<input type=text`>.

class NnInputText extends ThemeableMixin('nn-input-text')(FormElementMixin(NativeValidatorMixin(StyleableMixin(LabelsMixin(InputMixin(NativeReflectorMixin(LitElement))))))) {
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="text" id="native" real-time-event="input">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
      <slot id="datalist-slot" name="datalist"></slot>
    `
  }

  static get properties () {
    return {
      submitOnEnter: { type: Boolean, attribute: 'submit-on-enter' }
    }
  }

  constructor () {
    super();
    this._boundKeyEventListener = this._eventListener.bind(this);
  }

  // Submit on enter with forms with only one element
  _eventListener (e) {
    if (this.form && e.keyCode === 13 && (this.form.elements.length === 1 || this.submitOnEnter)) {
      this.form.submit();
    }
  }

  firstUpdated () {
    super.firstUpdated();

    this.addEventListener('keydown', this._boundKeyEventListener);

    const slot = this.shadowRoot.querySelector('#datalist-slot');
    const slotFirstAssignedElement = slot && slot.assignedElements()[0];
    const datalistOptions = slotFirstAssignedElement && slotFirstAssignedElement.children;
    if (datalistOptions && datalistOptions.length) {
      const datalistElement = document.createElement('datalist');
      datalistElement.setAttribute('id', '_datalist');
      this.setAttribute('list', '_datalist');
      for (const el of datalistOptions) {
        const optionElement = document.createElement('option');
        optionElement.setAttribute('value', el.getAttribute('value'));
        datalistElement.appendChild(optionElement);
      }
      this.shadowRoot.appendChild(datalistElement);
    }
  }
}
customElements.define('nn-input-text', NnInputText);

class NnInputDate extends ThemeableMixin('nn-input-date')(NnInputText) {
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="date" id="native">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
window.customElements.define('nn-input-date', NnInputDate);

class NnInputDateTimeLocal extends ThemeableMixin('nn-input-date')(NnInputText) {
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="datetime-local" id="native">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
window.customElements.define('nn-input-datetime-local', NnInputDateTimeLocal);

class NnInputEmail extends NnInputText {
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="email" id="native">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
window.customElements.define('nn-input-email', NnInputEmail);

class NnInputFile extends ThemeableMixin('nn-input-file')(FormElementMixin(NativeValidatorMixin(StyleableMixin(LabelsMixin(InputMixin(NativeReflectorMixin(LitElement))))))) {
  static get styles () {
    return [
      super.styles,
      css`
        /* From https://zellwk.com/blog/hide-content-accessibly/ */
        [hidden] {
          border: 0;
          clip: rect(0 0 0 0);
          height: auto; /* new - was 1px */
          margin: 0; /* new - was -1px */
          overflow: hidden;
          padding: 0;
          position: absolute;
          width: 1px;
          white-space: nowrap; /* 1 */
        }

        nn-button { 
          margin: auto
        }
      `
    ]
  }

  static get properties () {
    return {
      hideNative: { type: Boolean },
      fileName: { type: String },
      manyFilesText: {
        type: String,
        attribute: 'many-files-text'
      }
    }
  }

  constructor () {
    super();
    this.manyFilesText = 'Many';
  }

  render () {
    if (this.themeRender) return this.themeRender()
    // From https://stackoverflow.com/a/25825731/829771
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="file" id="native" @change="${this.fileNameChanged}" ?hidden=${this.hideNative}>
      ${this.ifValidationMessageAfter}
      ${this.fileName}
      ${this.ifLabelAfter}
    `
  }

  fileNameChanged (e) {
    const native = this.shadowRoot.querySelector('#native');
    const v = native.value;
    this.fileName = native.files.length > 1 ? this.manyFilesText : v.slice(v.lastIndexOf('\\') + 1);
  }
}
customElements.define('nn-input-file', NnInputFile);

class NnInputMonth extends NnInputText {
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="month" id="native">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
window.customElements.define('nn-input-month', NnInputMonth);

class NnInputNumber extends NnInputText {
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="number" id="native">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
window.customElements.define('nn-input-number', NnInputNumber);

class NnInputPassword extends NnInputText {
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="password" id="native">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
window.customElements.define('nn-input-password', NnInputPassword);

class NnInputRadio extends ThemeableMixin('nn-input-radio')(FormElementMixin(NativeValidatorMixin(LabelsMixin(StyleableMixin(InputMixin(NativeReflectorMixin(LitElement))))))) {
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input as-radio value-source="checked" @change="${this._excludeOthers}" type="radio" id="native"  real-time-event="input">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }

  _excludeOthers (e) {
    // All other elements with the same name, marked as `as-radio`
    const others = [...this.form.elements].filter(el =>
      el !== this &&
      el.getAttribute('name') &&
      el.getAttribute('name') === this.getAttribute('name') &&
      el.getAttribute('as-radio') !== null
    );
    for (const el of others) {
      const prop = el.getAttribute('value-source') || 'checked';
      el[prop] = false;
    }
  }
}
customElements.define('nn-input-radio', NnInputRadio);

class NnInputRange extends ThemeableMixin('nn-input-range')(FormElementMixin(NativeValidatorMixin(StyleableMixin(LabelsMixin(InputMixin(NativeReflectorMixin(LitElement))))))) {
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="range" id="native" real-time-event="input">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
window.customElements.define('nn-input-range', NnInputRange);

class NnInputSearch extends NnInputText {
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="search" id="native">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
window.customElements.define('nn-input-search', NnInputSearch);

class NnInputSubmit extends ThemeableMixin('nn-input-submit')(FormElementMixin(NativeValidatorMixin(InputMixin(NativeReflectorMixin(LitElement))))) {
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      <input @click="${this._formSubmit}" type="submit" id="native">
    `
  }

  _formSubmit (e) {
    if (this.form) {
      this.form.submit();
    }
  }
}
customElements.define('nn-input-submit', NnInputSubmit);

class NnInputTel extends NnInputText {
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="tel" id="native">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
window.customElements.define('nn-input-tel', NnInputTel);

class NnInputTime extends NnInputText {
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="time" id="native">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
window.customElements.define('nn-input-time', NnInputTime);

class NnInputUrl extends NnInputText {
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="url" id="native">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
window.customElements.define('nn-input-url', NnInputUrl);

class NnInputWeek extends NnInputText {
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="week" id="native">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
window.customElements.define('nn-input-week', NnInputWeek);

class NnMeter extends ThemeableMixin('nn-meter')(StyleableMixin(LabelsMixin(NativeReflectorMixin(LitElement)))) {
  get reflectProperties () {
    return [...super.reflectProperties, ...meterElement]
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <meter id="native" real-time-event="input"></meter>
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
customElements.define('nn-meter', NnMeter);

class NnProgress extends ThemeableMixin('nn-progress')(StyleableMixin(LabelsMixin(NativeReflectorMixin(LitElement)))) {
  static get properties () {
    return {
    }
  }

  static get styles () {
    return [
      css`
      progress {
        display: block; /* default: inline-block */
        width: 100%;
        margin: auto;
        padding: 2px;
        border: 0 none;
        background: #777;
        border-radius: 14px;
        box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,0.2);
      }
      progress::-moz-progress-bar {
        border-radius: 12px;
        background: var(--nn-progress-color, #fff);
        box-shadow: inset 0 -2px 4px rgba(0,0,0,0.4), 0 2px 5px 0px rgba(0,0,0,0.3);
        
      }
      /* webkit */
      @media screen and (-webkit-min-device-pixel-ratio:0) {
        progress {
          height: 10px;
        }
      }
      progress::-webkit-progress-bar {
        background: transparent;
      }  
      progress::-webkit-progress-value {  
        border-radius: 12px;
        background: var(--nn-progress-color, #fff);
        box-shadow: inset 0 -2px 4px rgba(0,0,0,0.4), 0 2px 5px 0px rgba(0,0,0,0.3); 
      } 
      `
    ]
  }

  get reflectProperties () {
    return [...super.reflectProperties, ...progressElement]
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <progress id="native" real-time-event="input"></progress>
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
customElements.define('nn-progress', NnProgress);

class NnSelect extends ThemeableMixin('nn-select')(FormElementMixin(NativeValidatorMixin(LabelsMixin(InputMixin(NativeReflectorMixin(LitElement)))))) {
  get reflectProperties () {
    return [...super.reflectProperties, ...selectElement]
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <div style="display: none">
        <slot id="slot" @slotchange="${this.refreshOptions}"></slot>
      </div>
      <select id="native" real-time-event="selected"></select>
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }

  async refreshOptions (e) {
    const select = this.shadowRoot.querySelector('#native');
    const slot = this.shadowRoot.querySelector('#slot');
    if (!select || !slot) return

    const options = slot.assignedElements();
    select.innerHTML = '';
    // while (select.firstChild) {
    //   if (!select.lastChild.value) break
    //   select.removeChild(select.lastElementChild)
    // }
    for (const option of options) {
      select.appendChild(option.cloneNode(true));
    }

    // The element's value depends on what it can contain. For example
    // the first selected option will be the element's value.
    // The assign will ensure that the value is updated as a property
    // This will trigger the setter, which will in turn trigger
    // `afterSettingProperty` (which is used for example by
    // AddHasValueAttributeMixin to set the has-value property)
    //
    this.value = this.value; // eslint-disable-line
  }
}
customElements.define('nn-select', NnSelect);

class NnTextArea extends ThemeableMixin('nn-textarea')(StyleableMixin(FormElementMixin(NativeValidatorMixin(LabelsMixin(InputMixin(NativeReflectorMixin(LitElement))))))) {
  get reflectProperties () {
    return [...super.reflectProperties, ...textAreaElement]
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <textarea name="" id="native" real-time-event="input"></textarea>
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
customElements.define('nn-textarea', NnTextArea);
