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