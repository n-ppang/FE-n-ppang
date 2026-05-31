import { api } from '@/remote/axiosInstance';
import type { LoginRequest } from '../request/auth/LoginRequest';
import type { SignupRequest } from '../request/auth/SignupRequest';
import type { VerificationRequest } from '../request/auth/VerificationRequest';

export const login = async (data: LoginRequest) => {
  const res = await api.post('/auth/login', data);
  return res.data;
};

export const signup = async (data: SignupRequest) => {
  const res = await api.post('/auth/signup', data);
  return res.data;
};

export const verification = async (data: VerificationRequest) => {
  const res = await api.post('/verification', data);
  return res.data;
};
