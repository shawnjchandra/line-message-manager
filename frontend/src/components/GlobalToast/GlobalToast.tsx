import CustomToast from '../CustomToast/CustomToast';
import useToastStore from '../../stores/toastStore';

export default function GlobalToast() {
  const { show, type, message, title, hideToast } = useToastStore();

  return (
    <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}>
      <CustomToast
        show={show}
        onClose={hideToast}
        type={type}
        message={message}
        title={title}
      />
    </div>
  );
}