import Router from './Router';
import { BrowserRouter } from 'react-router-dom';
import TopBar from './shared/components/TopBar';
import { useEffect } from 'react';
import { useAuthStore } from './shared/hooks/useAuthStore';

// 루트 컴포넌트
function App() {
  const { isLoggedIn, fetchMe } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      fetchMe();
    }
  }, [isLoggedIn, fetchMe]);

  return (
    <BrowserRouter>
      <TopBar />

      <Router />
    </BrowserRouter>
  );
}

export default App;
