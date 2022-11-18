import axios from 'axios'

const ApiManager = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json',
  },
  withCredentials: false,
})

export default ApiManager
