/**
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/mercmobily/hot-form)

Too many applications today have AJAX calls that are made without proper error checking. This leads to applications with strangely empty select widgets, and requiring a hard reloads in order to (hopefully) display properly. Network resiliance code is boilerplate, and it's often repeated for each call.

`hot-network` is used to wrap another element that makes AJAX calls, in order to make it Unclickable/gray while the AJAX call is going on
It will also (optionally) manage errors so that it will:
  * Give a differently themed overlay if the call didn't work
  * Give the option to retry a failed AJAX call by clicking on the overlay
  * Communicate to the user in case of problems

The overlay is fully themable with CSS mixins.

# How decorated elements are dealt with

In order to function, hot-network must know the status of the decorated element in order to change its status. This is the rundown of the requirements:

* The decorated element is always the first child of `hot-network`
* `hot-network` will listen to the events `submit`, `request`, `response`, `error` from the decorated element
* You can set `event-prefix` if the element emits the events listed above with a prefix beforehand
* IRON-FORM is a special case: the prefix `iron-form-` is added automatically
* In order to reload in case of loading error, the decorated element's `reload()` or `generateRequest()` is called.
* You can set `reload-method` to something else if your decorated element exposes a different method to reload

# Basic use: make contained element unclickable while AJAX is going on

All you have to do in order to get a contained element unclickable while the AJAX call is going, is wrap it with `<hot-network>`. Make sure the widget making the AJAX call is the first child of `<hot-network>`:

    <hot-network>
      <form is="iron-form" id="iron-form" method="POST" action="/stores/polymer">
        <paper-input required id="name" name="name" label="Your name"></paper-input>
        <paper-button raised type="submit">Click!</paper-button>
      </form>
    </hot-network>

`<hot-network>` will only ever have two states: "loading" (widget is overlayed) or "loaded" (no AJAX call is happening).

# Error management

You can use `<hot-network>` for widgets that are build to display data after making an AJAX call. In this case, you will want to turn on `<hot-network>`'s error management:

    <hot-network manage-errors>
      <data-displayer></data-displayer>
    </hot-network>

In this case, `<hot-network>` will be in one of three states: "loading", "loaded", "error".

When in "error" state, `<data-displayer>` will still be overlayed and unreachable. However, when tapping on the overlay, the AJAX call will be attempted again when overlay is tapped.

If `manage-error` is on, in case of error `<hot-network>` will fire a `user-message-error` event with the message in the detail, like this: `{ message: "Error!" }`. The error message can be customised by setting the `user-message-error` attribute:

    <hot-network manage-errors user-message-error="Cannot load users!">
      <data-displayer></data-displayer>
    </hot-network>

A UI widget should pick up this message event and display it to the user.

Note that `manage-errors` doesn't make sense in a form context because 1) A form that has an error will likely emit its own user message event 2) A form that fails doesn't need to be overlayed to retry: the user will be able to click on the "Submit" button again.

# Usage with `<hot-form>`

The `<hot-form>` element should be wrapped by `<hot-network>` if it's configured to load data. So, when using a form with `<hot-form>`, you should to use two `<hot-network>` elements:

* one decorating `hot-form`, in order to gray the form while loading initial data _and_ give users a chance to re-run the request in case of errors
* one decorating `iron-form`, to gray out the form while the data is being submitted (errors won't be managed since it wouldn't make sense here).

So:

    <hot-network manage-errors>
      <hot-form id="hot-form" record-id="57902ef29b880cd678a3d7a9">
        <hot-network>
          <form is="iron-form" id="iron-form" method="POST" action="/stores/polymer">
            <paper-input required id="name" name="name" label="Your name"></paper-input>
            <paper-input required id="surname" name="surname" label="Your surname"></paper-input>
            <paper-input required type="number" id="age" name="age" label="Your age"></paper-input>
            <paper-toggle-button id="active" name="active" label="Active?">Active?</paper-toggle-button>
            <paper-button raised type="submit">Click!</paper-button>
          </form>
        </hot-network>
      </hot-form>
    </hot-network>

Voila': you have a form that pre-loads and submits data, and that is 100% network-aware:

* During data-loading, the form will be gray
* If data-loading fails, users will be able to re-attempt it (and view an error message)
* While submitting data to the server, the form will be gray

Note that with just one small decorating elements, you end up with a network-aware form.
*/
import { LitElement, html, css } from 'lit-element'
import { StyleableMixin } from '../mixins/StyleableMixin.js'

export class EeNetwork extends StyleableMixin(LitElement) {
  static get styles () {
    return [
      super.styles || [],
      css`
        :host {
          display: block;
          position: relative;
        }

        :host([inline]) {
          display: inline-block;
        }

        #overlay {
          display: none; /* Hide by default */
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          text-align: center;
          transition: background var(--hot-network-transition-duration, 200ms);
          @apply(--hot-network-overlay);
        }
        #overlay.loading {
          display: block;
          color: var(--hot-network-overlay-loading-color, #666);
          /*background-color: var(--hot-network-overlay-loading-background-color, #d9dce0);*/
          background-color: var(--hot-network-overlay-loading-background-color, rgba(102, 102, 102, 0.25));
          @apply(--hot-network-overlay-loading);
        }
        #overlay.loaded {
          @apply(--hot-network-overlay-loaded);
        }
        #overlay.error {
          display: block;
          cursor: pointer; /* Hint that the object is clickable */
          color: var(--hot-network-overlay-error-color, #c00);
          background-color: var(--hot-network-overlay-error-background-color, rgba(255, 0, 0, 0.25));
          @apply(--hot-network-overlay-error);
        }

        #content-wrapper {
          @apply(--hot-network-content);
        }
        #content-wrapper.loading,
        #content-wrapper.error {
          pointer-events: none;
          opacity: 0.25;
          min-height: 1.25rem; /* FIXME: find a proper value, this is made up */
        }
        #content-wrapper.loading {
          @apply(--hot-network-content-loading);
        }
        #content-wrapper.loaded {
          @apply(--hot-network-content-loaded);
        }
        #content-wrapper.error {
          @apply(--hot-network-content-error);
        }
      `
    ]
  }

  render () {
    return html`
      <div id="overlay" @click="${this._overlayClicked}" class="${this.status}">
        ${this._statusMessage(status, this.showLoading)}
      </div>
      <div id="content-wrapper" class="${this.status}">
        <slot></slot>
      </div>
    `
  }

  constructor () {
    super()
    this.showLoading = false
    this.manageErrors = false
    this.reloadMethod = null
    this.noReloadOnTap = false
    this.status = 'loaded'
    this.statusMessages = {
      loading: 'Loading\u2026', // &hellip; equivalent
      loaded: '',
      error: 'An error has occurred. Click here to try again.'
    }

    this.lastInitObject = null
    this.lastUrl = null
  }

  static get properties () {
    return {
      showLoading: {
        type: Boolean,
        attribute: 'show-loading'
      },
      manageErrors: {
        type: Boolean,
        attribute: 'manage-errors'
      },
      reloadMethod: {
        type: String,
        attribute: 'reload-method'
      },
      noReloadOnTap: {
        type: Boolean,
        attribute: 'no-reload-on-tap'
      },
      status: {
        type: String
      },
      statusMessages: {
        type: Object,
        attribute: 'status-messages'
      }
    }
  }

  _overlayClicked (e) {
    if (this.noReloadOnTap) return

    // Stop the event here
    e.stopPropagation()
    e.preventDefault()

    // If the status is 'error', try to reload
    if (this.status === 'error') {
      if (!this.reloadMethod) this.fetch(this.lastUrl, this.lastInitObject)
      else this.reloadMethod(this.lastUrl, this.lastInitObject)
    }
  }

  _statusMessage (status, showLoading) {
    if (!this.statusMessages) return '' /* Was undefined on startup */
    if (status === 'loading' && !showLoading) return ''

    return this.statusMessages[status]
  }

  async fetch (url, initObject) {
    this.lastUrl = url
    this.lastInitObject = initObject

    this.status = 'loading'
    try {
      const response = await fetch(url, initObject)
      if (response.ok) {
        this.status = 'loaded'
      } else {
        if (this.manageErrors) this.status = 'error'
        else this.status = 'loaded'
      }
      return response
    } catch (e) {
      // Set the status
      if (this.manageErrors) this.status = 'error'
      else this.status = 'loaded'

      throw (e)
    }
  }
}
customElements.define('ee-network', EeNetwork)
