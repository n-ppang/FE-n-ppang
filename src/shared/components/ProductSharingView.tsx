import { useEffect, useState } from 'react';
import { getSharingList } from '@/remote/api/ProductSharingApi';
import ItemContainer from './ItemContainer';

const ProductSharingView = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const data = await getSharingList(0, 20, ['createdAt,desc']);
        setItems(Array.isArray(data) ? data : data.content || []);
      } catch (error) {
        console.error('Failed to fetch sharing list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, []);

  if (loading) {
    return <div className="p-10 text-center text-gray-500 animate-pulse">나눔 목록을 불러오는 중...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="p-10 text-center">
        <p className="text-gray-500">등록된 나눔 상품이 없습니다.</p>
      </div>
    );
  }

  return (
    <div>
      {items.map((item) => (
        <ItemContainer
          key={item.shareId || item.id}
          id={item.shareId || item.id}
          model="product-sharing"
          title={item.title}
          expirationDate={item.expirationDate}
          createdAt={item.createdAt?.split('T')[0]}
        />
      ))}
    </div>
  );
};

export default ProductSharingView;