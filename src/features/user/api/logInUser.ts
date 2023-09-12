import {UserAuth} from '../types'

import {client, gql} from '@/utils/graphql-client'

/**
 * Log in user
 *
 * @param {string} username user's username
 * @param {string} password user's password
 */
export async function logInUser(username: string, password: string) {
  return await client<UserAuth>(gqlLogInUser, {username, password})
}

const gqlLogInUser = gql`
  mutation login($username: String!, $password: String!) {
    response: login(username: $username, password: $password, remember: true) {
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
