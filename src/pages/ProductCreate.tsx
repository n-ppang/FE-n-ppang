import { createProduct } from '@/remote/api/ProductApi';
import type {
  GroupPurchaseCreateRequest,
  ProductSharingCreateRequest,
} from '@/remote/request/CreateProductRequest';
import FormContainer from '@/shared/components/FormContainer';
import SubmitBlueButton from '@/shared/components/SubmitBlueButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProductCreateProps {
  title: string;
  type: 'GROUP_PURCHASE' | 'PRODUCT_SHARING';
}

const ProductCreate = ({ title, type }: ProductCreateProps) => {
  const navigate = useNavigate();
  // UI 데이터
  const [groupPurchaseData, setGroupPurchaseData] = useState<GroupPurchaseCreateRequest>({
    title: '',
    content: '',
    totalPeople: 0,
    totalAmount: 0,
    imageUrls: [],
    openChatLink: '',
  });

  const [productSharingData, setProductSharingData] = useState<ProductSharingCreateRequest>({
    title: '',
    content: '',
    expirationDate: '',
    imageUrls: [],
  });

  const handleCreateItem = async () => {
    try {
      const data = type === 'GROUP_PURCHASE' ? groupPurchaseData : productSharingData;
      await createProduct(data);
      alert('성공적으로 등록되었습니다!');
      navigate('/');
    } catch (error) {
      console.error('Failed to create product:', error);
      alert('등록에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col gap-10 p-20">
      <div className="text-2xl font-bold">{title}</div>
      <FormContainer
        type={type}
        formData={type === 'GROUP_PURCHASE' ? groupPurchaseData : productSharingData}
        setFormData={
          type === 'GROUP_PURCHASE'
            ? (data) => setGroupPurchaseData(data as GroupPurchaseCreateRequest)
            : (data) => setProductSharingData(data as ProductSharingCreateRequest)
        }
      />
      <SubmitBlueButton onClick={handleCreateItem} text={'생성하기'} />
    </div>
  );
};

export default ProductCreate;
