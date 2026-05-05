import { useEffect } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetProduct } from '@/hooks/product/useGetProduct';
import { useDeleteProduct } from '@/hooks/product/useDeleteProduct';
import CRUDButton from '@/shared/components/CRUDButton';
import { addRecentlyViewed } from '@/features/recentlyViewed/recentlyViewedSlice';

const ProductDetail = () => {
  const nav = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { data: product, isLoading, isError } = useGetProduct(id || '');
  const { mutate: deleteProductMutate } = useDeleteProduct(id || '');

  // Redux 최근 본 상품 정보 기록: product 로드 성공 시 1회 기록
  useEffect(() => {
    if (!product) return;

    dispatch(
      addRecentlyViewed({
        id: product.id,
        title: product.name,
        thumbnailUrl: product.image_url ?? '',
        price: product.price,
      }),
    );
  }, [product, dispatch]);

  const handleDeleteProduct = () => {
    if (!id) return;

    // 기존 alert 는 행동을 취소해주지 못해서 confirm 으로 변경함
    const ok = window.confirm('정말로 삭제하시겠습니까?');
    if (!ok) return;

    deleteProductMutate();
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!!</div>;
  if (!product) return <div>Error!!</div>;

  return (
    <div className="m-20 flex flex-col gap-10">
      <div className="text-2xl">{product.name}</div>

      <div className="flex justify-end gap-2">
        <CRUDButton onClick={() => nav(`/shop/modify/${id}`)} text="수정하기" />
        <CRUDButton className="bg-red-300" onClick={handleDeleteProduct} text="삭제하기" />
      </div>

      <form className="flex flex-col gap-5 bg-gray-100">
        <div>
          <div> 이미지: </div>
          <div>{product.image_url}</div>
        </div>
        <div>
          <div> 제품 설명: </div>
          <div>{product.description}</div>
        </div>
        <div>
          <div> 가격: </div>
          <div>{product.price}</div>
        </div>
      </form>
    </div>
  );
};

export default ProductDetail;
