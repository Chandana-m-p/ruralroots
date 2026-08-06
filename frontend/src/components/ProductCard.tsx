import React from 'react';
import { Link } from 'react-router-dom';
import { LocalProduct } from '../db';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: LocalProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { getLocalizedTitle, t } = useLanguage();
  const { addToCart, items } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFav = isInWishlist(product.id);
  const inCart = items.some(i => i.product.id === product.id);
  const title = getLocalizedTitle(product.titleI18n);
  const isBestseller = product.id % 2 === 1;

  return (
    <div className="product-card">
      <div className="thumb">
        {isBestseller && <span className="tag-bestseller">{t('bestsellerTag')}</span>}
        <button 
          className={`fav-btn ${isFav ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          title={isFav ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Wishlist"
        >
          {isFav ? '♥' : '♡'}
        </button>
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.thumbnailUrl} 
            alt={title} 
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1622560481156-01ac25e4c0ac?w=300&h=300&fit=crop';
            }}
          />
        </Link>
      </div>

      <div className="info">
        <Link to={`/product/${product.id}`}>
          <h4>{title}</h4>
        </Link>
        <div className="price">₹{Number(product.basePrice).toLocaleString('en-IN')}</div>
        
        <button 
          className={`btn ${inCart ? 'btn-clay' : 'btn-primary'} btn-block`} 
          style={{ marginTop: '10px', padding: '8px 12px', fontSize: '0.85rem' }}
          onClick={() => addToCart(product)}
        >
          {inCart ? `${t('addedToCart')} ✓` : t('addToCart')}
        </button>
      </div>
    </div>
  );
};
