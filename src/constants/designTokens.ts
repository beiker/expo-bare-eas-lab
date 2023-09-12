// https://wix.github.io/react-native-ui-lib/docs/foundation/colors
// https://github.com/wix/react-native-ui-lib/blob/master/src/style/designTokens.ts
// https://github.com/wix/react-native-ui-lib/blob/master/src/style/designTokensDM.ts

import {Colors} from 'react-native-ui-lib'

import {colorsPalette} from './colorsPalette'

export const designTokens = {
  primaryColor: colorsPalette.green80,
}

export function loadAppDesignTokens() {
  Colors.loadDesignTokens(designTokens)
  Colors.loadSchemes({
    light: {
      screenBG: Colors.grey80,
      $textGeneral: colorsPalette.blue40,
    },
    dark: {
      screenBG: Colors.grey1,
      $textGeneral: colorsPalette.blue40,
    },
  })
}
