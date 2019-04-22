export const inputPropertiesList = ['autofocus', 'autocomplete', 'form', 'formaction', 'formenctype', 'formmethod', 'formnovalidate', 'formtarget', 'name', 'type', 'value']

function makeInputProperties(){
  var props = {}

  for (let attribute of inputPropertiesList) {
    props[attribute] = {
      attribute,
      reflect: false,
      converter: { fromAttribute: (value, type) => { } }
    }
  }
  return props
}

export const inputProperties = makeInputProperties()
