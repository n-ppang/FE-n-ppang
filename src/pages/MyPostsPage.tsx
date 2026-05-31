import { useEffect, useState } from 'react';
import { myPosts } from '../remote/api/UserApi';
import ItemContainer from '../shared/components/ItemContainer';

interface Post {
  id: string;
  type: 'GROUP_PURCHASE' | 'PRODUCT_SHARING';
  title: string;
  price?: number;
  peopleClosed?: number;
  totalPeople?: number;
  expirationDate?: string;
  createdAt: string;
}

const MyPostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const data = await myPosts();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch my posts:', error);
        alert('게시글 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="mx-auto max-w-md px-6 py-8">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">내가 작성한 게시글</h1>
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-6 text-4xl">📝</div>
            <p className="text-sm font-medium text-gray-400">작성한 게시글이 없습니다.</p>
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

export default MyPostsPage;
