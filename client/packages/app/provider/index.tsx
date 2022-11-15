import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NavigationProvider } from './navigation'
import { SafeArea } from './safe-area'
import { AuthProvider } from 'app/providers/auth-provider'

const queryClient = new QueryClient()

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SafeArea>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationProvider>{children}</NavigationProvider>
        </QueryClientProvider>
      </AuthProvider>
    </SafeArea>
  )
}
