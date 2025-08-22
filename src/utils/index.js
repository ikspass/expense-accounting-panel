import axios from "axios";

const $host = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

const $authHost = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

$host.interceptors.request.use(config => {
  config.headers['X-App-Key'] = process.env.NEXT_PUBLIC_X_APP_KEY;
  return config;
});

const authInterceptor = config => {
  config.headers['X-App-Key'] = process.env.NEXT_PUBLIC_X_APP_KEY;
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export {
  $host,
  $authHost
};