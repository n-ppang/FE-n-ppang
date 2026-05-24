import { useParams, useNavigate } from 'react-router-dom';
import { SharingItemsMockData } from '@/shared/mock/ItemsMockData';
import { SharingCommentsMockData, type Comment } from '@/shared/mock/CommentMockData';
import CommentSection from '@/shared/components/CommentSection';
import { useState } from 'react';

const ProductSharingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = SharingItemsMockData.find((i) => i.id === id);
  const [comments, setComments] = useState<Comment[]>(
    id ? SharingCommentsMockData[id] || [] : []
  );

  if (!item) {
    return <div className="p-10 text-center">상품을 찾을 수 없습니다.</div>;
  }

  const daysLeft = Math.ceil(
    (new Date(item.expirationDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleAddComment = (content: string, mention?: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      author: '나 (User)',
      content,
      mention,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setComments([...comments, newComment]);
  };

  const handleDeleteComment = (commentId: string) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      setComments(comments.filter((c) => c.id !== commentId));
    }
  };

  return (
    <div className="min-h-screen bg-white pb-12">
      {/* Header */}
      <div className="sticky top-16 z-10 flex items-center justify-between border-b border-gray-100 bg-white/80 px-4 py-3 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="p-1 text-gray-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="font-bold text-gray-900">나눔 상세</span>
        <button 
          onClick={() => navigate(`/sharing-products/${id}/edit`)}
          className="text-sm font-bold text-blue-600 transition-colors hover:text-blue-700"
        >
          수정
        </button>
      </div>

      <div className="mx-auto max-w-md">
        {/* Image Carousel (Simple) */}
        <div className="aspect-square w-full bg-gray-100">
          <img
            src={item.imageUrl || `https://placehold.co/600x600/f8fafc/64748b?text=${encodeURIComponent(item.title)}`}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="px-6 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-black tracking-tight text-gray-900">{item.title}</h1>
            <p className="mt-2 text-sm text-gray-400">{item.createdAt} 등록</p>
          </div>

          <div className="mb-8 space-y-4 rounded-2xl bg-orange-50 p-6">
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
        <CommentSection 
          comments={comments} 
          onAddComment={handleAddComment} 
          onDeleteComment={handleDeleteComment} 
        />
      </div>
    </div>
  );
};

export default ProductSharingDetail;
