import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useOffline } from '../context/OfflineContext';
import { db } from '../db';
import { syncPendingOrders } from '../services/sync';
import { fetchHubs } from '../services/api';
import { Footer } from '../components/Footer';

export const Checkout: React.FC = () => {
  const { items, totalAmount, clearCart } = useCart();
  const { user, token } = useAuth();
  const { getLocalizedTitle } = useLanguage();
  const { refreshQueuedCount } = useOffline();
  const navigate = useNavigate();

  const [hubs, setHubs] = useState<any[]>([]);
  const [selectedHub, setSelectedHub] = useState<number>(1);
  const [name, setName] = useState(user?.fullName || 'Ananya Sharma');
  const [phone, setPhone] = useState(user?.phoneNumber || '9876543210');
  const [address, setAddress] = useState('Gram Panchayat Road, House #42');
  const [pincode, setPincode] = useState('452001');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHubs().then((data) => {
      setHubs(data);
      if (data && data.length > 0) {
        setSelectedHub(data[0].id);
      }
    });
  }, []);

  const subtotal = totalAmount;
  const shipping = subtotal >= 1000 ? 0 : 149;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      alert('Please enter a valid 10-digit phone number for order updates.');
      return;
    }

    setLoading(true);
    const idempotencyKey = crypto.randomUUID();
    const chosenHubObj = hubs.find((h) => h.id === Number(selectedHub)) || hubs[0];

    const newPendingOrder = {
      idempotencyKey,
      hubId: chosenHubObj ? chosenHubObj.id : 1,
      hubName: chosenHubObj ? chosenHubObj.hubName : 'Ramgarh Central Kendra',
      buyerPhone: phone,
      totalAmount: total,
      paymentType: 'COD',
      items: items.map((i) => ({
        productId: i.product.id,
        productTitle: getLocalizedTitle(i.product.titleI18n),
        quantity: i.quantity,
        unitPrice: i.product.basePrice
      })),
      offlineCreatedAt: new Date().toISOString(),
      syncStatus: 'QUEUED' as const
    };

    // Save locally to IndexedDB queue for offline resilience
    await db.pendingOrders.add(newPendingOrder);
    await refreshQueuedCount();

    // If online, trigger background API sync
    if (navigator.onLine && token) {
      try {
        await syncPendingOrders(token);
      } catch (err) {
        console.warn('Sync failed, order stored safely in offline queue:', err);
      }
    }

    clearCart();
    setLoading(false);
    setIsSuccess(true);
  };

  return (
    <div>
      <div className="container" style={{ minHeight: '65vh', paddingBottom: '56px' }}>
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="sep">›</span>
          <Link to="/cart">Cart</Link>
          <span className="sep">›</span>
          <span className="current">Checkout</span>
        </div>

        <div className="section-head">
          <h2>Checkout</h2>
        </div>

        {isSuccess ? (
          <div className="success-box" data-order-success>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', margin: '0 0 12px', color: 'var(--forest)' }}>
              Order placed successfully! 🎉
            </h3>
            <p style={{ fontSize: '1rem', color: 'var(--ink-soft)', marginBottom: '20px' }}>
              Thank you, <strong>{name}</strong>. Your order for <strong>₹{total.toLocaleString('en-IN')}</strong> has been placed and saved safely. You will receive an SMS confirmation on {phone}.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
              <Link to="/shop" className="btn btn-primary">
                Continue Shopping
              </Link>
              <Link to="/" className="btn btn-outline">
                Back to Home
              </Link>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="empty-cart">
            <h3>Your cart is empty</h3>
            <p style={{ margin: '12px 0 20px', color: 'var(--ink-soft)' }}>
              Return to the shop to add products before completing checkout.
            </p>
            <Link to="/shop" className="btn btn-primary">
              Return to Shop
            </Link>
          </div>
        ) : (
          <div className="checkout-shell">
            {/* Delivery & Customer Info */}
            <div className="checkout-card">
              <h2>Delivery & Contact Information</h2>
              <form onSubmit={handleSubmit} className="checkout-form" data-checkout-form>
                <div className="field-grid">
                  <label>
                    Full Name *
                    <input 
                      type="text" 
                      required 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                    />
                  </label>
                  <label>
                    Phone Number (for SMS updates) *
                    <input 
                      type="tel" 
                      required 
                      pattern="[0-9]{10}" 
                      placeholder="9876543210" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                    />
                  </label>
                </div>

                <div className="field-grid">
                  <label>
                    Pincode *
                    <input 
                      type="text" 
                      required 
                      value={pincode} 
                      onChange={(e) => setPincode(e.target.value)} 
                    />
                  </label>
                  <label>
                    Select Local Village Hub (Kirana Partner) *
                    <select 
                      value={selectedHub} 
                      onChange={(e) => setSelectedHub(Number(e.target.value))}
                    >
                      {hubs.map((h) => (
                        <option key={h.id} value={h.id}>
                          {h.hubName} ({h.villageName}, {h.pincode})
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label>
                  Delivery Address / Landmark *
                  <textarea 
                    required 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    placeholder="Near Panchayat Bhawan, Main Road..." 
                  />
                </label>

                <div style={{ background: 'var(--cream)', padding: '16px', borderRadius: '8px', border: '1px solid var(--line)' }}>
                  <h4 style={{ margin: '0 0 6px', fontSize: '0.95rem' }}>💳 Payment Method</h4>
                  <label style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', margin: 0, fontWeight: 500 }}>
                    <input type="radio" name="payment" value="COD" defaultChecked />
                    <strong>Cash on Delivery (COD) at Village Hub Store</strong>
                  </label>
                  <p style={{ margin: '6px 0 0 24px', fontSize: '0.84rem', color: 'var(--ink-soft)' }}>
                    Pay in cash when you inspect and collect your items from your selected local Kirana Hub manager.
                  </p>
                </div>

                <button type="submit" disabled={loading} className="btn btn-primary btn-block" style={{ marginTop: '12px' }}>
                  {loading ? 'Processing Order...' : `Place Order (Pay ₹${total.toLocaleString('en-IN')} COD)`}
                </button>
              </form>
            </div>

            {/* Order Summary Sidebar */}
            <div className="checkout-summary">
              <h3>Order Summary</h3>
              <div className="checkout-items" data-checkout-items>
                {items.map(({ product, quantity }) => {
                  const title = getLocalizedTitle(product.titleI18n);
                  const itemTotal = Number(product.basePrice) * quantity;
                  return (
                    <div key={product.id} className="checkout-item">
                      <div>
                        <strong>{title}</strong>
                        <div className="meta">Qty: {quantity} · ₹{Number(product.basePrice).toLocaleString('en-IN')}</div>
                      </div>
                      <div className="meta" style={{ fontWeight: 600 }}>₹{itemTotal.toLocaleString('en-IN')}</div>
                    </div>
                  );
                })}
              </div>

              <div className="checkout-item">
                <span>Subtotal</span>
                <span data-checkout-subtotal>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="checkout-item">
                <span>Village Hub Shipping</span>
                <span data-checkout-shipping style={{ color: shipping === 0 ? 'var(--forest)' : 'var(--ink)' }}>
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
              <div className="total-row checkout-item" style={{ fontSize: '1.2rem' }}>
                <span>Total</span>
                <span data-checkout-total>₹{total.toLocaleString('en-IN')}</span>
              </div>

              <div style={{ marginTop: '16px', fontSize: '0.82rem', color: 'var(--ink-soft)', background: 'var(--cream-2)', padding: '12px', borderRadius: '8px' }}>
                🛡️ <strong>100% Offline-Resilient guarantee</strong>: Orders are saved instantly and synchronized automatically whenever network connectivity is available.
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
