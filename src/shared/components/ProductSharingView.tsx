import { SharingItemsMockData } from '../mock/ItemsMockData';
import ItemContainer from './ItemContainer';

const ProductSharingView = () => {
  return (
    <div>
      {SharingItemsMockData.map((item, index) => (
        <ItemContainer
          key={index}
          id={item.id}
          model="product-sharing"
          title={item.title}
          expirationDate={item.expirationDate}
          createdAt={item.createdAt}
        />
      ))}
    </div>
  );
};

export default ProductSharingView;
