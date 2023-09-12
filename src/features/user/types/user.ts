import {ID, Email, DateFormatYYYYMMDD} from '@/types/types'

interface User {
  id: ID
  name: string
  lastName: string
  birthday?: DateFormatYYYYMMDD
  email: Email
}

interface UserAuth extends User {
  token: string
  refreshToken: string
  householdId: ID | null
  panelistId: ID | null
}

export type {User, UserAuth}
