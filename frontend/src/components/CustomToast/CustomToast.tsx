import { useState } from "react";
import { Toast} from "react-bootstrap";
import './CustomToast.scss';

interface CustomToastProps {
  show: boolean;
  onClose: () => void;
  message: string;
  title?: string;
  delay?: number;
  autohide?: boolean;
  type?: 'warning' | 'error' | 'info' | 'success';
}


export default function CustomToast({
    show,
    onClose,
    title,
    message, 
    delay=5000, 
    autohide = true,
    type = 'info'}: CustomToastProps) {
    
    const getHeaderClass = () => {
        switch(type) {
            case 'error':
                return 'toast-header-error';
            case 'warning':
                return 'toast-header-warning';
            case 'success':
                return 'toast-header-success';
            default:
                return 'toast-header-info';
        }
    };

    return (
        <div>
            <Toast
                show={show}
                onClose={onClose}
                delay={delay}
                autohide={autohide}
            >
                { title && (
                        <Toast.Header className={getHeaderClass()}>
                            <strong>
                                {title}
                            </strong>
                        </Toast.Header>
                    )
                }
                <Toast.Body>
                    {message}
                </Toast.Body>
            </Toast>
        </div>
    );
}