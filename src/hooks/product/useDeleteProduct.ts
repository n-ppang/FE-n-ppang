import { deleteProduct } from '@/remote/api/ProductApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useDeleteProduct = (id: string) => {
  const queryClient = useQueryClient();
  const nav = useNavigate();
  return useMutation({
    mutationFn: () => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product', id] });
      alert('상품이 삭제되었습니다.');
      nav(`/`);
    },
  });
};
