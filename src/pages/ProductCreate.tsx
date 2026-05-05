import { useCreateProduct } from '@/hooks/product/useCreateProduct';
import type { CreateProductRequest } from '@/remote/request/CreateProductRequest';
import FormContainer from '@/shared/components/FormContainer';
import SubmitBlueButton from '@/shared/components/SubmitBlueButton';
import { useState } from 'react';

const ProductCreate = () => {
  // UI 데이터
  const [formData, setFormData] = useState<CreateProductRequest>({
    name: '',
    price: 0,
    description: '',
    image_url: '',
  });

  const { mutate: mutateCreateProduct, isPending } = useCreateProduct();

  const handleCreateItem = () => {
    mutateCreateProduct(formData);
  };

  return (
    <div className="flex flex-col gap-10 p-20">
      <div className="text-2xl">새 상품 등록 페이지</div>
      <FormContainer formData={formData} setFormData={setFormData} />
      <SubmitBlueButton onClick={handleCreateItem} text={isPending ? '등록 중...' : '생성하기'} />
    </div>
  );
};

export default ProductCreate;
