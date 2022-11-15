import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { useGetUserQuery } from 'app/generated'
import { createParam } from 'solito'
const { useParam } = createParam()

export function ProfileScreen() {
  const [username] = useParam('username')
  const enabled = username !== null
  const {data} = useGetUserQuery({username: username || '404'}, {enabled})

  return (
    <View className="flex-1 items-center justify-center px-5 py-8 mx-auto w-full">
      <Text>Profile.</Text>
      <Text>{data?.getUser?.username}</Text>
    </View>
  )
}
