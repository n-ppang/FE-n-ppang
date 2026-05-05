import { createProduct } from '@/remote/api/ProductApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product'] });
      alert('상품이 등록되었습니다.');
      nav('/');
    },
    onError: (error) => {
      console.error('등록 실패: ', error);
      alert('상품 등록 중 오류가 발생했습니다.');
    },
  });
};
