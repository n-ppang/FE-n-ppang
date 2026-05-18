import { api } from '@/remote/axiosInstance';
import type {
  GroupPurchaseCreateRequest,
  ProductSharingCreateRequest,
} from '../request/CreateProductRequest';

export const createProduct = async (
  data: GroupPurchaseCreateRequest | ProductSharingCreateRequest,
) => {
  const res = await api.post('/product', data);
  return res.data;
};
