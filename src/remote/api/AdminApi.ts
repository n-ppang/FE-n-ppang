import { api } from '../axiosInstance';
import { VerificationListResponse } from '../response/VerificationResponse';

// 기숙사 인증 요청 목록 조회
export const getUserList = async (page = 0, size = 10): Promise<VerificationListResponse> => {
  const res = await api.get(`/admin/verifications?page=${page}&size=${size}`);
  return res.data;
};

// 기숙사 인증 요청 승인
export const approveUser = async (verificationId: number) => {
  const res = await api.post(`/admin/verifications/${verificationId}/approve`);
  return res.data;
};
