import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { fetchHubs } from '../services/api';
import { MapPin, Store, CheckCircle } from 'lucide-react';

export const HubSelector: React.FC = () => {
  const { t } = useLanguage();
  const { selectedHubId, setSelectedHubId } = useCart();
  const [hubs, setHubs] = useState<any[]>([]);

  useEffect(() => {
    fetchHubs().then(setHubs);
  }, []);

  return (
    <div className="hub-selector-card">
      <h3 className="selector-title">
        <Store size={20} className="title-icon" />
        <span>{t('selectHub')}</span>
      </h3>

      <div className="hub-options">
        {hubs.map(hub => {
          const isSelected = selectedHubId === hub.id;
          return (
            <div 
              key={hub.id} 
              className={`hub-card ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedHubId(hub.id)}
            >
              <div className="hub-card-header">
                <span className="hub-name">{hub.hubName}</span>
                {isSelected && <CheckCircle size={18} className="check-icon" />}
              </div>
              <div className="hub-details">
                <span className="hub-location">
                  <MapPin size={14} /> {hub.villageName}, {hub.district} ({hub.pincode})
                </span>
                <span className="hub-landmark">
                  {t('hubLandmark')}: {hub.landmark}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
