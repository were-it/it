import { createContext } from 'react'

import type { AuthenticationStatus } from 'app/types'

type AuthContextType = {
  accessToken?: string
  authenticationStatus: AuthenticationStatus

  setAuthenticationStatus: (status: AuthenticationStatus) => void

  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  signup:  (email: string, password: string, username: string) => Promise<boolean>
}

export const AuthContext = createContext<AuthContextType | null>(null)
