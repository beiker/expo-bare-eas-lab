import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'

import {appStorageId, zustandStorage} from './zustandPersistMiddleware'

import {checkUserSession, logInUser, logOutUser, refreshTokenSession} from '@/features/user/api'
import {UserAuth} from '@/features/user/types'

type LoginParams = {username: string; password: string}
export const sessionState = {
  AUTHENTICATED: 'AUTHENTICATED',
  NOT_AUTHENTICATED: 'NOT_AUTHENTICATED',
} as const
export type SessionState = keyof typeof sessionState

interface AuthState {
  user: UserAuth | null
  logIn: (params: LoginParams) => void
  logOut: () => void
  checkSession: () => Promise<SessionState>
  refreshSession: () => Promise<SessionState>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      logIn: async ({username, password}) => {
        const user = await logInUser(username, password)
        set({user})
      },
      logOut: async () => {
        const isLogOutSuccess = await logOutUser()
        if (isLogOutSuccess) {
          set({user: null})
        }
      },
      checkSession: async () => {
        try {
          await checkUserSession()
          return sessionState.AUTHENTICATED
        } catch {
          if (get().user?.refreshToken) {
            return await get().refreshSession()
          }
          set({user: null})
          return sessionState.NOT_AUTHENTICATED
        }
      },
      refreshSession: async () => {
        try {
          const refreshToken = get().user?.refreshToken ?? null
          if (refreshToken) {
            const userRefreshed = await refreshTokenSession(refreshToken)
            set({user: userRefreshed})
            return sessionState.AUTHENTICATED
          }
          return sessionState.NOT_AUTHENTICATED
        } catch {
          return sessionState.NOT_AUTHENTICATED
        }
      },
    }),
    {
      name: appStorageId,
      storage: createJSONStorage(() => zustandStorage),
    }
  )
)
