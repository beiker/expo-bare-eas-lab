import {SplashScreen, router, useRootNavigationState, useSegments} from 'expo-router'
import * as React from 'react'

import {User} from '@/features/user/types'

interface AppContext {
  user: User | undefined
}

const AuthContext = React.createContext<AppContext | undefined>(undefined)

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user: User | null) {
  const segments = useSegments()
  const rootNavigation = useRootNavigationState()

  React.useEffect(() => {
    if (!rootNavigation) return

    const inAuthGroup = segments[0] === '(auth)'

    SplashScreen.hideAsync()

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace('/sign-in')
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace('/')
    }
  }, [user, segments, rootNavigation])
}

export function useAuth() {
  const context = React.useContext(AuthContext)

  if (!context) {
    throw new Error('`useAuth` should be used with AppProvider component')
  }

  return context
}

export function AppProvider(props: {children: React.ReactNode}) {
  const user = null

  useProtectedRoute(user)

  const value = React.useMemo(
    () => ({
      user: undefined,
    }),
    []
  )

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}
