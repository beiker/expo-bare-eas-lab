import {Colors, SchemeType} from 'react-native-ui-lib'
import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'

import {appStorageId, zustandStorage} from './zustandPersistMiddleware'

interface ThemeState {
  themeMode: SchemeType
  changeThemeMode: (themeMode: SchemeType) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      themeMode: 'light',
      changeThemeMode: themeMode => {
        Colors.setScheme(themeMode)
        set({themeMode})
      },
    }),
    {
      name: appStorageId,
      storage: createJSONStorage(() => zustandStorage),
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) {
            Colors.setScheme(state?.themeMode ?? 'light')
          }
        }
      },
    }
  )
)
