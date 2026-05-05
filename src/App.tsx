import { ToastContainer } from 'react-toastify';
import Router from './Router';
import RecentlyViewedFloater from './features/recentlyViewed/ui/RecentlyViewedFloater';
import { BrowserRouter } from 'react-router-dom';
import TopBar from './shared/components/TopBar';

// 루트 컴포넌트
function App() {
  return (
    <BrowserRouter>
      <TopBar />

      <Router />

      <RecentlyViewedFloater />

      <ToastContainer position="top-right" autoClose={5000} />
    </BrowserRouter>
  );
}

export default App;
