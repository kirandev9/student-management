import React from 'react';

/**
 * ToastNotification Component
 * Displays user feedback alerts for registration, update, and deletion events.
 */
function ToastNotification({ notification, onClose }) {
  if (!notification) return null;

  const { type, message } = notification;

  return (
    <div className={`toast-container toast-${type}`}>
      <div className="toast-icon">
        {type === 'success' && '✅'}
        {type === 'danger' && '🗑️'}
        {type === 'info' && 'ℹ️'}
      </div>
      <div className="toast-content">{message}</div>
      <button className="toast-close" onClick={onClose} aria-label="Close message">
        ✕
      </button>
    </div>
  );
}

export default ToastNotification;
