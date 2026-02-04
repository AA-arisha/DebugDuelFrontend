import React, { createContext, useState, useContext } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';

/* eslint-disable react-refresh/only-export-components */

/**
 * @typedef {'success' | 'error'} ToastType
 * @typedef {{ id: number, message: string, type: ToastType }} Toast
 */

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  /**
   * @param {string} message
   * @param {ToastType} [type]
   */
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Alert
            key={toast.id}
            className={
              toast.type === 'error' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
            }
          >
            <AlertDescription
              className={toast.type === 'error' ? 'text-red-800' : 'text-green-800'}
            >
              {toast.message}
            </AlertDescription>
          </Alert>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
