import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSharingDetail } from '@/remote/api/ProductSharingApi';
import CommentSection from '@/shared/components/CommentSection';
import { useComments } from '@/shared/hooks/useComments';

interface ProductSharingDetailData {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  expirationDate: string;
  createdAt: string;
  status: string;
  author: {
    userId: number;
    nickname: string;
    roomNumber: string;
  };
  comments?: any[];
}

const ProductSharingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<ProductSharingDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  const { comments, setComments, handleAddComment, handleDeleteComment } = useComments([]);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id || isNaN(Number(id))) {
        setLoading(false);
        return;
      }
      try {
        const data = await getSharingDetail(Number(id));
        setItem(data);
        if (data.comments) {
          setComments(data.comments);
        }
      } catch (error) {
        console.error('Failed to fetch product sharing detail:', error);
        alert('정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, setComments]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white pb-24">
        <p className="text-gray-500 font-medium italic animate-pulse">데이터를 불러오는 중...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white pb-24 text-center px-6">
        <div className="mb-4 text-4xl">🔍</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">상품을 찾을 수 없습니다</h2>
        <p className="text-sm text-gray-500 mb-8">존재하지 않거나 올바르지 않은 접근입니다.</p>
        <button 
          onClick={() => navigate(-1)}
          className="rounded-xl bg-gray-100 px-6 py-3 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-200"
        >
          뒤로 가기
        </button>
      </div>
    );
  }

  const daysLeft = Math.ceil(
    (new Date(item.expirationDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-white pb-12">
      {/* Header */}
      <div className="sticky top-16 z-10 flex items-center justify-between border-b border-gray-100 bg-white/80 px-4 py-3 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="p-1 text-gray-600 transition-transform active:scale-90">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="font-bold text-gray-900">나눔 상세</span>
        <button 
          onClick={() => navigate(`/sharing-products/${id}/edit`)}
          className="text-sm font-bold text-blue-600 transition-colors hover:text-blue-700 active:scale-95"
        >
          수정
        </button>
      </div>

      <div className="mx-auto max-w-md">
        {/* Image Section */}
        <div className="aspect-square w-full bg-gray-50 overflow-hidden">
          <img
            src={item.imageUrl || `https://placehold.co/600x600/f8fafc/64748b?text=${encodeURIComponent(item.title)}`}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="px-6 py-8">
          <div className="mb-6">
            <div className="mb-1 flex items-center gap-2">
              <span className="rounded-md bg-orange-600 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                {item.status || '나눔중'}
              </span>
              <span className="text-xs font-bold text-gray-400">
                {item.author?.nickname} · {item.author?.roomNumber}호
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-gray-900">{item.title}</h1>
            <p className="mt-2 text-sm text-gray-400">{item.createdAt?.split('T')[0]} 등록</p>
          </div>

          <div className="mb-8 space-y-4 rounded-2xl bg-orange-50 p-6 ring-1 ring-orange-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-orange-600">남은 기간</span>
              <span className={`text-xl font-black ${daysLeft <= 3 ? 'text-red-600' : 'text-orange-700'}`}>
                {daysLeft < 0 ? '종료됨' : `D-${daysLeft}`}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-orange-100 pt-4">
              <span className="text-xs text-orange-400">유통기한</span>
              <span className="text-sm font-bold text-orange-500">{item.expirationDate}</span>
            </div>
          </div>

          <div className="space-y-4 border-t border-gray-100 pt-8 pb-10">
            <h2 className="text-lg font-bold text-gray-900">상세 설명</h2>
            <p className="whitespace-pre-wrap text-base leading-relaxed text-gray-600">
              {item.content}
            </p>
          </div>
        </div>

        {/* Comment Section */}
        <div className="border-t border-gray-50 pt-4">
          <CommentSection 
            comments={comments} 
            onAddComment={handleAddComment} 
            onDeleteComment={handleDeleteComment} 
          />
        </div>
      </div>
    </div>
  );
};

export default ProductSharingDetail;
