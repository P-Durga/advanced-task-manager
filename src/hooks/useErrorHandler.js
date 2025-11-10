import { useState, useCallback } from 'react';
import { handleError } from '@/lib/errorHandler';

export const useErrorHandler = () => {
  const [error, setError] = useState(null);

  const handleAsyncError = useCallback(async (promise, context = '') => {
    try {
      setError(null);
      const result = await promise;
      return { data: result, error: null };
    } catch (err) {
      const handledError = handleError(err, context);
      setError(handledError);
      return { data: null, error: handledError };
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const throwError = useCallback((errorMessage, statusCode = 500) => {
    const error = {
      message: errorMessage,
      statusCode,
      timestamp: new Date().toISOString(),
    };
    setError(error);
  }, []);

  return {
    error,
    handleAsyncError,
    clearError,
    throwError,
    hasError: error !== null,
  };
};