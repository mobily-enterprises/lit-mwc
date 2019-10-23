# TPE: A quick start for designers

## Loading TPE

TPE is loaded by adding three entries to your files:

* The `webcomponentsjs` polyfills for old browsers that do not support web components. Note that adding this file depends on your target audience.
* A TPE theme file, which will decide the theme of your elements
* TPE itself

Designers using the files in `distr` do not have the option to load individual elements. For more information, see [Loading individual elements](appendices/a-loading-individual-elements.html)

In this guide, it will be assumed that TPE is correctly loaded.

Here are some common ways to load TPE.

### Using Unpkg

Add this to the HEAD section of your HTML document:

````
    <script src="https://unpkg.com/@webcomponents/webcomponentsjs/webcomponents-bundle.js"></script>
    <script src="https://unpkg.com/tpe/distr/theme-material.js"></script>
    <script src="https://unpkg.com/tpe/distr/tpe.js"></script>
````

And add a simple text input to see if things worked:

````
    <nn-input-text id="input" name="aName" label="The label"></nn-input-text>
````

### Using NPM to install packages locally

If you want to serve TPE from your local web server, install TPE, as well as the webcomponentsjs polyfill, in your `node_modules` directory:

````
$ npm install @webcomponents/webcomponentsjs
$ npm install tpe

````

And add this to your HEAD section:

````
    <script src="./node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js"></script>
    <script src="./node_modules/tpe/distr/material.js"></script>
    <script src="./node_modules/tpe/distr/tpe.js"></script>
````

## The elements

There are three categories of elements.

### nn (Nearly Native)

The `nn-` elements are a thin wrapper to native elements. They include:

* All of the "type" variations of the `<input>` element. For example, `<input type="text">` has an equivalent `nn-` element called [nn-input-text](elements/nn-input-text.html). The full list of possible types is `button`, `checkbox`, `color`, `date`, `date-time-local`, `email`, `file`, `month`, `number`, `password`, `radio`, `range`, `search`, `submit`, `tel`, `text`, `time`, `url`, `week`. For each type, there is a corresponding `nn-` element.

* The other standard HTML input elements: `<button>`, `<form>`, `<meter>`, `<progress>`, `<select>`, `<textarea>`,

Every `nn-` element has a native element with id `native` in its shadow DOM, . **If you know how to use HTML elements, you know how to use `nn-` ones too**. This is the single most important concept of `nn-` elements: every attribute and every property of the "main" element is mirrored to the native element in the shadow DOM. This means that writing something like this:

````
<nn-input-text id="inp" name="firstName"></nn-input-text>
<script>
  window.document.querySelector('#inp').value = "Tony Mobily"
</script>
````

Will have the end result of creating an `<input>` element in the `nn-input-text`'s shadow DOM where the attribute `name` is `firstName` and the property `value` is `Tony Mobily`. The parent element doesn't reflect specific properties and values: it reflects _nearly everything_.

#### Notes on reflection

In terms of attributes, not everything should be reflected. For example the attributes `id`, `class` and `style` are never reflected from the parent element to the inner native one, since it would most definitely break things.

If you need to assign a specific attribute of the native element in the shadow DOM, you can use a specific syntax:

````
<nn-input-text native::style="color: red" id="inp" name="firstName"></nn-input-text>
````

This line will set the native's style attribute as `color: red`. You can target any element with an ID in the shadow DOM this way, not just `native`.

In terms of properties and methods, only the ones that are part of the native element's API are reflected. For example the properties `value` and `alt` are part of the HTML standard for `<input>` elements, and are therefore reflected.

### en (Enhanced Native)

`en-` elements are very similar to `nn-` ones, as they also implement full reflection; however, they also _extend_ native elements. For example [nn-form](elements/nn-form.html) is a thin wrap around the standard `<form>` element, with the advantage of validating all elements (whereas standard `<form>` elements will only ever validate native HTML form elements, missing anything in the shadow DOM). [nn-form](elements/nn-form.html), on the other hand, is a form on steroids that implements its own submit logic and is capable of preloading records, setting error messages, running hooks before and after submitting, and much more.

### ee (Enhanced Enhanced)

`en-` elements are those elements that are common in UIs but have no HTML native equivalent. Some examples are the [ee-autocomplete](elements/ee-autocomplete.html) decorator, or the [ee-header](elements/ee-header.html), or [ee-tabs](elements/ee-tabs.html).

## Using an element: `<nn-input-text>`

`nn-input` is a "nearly native" element; this means that it's a thin wrapper around `<input type="text">`

### Adding it to your page

To add the element to your page, add this to your page source:

````
<nn-input-text name="field"></nn-input-text>
````

The element is documented in the `elements` section of this documentation: [nn-input-text](elements/nn-input-text.html). That's your first stop before using an element.

### Change some attributes (native ones)

Adding a native attribute is very simple:

````
<nn-input-text maxlength="5" name="field" label="The label"></nn-input-text>
````

Please note that unlike other element libraries, TPE is totally unaware of what `maxlength` is or does, and it's not explicitly forwarded to the contained element. You can use _any_ attribute that is part of the HTML standard, since nearly everything is reflected.

### Change some attributes (non-standard ones)

The `label` attribute is not part of the native HTML specifications. To add a label to an element, simply add a "label" attribute:

````
<nn-input-text name="field" label="The label"></nn-input-text>
````

Alternatively, for labels containing more than text, add a span:

````
<nn-input-text name="field">
    <span slot="label">This is a <b>very</b> complex label</span>
</nn-input-text>
````

Please note that labels and error messages are the extent to which TPE goes in terms of non-native behaviour on native elements.

### Change some CSS property



### Add some custom styling (native:style)

### Add some custom styling/2 (stylesheet=)

## Read on
Tutorials
