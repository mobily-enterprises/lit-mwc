export const StyleableMixin = (base) => {
  return class Base extends base {
    firstUpdated () {
      super.firstUpdated()

      // Add the equivalent of
      // <slot name="style" id="style-slot"></slot>
      // To the shadow DOM
      const styleSlot = document.createElement('slot')
      styleSlot.setAttribute('name', 'style')
      styleSlot.setAttribute('id', 'style-slot')
      this.shadowRoot.appendChild(styleSlot)

      // If an element has one or more <any-tag slot="style"> in its
      // light DOM, the newly added styleSlot will have
      // them  as an assigned element.
      // Clone over all of the ones where any-tag is `style`.
      // So, any <style slot="style"> will be cloned over
      for (const styleElement of styleSlot.assignedElements()) {
        if (styleElement.tagName === 'STYLE') {
          this.shadowRoot.appendChild(styleElement)
        }
      }
    }
  }
}
