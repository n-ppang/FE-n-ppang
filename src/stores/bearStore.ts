import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type BearStore = {
  bears: number;
  increase: () => void;
  decrease: () => void;
  setBears: (count: number) => void;
  reset: () => void;
};

export const useBearStore = create<BearStore>()(
  devtools(
    persist(
      immer((set) => ({
        bears: 0,

        increase: () =>
          set(
            (state) => {
              state.bears += 1; // immer 덕분에 mutate-style 가능
            },
            false,
            'increase',
          ),

        decrease: () =>
          set(
            (state) => {
              state.bears -= 1;
            },
            false,
            'decrease',
          ),

        setBears: (count) =>
          set(
            (state) => {
              state.bears = count;
            },
            false,
            'setBears',
          ),

        reset: () =>
          set(
            (state) => {
              state.bears = 0;
            },
            false,
            'reset',
          ),
      })),
      {
        name: 'bear-store', // localStorage key
      },
    ),
  ),
);
