import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { auth } from '@devvai/devv-code-backend';

interface User {
  uid: string;
  email: string;
  name: string;
  createdTime: number;
  lastLoginTime: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  sendOTP: (email: string) => Promise<{ success: boolean; error?: string }>;
  verifyOTP: (email: string, code: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuthStatus: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      sendOTP: async (email: string) => {
        set({ isLoading: true });
        try {
          await auth.sendOTP(email);
          set({ isLoading: false });
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to send OTP'
          };
        }
      },

      verifyOTP: async (email: string, code: string) => {
        set({ isLoading: true });
        try {
          const response = await auth.verifyOTP(email, code);
          const user: User = {
            uid: response.user.uid,
            email: response.user.email,
            name: response.user.name,
            createdTime: response.user.createdTime,
            lastLoginTime: response.user.lastLoginTime
          };
          
          set({
            user,
            isAuthenticated: true,
            isLoading: false
          });
          
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Invalid verification code'
          };
        }
      },

      logout: async () => {
        try {
          await auth.logout();
        } catch (error) {
          console.warn('Logout error:', error);
        } finally {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false
          });
        }
      },

      checkAuthStatus: () => {
        const sid = localStorage.getItem('DEVV_CODE_SID');
        const currentState = get();
        
        if (sid && !currentState.isAuthenticated && currentState.user) {
          set({ isAuthenticated: true });
        } else if (!sid) {
          set({
            user: null,
            isAuthenticated: false
          });
        }
      }
    }),
    {
      name: 'health-vision-auth',
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
);