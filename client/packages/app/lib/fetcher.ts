import { getAccessToken } from 'app/lib/access-token'
import Constants from 'expo-constants';

let endpointUrl: string

if (typeof process.env.NEXT_PUBLIC_API_URL === 'undefined') {
  throw new Error('NEXT_PUBLIC_API_URL is required!')
} else {
  endpointUrl = `${process.env.NEXT_PUBLIC_API_URL}/api`
}

/**
 * @name fetcher
 * @param query The GraphQL Query/Mutation.
 * @param variables The arguments passed/required by the Query/Mutation.
 * @description This function is only used in the codegen.yml.
 * It should not be used manually elsewhere.
 * @returns Promise<TData>
 */
export const fetcher = <TData, TVariables>(
  query: string,
  variables?: TVariables,
  _options?: RequestInit['headers'],
): (() => Promise<TData>) => {
  return async () => {
    let headers: HeadersInit | undefined
    const accessToken = getAccessToken()
    headers = accessToken
      ? {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      : { 'Content-Type': 'application/json' }

    const res = await fetch(endpointUrl, {
      body: JSON.stringify({ query: query.trim(), variables }),
      headers,
      method: 'POST',
    })

    const { data, errors } = await res.json()

    if (errors) {
      const { message } = errors[0] || 'An unknown error occurred'
      throw new Error(message)
    }

    return data as TData
  }
}
