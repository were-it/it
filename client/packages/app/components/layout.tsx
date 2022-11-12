import React from 'react'
import { View } from 'app/design/view'
import { useAuth } from 'app/contexts/AuthContext'
import { H1, Text } from 'app/design/typography'
import { Pressable } from 'react-native'
import { Link } from 'solito/link'
import { Ionicons } from '@expo/vector-icons'
import { styled } from 'nativewind'

interface LayoutProps {
  children: any
}

export default function Layout({ children }: LayoutProps) {
  const { authData, signOut } = useAuth()

  return (
    <>
      {authData ? (
        <View className="grid h-full grid-cols-12 gap-4">
          <View className="col-span-3 py-4 px-6">
            <Link href="/home">
              <H1 className="text-5xl">It</H1>
            </Link>
            <View className="space-y-4">
            <Link href="/home">
              <View className="flex-row items-center space-x-5">
                <Ionicons name="home-outline" size={30} /><Text className="text-lg md:block hidden">Home</Text>
              </View>
            </Link>
            <Link href="/calendar">
              <View className="flex-row items-center space-x-5">
                <Ionicons name="calendar-outline" size={30} /><Text className="text-lg md:block hiddeb">Calendar</Text>
              </View>
            </Link>
            <Link href="/tasks">
              <View className="flex-row items-center space-x-5">
                <Ionicons name="checkbox-outline" size={30} /><Text className="text-lg md:block hidden">Tasks</Text>
              </View>
            </Link>
            <Link href="/life">
              <View className="flex-row items-center space-x-5">
                <Ionicons name="happy-outline" size={30} /><Text className="text-lg md:block hidden">Life</Text>
              </View>
            </Link>
            <Link href="/learning">
              <View className="flex-row items-center space-x-5">
                <Ionicons name="book-outline" size={30} /><Text className="text-lg md:block hidden">Learning</Text>
              </View>
            </Link>
            <Link href="/wealth">
              <View className="flex-row items-center space-x-5">
                <Ionicons name="cash-outline" size={30} /><Text className="text-lg md:block hidden">Wealth</Text>
              </View>
            </Link>
            <Link href="/apps">
              <View className="flex-row items-center space-x-5">
                <Ionicons name="apps-outline" size={30} /><Text className="text-lg md:block hidden">Apps</Text>
              </View>
            </Link>
            <Link href="/notifications">
              <View className="flex-row items-center space-x-5">
                <Ionicons name="notifications-outline" size={30} /><Text className="text-lg md:block hidden">Notifications</Text>
              </View>
            </Link>
            </View>
          </View>
          <View className="col-span-6 border border-b-0 border-t-0 border-gray-100">{children}</View>
          <View className="col-span-3">
            <Pressable onPress={signOut}>Log Out</Pressable>
          </View>
        </View>
      ) : (
        <View className="h-full w-full">{children}</View>
      )}
    </>
  )
}