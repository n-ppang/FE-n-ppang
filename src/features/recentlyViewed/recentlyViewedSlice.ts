import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ProductSummary } from './types';

type RecentlyViewedState = {
  items: ProductSummary[];
  limit: number;
};

const initialState: RecentlyViewedState = {
  items: [],
  limit: 3,
};

const recentlyViewedSlice = createSlice({
  name: 'recentlyViewed',
  initialState,
  reducers: {
    addRecentlyViewed: (state, action: PayloadAction<Omit<ProductSummary, 'lastViewedAt'>>) => {
      const incoming = action.payload;

      // 1) 중복 제거
      state.items = state.items.filter((x) => x.id !== incoming.id);

      // 2) 맨 앞에 추가(최신)
      state.items.unshift({
        ...incoming,
        lastViewedAt: Date.now(),
      });

      // 3) limit 초과 컷
      if (state.items.length > state.limit) {
        state.items = state.items.slice(0, state.limit);
      }
    },

    removeRecentlyViewed: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((x) => x.id !== action.payload);
    },

    clearRecentlyViewed: (state) => {
      state.items = [];
    },

    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
      if (state.items.length > state.limit) {
        state.items = state.items.slice(0, state.limit);
      }
    },
  },
});

export const {
  addRecentlyViewed,
  removeRecentlyViewed,
  clearRecentlyViewed,
  setLimit,
} = recentlyViewedSlice.actions;

export default recentlyViewedSlice.reducer;
