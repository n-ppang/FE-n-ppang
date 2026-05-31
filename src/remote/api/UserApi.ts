import { api } from '../axiosInstance';

export const mypage = async () => {
  const res = await api.get('/users/me');
  return res.data;
};

export const myPosts = async () => {
  const res = await api.get('/users/me/posts');
  return res.data;
};

export const myPostParticipations = async () => {
  const res = await api.get('/users/me/participations');
  return res.data;
};
