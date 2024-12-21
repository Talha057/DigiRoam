import axios from 'axios';

export const BASE_URL = 'https://dev.roamdigi.com/api';

export const apiManager = axios.create({
  baseURL: BASE_URL,
});
