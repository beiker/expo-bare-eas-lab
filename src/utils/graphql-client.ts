import {GraphQLClient, gql, RequestDocument, Variables} from 'graphql-request'

import {UserAuth} from '@/features/user/types'
import {appStorageId, mmkvAuthStorage} from '@/stores/zustandPersistMiddleware'

type RequestResponse<Node> = {response: Node}
type AppStorageState = {state: {user: UserAuth}}

/**
 * Env variable for graphql
 */
const apiUrl = process.env.EXPO_PUBLIC_API_URL as string

/**
 * Init GraphQLClient with endpoint
 */
const gqlClient = new GraphQLClient(apiUrl)

/**
 * Request a petition to the backend, it returns a Promise with the endpoint data
 * or a Promise rejection just in case of an error.
 *
 * @param {RequestDocument} request
 * @param {Variables} variables
 */
async function client<ResponseType = unknown>(
  request: RequestDocument,
  variables?: Variables
): Promise<ResponseType> {
  try {
    const appStorage = JSON.parse(mmkvAuthStorage.getString(appStorageId)!) as AppStorageState
    const token = appStorage.state?.user?.token ?? null

    if (token) {
      gqlClient.setHeader('authorization', `Bearer ${token}`)
    }

    const data = await gqlClient.request<RequestResponse<ResponseType>>(request, variables)

    return data.response
  } catch (error: unknown) {
    throw new Error(JSON.stringify(error))
  }
}

export {client, gql}
