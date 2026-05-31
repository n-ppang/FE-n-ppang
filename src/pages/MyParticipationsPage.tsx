import { useEffect, useState } from 'react';
import { myPostParticipations } from '@/remote/api/UserApi';
import ItemContainer from '@/shared/components/ItemContainer';

interface PostResponse {
  id: string;
  type: 'GROUP_PURCHASE' | 'PRODUCT_SHARING';
  title: string;
  price?: number;
  peopleClosed?: number;
  totalPeople?: number;
  expirationDate?: string;
  createdAt: string;
}

const MyParticipationsPage = () => {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyParticipations = async () => {
      try {
        const data = await myPostParticipations();
        setPosts(data || []);
      } catch (error: any) {
        console.error('Failed to fetch my participations:', error);
        const errorMessage = error.response?.data?.errorMessage || '참여한 게시글 목록을 불러오는데 실패했습니다.';
        alert(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchMyParticipations();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="mx-auto max-w-md px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">내가 참여한 게시글</h1>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
            총 {posts.length}개
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-6 text-4xl">🤝</div>
            <p className="text-sm font-medium text-gray-500">참여한 게시글이 아직 없네요.</p>
            <p className="mt-1 text-xs text-gray-400">함께 구매하거나 나눔을 받아보세요!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <ItemContainer
                key={post.id}
                id={post.id}
                model={post.type === 'GROUP_PURCHASE' ? 'group-purchase' : 'product-sharing'}
                title={post.title}
                price={post.price}
                peopleClosed={post.peopleClosed}
                totalPeople={post.totalPeople}
                expirationDate={post.expirationDate}
                createdAt={post.createdAt}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyParticipationsPage;
