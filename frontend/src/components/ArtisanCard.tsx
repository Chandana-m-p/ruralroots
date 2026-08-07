import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export interface Artisan {
  id: string;
  name: string;
  location: string;
  craft: string;
  photo: string;
  banner?: string;
  rating: number;
  productCount: number;
  experienceYears?: number;
  specialty?: string;
  quote?: string;
  story?: string;
  category?: string;
}

interface ArtisanCardProps {
  artisan: Artisan;
  onSelectStory?: (artisan: Artisan) => void;
}

export const ArtisanCard: React.FC<ArtisanCardProps> = ({ artisan, onSelectStory }) => {
  const [isFav, setIsFav] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (onSelectStory) {
      onSelectStory(artisan);
    } else {
      navigate(`/artisans?id=${artisan.id}`);
    }
  };

  return (
    <div className="artisan-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="photo" onClick={handleCardClick} style={{ cursor: 'pointer', position: 'relative' }}>
        <img src={artisan.photo} alt={artisan.name} loading="lazy" />
        <button 
          className={`fav-btn ${isFav ? 'active' : ''}`} 
          onClick={(e) => {
            e.stopPropagation();
            setIsFav(!isFav);
          }}
          title={isFav ? 'Following Artisan' : 'Follow Artisan'}
          aria-label="Favorite artisan"
        >
          {isFav ? '♥' : '♡'}
        </button>
      </div>
      <div className="info" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <h4 style={{ margin: '0 0 4px', color: 'var(--ink)' }}>{artisan.name}</h4>
          </div>
          <div className="loc" style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', marginBottom: '6px' }}>📍 {artisan.location}</div>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--clay)', marginBottom: '8px' }}>
            🏷️ {artisan.craft}
          </div>
          <div className="rating-row">
            <span className="stars">★ {artisan.rating}</span>
            <span className="count">({artisan.productCount} creations)</span>
          </div>
        </div>

        <button 
          onClick={handleCardClick}
          className="btn btn-outline"
          style={{
            marginTop: '14px',
            width: '100%',
            padding: '8px 12px',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            borderColor: 'var(--forest)',
            color: 'var(--forest)'
          }}
        >
          <BookOpen size={14} />
          <span>Read Artisan Story</span>
        </button>
      </div>
    </div>
  );
};

