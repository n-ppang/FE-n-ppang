interface ItemContainerProps {
  model: 'group-purchase' | 'product-sharing';
  title: string;
  price?: number;
  peopleClosed?: number;
  peopleNum?: number;
  expirationDate?: string;
  createdAt: string;
}

const ItemContainer = ({
  model,
  title,
  price,
  peopleClosed,
  peopleNum,
  expirationDate,
  createdAt,
}: ItemContainerProps) => {
  const daysLeft = expirationDate
    ? Math.ceil((new Date(expirationDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : undefined;
  return (
    <div className="flex w-250 flex-row gap-5 border border-black p-5">
      <img sizes="100x100" className="w-40 border" src="" alt="상품 이미지" />
      <div>
        <div>{title}</div>
        {model === 'group-purchase' && (
          <div>
            <div>인당 {price}원</div>
            <div>
              {peopleClosed} / {peopleNum}명
            </div>
          </div>
        )}
        {model === 'product-sharing' && (
          <div>
            <div>유통기한: {expirationDate}</div>
            <div>{daysLeft}일 남음</div>
          </div>
        )}
        <div>{createdAt}</div>
      </div>
    </div>
  );
};

export default ItemContainer;
