import { LitElement, html, css } from 'lit-element'
import { StyleableMixin } from './mixins/StyleableMixin.js'
import { ThemeableMixin } from './mixins/ThemeableMixin.js'

export class EeNetwork extends ThemeableMixin('ee-network')(StyleableMixin(LitElement)) {
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
        #overlay.overlay-loading {
          display: block;
          color: var(--hot-network-overlay-loading-color, #666);
          /*background-color: var(--hot-network-overlay-loading-background-color, #d9dce0);*/
          background-color: var(--hot-network-overlay-loading-background-color, rgba(102, 102, 102, 0.25));
        }
        #overlay.clear {
        }
        #overlay.overlay-error {
          display: block;
          cursor: pointer; /* Hint that the object is clickable */
          color: var(--hot-network-overlay-error-color, #c00);
          background-color: var(--hot-network-overlay-error-background-color, rgba(255, 0, 0, 0.25));
        }

        #content-wrapper.overlay-error {
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
      },

      messenger: {
        type: Function,
        attribute: false
      },
      overlayClass: {
        type: String,
        attribute: false
      }
    }
  }

  constructor () {
    super()
    this.manageLoadingErrors = false
    this.reloadMethod = null
    this.noReloadOnTap = false
    this.status = 'loaded'
    this.statusMessages = {
      loading: 'Loading\u2026', // &hellip; equivalent
      saving: 'Saving\u2026', // &hellip; equivalent
      error: 'An error has occurred. Click here to try again.'
    }

    this.lastInitObject = null
    this.lastUrl = null
  }

  render () {
    return html`
      <div id="overlay" class="${this.overlayClass}" @click="${this._overlayClicked}">
        ${this.statusMessages[this.status]}
      </div>
      <div id="content-wrapper" class="${this.status}">
        <slot></slot>
      </div>
    `
  }

  firstUpdated () {
    this._setOverlay()
  }

  _setOverlay () {
    switch (this.status) {
    case 'loaded':
    case 'saved':
    case 'saving-error':
      this.overlayClass = 'clear'
      break
    case 'loading':
    case 'saving':
      this.overlayClass = 'overlay-loading'
      break
    case 'loading-error':
      this.overlayClass = this.manageLoadingErrors ? 'overlay-error' : 'clear'
    }
  }

  _overlayClicked (e) {
    if (this.noReloadOnTap) return

    // Stop the event here
    e.stopPropagation()
    e.preventDefault()

    // If the status is 'error', try to reload
    if (this.status === 'loading-error') {
      if (!this.reloadMethod) this.fetch(this.lastUrl, this.lastInitObject)
      else this.reloadMethod(this.lastUrl, this.lastInitObject)
    }
  }

  messenger () {}

  async fetch (url, initObject) {
    this.lastUrl = url
    this.lastInitObject = initObject

    // Work out manageErrors, which will only ever
    // applu to GET
    const fetchMethod = (initObject && initObject.method && initObject.method.toUpperCase()) || 'GET'
    const isGet = fetchMethod === 'GET'

    this.status = isGet ? 'loading' : 'saving'
    this._setOverlay()
    this.messenger(this.status, url, initObject)
    try {
      const response = await fetch(url, initObject)
      if (response.ok) {
        this.status = isGet ? 'loaded' : 'saved'
      } else {
        this.status = isGet ? 'loading-error' : 'saving-error'
      }
      this._setOverlay()
      this.messenger(this.status, url, initObject, response)
      return response
    } catch (e) {
      this.status = isGet ? 'loading-error' : 'saving-error'
      this._setOverlay()
      this.messenger(this.status, url, initObject)
      throw (e)
    }
  }
}
customElements.define('ee-network', EeNetwork)
