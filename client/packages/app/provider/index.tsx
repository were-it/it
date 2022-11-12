import { NavigationProvider } from './navigation'
import { SafeArea } from './safe-area'
import { AuthProvider } from 'app/contexts/AuthContext'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SafeArea>
      <AuthProvider>
        <NavigationProvider>{children}</NavigationProvider>
      </AuthProvider>
    </SafeArea>
  )
}
