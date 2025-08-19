import axios from "axios";

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = config => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  config.headers['X-App-Key'] = 'app3_68a1921f001e';
  return config;
}

$authHost.interceptors.request.use(authInterceptor)

export {
  $host,
  $authHost
}