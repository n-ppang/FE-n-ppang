import { createProduct } from '@/remote/api/GroupPurchaseApi';
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
    maxParticipants: 0,
    totalPrice: 0,
    thumbnailUrl: '',
    openChatLink: '',
  });

  const [productSharingData, setProductSharingData] = useState<ProductSharingCreateRequest>({
    title: '',
    content: '',
    expirationDate: '',
    thumbnailUrl: '',
  });

  const handleCreateItem = async () => {
    // Validation
    if (type === 'GROUP_PURCHASE') {
      const { title, content, maxParticipants, totalPrice, thumbnailUrl, openChatLink } =
        groupPurchaseData;
      if (
        !title.trim() ||
        !content.trim() ||
        !thumbnailUrl ||
        !openChatLink.trim() ||
        maxParticipants <= 0 ||
        totalPrice <= 0
      ) {
        alert('모든 필드를 정확히 입력해주세요.');
        return;
      }
    } else {
      const { title, content, expirationDate, thumbnailUrl } = productSharingData;
      if (!title.trim() || !content.trim() || !expirationDate || !thumbnailUrl) {
        alert('모든 필드를 정확히 입력해주세요.');
        return;
      }
    }

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
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="mx-auto max-w-md px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-black tracking-tight text-gray-900">{title}</h1>
          <p className="mt-2 text-sm text-gray-500">
            {type === 'GROUP_PURCHASE'
              ? '함께 구매할 정보를 정확히 입력해주세요.'
              : '나눌 상품의 상태와 유통기한을 알려주세요.'}
          </p>
        </div>

        <div className="space-y-8">
          <FormContainer
            type={type}
            formData={type === 'GROUP_PURCHASE' ? groupPurchaseData : productSharingData}
            setFormData={
              type === 'GROUP_PURCHASE'
                ? (data) => setGroupPurchaseData(data as GroupPurchaseCreateRequest)
                : (data) => setProductSharingData(data as ProductSharingCreateRequest)
            }
          />

          <div className="pt-4">
            <SubmitBlueButton onClick={handleCreateItem} text={'등록하기'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
