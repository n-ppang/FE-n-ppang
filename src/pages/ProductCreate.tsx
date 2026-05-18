import type { GroupPurchaseCreateRequest } from '@/remote/request/CreateProductRequest';
import FormContainer from '@/shared/components/FormContainer';
import SubmitBlueButton from '@/shared/components/SubmitBlueButton';
import { useState } from 'react';

interface ProductCreateProps {
  title: string;
}

const ProductCreate = ({ title }: ProductCreateProps) => {
  // UI 데이터
  const [formData, setFormData] = useState<GroupPurchaseCreateRequest>({
    name: '',
    price: 0,
    description: '',
    image_url: '',
    totalPrice: 0,
    peopleNum: 0,
    createdAt: new Date().toISOString(),
  });

  const handleCreateItem = () => {};

  return (
    <div className="flex flex-col gap-10 p-20">
      <div className="text-2xl">{title}</div>
      <FormContainer formData={formData} setFormData={setFormData} />
      <SubmitBlueButton onClick={handleCreateItem} text={'생성하기'} />
    </div>
  );
};

export default ProductCreate;
