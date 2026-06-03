import { api } from '../axiosInstance';
import type { CommentCreateRequest } from '../request/CommentCreateRequest';
import type { GetCommentsListResponse } from '../response/GetCommentsResponse';

export const getComments = async (postId: number) => {
  const res = await api.get(`/posts/${postId}/comments`);
  return res.data as GetCommentsListResponse;
};

export const createComment = async (postId: number, data: CommentCreateRequest) => {
  const res = await api.post(`/posts/${postId}/comments`, data);
  return res.data;
};

export const deleteComment = async (postId: number, commentId: number) => {
  const res = await api.delete(`/posts/${postId}/comments/${commentId}`);
  return res.data;
};
