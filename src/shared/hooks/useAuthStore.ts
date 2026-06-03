import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '@/remote/axiosInstance';

interface UserState {
  role: 'ADMIN' | 'USER' | null;
  isLoggedIn: boolean;
  setLoggedIn: (isLoggedIn: boolean) => void;
  fetchMe: () => Promise<'ADMIN' | 'USER' | null>;
  logout: () => void;
}

export const useAuthStore = create<UserState>()(
  persist(
    (set) => ({
      role: null,
      isLoggedIn: !!localStorage.getItem('accessToken'),
      setLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
      fetchMe: async () => {
        try {
          const res = await api.get('/users/me');
          const { role } = res.data;
          // ROLE_ADMIN -> ADMIN, ROLE_USER -> USER 로 매핑
          const mappedRole = role === 'ROLE_ADMIN' ? 'ADMIN' : 'USER';
          set({ role: mappedRole, isLoggedIn: true });
          return mappedRole;
        } catch (error) {
          console.error('Failed to fetch user info:', error);
          // 에러 발생 시 로그아웃 처리하거나 상태 유지 (상황에 따라 조절)
          set({ role: null, isLoggedIn: false });
          localStorage.removeItem('accessToken');
          return null;
        }
      },
      logout: () => {
        localStorage.removeItem('accessToken');
        set({ role: null, isLoggedIn: false });
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);
