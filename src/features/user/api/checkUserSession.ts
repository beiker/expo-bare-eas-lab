import {User} from '../types'

import {client, gql} from '@/utils/graphql-client'

/**
 * Check user session, this query only required the token that is
 * already stored in the app storage
 */
export async function checkUserSession() {
  return await client<Pick<User, 'id'>>(gqlCheckUserSession)
}

const gqlCheckUserSession = gql`
  query me {
    response: me {
      id
    }
  }
`
