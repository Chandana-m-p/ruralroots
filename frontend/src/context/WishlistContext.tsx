import React, { createContext, useContext, useState, useEffect } from 'react';
import { LocalProduct } from '../db';

interface WishlistContextType {
  wishlist: LocalProduct[];
  toggleWishlist: (product: LocalProduct) => void;
  isInWishlist: (productId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType>({} as WishlistContextType);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<LocalProduct[]>(() => {
    const saved = localStorage.getItem('rr_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('rr_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product: LocalProduct) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some(p => p.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
