import React, { useState } from 'react';
import { LocalProduct } from '../db';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Check, Volume2 } from 'lucide-react';

interface ProductCardProps {
  product: LocalProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { getLocalizedTitle, t } = useLanguage();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const localizedTitle = getLocalizedTitle(product.titleI18n);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const playAudioPrompt = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`${localizedTitle}, price ${product.basePrice} rupees`);
      utterance.lang = 'hi-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="product-card">
      <div className="product-img-wrapper">
        <img 
          src={product.thumbnailUrl} 
          alt={localizedTitle} 
          className="product-img" 
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&q=60';
          }}
        />
        <button className="audio-prompt-btn" onClick={playAudioPrompt} title="Listen title">
          <Volume2 size={16} />
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-title">{localizedTitle}</h3>
        <div className="product-price-row">
          <span className="price-label">₹{product.basePrice.toFixed(2)}</span>
          <span className="stock-tag">In Stock</span>
        </div>

        <button 
          className={`add-cart-btn ${added ? 'added' : ''}`}
          onClick={handleAdd}
        >
          {added ? (
            <>
              <Check size={18} />
              <span>{t('addedToCart')}</span>
            </>
          ) : (
            <>
              <ShoppingCart size={18} />
              <span>{t('addToCart')}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
