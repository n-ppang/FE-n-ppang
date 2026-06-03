import { useParams, useNavigate } from 'react-router-dom';
import { getProductDetail, updateProduct } from '@/remote/api/GroupPurchaseApi';
import { getSharingDetail, updateSharing } from '@/remote/api/ProductSharingApi';
import { imgUpload } from '@/remote/api/AuthApi';
import FormContainer from '@/shared/components/FormContainer';
import SubmitBlueButton from '@/shared/components/SubmitBlueButton';
import { useState, useEffect } from 'react';

interface ProductEditProps {
  type: 'GROUP_PURCHASE' | 'PRODUCT_SHARING';
}

const ProductEdit = ({ type }: ProductEditProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      try {
        let data;
        if (type === 'GROUP_PURCHASE') {
          data = await getProductDetail(Number(id));
        } else {
          data = await getSharingDetail(Number(id));
        }
        setFormData(data);
      } catch (error) {
        console.error('Failed to fetch product for edit:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, type]);

  const handleUpdateItem = async () => {
    if (!id) return;
    try {
      // 1. 이미지 파일이 새로 선택된 경우 업로드 우선 수행
      let finalImageUrl = type === 'GROUP_PURCHASE' ? formData.thumbnailUrl : formData.imageUrl;
      
      if (formData.imageFile) {
        const uploadRes = await imgUpload(formData.imageFile, 'POST');
        finalImageUrl = uploadRes.imageUrl;
      }

      // 2. 업로드된 URL을 포함하여 수정 요청
      if (type === 'GROUP_PURCHASE') {
        const updateData = {
          ...formData,
          thumbnailUrl: finalImageUrl,
        };
        // imageFile은 API 전송 시 제외 (필요한 경우)
        delete updateData.imageFile;
        
        await updateProduct(Number(id), updateData);
        alert('공동구매 정보가 수정되었습니다.');
        navigate(-1);
      } else {
        const updateData = {
          ...formData,
          imageUrl: finalImageUrl,
        };
        delete updateData.imageFile;

        await updateSharing(Number(id), updateData);
        alert('나눔 정보가 수정되었습니다.');
        navigate(-1);
      }
    } catch (error) {
      console.error('Failed to update product:', error);
      alert('수정에 실패했습니다.');
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-gray-500">데이터를 불러오는 중...</div>;
  }

  if (!formData) {
    return <div className="p-10 text-center text-gray-500">데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="mx-auto max-w-md px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-black tracking-tight text-gray-900">
            {type === 'GROUP_PURCHASE' ? '공동구매 수정' : '나눔 정보 수정'}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            변경된 내용을 확인하고 수정해주세요.
          </p>
        </div>

        <div className="space-y-8">
          <FormContainer
            type={type}
            formData={formData}
            setFormData={setFormData}
          />

          <div className="pt-4">
            <SubmitBlueButton onClick={handleUpdateItem} text={'수정 완료하기'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;