import axios from 'axios';

const ApiManager = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    'Accept': 'application/json',
  },
  withCredentials: false,
});

export default ApiManager;
