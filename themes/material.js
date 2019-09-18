import { BaseStyle, InputTextStyle, ButtonStyle } from '../styles/DefaultTheme'

window.TP_THEME = {
  'nn/InputText': (base) => {
    return class Base extends base {
      static get styles () {
        return [ ...super.styles, BaseStyle, InputTextStyle]
      }
    }
  },
  'nn/InputButton': (base) => {
    return class Base extends base {
      static get styles () {
        return [ ...super.styles, BaseStyle]
      }
    }
  }
  'nn/Button': (base) => {
    return class Base extends base {
      static get styles () {
        return [ ...super.styles, BaseStyle]
      }
    }
  },
  'nn/Form': (base) => {
    return class Base extends base {
      static get styles () {
        return [ ...super.styles, BaseStyle]
      }
    }
  },
  'nn/InputCheckbox': (base) => {
    return class Base extends base {
      static get styles () {
        return [ ...super.styles, BaseStyle]
      }
    }
  },
  'nn/InputColor': (base) => {
    return class Base extends base {
      static get styles () {
        return [ ...super.styles, BaseStyle]
      }
    }
  },
  'nn/InputDatalist': (base) => {
    return class Base extends base {
      static get styles () {
        return [ ...super.styles, BaseStyle]
      }
    }
  },
  'nn/InputDate': (base) => {
    return class Base extends base {
      static get styles () {
        return [ ...super.styles, BaseStyle]
      }
    }
  },
  'nn/InputDateTimeLocal': (base) => {
    return class Base extends base {
      static get styles () {
        return [ ...super.styles, BaseStyle]
      }
    }
  },
  'nn/InputEmail': (base) => {
    return class Base extends base {
      static get styles () {
        return [ ...super.styles, BaseStyle]
      }
    }
  },
  'nn/InputFile': (base) => {
    return class Base extends base {
      static get styles () {
        return [ ...super.styles, BaseStyle]
      }
    }
  },
  'nn/InputMonth': (base) => {
    return class Base extends base {
      static get styles () {
        return [ ...super.styles, BaseStyle]
      }
    }
  },
  'nn/InputNumber': (base) => {
    return class Base extends base {
      static get styles () {
        return [ ...super.styles, BaseStyle]
      }
    }
  },
  'nn/InputPassword': (base) => {
    return class Base extends base {
      static get styles () {
        return [ ...super.styles, BaseStyle]
      }
    }
  },
  'nn/InputRadio': (base) => {
    return class Base extends base {
      static get styles () {
        return [ ...super.styles, BaseStyle]
      }
    }
  },
  'nn/InputRange': (base) => {
    return class Base extends base {
      static get styles () {
        return [ ...super.styles, BaseStyle]
      }
    }
  },
  'nn/InputSearch': (base) => {
    return class Base extends base {
      static get styles () {
        return [ ...super.styles, BaseStyle]
      }
    }
  },
  'nn/InputSubmit': (base) => {
    return class Base extends base {
      static get styles () {
        return [ ...super.styles, BaseStyle]
      }
    }
  },
  'nn/InputTel': (base) => {
    return class Base extends base {
      static get styles () {
        return [ ...super.styles, BaseStyle]
      }
    }
  },
  'nn/InputTime': (base) => {
    return class Base extends base {
      static get styles () {
        return [ ...super.styles, BaseStyle]
      }
    }
  },
  'nn/InputUrl': (base) => {
    return class Base extends base {
      static get styles () {
        return [ ...super.styles, BaseStyle]
      }
    }
  },
  'nn/InputWeek': (base) => {
    return class Base extends base {
      static get styles () {
        return [ ...super.styles, BaseStyle]
      }
    }
  },
  'nn/Meter': (base) => {
    return class Base extends base {
      static get styles () {
        return [ ...super.styles, BaseStyle]
      }
    }
  },
  'nn/Progress': (base) => {
    return class Base extends base {
      static get styles () {
        return [ ...super.styles, BaseStyle]
      }
    }
  },
  'nn/Select': (base) => {
    return class Base extends base {
      static get styles () {
        return [ ...super.styles, BaseStyle]
      }
    }
  },
  'nn/Textarea': (base) => {
    return class Base extends base {
      static get styles () {
        return [ ...super.styles, BaseStyle]
      }
    }
  }
}