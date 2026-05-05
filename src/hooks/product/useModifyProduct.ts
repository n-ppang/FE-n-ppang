import { modifyProduct } from '@/remote/api/ProductApi';
import type { ModifyProductRequest } from '@/remote/request/ModifyProductRequest';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useModifyProduct = (id: string) => {
  const queryClient = useQueryClient();
  const nav = useNavigate();
  return useMutation({
    // mutationFn에서 data를 인자로 받도록 수정
    mutationFn: (data: ModifyProductRequest) => modifyProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product', id] });
      alert('상품 정보가 수정되었습니다.');
      nav(`/shop/detail/${id}`);
    },
  });
};
