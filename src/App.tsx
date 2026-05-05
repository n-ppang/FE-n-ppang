import Router from './Router';
import { BrowserRouter } from 'react-router-dom';
import TopBar from './shared/components/TopBar';

// 루트 컴포넌트
function App() {
  return (
    <BrowserRouter>
      <TopBar />

      <Router />
    </BrowserRouter>
  );
}

export default App;
