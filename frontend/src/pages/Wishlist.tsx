import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';
import { Footer } from '../components/Footer';
import { Heart } from 'lucide-react';

export const Wishlist: React.FC = () => {
  const { wishlist } = useWishlist();

  return (
    <div>
      <div className="container" style={{ padding: '32px 0 48px' }}>
        <div className="section-head">
          <h2>My Wishlist ({wishlist.length})</h2>
        </div>

        {wishlist.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <Heart size={54} color="var(--clay)" />
            <h3 style={{ marginTop: '16px' }}>Your Wishlist is Empty</h3>
            <p style={{ color: 'var(--ink-soft)' }}>Explore products and click ♡ to save your favorites.</p>
          </div>
        ) : (
          <div className="product-grid">
            {wishlist.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
