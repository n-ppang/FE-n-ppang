import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductDetail, deleteProduct, closeProduct } from '@/remote/api/GroupPurchaseApi';
import { createParticipation, cancelParticipation } from '@/remote/api/ParticipationApi';
import { mypage } from '@/remote/api/UserApi';
import CommentSection from '@/shared/components/CommentSection';
import { useComments } from '@/shared/hooks/useComments';

interface GroupPurchaseDetailData {
  postId: number;
  title: string;
  content: string;
  thumbnailUrl: string;
  totalPrice: number;
  pricePerPerson: number;
  currentParticipants: number;
  maxParticipants: number;
  status: string;
  author: {
    userId: number;
    nickname: string;
    roomNumber: string;
  };
  openChatLink?: string;
  createdAt: string;
  isParticipate?: boolean;
  comments?: any[];
}

const GroupPurchaseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<GroupPurchaseDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const { comments, setComments, handleAddComment, handleDeleteComment } = useComments([]);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id || isNaN(Number(id))) {
        setLoading(false);
        return;
      }
      try {
        const [data, userData] = await Promise.all([
          getProductDetail(Number(id)),
          mypage().catch(() => null),
        ]);

        setItem(data);
        if (data.comments) {
          setComments(data.comments);
        }
        if (userData) {
          setCurrentUserId(userData.userId);
        }
      } catch (error) {
        console.error('Failed to fetch group purchase detail:', error);
        alert('정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, setComments]);

  const handleDelete = async () => {
    if (!id || !window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await deleteProduct(Number(id));
      alert('삭제되었습니다.');
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const handleParticipate = async () => {
    if (!id || !item) return;

    try {
      await createParticipation(Number(id));
      alert('참여 신청이 완료되었습니다.');

      const updatedData = await getProductDetail(Number(id));
      setItem(updatedData);
    } catch (error: any) {
      const errorData = error.response?.data;
      if (errorData?.errorCodeName === 'PARTICIPATION_ALREADY_EXISTS') {
        alert(errorData.errorMessage);
      } else {
        console.error('Failed to participate:', error);
        alert('참여 신청에 실패했습니다.');
      }
    }
  };

  const handleCancelParticipation = async () => {
    if (!id || !item || !window.confirm('공동구매 참여를 취소하시겠습니까?')) return;

    try {
      await cancelParticipation(Number(id));
      alert('참여가 취소되었습니다.');

      const updatedData = await getProductDetail(Number(id));
      setItem(updatedData);
    } catch (error) {
      console.error('Failed to cancel participation:', error);
      alert('참여 취소에 실패했습니다.');
    }
  };

  const handleCloseProduct = async () => {
    if (!id || !item || !window.confirm('공동구매를 마감하시겠습니까?')) return;

    try {
      await closeProduct(Number(id));
      alert('마감되었습니다.');

      const updatedData = await getProductDetail(Number(id));
      setItem(updatedData);
    } catch (error) {
      console.error('Failed to close product:', error);
      alert('마감에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white pb-24">
        <p className="animate-pulse font-medium text-gray-500 italic">데이터를 불러오는 중...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 pb-24 text-center">
        <div className="mb-4 text-4xl">🔍</div>
        <h2 className="mb-2 text-xl font-bold text-gray-900">상품을 찾을 수 없습니다</h2>
        <p className="mb-8 text-sm text-gray-500">존재하지 않거나 올바르지 않은 접근입니다.</p>
        <button
          onClick={() => navigate(-1)}
          className="rounded-xl bg-gray-100 px-6 py-3 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-200"
        >
          뒤로 가기
        </button>
      </div>
    );
  }

  const isAuthor = currentUserId === item.author.userId;
  const isParticipate = item.isParticipate;

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="sticky top-16 z-10 flex items-center justify-between border-b border-gray-100 bg-white/80 px-4 py-3 backdrop-blur-md">
        <button
          onClick={() => navigate(-1)}
          className="p-1 text-gray-600 transition-transform active:scale-90"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <span className="font-bold text-gray-900">공동구매 상세</span>
        <div className="flex items-center gap-3">
          {isAuthor && (
            <>
              <button
                onClick={() => navigate(`/group-purchases/${id}/edit`)}
                className="text-sm font-bold text-blue-600 transition-colors hover:text-blue-700 active:scale-95"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                className="text-sm font-bold text-red-500 transition-colors hover:text-red-600 active:scale-95"
              >
                삭제
              </button>
            </>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-md">
        <div className="aspect-square w-full overflow-hidden bg-gray-50">
          <img
            src={
              item.thumbnailUrl ||
              `https://placehold.co/600x600/f8fafc/64748b?text=${encodeURIComponent(item.title)}`
            }
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="px-6 py-8">
          <div className="mb-4">
            <div className="mb-1 flex items-center gap-2">
              <span className="rounded-md bg-blue-600 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase">
                {item.status}
              </span>
              <span className="text-xs font-bold text-gray-400">
                {item.author.nickname} · {item.author.roomNumber}호
              </span>
            </div>
            <h1 className="text-2xl leading-tight font-black tracking-tight text-gray-900">
              {item.title}
            </h1>
            <p className="mt-2 text-sm text-gray-400">{item.createdAt?.split('T')[0]} 등록</p>
          </div>

          <div className="mb-8 space-y-4 rounded-3xl bg-blue-50/50 p-6 ring-1 ring-blue-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-blue-600">인당 금액</span>
              <div className="text-right">
                <span className="text-2xl font-black text-blue-700">
                  {item.pricePerPerson.toLocaleString()}
                </span>
                <span className="ml-0.5 text-sm font-bold text-blue-700">원</span>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-blue-100 pt-4">
              <span className="text-xs font-semibold text-blue-400">총 금액</span>
              <span className="text-sm font-bold text-blue-500">
                {item.totalPrice?.toLocaleString()}원
              </span>
            </div>
          </div>

          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between text-sm font-bold">
              <span className="text-gray-900">모집 현황</span>
              <div className="flex items-center gap-1.5">
                <span className="text-blue-600">{item.currentParticipants || 0}</span>
                <span className="text-gray-300">/</span>
                <span className="text-gray-600">{item.maxParticipants}명</span>
              </div>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-1000 ease-out"
                style={{
                  width: `${Math.min(100, ((item.currentParticipants || 0) / item.maxParticipants) * 100)}%`,
                }}
              />
            </div>
          </div>

          <div className="space-y-4 border-t border-gray-100 pt-8 pb-10">
            <h2 className="text-lg font-bold text-gray-900">상세 설명</h2>
            <p className="text-base leading-relaxed whitespace-pre-wrap text-gray-600">
              {item.content}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-50 pt-4">
          <CommentSection
            comments={comments}
            onAddComment={handleAddComment}
            onDeleteComment={handleDeleteComment}
          />
        </div>
      </div>

      <div className="fixed right-0 bottom-0 left-0 border-t border-gray-100 bg-white/90 p-4 backdrop-blur-lg">
        <div className="mx-auto max-w-md">
          {isAuthor ? (
            <button
              onClick={handleCloseProduct}
              disabled={item.status === 'CLOSED'}
              className="w-full rounded-2xl bg-red-500 py-4 text-center text-lg font-black text-white shadow-lg shadow-red-200 transition-all hover:bg-red-600 active:scale-95 disabled:bg-gray-300 disabled:shadow-none"
            >
              {item.status === 'CLOSED' ? '마감된 게시글' : '마감하기'}
            </button>
          ) : isParticipate ? (
            <button
              onClick={handleCancelParticipation}
              className="w-full rounded-2xl bg-gray-100 py-4 text-center text-lg font-black text-gray-600 shadow-lg shadow-gray-100 transition-all hover:bg-gray-200 active:scale-95"
            >
              참여 취소하기
            </button>
          ) : (
            <button
              onClick={handleParticipate}
              disabled={item.status === 'CLOSED'}
              className="w-full rounded-2xl bg-blue-600 py-4 text-center text-lg font-black text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 active:scale-95 disabled:bg-gray-300 disabled:shadow-none"
            >
              {item.status === 'CLOSED' ? '마감됨' : '참여하기'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupPurchaseDetail;
