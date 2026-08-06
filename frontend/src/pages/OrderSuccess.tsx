import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, Home, Package } from 'lucide-react';

export const OrderSuccess: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const idempotencyKey = location.state?.idempotencyKey || 'LOCAL-QUEUE-ID';

  return (
    <div className="page-container success-container">
      <CheckCircle2 size={72} className="success-icon" />
      <h2>ऑर्डर सफलतापूर्वक स्वीकार किया गया!</h2>
      <p className="success-msg">{t('orderSavedOffline')}</p>

      <div className="order-id-box">
        <span>ऑर्डर रेफरेंस ID:</span>
        <code>{idempotencyKey.substring(0, 18)}...</code>
      </div>

      <div className="success-actions">
        <Link to="/" className="btn-primary">
          <Home size={18} />
          <span>होम पर जाएं</span>
        </Link>
      </div>
    </div>
  );
};
