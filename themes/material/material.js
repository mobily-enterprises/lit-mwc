import { Global } from './global'

import { EeDrawer } from './elements/ee-drawer'
import { EeNetwork } from './elements/ee-network'
import { EeSnackBar } from './elements/ee-snack-bar'
import { EeTabs } from './elements/ee-tabs'

import { EnForm } from './elements/en-form'
import { EnInputRange } from './elements/en-input-range'

import { NnInputText } from './elements/nn-input-text'
import { NnInputButton } from './elements/nn-input-button'
import { NnButton } from './elements/nn-button'
import { NnForm } from './elements/nn-form'
import { NnInputCheckBox } from './elements/nn-input-checkbox'
import { NnInputColor } from './elements/nn-input-color'
import { NnInputDatalist } from './elements/nn-input-datalist'
import { NnInputDate } from './elements/nn-input-date'
import { NnInputDateTimeLocal } from './elements/nn-input-date-time-local'
import { NnInputEmail } from './elements/nn-input-email'
import { NnInputFile } from './elements/nn-input-file'
import { NnInputMonth } from './elements/nn-input-month'
import { NnInputNumber } from './elements/nn-input-number'
import { NnInputPassword } from './elements/nn-input-password'
import { NnInputRadio } from './elements/nn-input-radio'
import { NnInputRange } from './elements/nn-input-range'
import { NnInputSearch } from './elements/nn-input-search'
import { NnInputSubmit } from './elements/nn-input-submit'
import { NnInputTel } from './elements/nn-input-tel'
import { NnInputTime } from './elements/nn-input-time'
import { NnInputUrl } from './elements/nn-input-url'
import { NnInputWeek } from './elements/nn-input-week'
import { NnMeter } from './elements/nn-meter'
import { NnProgress } from './elements/nn-progress'
import { NnSelect } from './elements/nn-select'
import { NnTextArea } from './elements/nn-textarea'

window.TP_THEME = {
  common: Global,

  'ee-drawer': EeDrawer,
  'ee-network': EeNetwork,
  'ee-snack-bar': EeSnackBar,
  'ee-tabs': EeTabs,

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
}
