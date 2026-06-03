import { useEffect, useState } from 'react';
import ItemContainer from '@/shared/components/ItemContainer';
import { MyParticipationsMockData } from '@/shared/mock/MyParticipationsMockData';

interface PostResponse {
  id: string;
  model: 'group-purchase' | 'product-sharing';
  title: string;
  price: number;
  peopleClosed: number;
  totalPeople: number;
  createdAt: string;
}

const MyParticipationsPage = () => {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyParticipations = async () => {
      // 목데이터를 사용하여 상태를 업데이트합니다.
      const mappedData: PostResponse[] = MyParticipationsMockData.map((item) => ({
        id: item.postId.toString(),
        model: 'group-purchase',
        title: item.title,
        price: (item as any).price || 0,
        peopleClosed: item.currentParticipants,
        totalPeople: item.maxParticipants,
        createdAt: item.createdAt.split('T')[0], // YYYY-MM-DD 형식으로 변환
      }));
      
      setPosts(mappedData);
      setLoading(false);
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
                model={post.model}
                title={post.title}
                price={post.price}
                peopleClosed={post.peopleClosed}
                totalPeople={post.totalPeople}
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
