import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useOffline } from '../context/OfflineContext';
import { db } from '../db';
import { syncPendingOrders } from '../services/sync';
import { ShieldCheck, Phone, CheckCircle2 } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { items, totalAmount, selectedHubId, clearCart } = useCart();
  const { user, token } = useAuth();
  const { t } = useLanguage();
  const { refreshQueuedCount } = useOffline();
  const navigate = useNavigate();

  const [phone, setPhone] = useState(user?.phoneNumber || '');
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      alert('कृपया valid 10 अंकों का फोन नंबर दर्ज करें।');
      return;
    }

    setLoading(true);
    const idempotencyKey = crypto.randomUUID();

    const newPendingOrder = {
      idempotencyKey,
      hubId: selectedHubId || 1,
      hubName: 'Ramgarh Central Kendra (Kalyan Store)',
      buyerPhone: phone,
      totalAmount,
      paymentType: 'COD',
      items: items.map(i => ({
        productId: i.product.id,
        productTitle: i.product.titleI18n,
        quantity: i.quantity,
        unitPrice: i.product.basePrice
      })),
      offlineCreatedAt: new Date().toISOString(),
      syncStatus: 'QUEUED' as const
    };

    // Save locally to IndexedDB queue first for 100% offline resilience
    await db.pendingOrders.add(newPendingOrder);
    await refreshQueuedCount();

    // If online & authenticated, attempt immediate background sync
    if (navigator.onLine && token) {
      await syncPendingOrders(token);
    }

    clearCart();
    setLoading(false);
    navigate('/order-success', { state: { idempotencyKey } });
  };

  return (
    <div className="page-container">
      <h2 className="page-title">{t('checkout')}</h2>

      <form onSubmit={handlePlaceOrder} className="checkout-form">
        <div className="form-group">
          <label className="form-label">
            <Phone size={18} />
            <span>मोबाइल नंबर (SMS पुष्टि के लिए)</span>
          </label>
          <input 
            type="tel" 
            pattern="[0-9]{10}"
            required
            className="form-input" 
            placeholder="9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="payment-method-box">
          <ShieldCheck size={24} className="pay-icon" />
          <div>
            <h4>कैश ऑन डिलीवरी (COD)</h4>
            <p>सामग्री प्राप्त करते समय ग्राम केंद्र पर नकद भुगतान करें।</p>
          </div>
        </div>

        <div className="order-summary-box">
          <h3>कुल देय राशि: ₹{totalAmount.toFixed(2)}</h3>
        </div>

        <button type="submit" disabled={loading} className="btn-primary btn-block">
          {loading ? 'ऑर्डर सेव हो रहा है...' : t('placeOrder')}
        </button>
      </form>
    </div>
  );
};
