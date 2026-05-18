import { Routes, Route } from 'react-router-dom';
// import ProductCreate from './pages/ProductCreate';
import FirstPage from './pages/FirstPage';
import ProductSharingCreate from './pages/ProductSharingCreate';
import GroupPurchaseCreate from './pages/GroupPurchaseCreate';

const Router = () => {
  return (
    <Routes>
      {/* shopping mall */}
      <Route path="/" element={<FirstPage />} />
      <Route path="/sharing-products/new" element={<ProductSharingCreate />} />
      <Route path="/group-purchases/new" element={<GroupPurchaseCreate />} />
    </Routes>
  );
};

export default Router;
