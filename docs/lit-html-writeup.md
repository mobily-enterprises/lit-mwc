
# template-result
One of the possible "values" of a "part".
It holds:
* the JS template info (strings and values)
* The type (html or svg)
* The templateProcessor (by default, defaultTemplateProcessor is used in the `render` function)
templateResult has a `getTemplateElement()` method which will return an HTML template containing the value of the template -- with special lit-html markers as placeholders for the values

# part

There are several types of parts: `NodePart`, `BooleanAttributePart`, `PropertyPart`, `AttributePart`, `EventPart`. Each takes different constructor parameters, depending on what they are. Each part has a `commit()` function which will end up finalising its `value` property. (the `setValue()` method only sets the `_pendingValue` property, and `commit()` converts that `_pendingValue` into a final value)

## NodePart
------------------------
### template-factory
It's a CACHING function that, given a `templateResult`, will return an HTML template. See it as a caching JSTemplate -> HTMLTemplate. It's passed as the first parameter to 'NodePart'
-------------------------

It's a "part" which holds a value and _may_ be appended to a node.
It holds:
* a templateFactory
* startNode/endNode (set with appendTo)
* a `value` (as well as a `_pendingValue`)
The "value" can be a `templateResult`, a node, an iterable, a directive, or a string.
The part created is also cached in a WeakMap called "parts", using the container HTML element as a key

# html and render
When running `html`, a `templateResult` element is created based on the strings and the values of the JS template, of type `html` and using the default `templateProcessor`.
Basically: `TemplateResult(strings, values, 'html', defaultTemplateProcessor)`
Then, when `render` is called, passing it the `templateResult` and the containing element --  as well as `templateFactory` to create the HTML template.

# render
The `render()` call takes two parameters:
* a `templateResult`
* a container (an HTML node containing the part)
* a `templateFactory` (then passed as a parameter to the NodePart constructor to create cached templates)
It will empty the HTML element and create a "part" and "append" the part to the container (which means creating two comment nodes in the container, )

# part.commit

The bomb. A part without a value doesn't do much. For example `render` creates a new NodePart passing along the `templateFactory`, and sets the `templateResult` as value with `part.setValue()`. However, nothing has really happened: `templateResult` is just a bunch of strings and values, `part` only has its `_pendingValue`.

Running `part.commit()`, the real deal happens.

In case of NodePart, which can hold all sorts of values (an attribute, a property, a text value, a `TemplateResult`), what happens depends on the type of the value. In case of `TemplateResult`, which can hold all sorts of values, it will


# template
A Template object is built starting from a TemplateResult (which, as a reminder, is basically the list of strings and values) with two properties populated straight at `constructor` time using `document.createTreeWalker()`:
* `element` which is a generic, CACHABLE HTML template free from any marker and any instance-specific contents, and
* `parts` which is a list of "meta-parts": it indexes the unique spot in the HTML template and the part type. So, they are not "real" parts as such

# template-instance
A template-instance object. It's nearly the same as a template, except that:
* `template` points to a `template` object (which in turns contains the HTML `element` and the pseudo-parts)
* `_parts` actually has proper lit-html parts objects  

It also stores `TemplateFactory` stored as the `getTemplate` method and a `TemplateProcessor` stored as `processor`.
It provides a crucial method, called `_clone()`, which also uses `documet.createTreeWalker()` to go through the template and create
