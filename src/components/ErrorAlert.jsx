'use client';

import { AlertCircle, X } from 'lucide-react';

export const ErrorAlert = ({ error, onDismiss }) => {
  if (!error) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md animate-slide-in">
      <div className="bg-red-50 border-l-4 border-red-500 rounded-lg shadow-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-red-900 mb-1">Error</h3>
            <p className="text-sm text-red-700">{error.message}</p>
            {error.statusCode && (
              <p className="text-xs text-red-600 mt-1">
                Status Code: {error.statusCode}
              </p>
            )}
          </div>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-red-500 hover:text-red-700 flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};