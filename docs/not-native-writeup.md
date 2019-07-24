#Not-Native Elements (or Non-Native?)
These are LitElement based custom elements which provide common web application UI and UX patterns that do **not** have a native web platform counterpart. The current not-native-elements are:

* nn-layout
* nn-drawer
* nn-tabs
* nn-network

## not-native-layout
Provides a easy to use responsive layout wrapper for applications views.

## not-native-drawer
Simple, straightforward implementation of the commonly used drawer widget. Supports essentials like fixed or hiding drawer, dragging, auto-hiding, basic styling. Also provides complete styling override.

## not-native-tabs
Makes it easy to place a navigation tab bar any where on the app. Includes it's own native <nav> element, allows styling.

## not-native-network
Handles network activity of children elements and gives visual feedback to the users. nn-network makes this possible by wrapping the fetch API and relaying the events to the user.
This is the full list of features: 

  Make requests using the native Fetch API
  * fetch() is wrapped inside a method in nn-network. It must be used directly, by calling the method itself, using the exact same arguments: a URL and an optinal RequestInit Object (i.e.: this.shadowRoot.querySelector('nn-network#my-example').fetch(url))
  * nn-network takes care of making the call and firing the events for each step and the result, be it an error or a successful response, and returns the result asynchronously
  
  Network activity awareness
  * Shows styled overlay and disables children elements interations while request is pending, listening for internal events 
  * The same events bubble up and can be used outside the element by passing callbacks in the attributes on-submit, on-request, on-response and on-error
  * 

  Error-handling
  * Give a differently themed overlay if the call didn't work
  * Give the option to retry a failed AJAX call by clicking on the overlay
  * Communicate to the user in case of problems

#Error handling mechanism 
nn-network stores a clone of the full object used by hotFetch to make the request. If there's an error, a properly theme overlay is shown, with a retry button. 
If the user clicks on the button to retry, it will re-run Fetch with the same parameters
If the user dismisses the error, it will cancel the request and get rid of the overlay