import React from 'react';
import { useOffline } from '../context/OfflineContext';
import { useLanguage } from '../context/LanguageContext';
import { WifiOff, RefreshCw } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const { isOffline, queuedCount } = useOffline();
  const { t } = useLanguage();

  if (!isOffline && queuedCount === 0) return null;

  return (
    <div className={`offline-banner ${isOffline ? 'bg-offline' : 'bg-sync'}`}>
      <div className="banner-content">
        {isOffline ? (
          <>
            <WifiOff size={18} className="icon-pulse" />
            <span>{t('offlineMode')}</span>
          </>
        ) : (
          <>
            <RefreshCw size={18} className="spin" />
            <span>Syncing {queuedCount} offline order(s)...</span>
          </>
        )}
      </div>
    </div>
  );
};
