import create from 'zustand';
import { CustomToastInterface } from '../components/CustomToast/CustomToastInterface';

interface ToastState extends CustomToastInterface {
  show: boolean;
  showToast: (config: CustomToastInterface) => void;
  hideToast: () => void;
}

const useToastStore = create<ToastState>((set) => ({
  show: false,
  type: '',
  message: '',
  title: '',
  showToast: (config) => set({ ...config, show: true }),
  hideToast: () => set({ show: false }),
}));

export default useToastStore;