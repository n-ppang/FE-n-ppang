import axios from 'axios';
import supabase from './Supabase';

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const token = session?.access_token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
