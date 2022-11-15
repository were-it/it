import { createContext } from 'react'

import type { AuthenticationStatus } from 'app/types'

type AuthContextType = {
  authenticationStatus: AuthenticationStatus
  accessToken?: string

  setAuthenticationStatus: (status: AuthenticationStatus) => void

  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)
