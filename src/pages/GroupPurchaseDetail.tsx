import { useParams, useNavigate } from 'react-router-dom';
import { GroupPurchaseItemsMockData } from '@/shared/mock/ItemsMockData';
import { GroupPurchaseCommentsMockData, type Comment } from '@/shared/mock/CommentMockData';
import CommentSection from '@/shared/components/CommentSection';
import { useState } from 'react';

const GroupPurchaseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = GroupPurchaseItemsMockData.find((i) => i.id === id);
  const [comments, setComments] = useState<Comment[]>(
    id ? GroupPurchaseCommentsMockData[id] || [] : []
  );

  if (!item) {
    return <div className="p-10 text-center">상품을 찾을 수 없습니다.</div>;
  }

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
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="sticky top-16 z-10 flex items-center justify-between border-b border-gray-100 bg-white/80 px-4 py-3 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="p-1 text-gray-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="font-bold text-gray-900">공동구매 상세</span>
        <div className="w-8" /> {/* Spacer */}
      </div>

      <div className="mx-auto max-w-md">
        {/* Image Carousel (Simple) */}
        <div className="aspect-square w-full bg-gray-100">
          <img
            src={item.imageUrls?.[0] || `https://placehold.co/600x600/f8fafc/64748b?text=${encodeURIComponent(item.title)}`}
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

          <div className="mb-8 space-y-4 rounded-2xl bg-blue-50 p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-blue-600">인당 금액</span>
              <span className="text-xl font-black text-blue-700">{item.price.toLocaleString()}원</span>
            </div>
            <div className="flex items-center justify-between border-t border-blue-100 pt-4">
              <span className="text-xs text-blue-400">총 금액</span>
              <span className="text-sm font-bold text-blue-500">{item.totalAmount?.toLocaleString()}원</span>
            </div>
          </div>

          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between text-sm font-bold">
              <span className="text-gray-900">모집 현황</span>
              <span className="text-blue-600">{item.peopleClosed} / {item.peopleNum}명</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
              <div 
                className="h-full bg-blue-600 transition-all duration-1000" 
                style={{ width: `${(item.peopleClosed / item.peopleNum) * 100}%` }}
              />
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

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-100 bg-white p-4">
        <div className="mx-auto max-w-md">
          <button className="w-full rounded-2xl bg-blue-600 py-4 text-center text-lg font-black text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 active:scale-95">
            참여하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupPurchaseDetail;
