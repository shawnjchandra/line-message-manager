import React from 'react';
import { useToastStore } from '../../stores/toastStore';
import CustomToast from '../CustomToast/CustomToast';
import './GlobalToastContainer.scss';

const GlobalToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="global-toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-wrapper">
          <CustomToast
            show={true}
            onClose={() => removeToast(toast.id)}
            message={toast.message}
            title={toast.title}
            delay={toast.delay}
            autohide={true}
            type={toast.type}
          />
        </div>
      ))}
    </div>
  );
};

export default GlobalToastContainer;

