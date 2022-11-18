import { Ionicons } from '@expo/vector-icons'
import { Button, Image, TouchableOpacity } from 'react-native'
import { View } from 'app/design/view'
import { useAuth } from 'app/hooks/auth/use-auth'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

import { HomeScreen } from '../../features/home/screen'
import { ProfileScreen } from '../../features/profile/screen'
import { SplashScreen } from '../../features/splash/screen'
import { SignUpScreen } from '../../features/sign-up/screen'
import { LoginScreen } from '../../features/login/screen'
import { UserDetailScreen } from '../../features/user/detail-screen'
import { LifeScreen } from '../../features/life/screen'
import { CalendarScreen } from '../../features/calendar/screen'
import { TasksScreen } from '../../features/tasks/screen'
import { WealthScreen } from '../../features/wealth/screen'
import { NotificationsScreen } from '../../features/notifications/screen'
import { AppsScreen } from '../../features/apps/screen'
import { LearningScreen } from '../../features/learning/screen'
import { useContext, useState } from 'react'
import { useRouter } from 'solito/router'

const Stack = createNativeStackNavigator<{
  home: undefined
  login: undefined
  profile: {
    username: string
  }
  splash: undefined
  'sign-up': undefined
  'user-detail': {
    id: string
  }
}>()

const ProfileImage = () => {
  const { push } = useRouter()
  return (
    <TouchableOpacity
    onPress={() => push('/joshsmith')}
    >
      <Image
        style={{ width: 30, height: 30, borderRadius: 15, marginLeft: 16 }}
        accessible
        accessibilityLabel="text"
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
    </TouchableOpacity>
  )
}

const HeaderRight = () => {
  const { logout } = useAuth()

  return (
    <View className="mr-4 flex-row space-x-2">
      <Ionicons
        name="search-outline"
        color={'#000000'}
        backgroundColor="transparent"
        size={28}
      />
      <Ionicons
        name="chatbubble-outline"
        color={'#000000'}
        backgroundColor="transparent"
        size={28}
      />
      <TouchableOpacity onPress={() => logout()}>
        <Ionicons
          name="log-out-outline"
          color={'#000000'}
          backgroundColor="transparent"
          size={28}
        />
      </TouchableOpacity>
    </View>
  )
}

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          headerLeft: () => {
            return <ProfileImage />
          },
          headerRight: () => {
            return <HeaderRight />
          },
          tabBarIcon: ({ focused, size }) => {
            let iconName

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline'

              return <Ionicons name={iconName} size={size} />
            }
          },
        })}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={({ route }) => ({
          headerLeft: () => {
            return <ProfileImage />
          },
          tabBarIcon: ({ focused, size }) => {
            let iconName

            if (route.name === 'Calendar') {
              iconName = focused ? 'calendar' : 'calendar-outline'

              return <Ionicons name={iconName} size={size} />
            }
          },
        })}
      />
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={({ route }) => ({
          headerLeft: () => {
            return <ProfileImage />
          },
          tabBarIcon: ({ focused, size }) => {
            let iconName

            if (route.name === 'Tasks') {
              iconName = focused ? 'checkbox' : 'checkbox-outline'

              return <Ionicons name={iconName} size={size} />
            }
          },
        })}
      />
      <Tab.Screen
        name="Life"
        component={LifeScreen}
        options={({ route }) => ({
          headerLeft: () => {
            return <ProfileImage />
          },
          tabBarIcon: ({ focused, size }) => {
            let iconName

            if (route.name === 'Life') {
              iconName = focused ? 'happy' : 'happy-outline'

              return <Ionicons name={iconName} size={size} />
            }
          },
        })}
      />
      <Tab.Screen
        name="Learning"
        component={LearningScreen}
        options={({ route }) => ({
          headerLeft: () => {
            return <ProfileImage />
          },
          tabBarIcon: ({ focused, size }) => {
            let iconName

            if (route.name === 'Learning') {
              iconName = focused ? 'book' : 'book-outline'

              return <Ionicons name={iconName} size={size} />
            }
          },
        })}
      />
      <Tab.Screen
        name="Wealth"
        component={WealthScreen}
        options={({ route }) => ({
          headerLeft: () => {
            return <ProfileImage />
          },
          tabBarIcon: ({ focused, size }) => {
            let iconName

            if (route.name === 'Wealth') {
              iconName = focused ? 'cash' : 'cash-outline'

              return <Ionicons name={iconName} size={size} />
            }
          },
        })}
      />
      <Tab.Screen
        name="Apps"
        component={AppsScreen}
        options={({ route }) => ({
          headerLeft: () => {
            return <ProfileImage />
          },
          tabBarIcon: ({ focused, size }) => {
            let iconName

            if (route.name === 'Apps') {
              iconName = focused ? 'apps' : 'apps-outline'

              return <Ionicons name={iconName} size={size} />
            }
          },
        })}
      />
    </Tab.Navigator>
  )
}

export function NativeNavigation() {
  const { authenticationStatus } = useAuth()

  return (
    <Stack.Navigator>
      {authenticationStatus === 'AUTHENTICATED' ? (
        <>
          <Stack.Screen
            name="home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="user-detail"
            component={UserDetailScreen}
            options={{
              title: 'User',
            }}
          />
          <Stack.Screen
            name="profile"
            component={ProfileScreen}
            options={{
              title: 'User',
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="splash"
            component={SplashScreen}
            options={{
              title: 'It',
            }}
          />
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{
              title: 'Log in',
            }}
          />
          <Stack.Screen
            name="sign-up"
            component={SignUpScreen}
            options={{
              title: 'Sign up',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  )
}
