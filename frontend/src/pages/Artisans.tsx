import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArtisanCard, Artisan } from '../components/ArtisanCard';
import { Footer } from '../components/Footer';

const artisansList: Artisan[] = [
  {
    id: 'artisan-1',
    name: 'Ananya Sharma',
    location: 'Jaipur, Rajasthan',
    craft: 'Terracotta & Pottery',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=faces',
    rating: 4.9,
    productCount: 24
  },
  {
    id: 'artisan-2',
    name: 'Lalitha Devi',
    location: 'Srikakulam, Andhra Pradesh',
    craft: 'Handwoven Sabai Grass',
    photo: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=300&fit=crop&crop=faces',
    rating: 4.8,
    productCount: 32
  },
  {
    id: 'artisan-3',
    name: 'Ramesh Kumar',
    location: 'Indore, Madhya Pradesh',
    craft: 'Sheesham Wood Carving',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop&crop=faces',
    rating: 4.7,
    productCount: 18
  },
  {
    id: 'artisan-4',
    name: 'Meena Bai',
    location: 'Guwahati, Assam',
    craft: 'Bamboo & Cane Weaving',
    photo: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=300&h=300&fit=crop&crop=faces',
    rating: 4.9,
    productCount: 29
  },
  {
    id: 'artisan-5',
    name: 'Suresh Patil',
    location: 'Kolhapur, Maharashtra',
    craft: 'Traditional Leather & Metal',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=faces',
    rating: 4.6,
    productCount: 21
  },
  {
    id: 'artisan-6',
    name: 'Kamla Devi',
    location: 'Kutch, Gujarat',
    craft: 'Mirrorwork & Embroidery',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=faces',
    rating: 4.95,
    productCount: 35
  }
];

export const Artisans: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');

  const filtered = artisansList.filter((a) => {
    if (selectedRegion === 'all') return true;
    return a.location.toLowerCase().includes(selectedRegion.toLowerCase());
  });

  return (
    <div>
      <div className="container" style={{ paddingBottom: '48px' }}>
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="sep">›</span>
          <span className="current">Artisans</span>
        </div>

        {/* Hero Spotlight */}
        <div className="hero" style={{ padding: '36px', borderRadius: 'var(--radius-lg)', marginBottom: '32px' }}>
          <div style={{ maxWidth: '640px' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>Meet Our Rural Artisans</h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: '1rem', lineHeight: '1.6' }}>
              Every product on RuralRoots is hand-crafted by skilled master artisans across India's villages. By purchasing directly, 100% of fair income flows back into rural households.
            </p>
          </div>
        </div>

        {/* Region Filter Bar */}
        <div className="shop-toolbar" style={{ marginBottom: '24px' }}>
          <span style={{ color: 'var(--ink-soft)', fontSize: '0.92rem', fontWeight: 600 }}>
            Filter Artisans by Region:
          </span>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['all', 'Rajasthan', 'Andhra Pradesh', 'Madhya Pradesh', 'Assam', 'Gujarat'].map((reg) => (
              <button
                key={reg}
                className={`btn ${selectedRegion === reg ? 'btn-primary' : 'btn-outline'}`}
                style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                onClick={() => setSelectedRegion(reg)}
              >
                {reg === 'all' ? 'All Regions' : reg}
              </button>
            ))}
          </div>
        </div>

        <div className="artisan-grid">
          {filtered.map((artisan) => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};
