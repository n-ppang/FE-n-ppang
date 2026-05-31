import { api } from '@/remote/axiosInstance';
import type { ProductSharingCreateRequest } from '../request/ProductSharingCreateRequest';

/**
 * 나눔
 */

// 나눔 생성
export const createSharing = async (data: ProductSharingCreateRequest) => {
  const res = await api.post('/shares', data);
  return res.data;
};

// 나눔 수정
export const updateSharing = async (shareId: number, data: ProductSharingCreateRequest) => {
  const res = await api.put(`/shares/${shareId}`, data);
  return res.data;
};

// 나눔 삭제
export const deleteSharing = async (shareId: number) => {
  const res = await api.delete(`/shares/${shareId}`);
  return res.data;
};

// 나눔 상세 조회
export const getSharingDetail = async (shareId: number) => {
  const res = await api.get(`/shares/${shareId}`);
  return res.data;
};

// 나눔 목록 조회
export const getSharingList = async (page: number, size: number, sort: string[]) => {
  const res = await api.get(`/shares?page=${page}&size=${size}&sort=${sort.join(',')}`);
  return res.data;
};
