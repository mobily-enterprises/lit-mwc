define(function(){'use strict';function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}/**
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
var directives = new WeakMap();
var isDirective = function isDirective(o) {
  return typeof o === 'function' && directives.has(o);
};/**
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
var isCEPolyfill = window.customElements !== undefined && window.customElements.polyfillWrapFlushCallback !== undefined;
/**
 * Removes nodes, starting from `startNode` (inclusive) to `endNode`
 * (exclusive), from `container`.
 */

var removeNodes = function removeNodes(container, startNode) {
  var endNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var node = startNode;

  while (node !== endNode) {
    var n = node.nextSibling;
    container.removeChild(node);
    node = n;
  }
};/**
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
var noChange = {};
/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */

var nothing = {};/**
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
var marker = "{{lit-".concat(String(Math.random()).slice(2), "}}");
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */

var nodeMarker = "<!--".concat(marker, "-->");
/**
 * Suffix appended to all bound attribute names.
 */

var boundAttributeSuffix = '$lit$';
var isTemplatePartActive = function isTemplatePartActive(part) {
  return part.index !== -1;
}; // Allows `document.createComment('')` to be renamed for a
// small manual size-savings.

var createMarker = function createMarker() {
  return document.createComment('');
};
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#attributes-0
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-character
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

var lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */

var TemplateInstance =
/*#__PURE__*/
function () {
  function TemplateInstance(template, processor, options) {
    _classCallCheck(this, TemplateInstance);

    this._parts = [];
    this.template = template;
    this.processor = processor;
    this.options = options;
  }

  _createClass(TemplateInstance, [{
    key: "update",
    value: function update(values) {
      var i = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var part = _step.value;

          if (part !== undefined) {
            part.setValue(values[i]);
          }

          i++;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this._parts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _part = _step2.value;

          if (_part !== undefined) {
            _part.commit();
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: "_clone",
    value: function _clone() {
      var _this = this;

      // When using the Custom Elements polyfill, clone the node, rather than
      // importing it, to keep the fragment in the template's document. This
      // leaves the fragment inert so custom elements won't upgrade and
      // potentially modify their contents by creating a polyfilled ShadowRoot
      // while we traverse the tree.
      var fragment = isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
      var parts = this.template.parts;
      var partIndex = 0;
      var nodeIndex = 0;

      var _prepareInstance = function _prepareInstance(fragment) {
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be
        // null
        var walker = document.createTreeWalker(fragment, 133
        /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
        , null, false);
        var node = walker.nextNode(); // Loop through all the nodes and parts of a template

        while (partIndex < parts.length && node !== null) {
          var part = parts[partIndex]; // Consecutive Parts may have the same node index, in the case of
          // multiple bound attributes on an element. So each iteration we either
          // increment the nodeIndex, if we aren't on a node with a part, or the
          // partIndex if we are. By not incrementing the nodeIndex when we find a
          // part, we allow for the next part to be associated with the current
          // node if neccessasry.

          if (!isTemplatePartActive(part)) {
            _this._parts.push(undefined);

            partIndex++;
          } else if (nodeIndex === part.index) {
            if (part.type === 'node') {
              var _part2 = _this.processor.handleTextExpression(_this.options);

              _part2.insertAfterNode(node.previousSibling);

              _this._parts.push(_part2);
            } else {
              var _this$_parts;

              (_this$_parts = _this._parts).push.apply(_this$_parts, _toConsumableArray(_this.processor.handleAttributeExpressions(node, part.name, part.strings, _this.options)));
            }

            partIndex++;
          } else {
            nodeIndex++;

            if (node.nodeName === 'TEMPLATE') {
              _prepareInstance(node.content);
            }

            node = walker.nextNode();
          }
        }
      };

      _prepareInstance(fragment);

      if (isCEPolyfill) {
        document.adoptNode(fragment);
        customElements.upgrade(fragment);
      }

      return fragment;
    }
  }]);

  return TemplateInstance;
}();/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */

var TemplateResult =
/*#__PURE__*/
function () {
  function TemplateResult(strings, values, type, processor) {
    _classCallCheck(this, TemplateResult);

    this.strings = strings;
    this.values = values;
    this.type = type;
    this.processor = processor;
  }
  /**
   * Returns a string of HTML used to create a `<template>` element.
   */


  _createClass(TemplateResult, [{
    key: "getHTML",
    value: function getHTML() {
      var endIndex = this.strings.length - 1;
      var html = '';

      for (var i = 0; i < endIndex; i++) {
        var s = this.strings[i]; // This exec() call does two things:
        // 1) Appends a suffix to the bound attribute name to opt out of special
        // attribute value parsing that IE11 and Edge do, like for style and
        // many SVG attributes. The Template class also appends the same suffix
        // when looking up attributes to create Parts.
        // 2) Adds an unquoted-attribute-safe marker for the first expression in
        // an attribute. Subsequent attribute expressions will use node markers,
        // and this is safe since attributes with multiple expressions are
        // guaranteed to be quoted.

        var match = lastAttributeNameRegex.exec(s);

        if (match) {
          // We're starting a new bound attribute.
          // Add the safe attribute suffix, and use unquoted-attribute-safe
          // marker.
          html += s.substr(0, match.index) + match[1] + match[2] + boundAttributeSuffix + match[3] + marker;
        } else {
          // We're either in a bound node, or trailing bound attribute.
          // Either way, nodeMarker is safe to use.
          html += s + nodeMarker;
        }
      }

      return html + this.strings[endIndex];
    }
  }, {
    key: "getTemplateElement",
    value: function getTemplateElement() {
      var template = document.createElement('template');
      template.innerHTML = this.getHTML();
      return template;
    }
  }]);

  return TemplateResult;
}();var isPrimitive = function isPrimitive(value) {
  return value === null || !(_typeof(value) === 'object' || typeof value === 'function');
};
/**
 * Sets attribute values for AttributeParts, so that the value is only set once
 * even if there are multiple parts for an attribute.
 */

var AttributeCommitter =
/*#__PURE__*/
function () {
  function AttributeCommitter(element, name, strings) {
    _classCallCheck(this, AttributeCommitter);

    this.dirty = true;
    this.element = element;
    this.name = name;
    this.strings = strings;
    this.parts = [];

    for (var i = 0; i < strings.length - 1; i++) {
      this.parts[i] = this._createPart();
    }
  }
  /**
   * Creates a single part. Override this to create a differnt type of part.
   */


  _createClass(AttributeCommitter, [{
    key: "_createPart",
    value: function _createPart() {
      return new AttributePart(this);
    }
  }, {
    key: "_getValue",
    value: function _getValue() {
      var strings = this.strings;
      var l = strings.length - 1;
      var text = '';

      for (var i = 0; i < l; i++) {
        text += strings[i];
        var part = this.parts[i];

        if (part !== undefined) {
          var v = part.value;

          if (v != null && (Array.isArray(v) || // tslint:disable-next-line:no-any
          typeof v !== 'string' && v[Symbol.iterator])) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = v[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var t = _step.value;
                text += typeof t === 'string' ? t : String(t);
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          } else {
            text += typeof v === 'string' ? v : String(v);
          }
        }
      }

      text += strings[l];
      return text;
    }
  }, {
    key: "commit",
    value: function commit() {
      if (this.dirty) {
        this.dirty = false;
        this.element.setAttribute(this.name, this._getValue());
      }
    }
  }]);

  return AttributeCommitter;
}();
var AttributePart =
/*#__PURE__*/
function () {
  function AttributePart(comitter) {
    _classCallCheck(this, AttributePart);

    this.value = undefined;
    this.committer = comitter;
  }

  _createClass(AttributePart, [{
    key: "setValue",
    value: function setValue(value) {
      if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
        this.value = value; // If the value is a not a directive, dirty the committer so that it'll
        // call setAttribute. If the value is a directive, it'll dirty the
        // committer if it calls setValue().

        if (!isDirective(value)) {
          this.committer.dirty = true;
        }
      }
    }
  }, {
    key: "commit",
    value: function commit() {
      while (isDirective(this.value)) {
        var directive = this.value;
        this.value = noChange;
        directive(this);
      }

      if (this.value === noChange) {
        return;
      }

      this.committer.commit();
    }
  }]);

  return AttributePart;
}();
var NodePart =
/*#__PURE__*/
function () {
  function NodePart(options) {
    _classCallCheck(this, NodePart);

    this.value = undefined;
    this._pendingValue = undefined;
    this.options = options;
  }
  /**
   * Inserts this part into a container.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  _createClass(NodePart, [{
    key: "appendInto",
    value: function appendInto(container) {
      this.startNode = container.appendChild(createMarker());
      this.endNode = container.appendChild(createMarker());
    }
    /**
     * Inserts this part between `ref` and `ref`'s next sibling. Both `ref` and
     * its next sibling must be static, unchanging nodes such as those that appear
     * in a literal section of a template.
     *
     * This part must be empty, as its contents are not automatically moved.
     */

  }, {
    key: "insertAfterNode",
    value: function insertAfterNode(ref) {
      this.startNode = ref;
      this.endNode = ref.nextSibling;
    }
    /**
     * Appends this part into a parent part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */

  }, {
    key: "appendIntoPart",
    value: function appendIntoPart(part) {
      part._insert(this.startNode = createMarker());

      part._insert(this.endNode = createMarker());
    }
    /**
     * Appends this part after `ref`
     *
     * This part must be empty, as its contents are not automatically moved.
     */

  }, {
    key: "insertAfterPart",
    value: function insertAfterPart(ref) {
      ref._insert(this.startNode = createMarker());

      this.endNode = ref.endNode;
      ref.endNode = this.startNode;
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      this._pendingValue = value;
    }
  }, {
    key: "commit",
    value: function commit() {
      while (isDirective(this._pendingValue)) {
        var directive = this._pendingValue;
        this._pendingValue = noChange;
        directive(this);
      }

      var value = this._pendingValue;

      if (value === noChange) {
        return;
      }

      if (isPrimitive(value)) {
        if (value !== this.value) {
          this._commitText(value);
        }
      } else if (value instanceof TemplateResult) {
        this._commitTemplateResult(value);
      } else if (value instanceof Node) {
        this._commitNode(value);
      } else if (Array.isArray(value) || // tslint:disable-next-line:no-any
      value[Symbol.iterator]) {
        this._commitIterable(value);
      } else if (value === nothing) {
        this.value = nothing;
        this.clear();
      } else {
        // Fallback, will render the string representation
        this._commitText(value);
      }
    }
  }, {
    key: "_insert",
    value: function _insert(node) {
      this.endNode.parentNode.insertBefore(node, this.endNode);
    }
  }, {
    key: "_commitNode",
    value: function _commitNode(value) {
      if (this.value === value) {
        return;
      }

      this.clear();

      this._insert(value);

      this.value = value;
    }
  }, {
    key: "_commitText",
    value: function _commitText(value) {
      var node = this.startNode.nextSibling;
      value = value == null ? '' : value;

      if (node === this.endNode.previousSibling && node.nodeType === 3
      /* Node.TEXT_NODE */
      ) {
          // If we only have a single text node between the markers, we can just
          // set its value, rather than replacing it.
          // TODO(justinfagnani): Can we just check if this.value is primitive?
          node.data = value;
        } else {
        this._commitNode(document.createTextNode(typeof value === 'string' ? value : String(value)));
      }

      this.value = value;
    }
  }, {
    key: "_commitTemplateResult",
    value: function _commitTemplateResult(value) {
      var template = this.options.templateFactory(value);

      if (this.value instanceof TemplateInstance && this.value.template === template) {
        this.value.update(value.values);
      } else {
        // Make sure we propagate the template processor from the TemplateResult
        // so that we use its syntax extension, etc. The template factory comes
        // from the render function options so that it can control template
        // caching and preprocessing.
        var instance = new TemplateInstance(template, value.processor, this.options);

        var fragment = instance._clone();

        instance.update(value.values);

        this._commitNode(fragment);

        this.value = instance;
      }
    }
  }, {
    key: "_commitIterable",
    value: function _commitIterable(value) {
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
      } // Lets us keep track of how many items we stamped so we can clear leftover
      // items from a previous render


      var itemParts = this.value;
      var partIndex = 0;
      var itemPart;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = value[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var item = _step2.value;
          // Try to reuse an existing part
          itemPart = itemParts[partIndex]; // If no existing part, create a new one

          if (itemPart === undefined) {
            itemPart = new NodePart(this.options);
            itemParts.push(itemPart);

            if (partIndex === 0) {
              itemPart.appendIntoPart(this);
            } else {
              itemPart.insertAfterPart(itemParts[partIndex - 1]);
            }
          }

          itemPart.setValue(item);
          itemPart.commit();
          partIndex++;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (partIndex < itemParts.length) {
        // Truncate the parts array so _value reflects the current state
        itemParts.length = partIndex;
        this.clear(itemPart && itemPart.endNode);
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      var startNode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.startNode;
      removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
    }
  }]);

  return NodePart;
}();
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */

var BooleanAttributePart =
/*#__PURE__*/
function () {
  function BooleanAttributePart(element, name, strings) {
    _classCallCheck(this, BooleanAttributePart);

    this.value = undefined;
    this._pendingValue = undefined;

    if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
      throw new Error('Boolean attributes can only contain a single expression');
    }

    this.element = element;
    this.name = name;
    this.strings = strings;
  }

  _createClass(BooleanAttributePart, [{
    key: "setValue",
    value: function setValue(value) {
      this._pendingValue = value;
    }
  }, {
    key: "commit",
    value: function commit() {
      while (isDirective(this._pendingValue)) {
        var directive = this._pendingValue;
        this._pendingValue = noChange;
        directive(this);
      }

      if (this._pendingValue === noChange) {
        return;
      }

      var value = !!this._pendingValue;

      if (this.value !== value) {
        if (value) {
          this.element.setAttribute(this.name, '');
        } else {
          this.element.removeAttribute(this.name);
        }
      }

      this.value = value;
      this._pendingValue = noChange;
    }
  }]);

  return BooleanAttributePart;
}();
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */

var PropertyCommitter =
/*#__PURE__*/
function (_AttributeCommitter) {
  _inherits(PropertyCommitter, _AttributeCommitter);

  function PropertyCommitter(element, name, strings) {
    var _this;

    _classCallCheck(this, PropertyCommitter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PropertyCommitter).call(this, element, name, strings));
    _this.single = strings.length === 2 && strings[0] === '' && strings[1] === '';
    return _this;
  }

  _createClass(PropertyCommitter, [{
    key: "_createPart",
    value: function _createPart() {
      return new PropertyPart(this);
    }
  }, {
    key: "_getValue",
    value: function _getValue() {
      if (this.single) {
        return this.parts[0].value;
      }

      return _get(_getPrototypeOf(PropertyCommitter.prototype), "_getValue", this).call(this);
    }
  }, {
    key: "commit",
    value: function commit() {
      if (this.dirty) {
        this.dirty = false; // tslint:disable-next-line:no-any

        this.element[this.name] = this._getValue();
      }
    }
  }]);

  return PropertyCommitter;
}(AttributeCommitter);
var PropertyPart =
/*#__PURE__*/
function (_AttributePart) {
  _inherits(PropertyPart, _AttributePart);

  function PropertyPart() {
    _classCallCheck(this, PropertyPart);

    return _possibleConstructorReturn(this, _getPrototypeOf(PropertyPart).apply(this, arguments));
  }

  return PropertyPart;
}(AttributePart); // Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the thrid
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.

var eventOptionsSupported = false;

try {
  var options = {
    get capture() {
      eventOptionsSupported = true;
      return false;
    }

  }; // tslint:disable-next-line:no-any

  window.addEventListener('test', options, options); // tslint:disable-next-line:no-any

  window.removeEventListener('test', options, options);
} catch (_e) {}

var EventPart =
/*#__PURE__*/
function () {
  function EventPart(element, eventName, eventContext) {
    var _this2 = this;

    _classCallCheck(this, EventPart);

    this.value = undefined;
    this._pendingValue = undefined;
    this.element = element;
    this.eventName = eventName;
    this.eventContext = eventContext;

    this._boundHandleEvent = function (e) {
      return _this2.handleEvent(e);
    };
  }

  _createClass(EventPart, [{
    key: "setValue",
    value: function setValue(value) {
      this._pendingValue = value;
    }
  }, {
    key: "commit",
    value: function commit() {
      while (isDirective(this._pendingValue)) {
        var directive = this._pendingValue;
        this._pendingValue = noChange;
        directive(this);
      }

      if (this._pendingValue === noChange) {
        return;
      }

      var newListener = this._pendingValue;
      var oldListener = this.value;
      var shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
      var shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);

      if (shouldRemoveListener) {
        this.element.removeEventListener(this.eventName, this._boundHandleEvent, this._options);
      }

      if (shouldAddListener) {
        this._options = getOptions(newListener);
        this.element.addEventListener(this.eventName, this._boundHandleEvent, this._options);
      }

      this.value = newListener;
      this._pendingValue = noChange;
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(event) {
      if (typeof this.value === 'function') {
        this.value.call(this.eventContext || this.element, event);
      } else {
        this.value.handleEvent(event);
      }
    }
  }]);

  return EventPart;
}(); // We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.

var getOptions = function getOptions(o) {
  return o && (eventOptionsSupported ? {
    capture: o.capture,
    passive: o.passive,
    once: o.once
  } : o.capture);
};/**
 * Creates Parts when a template is instantiated.
 */

var DefaultTemplateProcessor =
/*#__PURE__*/
function () {
  function DefaultTemplateProcessor() {
    _classCallCheck(this, DefaultTemplateProcessor);
  }

  _createClass(DefaultTemplateProcessor, [{
    key: "handleAttributeExpressions",

    /**
     * Create parts for an attribute-position binding, given the event, attribute
     * name, and string literals.
     *
     * @param element The element containing the binding
     * @param name  The attribute name
     * @param strings The string literals. There are always at least two strings,
     *   event for fully-controlled bindings with a single expression.
     */
    value: function handleAttributeExpressions(element, name, strings, options) {
      var prefix = name[0];

      if (prefix === '.') {
        var _comitter = new PropertyCommitter(element, name.slice(1), strings);

        return _comitter.parts;
      }

      if (prefix === '@') {
        return [new EventPart(element, name.slice(1), options.eventContext)];
      }

      if (prefix === '?') {
        return [new BooleanAttributePart(element, name.slice(1), strings)];
      }

      var comitter = new AttributeCommitter(element, name, strings);
      return comitter.parts;
    }
    /**
     * Create parts for a text-position binding.
     * @param templateFactory
     */

  }, {
    key: "handleTextExpression",
    value: function handleTextExpression(options) {
      return new NodePart(options);
    }
  }]);

  return DefaultTemplateProcessor;
}();
var defaultTemplateProcessor = new DefaultTemplateProcessor();/**
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
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time

(window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.0.0');/**
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

if (typeof window.ShadyCSS === 'undefined') ; else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
  console.warn("Incompatible ShadyCSS version detected." + "Please update to at least @webcomponents/webcomponentsjs@2.0.2 and" + "@webcomponents/shadycss@1.3.1.");
}/**
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
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */
window.JSCompiler_renameProperty = function (prop, _obj) {
  return prop;
};

var defaultConverter = {
  toAttribute: function toAttribute(value, type) {
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
  fromAttribute: function fromAttribute(value, type) {
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

var notEqual = function notEqual(value, old) {
  // This ensures (old==NaN, value==NaN) always returns false
  return old !== value && (old === old || value === value);
};
var defaultPropertyDeclaration = {
  attribute: true,
  type: String,
  converter: defaultConverter,
  reflect: false,
  hasChanged: notEqual
};
var microtaskPromise = Promise.resolve(true);
var STATE_HAS_UPDATED = 1;
var STATE_UPDATE_REQUESTED = 1 << 2;
var STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
var STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
var STATE_HAS_CONNECTED = 1 << 5;
/**
 * Base element class which manages element properties and attributes. When
 * properties change, the `update` method is asynchronously called. This method
 * should be supplied by subclassers to render updates as desired.
 */

var UpdatingElement =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(UpdatingElement, _HTMLElement);

  function UpdatingElement() {
    var _this;

    _classCallCheck(this, UpdatingElement);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UpdatingElement).call(this));
    _this._updateState = 0;
    _this._instanceProperties = undefined;
    _this._updatePromise = microtaskPromise;
    _this._hasConnectedResolver = undefined;
    /**
     * Map with keys for any properties that have changed since the last
     * update cycle with previous values.
     */

    _this._changedProperties = new Map();
    /**
     * Map with keys of properties that should be reflected when updated.
     */

    _this._reflectingProperties = undefined;

    _this.initialize();

    return _this;
  }
  /**
   * Returns a list of attributes corresponding to the registered properties.
   * @nocollapse
   */


  _createClass(UpdatingElement, [{
    key: "initialize",

    /**
     * Performs element initialization. By default captures any pre-set values for
     * registered properties.
     */
    value: function initialize() {
      this._saveInstanceProperties(); // ensures first update will be caught by an early access of `updateComplete`


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

  }, {
    key: "_saveInstanceProperties",
    value: function _saveInstanceProperties() {
      var _this2 = this;

      // Use forEach so this works even if for/of loops are compiled to for loops
      // expecting arrays
      this.constructor._classProperties.forEach(function (_v, p) {
        if (_this2.hasOwnProperty(p)) {
          var value = _this2[p];
          delete _this2[p];

          if (!_this2._instanceProperties) {
            _this2._instanceProperties = new Map();
          }

          _this2._instanceProperties.set(p, value);
        }
      });
    }
    /**
     * Applies previously saved instance properties.
     */

  }, {
    key: "_applyInstanceProperties",
    value: function _applyInstanceProperties() {
      var _this3 = this;

      // Use forEach so this works even if for/of loops are compiled to for loops
      // expecting arrays
      // tslint:disable-next-line:no-any
      this._instanceProperties.forEach(function (v, p) {
        return _this3[p] = v;
      });

      this._instanceProperties = undefined;
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      this._updateState = this._updateState | STATE_HAS_CONNECTED; // Ensure first connection completes an update. Updates cannot complete before
      // connection and if one is pending connection the `_hasConnectionResolver`
      // will exist. If so, resolve it to complete the update, otherwise
      // requestUpdate.

      if (this._hasConnectedResolver) {
        this._hasConnectedResolver();

        this._hasConnectedResolver = undefined;
      }
    }
    /**
     * Allows for `super.disconnectedCallback()` in extensions while
     * reserving the possibility of making non-breaking feature additions
     * when disconnecting at some point in the future.
     */

  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {}
    /**
     * Synchronizes property values when attributes change.
     */

  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, old, value) {
      if (old !== value) {
        this._attributeToProperty(name, value);
      }
    }
  }, {
    key: "_propertyToAttribute",
    value: function _propertyToAttribute(name, value) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultPropertyDeclaration;
      var ctor = this.constructor;

      var attr = ctor._attributeNameForProperty(name, options);

      if (attr !== undefined) {
        var attrValue = ctor._propertyValueToAttribute(value, options); // an undefined value does not change the attribute.


        if (attrValue === undefined) {
          return;
        } // Track if the property is being reflected to avoid
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
        } else {
          this.setAttribute(attr, attrValue);
        } // mark state not reflecting


        this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
      }
    }
  }, {
    key: "_attributeToProperty",
    value: function _attributeToProperty(name, value) {
      // Use tracking info to avoid deserializing attribute value if it was
      // just set from a property setter.
      if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
        return;
      }

      var ctor = this.constructor;

      var propName = ctor._attributeToPropertyMap.get(name);

      if (propName !== undefined) {
        var options = ctor._classProperties.get(propName) || defaultPropertyDeclaration; // mark state reflecting

        this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
        this[propName] = // tslint:disable-next-line:no-any
        ctor._propertyValueFromAttribute(value, options); // mark state not reflecting

        this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
      }
    }
    /**
     * This private version of `requestUpdate` does not access or return the
     * `updateComplete` promise. This promise can be overridden and is therefore
     * not free to access.
     */

  }, {
    key: "_requestUpdate",
    value: function _requestUpdate(name, oldValue) {
      var shouldRequestUpdate = true; // If we have a property key, perform property update steps.

      if (name !== undefined) {
        var ctor = this.constructor;
        var options = ctor._classProperties.get(name) || defaultPropertyDeclaration;

        if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
          if (!this._changedProperties.has(name)) {
            this._changedProperties.set(name, oldValue);
          } // Add to reflecting properties set.
          // Note, it's important that every change has a chance to add the
          // property to `_reflectingProperties`. This ensures setting
          // attribute + property reflects correctly.


          if (options.reflect === true && !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
            if (this._reflectingProperties === undefined) {
              this._reflectingProperties = new Map();
            }

            this._reflectingProperties.set(name, options);
          }
        } else {
          // Abort the request if the property should not be considered changed.
          shouldRequestUpdate = false;
        }
      }

      if (!this._hasRequestedUpdate && shouldRequestUpdate) {
        this._enqueueUpdate();
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

  }, {
    key: "requestUpdate",
    value: function requestUpdate(name, oldValue) {
      this._requestUpdate(name, oldValue);

      return this.updateComplete;
    }
    /**
     * Sets up the element to asynchronously update.
     */

  }, {
    key: "_enqueueUpdate",
    value: function () {
      var _enqueueUpdate2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this4 = this;

        var resolve, reject, previousUpdatePromise, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // Mark state updating...
                this._updateState = this._updateState | STATE_UPDATE_REQUESTED;
                previousUpdatePromise = this._updatePromise;
                this._updatePromise = new Promise(function (res, rej) {
                  resolve = res;
                  reject = rej;
                });
                _context.prev = 3;
                _context.next = 6;
                return previousUpdatePromise;

              case 6:
                _context.next = 10;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](3);

              case 10:
                if (this._hasConnected) {
                  _context.next = 13;
                  break;
                }

                _context.next = 13;
                return new Promise(function (res) {
                  return _this4._hasConnectedResolver = res;
                });

              case 13:
                _context.prev = 13;
                result = this.performUpdate(); // If `performUpdate` returns a Promise, we await it. This is done to
                // enable coordinating updates with a scheduler. Note, the result is
                // checked to avoid delaying an additional microtask unless we need to.

                if (!(result != null)) {
                  _context.next = 18;
                  break;
                }

                _context.next = 18;
                return result;

              case 18:
                _context.next = 23;
                break;

              case 20:
                _context.prev = 20;
                _context.t1 = _context["catch"](13);
                reject(_context.t1);

              case 23:
                resolve(!this._hasRequestedUpdate);

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 8], [13, 20]]);
      }));

      function _enqueueUpdate() {
        return _enqueueUpdate2.apply(this, arguments);
      }

      return _enqueueUpdate;
    }()
  }, {
    key: "performUpdate",

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
    value: function performUpdate() {
      // Mixin instance properties once, if they exist.
      if (this._instanceProperties) {
        this._applyInstanceProperties();
      }

      var shouldUpdate = false;
      var changedProperties = this._changedProperties;

      try {
        shouldUpdate = this.shouldUpdate(changedProperties);

        if (shouldUpdate) {
          this.update(changedProperties);
        }
      } catch (e) {
        // Prevent `firstUpdated` and `updated` from running when there's an
        // update exception.
        shouldUpdate = false;
        throw e;
      } finally {
        // Ensure element can accept additional updates after an exception.
        this._markUpdated();
      }

      if (shouldUpdate) {
        if (!(this._updateState & STATE_HAS_UPDATED)) {
          this._updateState = this._updateState | STATE_HAS_UPDATED;
          this.firstUpdated(changedProperties);
        }

        this.updated(changedProperties);
      }
    }
  }, {
    key: "_markUpdated",
    value: function _markUpdated() {
      this._changedProperties = new Map();
      this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
    }
    /**
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
     */

  }, {
    key: "shouldUpdate",

    /**
     * Controls whether or not `update` should be called when the element requests
     * an update. By default, this method always returns `true`, but this can be
     * customized to control when to update.
     *
     * * @param _changedProperties Map of changed properties with old values
     */
    value: function shouldUpdate(_changedProperties) {
      return true;
    }
    /**
     * Updates the element. This method reflects property values to attributes.
     * It can be overridden to render and keep updated element DOM.
     * Setting properties inside this method will *not* trigger
     * another update.
     *
     * * @param _changedProperties Map of changed properties with old values
     */

  }, {
    key: "update",
    value: function update(_changedProperties) {
      var _this5 = this;

      if (this._reflectingProperties !== undefined && this._reflectingProperties.size > 0) {
        // Use forEach so this works even if for/of loops are compiled to for
        // loops expecting arrays
        this._reflectingProperties.forEach(function (v, k) {
          return _this5._propertyToAttribute(k, _this5[k], v);
        });

        this._reflectingProperties = undefined;
      }
    }
    /**
     * Invoked whenever the element is updated. Implement to perform
     * post-updating tasks via DOM APIs, for example, focusing an element.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * * @param _changedProperties Map of changed properties with old values
     */

  }, {
    key: "updated",
    value: function updated(_changedProperties) {}
    /**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * * @param _changedProperties Map of changed properties with old values
     */

  }, {
    key: "firstUpdated",
    value: function firstUpdated(_changedProperties) {}
  }, {
    key: "_hasConnected",
    get: function get() {
      return this._updateState & STATE_HAS_CONNECTED;
    }
  }, {
    key: "_hasRequestedUpdate",
    get: function get() {
      return this._updateState & STATE_UPDATE_REQUESTED;
    }
  }, {
    key: "hasUpdated",
    get: function get() {
      return this._updateState & STATE_HAS_UPDATED;
    }
  }, {
    key: "updateComplete",
    get: function get() {
      return this._updatePromise;
    }
  }], [{
    key: "_ensureClassProperties",

    /**
     * Ensures the private `_classProperties` property metadata is created.
     * In addition to `finalize` this is also called in `createProperty` to
     * ensure the `@property` decorator can add property metadata.
     */

    /** @nocollapse */
    value: function _ensureClassProperties() {
      var _this6 = this;

      // ensure private storage for property declarations.
      if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
        this._classProperties = new Map(); // NOTE: Workaround IE11 not supporting Map constructor argument.

        var superProperties = Object.getPrototypeOf(this)._classProperties;

        if (superProperties !== undefined) {
          superProperties.forEach(function (v, k) {
            return _this6._classProperties.set(k, v);
          });
        }
      }
    }
    /**
     * Creates a property accessor on the element prototype if one does not exist.
     * The property setter calls the property's `hasChanged` property option
     * or uses a strict identity check to determine whether or not to request
     * an update.
     * @nocollapse
     */

  }, {
    key: "createProperty",
    value: function createProperty(name) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultPropertyDeclaration;

      // Note, since this can be called by the `@property` decorator which
      // is called before `finalize`, we ensure storage exists for property
      // metadata.
      this._ensureClassProperties();

      this._classProperties.set(name, options); // Do not generate an accessor if the prototype already has one, since
      // it would be lost otherwise and that would never be the user's intention;
      // Instead, we expect users to call `requestUpdate` themselves from
      // user-defined accessors. Note that if the super has an accessor we will
      // still overwrite it


      if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
        return;
      }

      var key = _typeof(name) === 'symbol' ? Symbol() : "__".concat(name);
      Object.defineProperty(this.prototype, name, {
        // tslint:disable-next-line:no-any no symbol in index
        get: function get() {
          return this[key];
        },
        set: function set(value) {
          // tslint:disable-next-line:no-any no symbol in index
          var oldValue = this[name]; // tslint:disable-next-line:no-any no symbol in index

          this[key] = value;

          this._requestUpdate(name, oldValue);
        },
        configurable: true,
        enumerable: true
      });
    }
    /**
     * Creates property accessors for registered properties and ensures
     * any superclasses are also finalized.
     * @nocollapse
     */

  }, {
    key: "finalize",
    value: function finalize() {
      if (this.hasOwnProperty(JSCompiler_renameProperty('finalized', this)) && this.finalized) {
        return;
      } // finalize any superclasses


      var superCtor = Object.getPrototypeOf(this);

      if (typeof superCtor.finalize === 'function') {
        superCtor.finalize();
      }

      this.finalized = true;

      this._ensureClassProperties(); // initialize Map populated in observedAttributes


      this._attributeToPropertyMap = new Map(); // make any properties
      // Note, only process "own" properties since this element will inherit
      // any properties defined on the superClass, and finalization ensures
      // the entire prototype chain is finalized.

      if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
        var props = this.properties; // support symbols in properties (IE11 does not support this)

        var propKeys = [].concat(_toConsumableArray(Object.getOwnPropertyNames(props)), _toConsumableArray(typeof Object.getOwnPropertySymbols === 'function' ? Object.getOwnPropertySymbols(props) : [])); // This for/of is ok because propKeys is an array

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = propKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var p = _step.value;
            // note, use of `any` is due to TypeSript lack of support for symbol in
            // index types
            // tslint:disable-next-line:no-any no symbol in index
            this.createProperty(p, props[p]);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
    /**
     * Returns the property name for the given attribute `name`.
     * @nocollapse
     */

  }, {
    key: "_attributeNameForProperty",
    value: function _attributeNameForProperty(name, options) {
      var attribute = options.attribute;
      return attribute === false ? undefined : typeof attribute === 'string' ? attribute : typeof name === 'string' ? name.toLowerCase() : undefined;
    }
    /**
     * Returns true if a property should request an update.
     * Called when a property value is set and uses the `hasChanged`
     * option for the property if present or a strict identity check.
     * @nocollapse
     */

  }, {
    key: "_valueHasChanged",
    value: function _valueHasChanged(value, old) {
      var hasChanged = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : notEqual;
      return hasChanged(value, old);
    }
    /**
     * Returns the property value for the given attribute value.
     * Called via the `attributeChangedCallback` and uses the property's
     * `converter` or `converter.fromAttribute` property option.
     * @nocollapse
     */

  }, {
    key: "_propertyValueFromAttribute",
    value: function _propertyValueFromAttribute(value, options) {
      var type = options.type;
      var converter = options.converter || defaultConverter;
      var fromAttribute = typeof converter === 'function' ? converter : converter.fromAttribute;
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

  }, {
    key: "_propertyValueToAttribute",
    value: function _propertyValueToAttribute(value, options) {
      if (options.reflect === undefined) {
        return;
      }

      var type = options.type;
      var converter = options.converter;
      var toAttribute = converter && converter.toAttribute || defaultConverter.toAttribute;
      return toAttribute(value, type);
    }
  }, {
    key: "observedAttributes",
    get: function get() {
      var _this7 = this;

      // note: piggy backing on this to ensure we're finalized.
      this.finalize();
      var attributes = []; // Use forEach so this works even if for/of loops are compiled to for loops
      // expecting arrays

      this._classProperties.forEach(function (v, p) {
        var attr = _this7._attributeNameForProperty(p, v);

        if (attr !== undefined) {
          _this7._attributeToPropertyMap.set(attr, p);

          attributes.push(attr);
        }
      });

      return attributes;
    }
  }]);

  return UpdatingElement;
}(_wrapNativeSuper(HTMLElement));
/**
 * Marks class as having finished creating properties.
 */

UpdatingElement.finalized = true;/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
var supportsAdoptingStyleSheets = 'adoptedStyleSheets' in Document.prototype && 'replace' in CSSStyleSheet.prototype;
var constructionToken = Symbol();
var CSSResult =
/*#__PURE__*/
function () {
  function CSSResult(cssText, safeToken) {
    _classCallCheck(this, CSSResult);

    if (safeToken !== constructionToken) {
      throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
    }

    this.cssText = cssText;
  } // Note, this is a getter so that it's lazy. In practice, this means
  // stylesheets are not created until the first element instance is made.


  _createClass(CSSResult, [{
    key: "toString",
    value: function toString() {
      return this.cssText;
    }
  }, {
    key: "styleSheet",
    get: function get() {
      if (this._styleSheet === undefined) {
        // Note, if `adoptedStyleSheets` is supported then we assume CSSStyleSheet
        // is constructable.
        if (supportsAdoptingStyleSheets) {
          this._styleSheet = new CSSStyleSheet();

          this._styleSheet.replaceSync(this.cssText);
        } else {
          this._styleSheet = null;
        }
      }

      return this._styleSheet;
    }
  }]);

  return CSSResult;
}();

var textFromCSSResult = function textFromCSSResult(value) {
  if (value instanceof CSSResult) {
    return value.cssText;
  } else {
    throw new Error("Value passed to 'css' function must be a 'css' function result: ".concat(value, ". Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security."));
  }
};
/**
 * Template tag which which can be used with LitElement's `style` property to
 * set element styles. For security reasons, only literal string values may be
 * used. To incorporate non-literal values `unsafeCSS` may be used inside a
 * template string part.
 */


var css = function css(strings) {
  for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  var cssText = values.reduce(function (acc, v, idx) {
    return acc + textFromCSSResult(v) + strings[idx + 1];
  }, strings[0]);
  return new CSSResult(cssText, constructionToken);
};// This line will be used in regexes to search for LitElement usage.
// TODO(justinfagnani): inject version number at build time

(window['litElementVersions'] || (window['litElementVersions'] = [])).push('2.0.1');function _templateObject() {
  var data = _taggedTemplateLiteral(["\n          @-webkit-keyframes fadeIn {\n            0%   { opacity: 0; }\n            100% { opacity: 1; }\n          }\n          @-moz-keyframes fadeIn {\n            0%   { opacity: 0; }\n            100% { opacity: 1; }\n          }\n          @-o-keyframes fadeIn {\n            0%   { opacity: 0; }\n            100% { opacity: 1; }\n          }\n          @keyframes fadeIn {\n            0%   { opacity: 0; }\n            100% { opacity: 1; }\n          }\n\n          @-webkit-keyframes fadeOut {\n            0%   { opacity: 1; }\n            100% { opacity: 0; }\n          }\n          @-moz-keyframes fadeOut {\n            0%   { opacity: 1; }\n            100% { opacity: 0; }\n          }\n          @-o-keyframes fadeOut {\n            0%   { opacity: 1; }\n            100% { opacity: 0; }\n          }\n          @keyframes fadeOut {\n            0%   { opacity: 1; }\n            100% { opacity: 0; }\n          }\n\n          :host {\n            display: block;\n            appearance: none;\n            -moz-appearance: none;\n            -webkit-appearance: none;\n            box-sizing: border-box;\n            --nn-font-family: var(--app-font-family, Roboto, sans-serif);\n            --nn-primary-color: var(--app-primary-color, #455a64);\n            --nn-primary-color-light: var(--app-primary-color-light, #718792);\n            --nn-primary-color-dark: var(--app-primary-color-dark, #1c313a);\n            --nn-secondary-color: var(--app-secondary-color, #512da8);\n            --nn-secondary-color-light: var(--app-secondary-color-light, #8559da);\n            --nn-secondary-color-dark: var(--app-secondary-color-dark, #140078);\n            --nn-boundaries-color: var(--app-boundaries-color, #777);\n            --nn-primary-text: var(--app-primary-text, #777);\n            --nn-secondary-text: var(--app-secondary-text, #000);\n            --nn-text-on-dark: var(--app-text-on-dark, #fff);\n            --nn-text-on-light: var(--app-text-on-light, #000);\n            --nn-error-color: var(--app-error-color, pink);\n            --nn-error-text: var(--app-error-text, darkred);\n            --nn-theme-border-style: var(--app-theme-border-style, solid);\n            --nn-theme-border-width: var(--app-theme-border-width, 1px);\n            --nn-theme-border-color: var(--nn-boundaries-color);\n            --nn-theme-border-radius: var(--app-theme-border-radius, 5px);\n            --nn-theme-border: var(--app-theme-border, var(--nn-theme-border-width) var(--nn-theme-border-style) var(--nn-theme-border-color));\n            --nn-theme-box-shadow: var(--app-theme-box-shadow, none);\n            --nn-theme-box-shadow1: var(--app-theme-box-shadow1, 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06));\n            --nn-theme-box-shadow2: var(--app-theme-box-shadow2, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06));\n            --nn-theme-box-shadow3: var(--app-theme-box-shadow3, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05));\n            --nn-theme-box-shadow4: var(--app-theme-box-shadow4, 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04));\n            --nn-theme-box-shadow5: var(--app-theme-box-shadow5, 0 25px 50px -12px rgba(0, 0, 0, 0.25));\n            --nn-theme-shadow-transition: var(--app-theme-shadow-transition, box-shadow 0.3s cubic-bezier(.25,.8,.25,1));\n            --nn-form-element-height: var(--app-form-element-height, 56px);\n            --nn-form-element-min-width: var(--app-form-element-height, 280px);\n            --nn-background: var(--app-background, #eee);\n            --nn-background-dark: var(--app-background-dark, #ccc);\n          }\n\n          :host([hidden]) {\n            display: none;\n          }\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var Global = function Global(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this)), [css(_templateObject())]);
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject$1() {
  var data = _taggedTemplateLiteral(["\n        "]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var EeDrawer = function EeDrawer(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this) || []), [css(_templateObject$1())]);
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject$2() {
  var data = _taggedTemplateLiteral(["\n        "]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}
var EeNetwork = function EeNetwork(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this) || []), [css(_templateObject$2())]);
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject$3() {
  var data = _taggedTemplateLiteral(["\n        "]);

  _templateObject$3 = function _templateObject() {
    return data;
  };

  return data;
}
var EeSnackBar = function EeSnackBar(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this) || []), [css(_templateObject$3())]);
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject$4() {
  var data = _taggedTemplateLiteral(["\n        "]);

  _templateObject$4 = function _templateObject() {
    return data;
  };

  return data;
}
var EeTabs = function EeTabs(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this) || []), [css(_templateObject$4())]);
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject$5() {
  var data = _taggedTemplateLiteral(["\n          :invalid {\n            border: unset;\n            border-bottom: var(--nn-input-border, var(--nn-theme-border));\n          }\n        "]);

  _templateObject$5 = function _templateObject() {
    return data;
  };

  return data;
}
var EnForm = function EnForm(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this) || []), [css(_templateObject$5())]);
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject$6() {
  var data = _taggedTemplateLiteral(["\n        "]);

  _templateObject$6 = function _templateObject() {
    return data;
  };

  return data;
}
var EnInputRange = function EnInputRange(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this) || []), [css(_templateObject$6())]);
        }
      }]);

      return Base;
    }(base)
  );
};var AddHasValueAttributeMixin = function AddHasValueAttributeMixin(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
      }

      _createClass(Base, [{
        key: "_observeInput",
        value: function _observeInput(e) {
          var target = e.currentTarget;
          this.toggleAttribute('has-value', !!target.value.length);
        }
      }, {
        key: "_observeFocus",
        value: function _observeFocus(e) {
          this.toggleAttribute('has-focus', true);
        }
      }, {
        key: "_observeBlur",
        value: function _observeBlur(e) {
          this.toggleAttribute('has-focus', false);
        }
      }, {
        key: "firstUpdated",
        value: function firstUpdated() {
          _get(_getPrototypeOf(Base.prototype), "firstUpdated", this).call(this);

          this.native.addEventListener('input', this._observeInput);
          this.native.addEventListener('focus', this._observeFocus);
          this.native.addEventListener('blur', this._observeBlur);
        } // It needs to have a specific setter fo the 'value' property. This means
        // that `value` will need to be out of the reflected properties list, and
        // everything that NativeRefletorMixin does, needs to be re-done -- plus
        // the setting of the attribute
        //

      }, {
        key: "reflectProperties",
        get: function get() {
          return _get(_getPrototypeOf(Base.prototype), "reflectProperties", this).filter(function (prop) {
            return prop !== 'value';
          });
        }
      }, {
        key: "value",
        set: function set(newValue) {
          // This is what the setter by nativeReflectorMixin does
          // (But doesn't do it anymore for 'value')
          var dst = this.native;
          var prop = 'value';
          var oldValue = dst.value[prop];
          dst[prop] = newValue; // This needs to happen manually to keep litElement happy

          this._requestUpdate(prop, oldValue); // And finally, set the infamous attribute


          this.toggleAttribute('has-value', !!newValue);
        },
        get: function get() {
          return this.native.value;
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  input {\n    position: unset;\n    position: absolute;\n    opacity: 0;\n    cursor: pointer;\n    height: 0;\n    width: 0;\n  }\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  span.error-message {\n    position: absolute;\n    bottom: 0;\n    transform: translateY(100%);\n    left: 16px;\n    font-size: 80%;\n    white-space:nowrap;\n    opacity: 0;\n    will-change: transform, opacity;\n    transition: all 0.3s ease-in-out;\n  }\n\n  #native:invalid ~ span.error-message {\n    opacity: 1;\n    transform: translateY(10%);\n    transition: all 0.3s ease-in-out;\n  }\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  label, #native:focus ~ label,\n  :host([has-value]) label,\n  #native:placeholder-shown ~ label {\n    top: 12px !important;\n    transform: translateY(-50%);;\n    font-size: 80%;\n    transition: all 0.3s ease-in-out;\n  }\n\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n \n  :host([has-value]) label, \n  #native:focus ~ label, \n  #native:placeholder-shown ~ label {\n    transform: translateY(-130%);\n    font-size: 80%;\n    transition: all 0.3s ease-in-out;\n    margin-left: 0px;\n  }\n\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n   label {\n    position: absolute;\n    display: inline-flex;\n    font-size: 1em;\n    border: var(--nn-label-border, none);\n    color: var(--nn-label-color,  var(--nn-primary-color-light));\n    padding-left: 12px;\n    padding-right: 12px;\n    min-width: fit-content;\n    white-space: nowrap;\n    top: calc(50% - 8px);\n    transform: translateY(-50%);\n    will-change: transform, background-color;\n    transition: all 0.3s ease-in-out;\n  }\n\n  #native:invalid + label,\n  #native:invalid ~ label {\n    background-color: none;\n    --nn-label-color: darkred;\n  }\n\n  ", "\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  :host {\n    position: relative;\n    padding: 0 12px;\n    padding-bottom: 16px;\n    margin: 10px;\n    min-width: var(--nn-form-element-min-width, fit-content);\n    font-family: var(--font-family);\n    transition: all 0.3s ease-in-out;\n  }\n\n  #native {\n    appearance: none;\n    -moz-appearance: none;\n    -webkit-appearance: none;\n    box-sizing: border-box;\n    display: block;\n    border-radius: var(--nn-input-border-radius, 4px 4px 0 0);\n    border-width: 0;\n    border-style: none;\n    border-color: transparent; \n    border-bottom: var(--nn-input-border, var(--nn-theme-border));\n    color: var(--nn-input-color, inherit);\n    background-color: var(--nn-background, #eee);\n    width: 100%;\n    font-size: 1em;\n    padding: 20px 16px 6px;\n    height: var(--nn-form-element-height);\n    box-shadow: var(--nn-theme-box-shadow);\n    transition: all 0.3s ease-in-out;\n  }\n\n  #native:focus,\n  #native:active {\n    outline: none\n  }\n\n  #native::selection {\n    background-color: var(--nn-background-dark);\n  }\n\n  #native:invalid {\n    background-color: var(--nn-error-color);\n    color: var(--nn-error-text);\n    border-color: var(--nn-error-text);\n  }\n\n  ", "\n  ", "\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  :host([has-focus]) {\n    --nn-theme-border: 2px solid var(--nn-primary-color);\n    --nn-background: var(--nn-background-dark);\n    --nn-label-color: var(--nn-primary-color);\n  }\n\n  :host([has-focus]) #native {\n    padding-bottom: 5px;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  :host(:hover) {\n    --nn-background: var(--nn-background-dark);\n    --nn-theme-box-shadow: var(--nn-theme-box-shadow2);\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$7() {
  var data = _taggedTemplateLiteral(["\n  #native:required ~ label div#label-text::after {\n    content: '*';\n    padding-left: 2px;\n    position: relative;\n  }\n"]);

  _templateObject$7 = function _templateObject() {
    return data;
  };

  return data;
}
// It does not aim to be a complete, comprehensive, Material Design components library, but to showcase the flexiblity of the TPE theming system.
// Guidelines can be found in: https://material.io/components

var requiredLabelAsterisk = css(_templateObject$7()); // export const requiredStyle
// export const invalidStyle

var hoverStyle = css(_templateObject2());
var focusStyle = css(_templateObject3());
var inputField = css(_templateObject4(), hoverStyle, focusStyle);
var inputLabel = css(_templateObject5(), requiredLabelAsterisk);
var floatingLabel = css(_templateObject6());
var fixedLabel = css(_templateObject7());
var errorMessage = css(_templateObject8());
var hideNativeWidget = css(_templateObject9());function _templateObject$8() {
  var data = _taggedTemplateLiteral(["\n        "]);

  _templateObject$8 = function _templateObject() {
    return data;
  };

  return data;
}
var NnInputText = function NnInputText(base) {
  return (
    /*#__PURE__*/
    function (_AddHasValueAttribute) {
      _inherits(Base, _AddHasValueAttribute);

      _createClass(Base, null, [{
        key: "properties",
        // Style depends on CSS being able to find label as sibling of the #native element.
        // CSS can select next siblings, but not previous.  This guarantees label is rendered after #native in the shadowDOM
        get: function get() {
          return {
            labelPosition: {
              type: String,
              attribute: false
            },
            validationMessage: {
              type: String,
              attribute: false
            }
          };
        }
      }]);

      function Base() {
        var _this;

        _classCallCheck(this, Base);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(Base).call(this));
        _this.labelPosition = 'after';
        _this.validationMessagePosition = 'after';
        return _this;
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [_get(_getPrototypeOf(Base), "styles", this) || [], inputField, inputLabel, floatingLabel, errorMessage, css(_templateObject$8())];
        }
      }]);

      return Base;
    }(AddHasValueAttributeMixin(base))
  );
};function _templateObject$9() {
  var data = _taggedTemplateLiteral(["\n          :host {\n            display: inline-block;\n            width: fit-content;\n            padding: 10px;\n          }\n\n          :host > input {\n            height: var(--button-height, 30px);\n            -webkit-appearance: none;\n            background-color: var(--button-background, var(--primary-color));\n            border-radius: var(--nn-button-border-radius, 4px);\n            border: var(--nn-button-border, var(--theme-border));\n            border-color: transparent;\n            text-transform: uppercase;\n            color: var(--nn-button-color, var(--text-on-dark));\n            border-image: none;\n          }\n\n          input:hover {\n            filter: brightness(130%);\n          }\n\n          input:active, input:focus {\n            outline: none;\n          }\n\n          input:active, :host([outlined]:not([text])) input:active {\n            transition: all 0.2s ease-out;\n            border-color: rgba(0, 0, 0, 0.1);\n            border-style: inset;\n            border-color: var(--primary-color);\n          }\n\n          :host([text]:not([outlined])) input,\n          :host([text]:not([raised])) input {\n            background-color: transparent;\n            color: var(--nn-button-color, var(--primary-color));\n          }\n\n          :host([text]:not([outlined])) input:active,\n          :host([text]:not([raised])) input:active {\n            border-style: solid;\n            border-width: 1px;\n            border-color: transparent;\n          }\n\n          :host([text]:not([outlined])) input:hover,\n          :host([text]:not([raised])) input:hover {\n            background-color: var(--primary-color-light);\n            color: var(--primary-color-dark)\n          }\n\n          :host([outlined]:not([text])) input,\n          :host([outlined]:not([raised])) input {\n            background-color: transparent;\n            color: var(--nn-button-color, var(--primary-color));\n            border: var(--nn-button-border, var(--theme-border));\n          }\n\n          :host([outlined]:not([text])) input:hover,\n          :host([outlined]:not([raised])) input:hover {\n            background-color: var(--primary-color-light);\n            color: var(--primary-color-dark)\n          }\n\n          :host([raised]:not([text])) input,\n          :host([raised]:not([outlined])) input {\n            box-shadow: var(--theme-box-shadow2);\n            transition: box-shadow 0.2s ease-out;\n          }\n\n          :host([raised]:not([text])) input:active,\n          :host([raised]:not([outlined])) input:active {\n            box-shadow: none;\n            transition: box-shadow 0.2s ease-out;\n            filter: brightness(90%);\n          }\n        "]);

  _templateObject$9 = function _templateObject() {
    return data;
  };

  return data;
}
var NnInputButton = function NnInputButton(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this) || []), [css(_templateObject$9())]);
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject$a() {
  var data = _taggedTemplateLiteral(["\n          :host {\n            display: inline-block;\n            width: fit-content;\n            padding: 10px;\n          }\n\n          button {\n            height: var(--nn-button-height, 30px);\n            -webkit-appearance: none;\n            background-color: var(--nn-button-background, var(--nn-primary-color));\n            border-radius: var(--nn-button-border-radius, 4px);\n            border: var(--nn-button-border, var(--nn-theme-border));\n            border-color: transparent;\n            text-transform: uppercase;\n            color: var(--nn-button-color, var(--nn-text-on-dark));\n            border-image: none;\n          }\n\n          button:hover {\n            filter: brightness(130%);\n          }\n\n          button:active, button:focus {\n            outline: none;\n          }\n\n          button:focus {\n            border-color: rgba(255, 255, 255, 0.7);\n            border-color: var(--nn-primary-color);\n            box-shadow: var(--nn-theme-box-shadow2);\n            filter: brightness(115%);\n          }\n\n          button:active {\n            transition: all 0.2s ease-out;\n            border-style: inset;\n            border-color: var(--nn-primary-color);\n          }\n\n          :host([text]:not([outlined])) button,\n          :host([text]:not([raised])) button {\n            background-color: transparent;\n            color: var(--nn-button-color, var(--nn-primary-color));\n          }\n\n          :host([text]:not([outlined])) button:focus,\n          :host([text]:not([raised])) button:focus {\n            background-color: transparent;\n            color: var(--nn-button-color, var(--primary-color));\n            box-shadow: var(--nn-theme-box-shadow2);\n          }\n\n          :host([text]:not([outlined])) button:active,\n          :host([text]:not([raised])) button:active {\n            border-style: solid;\n            border-width: 1px;\n            border-color: transparent;\n          }\n\n          :host([text]:not([outlined])) button:hover,\n          :host([text]:not([raised])) button:hover {\n            background-color: var(--nn-primary-color-light);\n            color: var(--nn-primary-color-dark)\n          }\n\n          :host([outlined]:not([text])) button,\n          :host([outlined]:not([raised])) button {\n            background-color: transparent;\n            color: var(--nn-button-color, var(--nn-primary-color));\n            border: var(--nn-button-border, var(--nn-theme-border));\n          }\n\n          :host([outlined]:not([text])) button:hover,\n          :host([outlined]:not([raised])) button:hover {\n            background-color: var(--nn-primary-color-light);\n            color: var(--nn-primary-color-dark)\n          }\n\n          :host([raised]:not([text])) button,\n          :host([raised]:not([outlined])) button {\n            box-shadow: var(--nn-theme-box-shadow3);\n            transition: box-shadow 0.2s ease-out;\n          }\n\n          :host([raised]:not([text])) button:active,\n          :host([raised]:not([outlined])) button:active {\n            box-shadow: none;\n            transition: box-shadow 0.2s ease-out;\n            filter: brightness(90%);\n          }\n        "]);

  _templateObject$a = function _templateObject() {
    return data;
  };

  return data;
}
var NnButton = function NnButton(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this) || []), [css(_templateObject$a())]);
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject$b() {
  var data = _taggedTemplateLiteral(["\n          ::slotted(*) fieldset, ::slotted(fieldset) {\n            border-radius: 5px;\n            border-style: solid;\n            padding: 16px;\n          }\n\n          ::slotted(*) legend, ::slotted(legend) {\n            padding-inline-start: 10px !important;\n            padding-inline-end: 10px !important;\n          }\n        "]);

  _templateObject$b = function _templateObject() {
    return data;
  };

  return data;
}
var NnForm = function NnForm(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this) || []), [css(_templateObject$b())]);
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject$c() {
  var data = _taggedTemplateLiteral(["\n          :host {\n            display: block;\n            position: relative;\n            padding-left: 24px;\n            margin-bottom: 12px;\n            cursor: pointer;\n            -webkit-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n          }\n\n          :host::after {\n            content: '';\n            user-select: none;\n            position: absolute;\n            height: 8px;\n            width: 8px;\n            border-radius: 50%;\n            left: 5px;\n            top: 5px;\n            will-change: transform;\n            z-index: 0;\n          }\n\n          :host(:hover)::after {\n            background: var(--nn-primary-color);\n            opacity: 0.1;\n            transform: scale(4);\n            transition: all 0.3s ease-in-out;\n          }\n\n          :host([has-focus])::after {\n            background: var(--nn-primary-color);\n            opacity: 0.4 !important;\n            transform: scale(4);\n            transition: all 0.3s ease-in-out;\n          }\n\n          div#label-text {\n            padding-left: 16px;\n          }\n\n          #native:invalid + label, #native:invalid ~ label {\n            background-color: none;\n            --nn-label-color: darkred;\n          }\n\n          label::before { /* Background box */\n            content: '';\n            position: absolute;\n            top: 0;\n            left: 0;\n            height: 15px;\n            width: 15px;\n            border: 2px solid var(--nn-boundaries-color);\n            border-radius: 3px;\n            transition: background-color 0.3s ease-in-out;\n            z-index: 1;\n          }\n\n          #native:checked ~ label::before {\n            border-color: var(--nn-primary-color);\n            background-color:  var(--nn-primary-color);\n            transition: background-color 0.3s ease-in-out;\n          }\n\n          :host(:hover) label::before {\n            filter: brightness(115%);\n            transition: filter 0.3s ease-in-out;\n            box-shadow: var(--nn-theme-box-shadow2);\n          }\n\n          #native:focus ~ label::before {\n            box-shadow: var(--nn-theme-box-shadow2);\n            border-color: var(--nn-primary-color);\n            filter: brightness(115%);\n          }\n\n          #native:not([checked]):hover ~ label::before {\n            filter: brightness(130%);\n            background-color: var(--nn-primary-color);\n            transition: background-color 0.3s ease-in-out;\n          }\n\n          label::after { /* Checkmark */\n            content: \"\";\n            position: absolute;\n            opacity: 0;\n            will-change: transform, opacity;\n            transition: opacity 0.3s ease-out;\n            z-index: 2;\n          }\n\n          #native:checked ~ label::after {\n            display: block;\n            left: 6px;\n            top: 2px;\n            width: 5px;\n            height: 10px;\n            opacity: 1;\n            border: solid white;\n            border-radius: 2px;\n            border-width: 0 3px 3px 0;\n            -webkit-transform: rotate(405deg);\n            -ms-transform: rotate(405deg);\n            transform: rotate(405deg);\n            transition: transform 0.3s ease-in-out, opacity 0.3s ease-in;\n          }\n        "]);

  _templateObject$c = function _templateObject() {
    return data;
  };

  return data;
}
var NnInputCheckBox = function NnInputCheckBox(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      _createClass(Base, null, [{
        key: "properties",
        // Style depends on CSS being able to find label as sibling of the #native element.
        // CSS can select next siblings, but not previous.  This guarantees label is rendered after #native in the shadowDOM
        get: function get() {
          return {
            labelPosition: {
              type: String,
              attribute: false
            },
            validationMessage: {
              type: String,
              attribute: false
            }
          };
        }
      }]);

      function Base() {
        var _this;

        _classCallCheck(this, Base);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(Base).call(this));
        _this.labelPosition = 'after';
        _this.validationMessagePosition = 'after';
        _this.label = '';
        return _this;
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this) || []), [errorMessage, hideNativeWidget, requiredLabelAsterisk, css(_templateObject$c())]);
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject$d() {
  var data = _taggedTemplateLiteral(["\n        "]);

  _templateObject$d = function _templateObject() {
    return data;
  };

  return data;
}
var NnInputColor = function NnInputColor(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this) || []), [css(_templateObject$d())]);
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject$e() {
  var data = _taggedTemplateLiteral(["\n        "]);

  _templateObject$e = function _templateObject() {
    return data;
  };

  return data;
}
var NnInputDatalist = function NnInputDatalist(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this) || []), [css(_templateObject$e())]);
        }
      }]);

      return Base;
    }(base)
  );
};var NnInputDate = function NnInputDate(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      _createClass(Base, null, [{
        key: "properties",
        // Style depends on CSS being able to find label as sibling of the #native element.
        // CSS can select next siblings, but not previous.  This guarantees label is rendered after #native in the shadowDOM
        get: function get() {
          return {
            labelPosition: {
              type: String,
              attribute: false
            },
            validationMessage: {
              type: String,
              attribute: false
            }
          };
        }
      }]);

      function Base() {
        var _this;

        _classCallCheck(this, Base);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(Base).call(this));
        _this.labelPosition = 'after';
        _this.validationMessagePosition = 'after';
        return _this;
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [_get(_getPrototypeOf(Base), "styles", this) || [], inputField, inputLabel, fixedLabel, errorMessage];
        }
      }]);

      return Base;
    }(base)
  );
};var NnInputDateTimeLocal = function NnInputDateTimeLocal(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      _createClass(Base, null, [{
        key: "properties",
        // Style depends on CSS being able to find label as sibling of the #native element.
        // CSS can select next siblings, but not previous.  This guarantees label is rendered after #native in the shadowDOM
        get: function get() {
          return {
            labelPosition: {
              type: String,
              attribute: false
            },
            validationMessage: {
              type: String,
              attribute: false
            }
          };
        }
      }]);

      function Base() {
        var _this;

        _classCallCheck(this, Base);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(Base).call(this));
        _this.labelPosition = 'after';
        _this.validationMessagePosition = 'after';
        return _this;
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [_get(_getPrototypeOf(Base), "styles", this) || [], inputField, inputLabel, fixedLabel, errorMessage];
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject$f() {
  var data = _taggedTemplateLiteral(["\n        "]);

  _templateObject$f = function _templateObject() {
    return data;
  };

  return data;
}
var NnInputEmail = function NnInputEmail(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this) || []), [css(_templateObject$f())]);
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject$g() {
  var data = _taggedTemplateLiteral(["\n        "]);

  _templateObject$g = function _templateObject() {
    return data;
  };

  return data;
}
var NnInputFile = function NnInputFile(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this) || []), [css(_templateObject$g())]);
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject$h() {
  var data = _taggedTemplateLiteral(["\n        "]);

  _templateObject$h = function _templateObject() {
    return data;
  };

  return data;
}
var NnInputMonth = function NnInputMonth(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this) || []), [css(_templateObject$h())]);
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject$i() {
  var data = _taggedTemplateLiteral(["\n        "]);

  _templateObject$i = function _templateObject() {
    return data;
  };

  return data;
}
var NnInputNumber = function NnInputNumber(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this) || []), [css(_templateObject$i())]);
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject$j() {
  var data = _taggedTemplateLiteral(["\n        "]);

  _templateObject$j = function _templateObject() {
    return data;
  };

  return data;
}
var NnInputPassword = function NnInputPassword(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this) || []), [css(_templateObject$j())]);
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject$k() {
  var data = _taggedTemplateLiteral(["\n          :host {\n            display: block;\n            position: relative;\n            padding-left: 24px;\n            margin-bottom: 12px;\n            cursor: pointer;\n            -webkit-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n          }\n       \n          :host::after {\n            content: '';\n            user-select: none;\n            position: absolute;\n            height: 8px;\n            width: 8px;\n            border-radius: 50%;\n            left: 5px;\n            top: 5px;\n            will-change: transform;\n            z-index: 0;\n          }\n\n          :host(:hover)::after {\n            background: var(--nn-primary-color);\n            opacity: 0.1;\n            transform: scale(4);\n            transition: all 0.3s ease-in-out;\n          }\n\n          :host([has-focus])::after {\n            background: var(--nn-primary-color);\n            opacity: 0.3;\n            transform: scale(4);\n            transition: all 0.3s ease-in-out;\n          }\n\n          div#label-text {\n            padding-left: 16px;\n          }\n\n          #native:invalid {\n            background-color: var(--nn-error-color);\n            color: var(--nn-error-text);\n            border-color: var(--nn-error-text);\n          }\n\n          :invalid {\n            border: unset;\n            border-bottom: var(--nn-input-border, var(--nn-theme-border));\n          }\n\n          #native:invalid + label, #native:invalid ~ label {\n            background-color: none;\n            --nn-label-color: darkred;\n          }\n\n          label::before { /* Background box */\n            content: '';\n            position: absolute;\n            top: 0;\n            left: 0;\n            height: 15px;\n            width: 15px;\n            border: 2px solid var(--nn-boundaries-color);\n            border-radius: 50%;\n            transition: background-color 0.3s ease-in-out;\n            z-index: 1;\n          }\n\n          #native:checked ~ label::before {\n            border-color: var(--nn-primary-color);\n            background-color: transparent;\n            transition: background-color 0.3s ease-in-out;\n          }\n\n          #native:hover ~ label::before {\n            filter: brightness(115%);\n            transition: filter 0.3s ease-in-out;\n          }\n\n          #native:focus ~ label::before {\n            box-shadow: var(--nn-theme-box-shadow2);\n            border-color: var(--nn-primary-color);\n            filter: brightness(115%);\n          }\n\n          #native:not([checked]):hover ~ label::before {\n            filter: brightness(130%);\n            transition: background-color 0.3s ease-in-out;\n          }\n\n          label::after { /* Checkmark */\n            content: \"\";\n            position: absolute;\n            opacity: 0;\n            width: 19px;\n            height: 19px;\n            will-change: transform, opacity;\n            transition: opacity 0.3s ease-out;\n            z-index: 2;\n          }\n\n          #native:checked ~ label::after {\n            display: block;\n            left: 0;\n            top: 0;\n            opacity: 1;\n            background-color:  var(--nn-primary-color);\n            border-radius: 50%;\n            -webkit-transform: scale(0.5);\n            -ms-transform: scale(0.5);\n            transform: scale(0.5);\n            transition: transform 0.3s ease-in-out, opacity 0.3s ease-in;\n          }\n\n        "]);

  _templateObject$k = function _templateObject() {
    return data;
  };

  return data;
}
var NnInputRadio = function NnInputRadio(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      _createClass(Base, null, [{
        key: "properties",
        // Style depends on CSS being able to find label as sibling of the #native element.
        // CSS can select next siblings, but not previous.  This guarantees label is rendered after #native in the shadowDOM
        get: function get() {
          return {
            labelPosition: {
              type: String,
              attribute: false
            },
            validationMessage: {
              type: String,
              attribute: false
            }
          };
        }
      }]);

      function Base() {
        var _this;

        _classCallCheck(this, Base);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(Base).call(this));
        _this.labelPosition = 'after';
        _this.validationMessagePosition = 'after';
        _this.label = '';
        return _this;
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this) || []), [errorMessage, hideNativeWidget, requiredLabelAsterisk, css(_templateObject$k())]);
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject$l() {
  var data = _taggedTemplateLiteral(["\n        "]);

  _templateObject$l = function _templateObject() {
    return data;
  };

  return data;
}
var NnInputRange = function NnInputRange(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this) || []), [css(_templateObject$l())]);
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject$m() {
  var data = _taggedTemplateLiteral(["\n        "]);

  _templateObject$m = function _templateObject() {
    return data;
  };

  return data;
}
var NnInputSearch = function NnInputSearch(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this) || []), [css(_templateObject$m())]);
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject$n() {
  var data = _taggedTemplateLiteral(["\n        "]);

  _templateObject$n = function _templateObject() {
    return data;
  };

  return data;
}
var NnInputSubmit = function NnInputSubmit(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this) || []), [css(_templateObject$n())]);
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject$o() {
  var data = _taggedTemplateLiteral(["\n        "]);

  _templateObject$o = function _templateObject() {
    return data;
  };

  return data;
}
var NnInputTel = function NnInputTel(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this) || []), [css(_templateObject$o())]);
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject$p() {
  var data = _taggedTemplateLiteral(["\n        "]);

  _templateObject$p = function _templateObject() {
    return data;
  };

  return data;
}
var NnInputTime = function NnInputTime(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this) || []), [css(_templateObject$p())]);
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject$q() {
  var data = _taggedTemplateLiteral(["\n        "]);

  _templateObject$q = function _templateObject() {
    return data;
  };

  return data;
}
var NnInputUrl = function NnInputUrl(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this) || []), [css(_templateObject$q())]);
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject$r() {
  var data = _taggedTemplateLiteral(["\n        "]);

  _templateObject$r = function _templateObject() {
    return data;
  };

  return data;
}
var NnInputWeek = function NnInputWeek(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this) || []), [css(_templateObject$r())]);
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject$s() {
  var data = _taggedTemplateLiteral(["\n        "]);

  _templateObject$s = function _templateObject() {
    return data;
  };

  return data;
}
var NnMeter = function NnMeter(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this) || []), [css(_templateObject$s())]);
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject$t() {
  var data = _taggedTemplateLiteral(["\n        "]);

  _templateObject$t = function _templateObject() {
    return data;
  };

  return data;
}
var NnProgress = function NnProgress(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this) || []), [css(_templateObject$t())]);
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject$u() {
  var data = _taggedTemplateLiteral(["\n          :host::after {\n            position: absolute;\n            content: '';\n            border: 4px solid transparent;\n            border-top-color: var(--nn-boundaries-color-color);\n            right: 20px;\n            bottom: 50%;\n            user-select: none;\n          }\n        "]);

  _templateObject$u = function _templateObject() {
    return data;
  };

  return data;
}
var NnSelect = function NnSelect(base) {
  return (
    /*#__PURE__*/
    function (_AddHasValueAttribute) {
      _inherits(Base, _AddHasValueAttribute);

      _createClass(Base, null, [{
        key: "properties",
        // Style depends on CSS being able to find label as sibling of the #native element.
        // CSS can select next siblings, but not previous.  This guarantees label is rendered after #native in the shadowDOM
        get: function get() {
          return {
            labelPosition: {
              type: String,
              attribute: false
            },
            validationMessage: {
              type: String,
              attribute: false
            }
          };
        }
      }]);

      function Base() {
        var _this;

        _classCallCheck(this, Base);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(Base).call(this));
        _this.labelPosition = 'after';
        _this.validationMessagePosition = 'after';
        return _this;
      }

      _createClass(Base, [{
        key: "connectedCallback",
        value: function connectedCallback() {
          var _this2 = this;

          _get(_getPrototypeOf(Base.prototype), "connectedCallback", this).call(this);

          this.onclick = function () {
            _this2.native.click();
          };
        }
      }], [{
        key: "styles",
        get: function get() {
          return [_get(_getPrototypeOf(Base), "styles", this) || [], inputField, inputLabel, fixedLabel, css(_templateObject$u())];
        }
      }]);

      return Base;
    }(AddHasValueAttributeMixin(base))
  );
};function _templateObject$v() {
  var data = _taggedTemplateLiteral(["\n          :host {\n            --nn-form-element-height: 80px;\n          }\n          /* Following material design guidelines, non-resizeable textarea */\n          textarea {\n            font-family: var(--nn-font-family);\n            padding-top: 12px;\n            min-height: 80px;\n            max-height: 80px;\n            resize: none;\n          }\n\n          :host([has-value]) label, \n          #native:focus ~ label, \n          #native:placeholder-shown ~ label {\n            transform: translateY(-200%);\n          }\n        "]);

  _templateObject$v = function _templateObject() {
    return data;
  };

  return data;
}
var NnTextArea = function NnTextArea(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      _createClass(Base, null, [{
        key: "properties",
        // Style depends on CSS being able to find label as sibling of the #native element.
        // CSS can select next siblings, but not previous.  This guarantees label is rendered after #native in the shadowDOM
        get: function get() {
          return {
            labelPosition: {
              type: String,
              attribute: false
            },
            validationMessage: {
              type: String,
              attribute: false
            }
          };
        }
      }]);

      function Base() {
        var _this;

        _classCallCheck(this, Base);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(Base).call(this));
        _this.labelPosition = 'after';
        _this.validationMessagePosition = 'after';
        return _this;
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [_get(_getPrototypeOf(Base), "styles", this) || [], inputField, inputLabel, floatingLabel, errorMessage, css(_templateObject$v())];
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject$w() {
  var data = _taggedTemplateLiteral(["\n        "]);

  _templateObject$w = function _templateObject() {
    return data;
  };

  return data;
}
var EeAutocomplete = function EeAutocomplete(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this) || []), [css(_templateObject$w())]);
        }
      }]);

      return Base;
    }(base)
  );
};function _templateObject$x() {
  var data = _taggedTemplateLiteral(["\n        "]);

  _templateObject$x = function _templateObject() {
    return data;
  };

  return data;
}
var EeAutocompleteInputSpans = function EeAutocompleteInputSpans(base) {
  return (
    /*#__PURE__*/
    function (_base) {
      _inherits(Base, _base);

      function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
      }

      _createClass(Base, null, [{
        key: "styles",
        get: function get() {
          return [].concat(_toConsumableArray(_get(_getPrototypeOf(Base), "styles", this) || []), [inputField, css(_templateObject$x())]);
        }
      }]);

      return Base;
    }(base)
  );
};window.TP_THEME = {
  common: Global,
  'ee-drawer': EeDrawer,
  'ee-network': EeNetwork,
  'ee-snack-bar': EeSnackBar,
  'ee-tabs': EeTabs,
  'ee-autocomplete': EeAutocomplete,
  'ee-autocomplete-input-spans': EeAutocompleteInputSpans,
  'en-form': EnForm,
  'en-input-Range': EnInputRange,
  'nn-button': NnButton,
  'nn-form': NnForm,
  'nn-input-button': NnInputButton,
  'nn-input-checkbox': NnInputCheckBox,
  'nn-input-color': NnInputColor,
  'nn-input-datalist': NnInputDatalist,
  'nn-input-date': NnInputDate,
  'nn-input-date-time-local': NnInputDateTimeLocal,
  'nn-input-email': NnInputEmail,
  'nn-input-file': NnInputFile,
  'nn-input-month': NnInputMonth,
  'nn-input-number': NnInputNumber,
  'nn-input-password': NnInputPassword,
  'nn-input-radio': NnInputRadio,
  'nn-input-range': NnInputRange,
  'nn-input-search': NnInputSearch,
  'nn-input-submit': NnInputSubmit,
  'nn-input-tel': NnInputTel,
  'nn-input-text': NnInputText,
  'nn-input-time': NnInputTime,
  'nn-input-url': NnInputUrl,
  'nn-input-week': NnInputWeek,
  'nn-meter': NnMeter,
  'nn-progress': NnProgress,
  'nn-select': NnSelect,
  'nn-textarea': NnTextArea
};});