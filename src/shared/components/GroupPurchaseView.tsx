import { useEffect, useState } from 'react';
import { getProductList } from '@/remote/api/GroupPurchaseApi';
import ItemContainer from './ItemContainer';

const GroupPurchaseView = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getProductList(0, 10, ['createdAt,desc']);
        // API 응답 구조에 따라 data.content 또는 data 형태일 수 있습니다.
        setItems(data.content || data);
      } catch (error) {
        console.error('Failed to fetch group purchase items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return <div className="py-10 text-center text-gray-500">불러오는 중...</div>;
  }

  return (
    <div>
      {items.length === 0 ? (
        <div className="py-20 text-center text-gray-500">등록된 공동구매가 없습니다.</div>
      ) : (
        items.map((item) => (
          <ItemContainer
            key={item.postId}
            id={item.postId}
            model="group-purchase"
            title={item.title}
            price={item.pricePerPerson} // 인당 금액 계산
            peopleClosed={item.currentParticipants || 0}
            totalPeople={item.maxParticipants}
            createdAt={item.createdAt?.split('T')[0]}
          />
        ))
      )}
    </div>
  );
};

export default GroupPurchaseView;
