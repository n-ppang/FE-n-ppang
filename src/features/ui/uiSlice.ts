import { createSlice } from '@reduxjs/toolkit';

type UIState = {
  recentFloaterOpen: boolean;
};

const initialState: UIState = {
  recentFloaterOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openRecentFloater: (state) => {
      state.recentFloaterOpen = true;
    },
    closeRecentFloater: (state) => {
      state.recentFloaterOpen = false;
    },
    toggleRecentFloater: (state) => {
      state.recentFloaterOpen = !state.recentFloaterOpen;
    },
  },
});

export const { openRecentFloater, closeRecentFloater, toggleRecentFloater } = uiSlice.actions;
export default uiSlice.reducer;
