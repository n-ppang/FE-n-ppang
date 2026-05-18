import CRUDButton from '@/shared/components/CRUDButton';
import GroupPurchaseView from '@/shared/components/GroupPurchaseView';
import ProductSharingView from '@/shared/components/ProductSharingView';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FirstPage = () => {
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState<'group-purchase' | 'product-sharing'>('group-purchase');

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans text-gray-900">
      {/* Header / Tabs */}
      <div className="sticky top-16 z-10 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-md px-4 pt-4">
          <button
            onClick={() => setActiveTab('group-purchase')}
            className={`flex-1 pb-3 text-center text-sm font-bold transition-all ${
              activeTab === 'group-purchase'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            공동구매
          </button>
          <button
            onClick={() => setActiveTab('product-sharing')}
            className={`flex-1 pb-3 text-center text-sm font-bold transition-all ${
              activeTab === 'product-sharing'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            유통기한 임박 나눔
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="mx-auto max-w-md px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            {activeTab === 'group-purchase' ? (
              <>
                모여서 <span className="text-blue-600">더 저렴하게</span>
              </>
            ) : (
              <>
                나눠서 <span className="text-blue-600">더 따뜻하게</span>
              </>
            )}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {activeTab === 'group-purchase' 
              ? '기숙사 친구들과 함께 구매하고 배송비를 아껴보세요.' 
              : '남은 식재료나 생필품을 이웃과 나눠보세요.'}
          </p>
        </div>
        
        <div className="space-y-4">
          {activeTab === 'group-purchase' ? <GroupPurchaseView /> : <ProductSharingView />}
        </div>
      </div>

      {/* Floating Action Button Container */}
      <div className="fixed right-6 bottom-8 z-20">
        <CRUDButton 
          onClick={() => nav(activeTab === 'group-purchase' ? 'group-purchases/new' : 'sharing-products/new')} 
          text="새 글 등록" 
        />
      </div>
    </div>
  );
};

export default FirstPage;
