import { api } from "@/remote/axiosInstance";
import type { GetProductResponse } from "../response/GetProductResponse";
import type { ProductDomain } from "@/domain/Product";
import { toProductDomain } from "../mapper/ProductMapper";
import type { CreateProductRequest } from "../request/CreateProductRequest";
import type { ModifyProductRequest } from "../request/ModifyProductRequest";

export const getProductList = async (): Promise<ProductDomain[]> => {
  const res = await api.get<GetProductResponse[]>('/product/all');
  return res.data.map(toProductDomain);
}

export const getProduct = async(id: string): Promise<ProductDomain> => {
  const res = await api.get<GetProductResponse>(`/product/${id}`);
  return toProductDomain(res.data);
}

export const createProduct = async(data: CreateProductRequest) => {
  const res = await api.post('/product', data);
  return res.data;
}

export const modifyProduct = async(id: string, data: ModifyProductRequest) => {
  const res = await api.patch(`/product/${id}`, data);
  return res.data;
}

export const deleteProduct = async(id: string) => {
  const res = await api.delete(`/product/${id}`);
  return res.data;
}