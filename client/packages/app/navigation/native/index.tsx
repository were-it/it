import { Ionicons } from '@expo/vector-icons'
import { Button, Image, TouchableOpacity } from 'react-native'
import { View } from 'app/design/view'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

import { HomeScreen } from '../../features/home/screen'
import { SplashScreen } from '../../features/splash/screen'
import { SignUpScreen } from '../../features/sign-up/screen'
import { UserDetailScreen } from '../../features/user/detail-screen'
import { FeedScreen } from '../../features/feed/screen'
import { HealthScreen } from '../../features/health/screen'
import { CalendarScreen } from '../../features/calendar/screen'
import { MoneyScreen } from '../../features/money/screen'
import { NotificationsScreen } from '../../features/notifications/screen'
import { LearningScreen } from '../../features/learning/screen'

const Stack = createNativeStackNavigator<{
  home: undefined
  splash: undefined
  'sign-up': undefined
  'user-detail': {
    id: string
  }
}>()

const ProfileImage = () => {
  return (
              <TouchableOpacity
              // onPress={() => navigation.goBack()}
            >
              <Image
                style={{width: 30, height: 30, borderRadius: 15, marginLeft: 16}}
                accessible
                accessibilityLabel="text"
                source={{
                  uri: 'https://reactnative.dev/img/tiny_logo.png',
                }}
              />
            </TouchableOpacity>
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
        name="Feed"
        component={FeedScreen}
        options={({ navigation, route }) => ({
          headerLeft: () => {
            return <ProfileImage />
          },
          headerRight: () => {
            return (
              <View className="flex-row space-x-2 mr-4">
                <Ionicons name="search-outline" color={'#000000'} backgroundColor="transparent" size={28} />
                <Ionicons name="chatbubble-outline" color={'#000000'} backgroundColor="transparent" size={28} />
              </View>
            )
          },
          tabBarIcon: ({ focused, size }) => {
            let iconName;

            if (route.name === 'Feed') {
              iconName = focused
                ? 'home'
                : 'home-outline';

                return <Ionicons name={iconName} size={size} />;
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
            let iconName;

            if (route.name === 'Calendar') {
              iconName = focused
                ? 'calendar'
                : 'calendar-outline';

                return <Ionicons name={iconName} size={size} />;
            }
          },
        })}
      />
      <Tab.Screen
        name="Money"
        component={MoneyScreen}
        options={({ route }) => ({
          headerLeft: () => {
            return <ProfileImage />
          },
          tabBarIcon: ({ focused, size }) => {
            let iconName;

            if (route.name === 'Money') {
              iconName = focused
                ? 'cash'
                : 'cash-outline';

                return <Ionicons name={iconName} size={size} />;
            }
          },
        })}
      />
      <Tab.Screen
        name="Happiness"
        component={HealthScreen}
        options={({ route }) => ({
          headerLeft: () => {
            return <ProfileImage />
          },
          tabBarIcon: ({ focused, size }) => {
            let iconName;

            if (route.name === 'Happiness') {
              iconName = focused
                ? 'heart'
                : 'heart-outline';

                return <Ionicons name={iconName} size={size} />;
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
            let iconName;

            if (route.name === 'Learning') {
              iconName = focused
                ? 'book'
                : 'book-outline';

                return <Ionicons name={iconName} size={size} />;
            }
          },
        })}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={({ route }) => ({
          headerLeft: () => {
            return <ProfileImage />
          },
          tabBarIcon: ({ focused, size }) => {
            let iconName;

            if (route.name === 'Notifications') {
              iconName = focused
                ? 'notifications'
                : 'notifications-outline';

                return <Ionicons name={iconName} size={size} />;
            }
          },
        })}
      />
      <Tab.Screen
        name="Apps"
        component={NotificationsScreen}
        options={({ route }) => ({
          headerLeft: () => {
            return <ProfileImage />
          },
          tabBarIcon: ({ focused, size }) => {
            let iconName;

            if (route.name === 'Apps') {
              iconName = focused
                ? 'apps'
                : 'apps-outline';

                return <Ionicons name={iconName} size={size} />;
            }
          },
        })}
      />
    </Tab.Navigator>
  )
}

export function NativeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="splash"
        component={SplashScreen}
        options={{
          title: 'It',
        }}
      />
      <Stack.Screen
        name="sign-up"
        component={SignUpScreen}
        options={{
          title: 'Sign up',
        }}
      />
      <Stack.Screen
        name="user-detail"
        component={UserDetailScreen}
        options={{
          title: 'User',
        }}
      />
    </Stack.Navigator>
  )
}
