import { api } from '@/remote/axiosInstance';
import type { GroupPurchaseCreateRequest } from '../request/GroupPurchaseCreateRequest';

/**
 * 공동구매
 */

// 상품 생성
export const createProduct = async (data: GroupPurchaseCreateRequest) => {
  const res = await api.post('/posts', data);
  return res.data;
};

// 상품 수정
export const updateProduct = async (postId: number, data: GroupPurchaseCreateRequest) => {
  const res = await api.put(`/posts/${postId}`, data);
  return res.data;
};

// 상품 삭제
export const deleteProduct = async (postId: number) => {
  const res = await api.delete(`/posts/${postId}`);
  return res.data;
};

// 상품 상세 조회
export const getProductDetail = async (postId: number) => {
  const res = await api.get(`/posts/${postId}`);
  return res.data;
};

// 상품 목록 조회
export const getProductList = async (page: number, size: number, sort: string[]) => {
  const res = await api.get(`/posts?page=${page}&size=${size}&sort=${sort.join(',')}`);
  return res.data;
};

// 수동 마감 처리
export const closeProduct = async (postId: number) => {
  const res = await api.post(`/posts/${postId}/close`);
  return res.data;
};
