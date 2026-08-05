import React from 'react';
import { Footer } from '../components/Footer';

export const Blog: React.FC = () => {
  return (
    <div>
      <div className="container" style={{ padding: '40px 0 60px' }}>
        <h2>Rural Craft Stories & Harvest Insights</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginTop: '24px' }}>
          <div className="artisan-card" style={{ padding: '20px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--clay)', fontWeight: '700' }}>CRAFT HERITAGE</span>
            <h3 style={{ marginTop: '8px' }}>Preserving Handwoven Traditions in Andhra Villages</h3>
            <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem', marginTop: '8px' }}>How women artisans are using sustainable palm leaves to create eco-friendly home baskets.</p>
          </div>
          <div className="artisan-card" style={{ padding: '20px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--forest)', fontWeight: '700' }}>VILLAGE LOGISTICS</span>
            <h3 style={{ marginTop: '8px' }}>The Power of Village Hub Kirana Stores</h3>
            <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem', marginTop: '8px' }}>Why local community hubs solve the rural Cash-on-Delivery logistics bottleneck.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
