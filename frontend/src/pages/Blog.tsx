import React from 'react';
import { Footer } from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';

export const Blog: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div>
      <div className="container" style={{ padding: '40px 0 60px' }}>
        <h2>{t('blogTitle')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginTop: '24px' }}>
          <div className="artisan-card" style={{ padding: '20px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--clay)', fontWeight: '700' }}>{t('craftHeritageTag')}</span>
            <h3 style={{ marginTop: '8px' }}>{t('blogPost1Title')}</h3>
            <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem', marginTop: '8px' }}>{t('blogPost1Desc')}</p>
          </div>
          <div className="artisan-card" style={{ padding: '20px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--forest)', fontWeight: '700' }}>{t('villageLogisticsTag')}</span>
            <h3 style={{ marginTop: '8px' }}>{t('blogPost2Title')}</h3>
            <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem', marginTop: '8px' }}>{t('blogPost2Desc')}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
