import { memo } from 'react';

export const withLoading = (Component) => {
  return memo(({ isLoading, ...props }) => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }
    return <Component {...props} />;
  });
};