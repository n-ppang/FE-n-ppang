import { useGetProductList } from '@/hooks/product/useGetProductList';
import CRUDButton from '@/shared/components/CRUDButton';
import { useNavigate } from 'react-router-dom';

const ShopHome = () => {
  const nav = useNavigate();
  const onClickItem = (id: string) => {
    nav(`/shop/detail/${id}`);
  };

  const { data: products, isLoading, isError } = useGetProductList();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!!</div>;

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="mt-20 p-2 text-xl font-bold text-green-500">Enjoy Shopping!</div>
      <CRUDButton onClick={() => nav('/shop/new')} text="새 상품 등록하기" />

      <div className="mt-5 flex w-[700px] flex-row flex-wrap justify-center gap-10">
        {products?.map((item) => (
          <div className="flex flex-col">
            {item.image_url ? (
              <img
                key={item.id}
                src={item.image_url}
                className="size-30"
                onClick={() => onClickItem(item.id)}
              />
            ) : (
              <div
                key={item.id}
                className="size-30 bg-blue-400"
                onClick={() => onClickItem(item.id)}
              ></div>
            )}
            <div>
              {item.name} - ${item.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopHome;
