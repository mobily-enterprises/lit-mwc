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

# nn-

Element includes a "native" one. Every attribute and property is reflected.

# en-

# ee-

Pick an element

See how it works

See how to theme it

## Using the input

Adding it to your page
Change some attributes (native ones)
Change some attributes (non-standard ones)
Change some CSS property
Add some custom styling (native:style)
Add some custom styling/2 (stylesheet=)

## Using the elements in a standard HTML form

## Using the elements in a en-form

## Read on
Tutorials
Documentation
