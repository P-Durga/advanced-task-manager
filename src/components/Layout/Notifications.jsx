'use client';

import { useNotification } from '@/context/NotificationContext';

export const Notifications = () => {
  const { notifications } = useNotification();

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse"
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
};