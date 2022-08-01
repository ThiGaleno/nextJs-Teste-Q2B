import axios from 'axios';

const isBrowser = typeof window !== 'undefined';
const token = isBrowser && localStorage.getItem('token') || ''

export const Axios = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,

  },
});