import { useParams, useNavigate } from 'react-router-dom';
import { getProductDetail, updateProduct } from '@/remote/api/GroupPurchaseApi';
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
        const data = await getProductDetail(Number(id));
        setFormData(data);
      } catch (error) {
        console.error('Failed to fetch product for edit:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handleUpdateItem = async () => {
    if (!id) return;
    try {
      if (type === 'GROUP_PURCHASE') {
        await updateProduct(Number(id), formData);
        alert('공동구매 정보가 수정되었습니다.');
        navigate(-1);
      } else {
        alert('나눔 수정 기능은 준비 중입니다.');
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
