import type { ProductDomain } from '@/domain/Product';
import { useModifyProduct } from '@/hooks/product/useModifyProduct';
import type { ModifyProductRequest } from '@/remote/request/ModifyProductRequest';
import FormContainer from '@/shared/components/FormContainer';
import SubmitBlueButton from '@/shared/components/SubmitBlueButton';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

/* 데이터를 편집하는 컴포넌트 */

const ModifyForm = ({ initialData }: { initialData: ProductDomain }) => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<ModifyProductRequest>(initialData); // id 무시

  const { mutate: mutateModifyProduct } = useModifyProduct(id || '');

  const handleModifyItem = () => {
    mutateModifyProduct(formData);
  };

  return (
    <div className="flex flex-col gap-10 p-20">
      <div className="text-2xl">상품 수정 페이지</div>

      <FormContainer formData={formData} setFormData={setFormData} />
      <SubmitBlueButton onClick={handleModifyItem} text="수정 완료하기" />
    </div>
  );
};

export default ModifyForm;
