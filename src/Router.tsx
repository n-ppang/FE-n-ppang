import { Routes, Route } from 'react-router-dom';
import ShopHome from './pages/ShopHome';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import ProductDetail from './pages/ProductDetail';
import ProductCreate from './pages/ProductCreate';
import ProductModify from './pages/ProductModify';

const Router = () => {
  return (
    <Routes>
      {/* shopping mall */}
      <Route path="/" element={<ShopHome />} />
      <Route path="/shop/detail/:id" element={<ProductDetail />} />
      <Route path="/shop/new" element={<ProductCreate />} />
      <Route path="/shop/modify/:id" element={<ProductModify />} />

      {/* shopping mall user */}
      <Route path="/login" element={<Login />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
};

export default Router;
