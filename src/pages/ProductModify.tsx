import { useGetProduct } from '@/hooks/product/useGetProduct';
import ModifyForm from '@/shared/components/ModifyForm';
import { useParams } from 'react-router-dom';

/* 데이터를 가져오는 컴포넌트 */

const ProductModify = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useGetProduct(id || '');

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!!</div>;
  if (!product) return <div>Error!!</div>;

  return (
    <div className="flex flex-col gap-10 p-20">
      <ModifyForm initialData={product} />
    </div>
  );
};

export default ProductModify;
