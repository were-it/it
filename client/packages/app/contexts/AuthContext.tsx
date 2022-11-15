import React, { createContext, useState, useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { AuthData, authService } from '../services/auth-service'

type AuthContextData = {
  authData?: AuthData
  loading: boolean
  signIn(email: string, password: string): Promise<void>
  signUp(email: string, password: string, username: string): Promise<void>
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface AuthProviderProps {
  children?: React.ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStorageData()
  }, [])

  async function loadStorageData(): Promise<void> {
    try {
      const authDataSerialized = await AsyncStorage.getItem('@AuthData')
      if (authDataSerialized) {
        const _authData: AuthData = JSON.parse(authDataSerialized)
        setAuthData(_authData)
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    const _authData = await authService.signIn(email, password)
    setAuthData({ ..._authData, tokenRetrievedAt: Date.now()})
    AsyncStorage.setItem('@AuthData', JSON.stringify(_authData))
  }

  const signUp = async (email: string, password: string, username: string) => {
    const _authData = await authService.signUp(email, password, username)
    setAuthData({ ..._authData, tokenRetrievedAt: Date.now()})
    AsyncStorage.setItem('@AuthData', JSON.stringify(_authData))
  }

  const renew = async (renewal_token: string) => {
    const _authData = await authService.renew(renewal_token)
    setAuthData({ ..._authData, tokenRetrievedAt: Date.now()})
    AsyncStorage.setItem('@AuthData', JSON.stringify(_authData))
  }

  const signOut = async () => {
    setAuthData(undefined)
    await AsyncStorage.removeItem('@AuthData')
  }

  return (
    <AuthContext.Provider
      value={{ authData, loading, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { AuthContext, AuthProvider, useAuth }
