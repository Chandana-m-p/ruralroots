import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { HubSelector } from '../components/HubSelector';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

export const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart, totalAmount } = useCart();
  const { getLocalizedTitle, t } = useLanguage();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="page-container empty-cart-container">
        <ShoppingBag size={64} className="empty-icon" />
        <h2>आपकी कार्ट खाली है</h2>
        <p>उत्पाद देखने और ऑर्डर करने के लिए होमपेज पर जाएं।</p>
        <Link to="/" className="btn-primary">
          उत्पाद देखें
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2 className="page-title">{t('cart')} ({items.length})</h2>

      <div className="cart-list">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="cart-item">
            <img src={product.thumbnailUrl} alt="" className="cart-item-img" />
            <div className="cart-item-details">
              <h4 className="cart-item-title">{getLocalizedTitle(product.titleI18n)}</h4>
              <span className="cart-item-price">₹{product.basePrice.toFixed(2)}</span>

              <div className="qty-row">
                <div className="qty-controls">
                  <button onClick={() => updateQuantity(product.id, quantity - 1)}>
                    <Minus size={14} />
                  </button>
                  <span className="qty-val">{quantity}</span>
                  <button onClick={() => updateQuantity(product.id, quantity + 1)}>
                    <Plus size={14} />
                  </button>
                </div>
                <button onClick={() => removeFromCart(product.id)} className="remove-btn">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hub Selector */}
      <HubSelector />

      {/* Cart Summary */}
      <div className="checkout-summary-card">
        <div className="summary-row">
          <span>{t('totalAmount')}:</span>
          <span className="total-val">₹{totalAmount.toFixed(2)}</span>
        </div>
        <p className="cod-note">{t('codNotice')}</p>

        <button className="btn-primary btn-block" onClick={() => navigate('/checkout')}>
          <span>{t('checkout')}</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};
