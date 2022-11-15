import AsyncStorage from '@react-native-async-storage/async-storage'
import ApiManager from './ApiManager'

export type AuthData = {
  data: {
    data: {
      access_token: string
      renewal_token: string
    },
  },
}

const getAccessToken = async () => {
  const authDataSerialized = await AsyncStorage.getItem('@AuthData')
  if (authDataSerialized) {
    const authDataDeserialized = JSON.parse(authDataSerialized)
    // if (Date.now() + 25 * 60 * 60 >= authDataDeserialized.data.tokenRetrievedAt) {
      
    // }
    return authDataDeserialized.data.data.access_token
  }
}

const signIn = (email: string, password: string): Promise<AuthData> => {
  try {
    return ApiManager('/session', {
      method: 'POST',
      data: { user: { email, password } },
    })
  } catch (e) {
    return e
  }
}

const signUp = (email: string, password: string, username: string): Promise<AuthData> => {
  try {
    return ApiManager('/registration', {
      method: 'POST',
      data: { user: { email, password, password_confirmation: password, username } },
    })
  } catch (e) {
    return e
  }
}

const renew = (renewal_token: string | undefined): Promise<AuthData> => {
  try {
    return ApiManager('/session/renew', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'authorization': `Bearer ${renewal_token}`
      },
      withCredentials: false
    })
  } catch (e) {
    return e
  }
}

export const authService = {
  getAccessToken,
  signIn,
  signUp,
  renew,
}
