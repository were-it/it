import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { View } from 'app/design/view'
import { Pressable } from 'react-native'
import { useRouter } from 'solito/router'

export function SplashScreen() {
  const { push } = useRouter()

  return (
    <View className="flex-1 items-center justify-center px-6 py-8 mx-auto w-full">
      <H1 className="text-9xl">It</H1>
      <Text>By the people, for the people.</Text>
      <View className="w-full sm:max-w-md mt-6">
        <Pressable onPress={() => push('/login')}>
          <View className="bg-gray-900 w-full py-3 items-center rounded-md">
            <Text className="text-white font-bold">Log In</Text>
          </View>
        </Pressable>
      </View>
      <View className="w-full sm:max-w-md mt-2">
        <Pressable onPress={() => push('/sign-up')}>
          <View className="bg-blue-600 w-full py-3 items-center rounded-md">
            <Text className="text-white font-bold">Sign Up</Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
}
