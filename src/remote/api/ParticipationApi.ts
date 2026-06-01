/**
 * 공동 구매 참여 API
 */

import { api } from '../axiosInstance';

// 공동구매 참여 요청
export const createParticipation = async (postId: number) => {
  const res = await api.post(`/posts/${postId}/participations`);
  return res.data;
};

// 공동구매 참여 취소 요청
export const cancelParticipation = async (postId: number) => {
  const res = await api.delete(`/posts/${postId}/participations`);
  return res.data;
};
