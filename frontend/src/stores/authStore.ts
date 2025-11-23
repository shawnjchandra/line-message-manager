import create from 'zustand';
import AuthState from '../types/AuthState';
import User from '../types/User';

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (user: User) => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null })
}));

export default useAuthStore;
