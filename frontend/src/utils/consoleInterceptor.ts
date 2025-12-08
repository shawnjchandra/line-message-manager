import { useToastStore } from '../stores/toastStore';

// Store reference to original console methods and window.alert
const originalWarn = console.warn;
const originalError = console.error;
const originalAlert = window.alert;

// Initialize console interceptor
export const initConsoleInterceptor = () => {
  // Intercept console.warn
  console.warn = (...args: any[]) => {
    // Call original console.warn
    originalWarn.apply(console, args);
    
    // Extract message from arguments
    const message = args
      .map((arg) => {
        if (typeof arg === 'string') return arg;
        if (typeof arg === 'object') {
          try {
            return JSON.stringify(arg, null, 2);
          } catch {
            return String(arg);
          }
        }
        return String(arg);
      })
      .join(' ');

    // Show toast notification
    const toastStore = useToastStore.getState();
    toastStore.addToast({
      message: message || 'Warning occurred',
      title: 'Warning',
      type: 'warning',
      delay: 5000,
    });
  };

  // Intercept console.error
  console.error = (...args: any[]) => {
    // Call original console.error
    originalError.apply(console, args);
    
    // Extract message from arguments
    const message = args
      .map((arg) => {
        if (typeof arg === 'string') return arg;
        if (arg instanceof Error) {
          return arg.message || arg.toString();
        }
        if (typeof arg === 'object') {
          try {
            return JSON.stringify(arg, null, 2);
          } catch {
            return String(arg);
          }
        }
        return String(arg);
      })
      .join(' ');

    // Show toast notification
    const toastStore = useToastStore.getState();
    toastStore.addToast({
      message: message || 'Error occurred',
      title: 'Error',
      type: 'error',
      delay: 7000,
    });
  };

  // Intercept window.alert
  window.alert = (message?: string) => {
    // Show toast notification instead of browser alert
    const toastStore = useToastStore.getState();
    const alertMessage = message || 'Alert';
    
    // Determine toast type based on message content
    let toastType: 'warning' | 'error' | 'info' | 'success' = 'warning';
    let toastTitle = 'Alert';
    
    const lowerMessage = alertMessage.toLowerCase();
    if (lowerMessage.includes('success') || lowerMessage.includes('berhasil') || lowerMessage.includes('saved successfully')) {
      toastType = 'success';
      toastTitle = 'Success';
    } else if (lowerMessage.includes('error') || lowerMessage.includes('failed') || lowerMessage.includes('gagal')) {
      toastType = 'error';
      toastTitle = 'Error';
    } else if (lowerMessage.includes('warning') || lowerMessage.includes('perhatian')) {
      toastType = 'warning';
      toastTitle = 'Warning';
    }
    
    toastStore.addToast({
      message: alertMessage,
      title: toastTitle,
      type: toastType,
      delay: toastType === 'success' ? 3000 : 5000,
    });
    
    // Don't call original alert to prevent browser dialog
    // originalAlert(message);
  };
};

// Cleanup function (optional, for testing)
export const cleanupConsoleInterceptor = () => {
  console.warn = originalWarn;
  console.error = originalError;
  window.alert = originalAlert;
};

