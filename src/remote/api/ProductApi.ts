import { api } from '@/remote/axiosInstance';
import type { CreateProductRequest } from '../request/CreateProductRequest';

export const createProduct = async (data: CreateProductRequest) => {
  const res = await api.post('/product', data);
  return res.data;
};
