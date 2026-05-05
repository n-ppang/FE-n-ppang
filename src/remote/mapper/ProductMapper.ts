import type { ProductDomain } from '@/domain/Product';
import type { GetProductResponse } from '../response/GetProductResponse';

export const toProductDomain = (response: GetProductResponse): ProductDomain => ({
  id: response.id,
  name: response.name,
  price: response.price,
  description: response.description,
  image_url: response.image_url,
});
