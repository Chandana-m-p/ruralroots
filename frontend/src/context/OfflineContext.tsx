import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../db';

interface OfflineContextType {
  isOffline: boolean;
  queuedCount: number;
  refreshQueuedCount: () => Promise<void>;
}

const OfflineContext = createContext<OfflineContextType>({} as OfflineContextType);

export const OfflineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [queuedCount, setQueuedCount] = useState(0);

  const refreshQueuedCount = async () => {
    const count = await db.pendingOrders.where('syncStatus').equals('QUEUED').count();
    setQueuedCount(count);
  };

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    refreshQueuedCount();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <OfflineContext.Provider value={{ isOffline, queuedCount, refreshQueuedCount }}>
      {children}
    </OfflineContext.Provider>
  );
};

export const useOffline = () => useContext(OfflineContext);
