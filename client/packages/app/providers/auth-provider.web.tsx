import React from 'react'

import { AuthProvider as AuthProviderBase } from './auth-provider'

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  return <AuthProviderBase>{children}</AuthProviderBase>
}
