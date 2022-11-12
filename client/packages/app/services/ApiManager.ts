import axios from 'axios'
import Constants from 'expo-constants'

const apiUrl = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:4000/api'

const ApiManager = axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: 'application/json',
  },
  withCredentials: false,
})

export default ApiManager
