import { CommonStyle } from './CommonStyle'

import { NnInputText } from './nn/InputText'
import { NnInputButton } from './nn/InputButton'
import { NnButton } from './nn/Button'
import { NnForm } from './nn/Form'
import { NnInputCheckBox } from './nn/InputCheckBox'
import { NnInputColor } from './nn/InputColor'
import { NnInputDataList } from './nn/InputDataList'
import { NnInputDate } from './nn/InputDate'
import { NnInputDateTimeLocal } from './nn/InputDateTimeLocal'
import { NnInputEmail } from './nn/InputEmail'
import { NnInputFile } from './nn/InputFile'
import { NnInputMonth } from './nn/InputMonth'
import { NnInputNumber } from './nn/InputNumber'
import { NnInputPassword } from './nn/InputPassword'
import { NnInputRadio } from './nn/InputRadio'
import { NnInputRange } from './nn/InputRange'
import { NnInputSearch } from './nn/InputSearch'
import { NnInputSubmit } from './nn/InputSubmit'
import { NnInputTel } from './nn/InputTel'
import { NnInputTime } from './nn/InputTime'
import { NnInputUrl } from './nn/InputUrl'
import { NnInputWeek } from './nn/InputWeek'
import { NnMeter } from './nn/Meter'
import { NnProgress } from './nn/Progress'
import { NnSelect } from './nn/Select'
import { NnTextarea } from './nn/Textarea'

import { EnForm } from './en/Form'
import { EnInputRange } from './en/InputRange'

import { EeDrawer } from './ee/Drawer'
import { EeNetwork } from './ee/Network'
import { EeSnackBar } from './ee/SnackBar'
import { EeTabs } from './ee/Tabs'

window.TP_THEME = {
  common: CommonStyle,
  'nn/InputText': NnInputText,
  'nn/InputButton': NnInputButton,
  'nn/Button': NnButton,
  'nn/Form': NnForm,
  'nn/InputCheckbox': NnInputCheckBox,
  'nn/InputColor': NnInputColor,
  'nn/InputDatalist': NnInputDataList,
  'nn/InputDate': NnInputDate,
  'nn/InputDateTimeLocal': NnInputDateTimeLocal,
  'nn/InputEmail': NnInputEmail,
  'nn/InputFile': NnInputFile,
  'nn/InputMonth': NnInputMonth,
  'nn/InputNumber': NnInputNumber,
  'nn/InputPassword': NnInputPassword,
  'nn/InputRadio': NnInputRadio,
  'nn/InputRange': NnInputRange,
  'nn/InputSearch': NnInputSearch,
  'nn/InputSubmit': NnInputSubmit,
  'nn/InputTel': NnInputTel,
  'nn/InputTime': NnInputTime,
  'nn/InputUrl': NnInputUrl,
  'nn/InputWeek': NnInputWeek,
  'nn/Meter': NnMeter,
  'nn/Progress': NnProgress,
  'nn/Select': NnSelect,
  'nn/Textarea': NnTextarea,

  'en/Form': EnForm,
  'en/InputRange': EnInputRange,

  'ee/SnackBar': EeSnackBar,
  'ee/Drawer': EeDrawer,
  'ee/Tabs': EeTabs,
  'ee/Network': EeNetwork
}
