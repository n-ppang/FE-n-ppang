import { configureStore } from '@reduxjs/toolkit';
import recentlyViewedReducer from '@/features/recentlyViewed/recentlyViewedSlice';
import uiReducer from '@/features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    recentlyViewed: recentlyViewedReducer,
    ui: uiReducer,
  },
});

// 디버깅용
store.subscribe(() => {
  console.log('[Redux] recentlyViewed: ', store.getState().recentlyViewed.items);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
