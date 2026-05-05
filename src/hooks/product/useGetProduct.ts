import type { ProductDomain } from '@/domain/Product';
import { getProduct } from '@/remote/api/ProductApi';
import { useQuery } from '@tanstack/react-query';

export const useGetProduct = (id: string) => {
  return useQuery<ProductDomain>({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
  });
};
