import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

export function Fonts({ children }) {
  const [ready] = useFonts({
    Inter_900Black,
  });

  if (!ready) {
    return null
  }

  return <>{children}</>
}
