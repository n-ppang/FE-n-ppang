import { Routes, Route } from 'react-router-dom';
// import ProductCreate from './pages/ProductCreate';
import FirstPage from './pages/FirstPage';

const Router = () => {
  return (
    <Routes>
      {/* shopping mall */}
      <Route path="/" element={<FirstPage />} />
    </Routes>
  );
};

export default Router;
