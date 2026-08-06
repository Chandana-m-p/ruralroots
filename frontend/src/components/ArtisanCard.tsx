import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export interface Artisan {
  id: string;
  name: string;
  location: string;
  craft: string;
  photo: string;
  rating: number;
  productCount: number;
}

interface ArtisanCardProps {
  artisan: Artisan;
}

export const ArtisanCard: React.FC<ArtisanCardProps> = ({ artisan }) => {
  const [isFav, setIsFav] = useState(false);

  return (
    <div className="artisan-card">
      <div className="photo">
        <img src={artisan.photo} alt={artisan.name} loading="lazy" />
        <button 
          className={`fav-btn ${isFav ? 'active' : ''}`} 
          onClick={(e) => {
            e.preventDefault();
            setIsFav(!isFav);
          }}
          title={isFav ? 'Following Artisan' : 'Follow Artisan'}
          aria-label="Favorite artisan"
        >
          {isFav ? '♥' : '♡'}
        </button>
      </div>
      <div className="info">
        <Link to={`/artisans?id=${artisan.id}`}>
          <h4>{artisan.name}</h4>
        </Link>
        <div className="loc">📍 {artisan.location}</div>
        <div className="rating-row">
          <span className="stars">★ {artisan.rating}</span>
          <span className="count">({artisan.productCount} creations)</span>
        </div>
      </div>
    </div>
  );
};
