import axios from 'axios';

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/functions/v1/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});
