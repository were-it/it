 import { useCallback, useRef } from 'react'
import * as accessTokenStorage from 'app/lib/access-token'
import * as refreshTokenStorage from 'app/lib/refresh-token'
import { authService } from 'app/services/auth-service'

export function useAccessTokenManager() {
  const isRefreshing = useRef(false)
  const accessToken = accessTokenStorage.useAccessToken()
  const refreshToken = refreshTokenStorage.useRefreshToken()

  //#region setters/getters
  const setAccessToken = useCallback(async function setAccessToken(
    accessToken: string
  ) {
    if (!accessToken || accessToken.length === 0) return
    accessTokenStorage.setAccessToken(accessToken)
  },
  [])

  const setRefreshToken = useCallback(async function setRefreshToken(
    refreshToken: string
  ) {
    if (!refreshToken || refreshToken.length === 0) return
    refreshTokenStorage.setRefreshToken(refreshToken)
  },
  [])

  const setTokens = useCallback(
    async function setTokens(accessToken: string, refreshToken: string) {
      setAccessToken(accessToken)
      setRefreshToken(refreshToken)
    },
    [setAccessToken, setRefreshToken]
  )
  //#endregion

  //#region methods
  const refreshTokens = useCallback(
    async function refreshTokens() {
      if (isRefreshing.current) {
        return
      }
      isRefreshing.current = true

      try {
        // Call refresh API
        const response = await authService.renew(refreshTokenStorage.getRefreshToken())

        const _accessToken = response?.data.data.access_token
        const _refreshToken = response?.data.data.renewal_token

        setAccessToken(_accessToken)
        setRefreshToken(_refreshToken)

        isRefreshing.current = false
      } catch (error: any) {
        isRefreshing.current = false

        throw `Failed to refresh tokens. ${
          typeof error === 'string' ? error : error.message || ''
        }`
      }
    },
    [setAccessToken, setRefreshToken]
  )
  //#endregion

  return {
    setTokens,
    setAccessToken,
    setRefreshToken,
    refreshTokens,
    accessToken,
    refreshToken,
  }
}
