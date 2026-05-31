import { Routes, Route } from 'react-router-dom';
import FirstPage from './pages/FirstPage';
import ProductSharingCreate from './pages/ProductSharingCreate';
import GroupPurchaseCreate from './pages/GroupPurchaseCreate';
import GroupPurchaseDetail from './pages/GroupPurchaseDetail';
import ProductSharingDetail from './pages/ProductSharingDetail';
import ProductEdit from './pages/ProductEdit';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import NotificationsPage from './pages/NotificationsPage';
import MyPage from './pages/MyPage';
import UserApprovalPage from './pages/UserApprovalPage';
import DormitoryVerificationPage from './pages/DormitoryVerificationPage';

const Router = () => {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/admin/approvals" element={<UserApprovalPage />} />
      <Route path="/signup/verification" element={<DormitoryVerificationPage />} />

      {/* shopping mall */}
      <Route path="/" element={<FirstPage />} />

      <Route path="/sharing-products/new" element={<ProductSharingCreate />} />
      <Route path="/group-purchases/new" element={<GroupPurchaseCreate />} />

      <Route path="/group-purchases/:id" element={<GroupPurchaseDetail />} />
      <Route path="/sharing-products/:id" element={<ProductSharingDetail />} />

      <Route path="/group-purchases/:id/edit" element={<ProductEdit type="GROUP_PURCHASE" />} />
      <Route path="/sharing-products/:id/edit" element={<ProductEdit type="PRODUCT_SHARING" />} />
    </Routes>
  );
};

export default Router;
