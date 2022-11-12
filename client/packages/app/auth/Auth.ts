import AsyncStorage from '@react-native-async-storage/async-storage';
import { register as apiRegister } from './register';
import { login as apiLogin } from './login';

const storeAccessToken = async (value) => {
  try {
    await AsyncStorage.setItem('access_token', value)
  } catch (e) {
    return e
  }
}

const storeRenewalToken = async (value) => {
  try {
    await AsyncStorage.setItem('renewal_token', value)
  } catch (e) {
    return e
  }
}

export const register = async (data) => {
  try {
    const response = await apiRegister(data)
    await storeAccessToken(response.data.access_token)
    await storeRenewalToken(response.data.renewal_token)
  } catch (e) {
    return e
  }
}

export const login = async (data) => {
  try {
    const response = await apiLogin(data)
    await storeAccessToken(response.data.access_token)
    await storeRenewalToken(response.data.renewal_token)
  } catch (e) {
    return e
  }
}

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('access_token')
    await AsyncStorage.removeItem('renewal_token')
  } catch (e) {
    return e
  }
}

export const isSignedIn = (): Promise<Boolean> => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('access_token')
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
}