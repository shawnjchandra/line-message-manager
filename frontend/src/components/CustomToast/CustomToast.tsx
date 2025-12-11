import { Toast} from "react-bootstrap";
import { CustomToastInterface } from "./CustomToastInterface";
import './CustomToast.scss';

interface CustomToastProps extends Omit<CustomToastInterface, 'type'> {
  show: boolean;
  onClose: () => void;
  type?: 'success' | 'failed' | 'info' | '';
  delay?: number;
  autohide?: boolean;
}

export default function CustomToast({
    show,
    onClose,
    title,
    message, 
    type = 'info',
    delay=5000, 
    autohide = true
}: CustomToastProps) {
    
    const getToastClass = () => {
        switch(type) {
            case 'success':
                return 'toast-success';
            case 'failed':
                return 'toast-failed';
            case 'info':
                return 'toast-info';
            default:
                return '';
        }
    };

    return (
        <div>
            <Toast
                show={show}
                onClose={onClose}
                delay={delay}
                autohide={autohide}
                className={getToastClass()}
            >
                <Toast.Header>
                    
                    { title && (
                        <strong>
                            {title}
                        </strong>
                        )
                    }
                </Toast.Header> 
                <Toast.Body>
                    {message}
                </Toast.Body>
            </Toast>
        </div>
    );
}
