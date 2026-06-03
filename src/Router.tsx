import { Routes, Route } from 'react-router-dom';
import ProductSharingCreate from './pages/posting/ProductSharingCreate';
import GroupPurchaseDetail from './pages/posting/GroupPurchaseDetail';
import ProductSharingDetail from './pages/posting/ProductSharingDetail';
import ProductEdit from './pages/posting/ProductEdit';
import SignupPage from './pages/auth/SignupPage';
import LoginPage from './pages/auth/LoginPage';
import NotificationsPage from './pages/alarm/NotificationsPage';
import MyPostsPage from './pages/mypage/MyPostsPage';
import MyParticipationsPage from './pages/mypage/MyParticipationsPage';
import UserApprovalPage from './pages/manager/UserApprovalPage';
import DormitoryVerificationPage from './pages/auth/DormitoryVerificationPage';
import MyPage from './pages/mypage/MyPage';
import HomePage from './pages/HomePage';
import GroupPurchaseCreate from './pages/posting/GroupPurchaseCreate';

const Router = () => {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/mypage/posts" element={<MyPostsPage />} />
      <Route path="/mypage/participations" element={<MyParticipationsPage />} />
      <Route path="/admin/approvals" element={<UserApprovalPage />} />
      <Route path="/signup/verification" element={<DormitoryVerificationPage />} />

      {/* Home */}
      <Route path="/" element={<HomePage />} />

      {/* Posts */}
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
