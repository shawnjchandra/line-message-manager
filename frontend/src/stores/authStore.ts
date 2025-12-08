import create from 'zustand';
import AuthState from '../types/AuthState';
import User from '../types/User';
import { authService } from '../services/auth';
import { FileService } from '../services/FileService';

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (user: User) => set({ isAuthenticated: true, user }),
  logout: () => {
    authService.logout();
    set({ isAuthenticated: false, user: null });
  },
  refresh: async () => {
    const token = authService.getToken();

    if (!token) {
      set({ isAuthenticated: false, user: null });
      return;
    }

    try {
      const users= await FileService.load<User[]>('users');
      
      if (users){
      const foundUser = users.find(u => u.email === token.email);

      if (foundUser) {
        set({ isAuthenticated: true, user: foundUser });
      } else {
        set({ isAuthenticated: false, user: null });
      }}
    } catch (error) {
      // console.error("Failed to refresh user:", error);
      set({ isAuthenticated: false, user: null });
    }
  }
}));

export default useAuthStore;
