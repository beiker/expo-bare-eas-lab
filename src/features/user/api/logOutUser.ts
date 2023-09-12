import {client, gql} from '@/utils/graphql-client'

/**
 * Log out user
 */
export async function logOutUser() {
  return await client<boolean>(gqlLogOutUser)
}

const gqlLogOutUser = gql`
  mutation logout {
    response: logout
  }
`
