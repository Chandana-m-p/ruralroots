import React from 'react';
import { Footer } from '../components/Footer';

export const About: React.FC = () => {
  return (
    <div>
      <div className="container" style={{ padding: '40px 0 60px', maxWidth: '800px' }}>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '16px' }}>Our Story — RuralRoots</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--ink-soft)', lineHeight: '1.8', marginBottom: '24px' }}>
          RuralRoots was founded with a singular mission: to bridge the digital gap between rural artisan clusters and homes everywhere.
        </p>

        <div style={{ background: 'var(--cream-2)', padding: '24px', borderRadius: '12px', marginBottom: '32px' }}>
          <h3>Empowering 500+ Rural Artisans & 120+ Village Hubs</h3>
          <p style={{ margin: 0, color: 'var(--ink-soft)' }}>
            We eliminate middlemen, ensure fair prices paid directly to weavers and potters, and utilize local Village Hub stores for reliable Cash-on-Delivery logistics.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
