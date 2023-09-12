import {SplashScreen, router, useRootNavigationState, useSegments} from 'expo-router'
import * as React from 'react'

import {sessionState, useAuthStore} from '@/stores/authStore'

export function useAuthProvider() {
  const segments = useSegments()
  const {user, checkSession} = useAuthStore()
  const rootNavigation = useRootNavigationState()

  React.useEffect(() => {
    if (!rootNavigation) return

    async function run() {
      const session = user ? await checkSession() : sessionState.NOT_AUTHENTICATED
      const inAuthGroup = segments[0] === '(auth)'

      SplashScreen.hideAsync()

      if (session === sessionState.NOT_AUTHENTICATED && !inAuthGroup) {
        router.replace('/sign-in')
      } else if (session === sessionState.AUTHENTICATED && inAuthGroup) {
        router.replace('/')
      }
    }

    run()
  }, [user, segments, rootNavigation])
}
