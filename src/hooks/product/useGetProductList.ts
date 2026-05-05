import type { ProductDomain } from '@/domain/Product';
import { getProductList } from '@/remote/api/ProductApi';
import { useQuery } from '@tanstack/react-query';

export const useGetProductList = () => {
  return useQuery<ProductDomain[]>({
    queryKey: ['product'],
    queryFn: getProductList,
  });
};
