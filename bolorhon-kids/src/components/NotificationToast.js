import React from 'react';
import './NotificationToast.css';

const NotificationToast = ({ 
  notification, 
  onClose 
}) => {
  if (!notification) return null;

  return (
    <div className={`notification ${notification.type} animate-slide-down`}>
      <div className="notification-content">
        <span className="notification-icon">
          {notification.type === 'success' && '✅'}
          {notification.type === 'error' && '❌'}
          {notification.type === 'info' && 'ℹ️'}
        </span>
        <span className="notification-message">{notification.message}</span>
      </div>
      <button 
        className="notification-close"
        onClick={onClose}
      >
        ✕
      </button>
    </div>
  );
};

export default NotificationToast;