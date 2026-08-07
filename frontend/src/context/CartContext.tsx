import React, { createContext, useContext, useState, useEffect } from 'react';
import { LocalProduct } from '../db';

export interface CartItem {
  product: LocalProduct;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: LocalProduct) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, qty: number) => void;
  clearCart: () => void;
  totalAmount: number;
  totalCartCount: number;
  selectedHubId: number | null;
  setSelectedHubId: (id: number) => void;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('rr_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedHubId, setSelectedHubIdState] = useState<number | null>(() => {
    const saved = localStorage.getItem('rr_selected_hub');
    return saved ? Number(saved) : 1;
  });

  useEffect(() => {
    localStorage.setItem('rr_cart', JSON.stringify(items));
  }, [items]);

  const setSelectedHubId = (id: number) => {
    setSelectedHubIdState(id);
    localStorage.setItem('rr_selected_hub', String(id));
  };

  const addToCart = (product: LocalProduct) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  };

  const updateQuantity = (productId: number, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prev => prev.map(i => i.product.id === productId ? { ...i, quantity: qty } : i));
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('rr_cart');
  };

  const totalAmount = items.reduce((sum, item) => sum + (item.product.basePrice * item.quantity), 0);
  const totalCartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalAmount,
      totalCartCount,
      selectedHubId,
      setSelectedHubId
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
