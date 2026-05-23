import { Routes, Route } from 'react-router-dom';
// import ProductCreate from './pages/ProductCreate';
import FirstPage from './pages/FirstPage';
import ProductSharingCreate from './pages/ProductSharingCreate';
import GroupPurchaseCreate from './pages/GroupPurchaseCreate';
import GroupPurchaseDetail from './pages/GroupPurchaseDetail';
import ProductSharingDetail from './pages/ProductSharingDetail';

const Router = () => {
  return (
    <Routes>
      {/* shopping mall */}
      <Route path="/" element={<FirstPage />} />
      <Route path="/sharing-products/new" element={<ProductSharingCreate />} />
      <Route path="/group-purchases/new" element={<GroupPurchaseCreate />} />
      <Route path="/group-purchases/:id" element={<GroupPurchaseDetail />} />
      <Route path="/sharing-products/:id" element={<ProductSharingDetail />} />
    </Routes>
  );
};

export default Router;
