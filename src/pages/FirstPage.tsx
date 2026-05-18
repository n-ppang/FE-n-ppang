import CRUDButton from '@/shared/components/CRUDButton';
import GroupPurchaseView from '@/shared/components/GroupPurchaseView';
import ProductSharingView from '@/shared/components/ProductSharingView';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FirstPage = () => {
  const nav = useNavigate();
  const [showGroupPurchase, setShowGroupPurchase] = useState(true);
  const [showProductSharing, setShowProductSharing] = useState(false);

  const onClickProductSharing = () => {
    setShowProductSharing(true);
    setShowGroupPurchase(false);
  };

  const onClickGroupPurchase = () => {
    setShowGroupPurchase(true);
    setShowProductSharing(false);
  };

  return (
    <div>
      <div onClick={onClickGroupPurchase}>공동구매</div>
      <div onClick={onClickProductSharing}>유통기한 임박 나눔</div>
      {showGroupPurchase && <GroupPurchaseView />}
      {showProductSharing && <ProductSharingView />}

      {showGroupPurchase ? (
        <CRUDButton onClick={() => nav('group-purchases/new')} text="새 글 등록하기" />
      ) : (
        <CRUDButton onClick={() => nav('sharing-products/new')} text="새 글 등록하기" />
      )}
    </div>
  );
};

export default FirstPage;
