import {UserAuth} from '../types'

import {client, gql} from '@/utils/graphql-client'

/**
 * This mutation is used to regenerate a new session token,
 *
 * @param {string} token `refreshToken` we get from the `login` mutation
 */
export async function refreshTokenSession(token: string) {
  return await client<UserAuth>(gqlCheckUserSession, {token})
}

const gqlCheckUserSession = gql`
  mutation refreshToken($token: String!) {
    refreshToken(token: $token) {
      id: userId
      name
      lastName
      email
      householdId
      panelistId
      token
      refreshToken: refresh
    }
  }
`
