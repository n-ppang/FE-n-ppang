import { api } from '@/remote/axiosInstance';
import type { LoginRequest } from '../request/auth/LoginRequest';
import type { SignupRequest } from '../request/auth/SignupRequest';
import type { VerificationRequest } from '../request/auth/VerificationRequest';
import type { ImgUploadResponse } from '../response/ImgUploadResponse';

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

export const imgUpload = async (file: File): Promise<ImgUploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  
  // 'type' 파라미터를 쿼리 스트링으로 추가하여 요청을 보냅니다.
  const res = await api.post('/images', formData, {
    params: {
      type: 'VERIFICATION',
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
}
