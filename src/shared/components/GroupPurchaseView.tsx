import { GroupPurchaseItemsMockData } from '../mock/ItemsMockData';
import ItemContainer from './ItemContainer';

const GroupPurchaseView = () => {
  return (
    <div>
      {GroupPurchaseItemsMockData.map((item, index) => (
        <ItemContainer
          key={index}
          id={item.id}
          model="group-purchase"
          title={item.title}
          price={item.price}
          peopleClosed={item.peopleClosed}
          totalPeople={item.totalPeople}
          expirationDate={item.expirationDate}
          createdAt={item.createdAt}
        />
      ))}
    </div>
  );
};

export default GroupPurchaseView;
