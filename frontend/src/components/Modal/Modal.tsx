//import React from 'react';
import { FaTimes } from 'react-icons/fa';
import './Modal.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button className="close-button" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};
