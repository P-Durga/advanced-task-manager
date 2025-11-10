// Centralized error handling utility

export class AppError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.timestamp = new Date().toISOString();
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorTypes = {
  VALIDATION_ERROR: 'ValidationError',
  NOT_FOUND: 'NotFoundError',
  UNAUTHORIZED: 'UnauthorizedError',
  STORAGE_ERROR: 'StorageError',
  NETWORK_ERROR: 'NetworkError',
};

export const handleError = (error, context = '') => {
  const errorLog = {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A',
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error Details:', errorLog);
  }

  // In production, you would send this to an error tracking service
  // like Sentry, LogRocket, or your own logging service
  if (process.env.NODE_ENV === 'production') {
    // sendToErrorTrackingService(errorLog);
  }

  return {
    message: error.isOperational 
      ? error.message 
      : 'An unexpected error occurred. Please try again.',
    statusCode: error.statusCode || 500,
  };
};

export const withErrorBoundary = (fn, fallback) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      const handledError = handleError(error, fn.name);
      return fallback ? fallback(handledError) : handledError;
    }
  };
};