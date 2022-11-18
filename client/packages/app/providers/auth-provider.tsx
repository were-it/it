import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AppState } from 'react-native'

import { useRouter } from 'solito/router'

import { AuthContext } from 'app/context/auth-context'
import { useAccessTokenManager } from 'app/hooks/auth/use-access-token-manager'
import * as accessTokenStorage from 'app/lib/access-token'
import { deleteAccessToken, useAccessToken } from 'app/lib/access-token'
import { deleteCache } from 'app/lib/delete-cache'
import * as loginStorage from 'app/lib/login'
import * as logoutStorage from 'app/lib/logout'
import { deleteRefreshToken } from 'app/lib/refresh-token'
import { authService } from 'app/services/auth-service'
import type { AuthenticationStatus } from 'app/types'

interface AuthProviderProps {
  children: React.ReactNode
}

const REFRESH_TOKEN_MAX_INTERVAL_MILLISECONDS = 30 * 60 * 1000 // 30 minutes

export function AuthProvider({ children }: AuthProviderProps) {
  const initialRefreshTokenRequestSent = useRef(false)
  const lastRefreshTokenSuccessTimestamp = useRef<number | null>(null)
  const appState = useRef(AppState.currentState)

  //#region status
  const [authenticationStatus, setAuthenticationStatus] =
    useState<AuthenticationStatus>(() =>
      accessTokenStorage.getAccessToken() ? 'AUTHENTICATED' : 'IDLE'
    )
  //#endregion

  //#region hooks
  const { setTokens, refreshTokens } = useAccessTokenManager()
  const router = useRouter()
  //#endregion

  //#region methods
  const login = useCallback(
    async function login(email: string, password: string): Promise<boolean> {
      const response = await authService.signIn(email, password)

      const accessToken = response?.data.data.access_token
      const refreshToken = response?.data.data.renewal_token
      const validResponse = accessToken && refreshToken

      if (validResponse) {
        setTokens(accessToken, refreshToken)
        loginStorage.setLogin(Date.now().toString())
        setAuthenticationStatus('AUTHENTICATED')
        router.push('/home')

        return true
      }

      setAuthenticationStatus('UNAUTHENTICATED')
      throw 'Login failed'
    },
    [router, setTokens, setAuthenticationStatus]
  )

  const logout = useCallback(
    async function logout() {
      loginStorage.deleteLogin()
      logoutStorage.setLogout(Date.now().toString())

      deleteCache()
      deleteRefreshToken()
      deleteAccessToken()

      setAuthenticationStatus('UNAUTHENTICATED')

      router.push('/')
    },
    [router]
  )

  const signup = useCallback(
    async function signup(email: string, password: string, username: string): Promise<boolean> {
      const response = await authService.signUp(email, password, username)

      const accessToken = response?.data.data.access_token
      const refreshToken = response?.data.data.renewal_token
      const validResponse = accessToken && refreshToken

      if (validResponse) {
        setTokens(accessToken, refreshToken)
        loginStorage.setLogin(Date.now().toString())
        setAuthenticationStatus('AUTHENTICATED')
        router.push('/home')

        return true
      }

      setAuthenticationStatus('UNAUTHENTICATED')
      throw 'Signup failed'
    },
    [router, setTokens, setAuthenticationStatus]
  )

  const doRefreshToken = useCallback(async () => {
    setAuthenticationStatus('REFRESHING')
    try {
      await refreshTokens()
      setAuthenticationStatus('AUTHENTICATED')
      lastRefreshTokenSuccessTimestamp.current = new Date().getTime()
    } catch (error: any) {
      setAuthenticationStatus('UNAUTHENTICATED')
      console.error(
        'AuthProvider',
        typeof error === 'string' ? error : error.message || 'unknown'
      )
    }
  }, [refreshTokens, setAuthenticationStatus])
  //#endregion

  //#region variables
  const accessToken = useAccessToken()
  const authenticationContextValue = useMemo(
    () => ({
      authenticationStatus,
      accessToken,
      setAuthenticationStatus,
      login,
      logout,
      signup
    }),
    [authenticationStatus, accessToken, setAuthenticationStatus, login, logout, signup]
  )
  //#endregion

  //#region effects
  useEffect(() => {
    if (!initialRefreshTokenRequestSent.current && accessToken !== null) {
      doRefreshToken()
      initialRefreshTokenRequestSent.current = true
    }
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // Re-request refresh token after TTL
        if (
          lastRefreshTokenSuccessTimestamp.current &&
          new Date().getTime() - lastRefreshTokenSuccessTimestamp.current >
            REFRESH_TOKEN_MAX_INTERVAL_MILLISECONDS
        ) {
          doRefreshToken()
        }
      }

      appState.current = nextAppState
    })

    return () => {
      subscription.remove()
    }
  }, [doRefreshToken])
  //#endregion

  return (
    <AuthContext.Provider value={authenticationContextValue}>
      {children}
    </AuthContext.Provider>
  )
}
