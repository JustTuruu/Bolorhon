import React from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({ 
  isOpen, 
  confirmAction, 
  onClose 
}) => {
  if (!isOpen || !confirmAction) return null;

  return (
    <div className="modal-overlay animate-fade-in">
      <div className="confirm-modal animate-bounce-in">
        <div className="confirm-icon">⚠️</div>
        <h3>Баталгаажуулах</h3>
        <p>{confirmAction.message}</p>
        <div className="confirm-actions">
          <button 
            className="confirm-btn confirm-yes"
            onClick={confirmAction.onConfirm}
          >
            ✓ Тийм
          </button>
          <button 
            className="confirm-btn confirm-no"
            onClick={confirmAction.onCancel}
          >
            ✕ Үгүй
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;