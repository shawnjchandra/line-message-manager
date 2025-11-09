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
}


export default function CustomToast({
    show,
    onClose,
    title,
    message, 
    delay=5000, 
    autohide = true}: CustomToastProps) {
    return (
        <div>
            <Toast
                show={show}
                onClose={onClose}
                delay={delay}
                autohide={autohide}
            >
                { title && (
                        <Toast.Header>
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