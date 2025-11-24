import create from 'zustand';
import AuthState from '../types/AuthState';
import User from '../types/User';
import { authService } from '../services/auth';

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (user: User) => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null }),
  refresh: async () => {
    const token = authService.getToken();

    if (!token) {
      set({ isAuthenticated: false, user: null });
      return;
    }

    try {
      // You need to re-fetch the user list to find the current user
      // based on the token (email)
      const response = await fetch('/data/users.json'); 
      const users: User[] = await response.json();
      
      const foundUser = users.find(u => u.email === token.email);

      if (foundUser) {
        set({ isAuthenticated: true, user: foundUser });
      } else {
        // Token exists but user not found in DB (weird state)
        set({ isAuthenticated: false, user: null });
      }
    } catch (error) {
      console.error("Failed to refresh user:", error);
      set({ isAuthenticated: false, user: null });
    }
  }
}));

export default useAuthStore;
