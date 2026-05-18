import { GroupPurchaseItemsMockData } from '../mock/ItemsMockData';
import ItemContainer from './ItemContainer';

const GroupPurchaseView = () => {
  return (
    <div>
      {GroupPurchaseItemsMockData.map((item, index) => (
        <ItemContainer
          key={index}
          model="group-purchase"
          title={item.title}
          price={item.price}
          peopleClosed={item.peopleClosed}
          peopleNum={item.peopleNum}
          expirationDate={item.expirationDate}
          createdAt={item.createdAt}
        />
      ))}
    </div>
  );
};

export default GroupPurchaseView;
