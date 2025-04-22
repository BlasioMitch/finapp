import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';
import api from '@/lib/axios';

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string, refreshToken: string) => void;
  logout: () => Promise<void>;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      login: (user, token, refreshToken) => {
        console.log('Logging in user:', user);
        set({ user, token, refreshToken, isAuthenticated: true });
      },
      logout: async () => {
        try {
          await api.post('/logout');
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          console.log('Logging out user');
          set({ user: null, token: null, refreshToken: null, isAuthenticated: false });
        }
      },
      setToken: (token) => {
        console.log('Setting new token');
        set({ token });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
); 