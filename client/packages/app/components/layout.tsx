import React from 'react'
import { View } from 'app/design/view'
import { H1, Text } from 'app/design/typography'
import { Pressable } from 'react-native'
import { Link } from 'solito/link'
import { Ionicons } from '@expo/vector-icons'
import { useGetMeQuery } from 'app/generated'
import { useAuth } from 'app/hooks/auth/use-auth'

interface LayoutProps {
  children: any
}

export default function Layout({ children }: LayoutProps) {
  const { authenticationStatus, logout } = useAuth()
  const { data } = useGetMeQuery()

  return (
    <>
      {authenticationStatus === 'AUTHENTICATED' ? (
        <View className="grid h-full grid-cols-12 gap-4">
          <View className="col-span-3 py-4 px-6">
            <View className="space-y-4">
              <Link href="/home">
                <H1 className="text-5xl">It</H1>
              </Link>
              <Link href="/home">
                <View className="flex-row items-center space-x-5">
                  <Ionicons name="home-outline" size={30} />
                  <Text className="hidden text-lg md:block">Home</Text>
                </View>
              </Link>
              <Link href="/calendar">
                <View className="flex-row items-center space-x-5">
                  <Ionicons name="calendar-outline" size={30} />
                  <Text className="hiddeb text-lg md:block">Calendar</Text>
                </View>
              </Link>
              <Link href="/tasks">
                <View className="flex-row items-center space-x-5">
                  <Ionicons name="checkbox-outline" size={30} />
                  <Text className="hidden text-lg md:block">Tasks</Text>
                </View>
              </Link>
              <Link href="/life">
                <View className="flex-row items-center space-x-5">
                  <Ionicons name="happy-outline" size={30} />
                  <Text className="hidden text-lg md:block">Life</Text>
                </View>
              </Link>
              <Link href="/learning">
                <View className="flex-row items-center space-x-5">
                  <Ionicons name="book-outline" size={30} />
                  <Text className="hidden text-lg md:block">Learning</Text>
                </View>
              </Link>
              <Link href="/wealth">
                <View className="flex-row items-center space-x-5">
                  <Ionicons name="cash-outline" size={30} />
                  <Text className="hidden text-lg md:block">Wealth</Text>
                </View>
              </Link>
              <Link href="/apps">
                <View className="flex-row items-center space-x-5">
                  <Ionicons name="apps-outline" size={30} />
                  <Text className="hidden text-lg md:block">Apps</Text>
                </View>
              </Link>
              <Link href="/notifications">
                <View className="flex-row items-center space-x-5">
                  <Ionicons name="notifications-outline" size={30} />
                  <Text className="hidden text-lg md:block">Notifications</Text>
                </View>
              </Link>
            </View>
            <View className="mt-6 border-t border-gray-100 pt-6">
              {data?.getMe && <View>{data.getMe.email}</View>}
              <Pressable onPress={logout}>
                <View className="flex-row items-center space-x-2">
                  <Ionicons name="log-out-outline" size={25} />
                  <Text>Log Out</Text>
                </View>
              </Pressable>
            </View>
          </View>
          <View className="col-span-6 border border-b-0 border-t-0 border-gray-100">
            {children}
          </View>
          <View className="col-span-3 py-4 px-6"></View>
        </View>
      ) : (
        <View className="h-full w-full">{children}</View>
      )}
    </>
  )
}
