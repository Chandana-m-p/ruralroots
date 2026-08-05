import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { Footer } from '../components/Footer';

export const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart, totalAmount } = useCart();
  const { getLocalizedTitle } = useLanguage();
  const navigate = useNavigate();

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <div className="container" style={{ minHeight: '60vh', paddingBottom: '40px' }}>
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="sep">›</span>
          <span className="current">Shopping Cart</span>
        </div>

        <div className="section-head">
          <h2>Your Cart (<span data-cart-count-summary>{totalCount}</span> items)</h2>
        </div>

        {items.length === 0 ? (
          <div className="empty-cart" data-cart-items>
            <h3>Your cart is currently empty</h3>
            <p style={{ margin: '12px 0 20px', color: 'var(--ink-soft)' }}>
              Explore our handmade rural crafts catalog to add items to your cart.
            </p>
            <Link to="/shop" className="btn btn-primary">
              Browse Handmade Products
            </Link>
          </div>
        ) : (
          <div className="checkout-shell">
            <div className="checkout-card" data-cart-items>
              {items.map(({ product, quantity }) => {
                const title = getLocalizedTitle(product.titleI18n);
                const itemTotal = Number(product.basePrice) * quantity;
                return (
                  <div key={product.id} className="cart-item">
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img 
                        src={product.thumbnailUrl} 
                        alt={title} 
                        style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' }} 
                      />
                      <div>
                        <h4 style={{ margin: 0, fontSize: '1rem' }}>{title}</h4>
                        <div className="meta" style={{ color: 'var(--ink-soft)', fontSize: '0.85rem', marginTop: '4px' }}>
                          Price: ₹{Number(product.basePrice).toLocaleString('en-IN')}
                        </div>
                        <div className="qty-control" style={{ marginTop: '8px' }}>
                          <button onClick={() => updateQuantity(product.id, quantity - 1)}>-</button>
                          <span>{quantity}</span>
                          <button onClick={() => updateQuantity(product.id, quantity + 1)}>+</button>
                          <button 
                            onClick={() => removeFromCart(product.id)}
                            style={{ width: 'auto', padding: '0 10px', background: 'transparent', color: '#c83e3e', fontSize: '0.85rem' }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="meta" style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--forest)' }}>
                      ₹{itemTotal.toLocaleString('en-IN')}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cart Summary */}
            <div className="checkout-summary">
              <h3>Order Summary</h3>
              <div className="checkout-item">
                <span>Subtotal ({totalCount} items)</span>
                <span data-cart-total style={{ fontWeight: 600 }}>
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="checkout-item">
                <span>Hub Shipping</span>
                <span style={{ color: totalAmount >= 1000 ? 'var(--forest)' : 'var(--ink)' }}>
                  {totalAmount >= 1000 ? 'FREE' : '₹149'}
                </span>
              </div>

              {totalAmount < 1000 && (
                <div style={{ fontSize: '0.82rem', color: 'var(--clay)', marginTop: '8px', marginBottom: '12px' }}>
                  💡 Add ₹{(1000 - totalAmount).toLocaleString('en-IN')} more to unlock FREE Village Hub shipping!
                </div>
              )}

              <div className="total-row checkout-item" style={{ fontSize: '1.2rem', marginTop: '12px' }}>
                <span>Total Payable</span>
                <span>
                  ₹{(totalAmount + (totalAmount >= 1000 ? 0 : 149)).toLocaleString('en-IN')}
                </span>
              </div>

              <button 
                className="btn btn-primary btn-block" 
                style={{ marginTop: '20px' }}
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout →
              </button>

              <div style={{ textAlign: 'center', marginTop: '14px', fontSize: '0.82rem', color: 'var(--ink-soft)' }}>
                🏬 Village Hub Pickup & Cash-on-Delivery (COD) supported
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
