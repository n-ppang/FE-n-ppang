import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './app/store.ts';
import App from './App.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>,
);
