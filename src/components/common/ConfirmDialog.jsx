import React from 'react';
import { Button } from '../ui/button';

// Simple confirm dialog used across admin flows
const ConfirmDialog = ({
  open,
  onClose,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  isPending = false,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="max-w-md w-full bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-300 mb-4">{description}</p>
        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isPending}
            className="border-gray-700 text-gray-300"
          >
            {cancelText}
          </Button>
          <Button onClick={onConfirm} disabled={isPending} className={`bg-red-600 text-white`}>
            {isPending ? 'Processing...' : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
