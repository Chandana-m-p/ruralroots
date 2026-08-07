import React from 'react';
import { Footer } from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';

export const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div>
      <div className="container" style={{ padding: '40px 0 60px', maxWidth: '800px' }}>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '16px' }}>{t('ourStoryTitle')}</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--ink-soft)', lineHeight: '1.8', marginBottom: '24px' }}>
          {t('ourStoryIntro')}
        </p>

        <div style={{ background: 'var(--cream-2)', padding: '24px', borderRadius: '12px', marginBottom: '32px' }}>
          <h3>{t('empoweringArtisansHeader')}</h3>
          <p style={{ margin: 0, color: 'var(--ink-soft)' }}>
            {t('empoweringArtisansDesc')}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
