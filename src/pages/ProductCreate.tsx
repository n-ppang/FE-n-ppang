import { createProduct } from '@/remote/api/GroupPurchaseApi';
import { imgUpload } from '@/remote/api/AuthApi';
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
  
  // UI 데이터 및 파일 객체 관리
  const [groupPurchaseData, setGroupPurchaseData] = useState<any>({
    title: '',
    content: '',
    maxParticipants: 0,
    totalPrice: 0,
    thumbnailUrl: '',
    openChatLink: '',
    imageFile: null,
  });

  const [productSharingData, setProductSharingData] = useState<any>({
    title: '',
    content: '',
    expirationDate: '',
    thumbnailUrl: '',
    imageFile: null,
  });

  const handleCreateItem = async () => {
    const currentData = type === 'GROUP_PURCHASE' ? groupPurchaseData : productSharingData;
    
    // Validation
    if (type === 'GROUP_PURCHASE') {
      const { title, content, maxParticipants, totalPrice, imageFile, openChatLink } = currentData;
      if (!title.trim() || !content.trim() || !imageFile || !openChatLink.trim() || maxParticipants <= 0 || totalPrice <= 0) {
        alert('모든 필드를 정확히 입력해주세요. 사진 등록은 필수입니다.');
        return;
      }
    } else {
      alert('나눔 기능은 준비 중입니다.');
      return;
    }

    try {
      // 1. 이미지 업로드 우선 수행
      let uploadedImageUrl = '';
      if (currentData.imageFile) {
        const uploadRes = await imgUpload(currentData.imageFile, 'POST');
        uploadedImageUrl = uploadRes.imageUrl;
      }

      // 2. 업로드된 URL을 포함하여 상품 생성 요청
      if (type === 'GROUP_PURCHASE') {
        const requestData: GroupPurchaseCreateRequest = {
          title: currentData.title,
          content: currentData.content,
          maxParticipants: Number(currentData.maxParticipants),
          totalPrice: Number(currentData.totalPrice),
          thumbnailUrl: uploadedImageUrl,
          openChatLink: currentData.openChatLink,
        };
        
        await createProduct(requestData);
        alert('공동구매가 성공적으로 등록되었습니다!');
        navigate('/');
      }
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
                ? (data) => setGroupPurchaseData(data)
                : (data) => setProductSharingData(data)
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
