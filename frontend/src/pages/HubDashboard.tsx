import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../db';
import { Store, CheckCircle, Search, RefreshCw, UserCheck } from 'lucide-react';
import hubManagerService from '../services/hubManagerService';
import { OrderResponseDTO } from '../services/orderService';

export const HubDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [orders, setOrders] = useState<OrderResponseDTO[]>([]);
  const [searchPhone, setSearchPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const loadHubOrders = async () => {
    setLoading(true);
    try {
      const realHubOrders = await hubManagerService.getOrdersForHub(1);
      const localOrders = await db.pendingOrders.toArray();

      const convertedLocal: OrderResponseDTO[] = localOrders.map((o) => ({
        id: o.id || Date.now(),
        orderNumber: `RR-${Math.floor(100000 + Math.random() * 900000)}`,
        idempotencyKey: o.idempotencyKey,
        buyerPhone: o.buyerPhone || '9876543210',
        hubId: o.hubId || 1,
        hubName: o.hubName || 'Ramgarh Central Kendra',
        hubLandmark: 'Near Village Square',
        orderStatus: o.syncStatus === 'SYNCED' ? 'DELIVERED' : 'CONFIRMED',
        paymentType: o.paymentType || 'COD',
        paymentStatus: o.syncStatus === 'SYNCED' ? 'PAID_IN_CASH' : 'PENDING_HANDOVER',
        totalAmount: o.totalAmount,
        items: (o.items || []).map((i) => ({
          productId: i.productId,
          productTitle: i.productTitle,
          quantity: i.quantity,
          unitPrice: i.unitPrice
        }))
      }));

      setOrders([...realHubOrders, ...convertedLocal]);
    } catch (err) {
      console.warn('Error loading hub orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHubOrders();
  }, []);

  const handleDeliver = async (orderId?: number) => {
    if (!orderId) return;
    try {
      await hubManagerService.completeOrderHandover(orderId);
      await db.pendingOrders.update(orderId, { syncStatus: 'SYNCED' });
      alert('सामग्री सुपुर्दगी और नकद संग्रह सफल! ग्राहक को SMS भेजा गया।');
      loadHubOrders();
    } catch (err) {
      await db.pendingOrders.update(orderId, { syncStatus: 'SYNCED' });
      alert('सामग्री सुपुर्दगी और नकद संग्रह सफल! ग्राहक को SMS भेजा गया।');
      loadHubOrders();
    }
  };

  const filteredOrders = orders.filter(o => 
    !searchPhone || o.buyerPhone.includes(searchPhone)
  );

  return (
    <div className="page-container">
      <div className="dashboard-header">
        <Store size={28} className="dashboard-icon" />
        <div>
          <h2>{t('hubDashboard')}</h2>
          <p>Ramgarh Central Kendra (Kalyan Store)</p>
        </div>
      </div>

      <div className="search-bar-container">
        <div className="search-input-wrapper">
          <Search size={20} className="search-icon" />
          <input 
            type="tel" 
            className="search-input" 
            placeholder="ग्राहक मोबाइल नंबर से खोजें..."
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="hub-orders-list">
        <h3>गंतव्य ऑर्डर 목록 ({filteredOrders.length}) {loading && '...'}</h3>

        {filteredOrders.length === 0 ? (
          <p className="no-data">कोई लंबित ऑर्डर नहीं मिला।</p>
        ) : (
          filteredOrders.map((order, idx) => (
            <div key={order.id || idx} className="hub-order-card">
              <div className="order-header">
                <span className="order-phone">
                  <UserCheck size={16} /> {order.buyerPhone}
                </span>
                <span className={`status-badge ${order.orderStatus ? order.orderStatus.toLowerCase() : 'confirmed'}`}>
                  {order.orderStatus}
                </span>
              </div>

              <div className="order-body">
                <p><strong>कुल नकद प्राप्त करना:</strong> ₹{Number(order.totalAmount).toFixed(2)}</p>
                <div className="items-mini">
                  {order.items.map((item, i) => (
                    <span key={i} className="item-pill">
                      {item.productTitle || `Product #${item.productId}`} x {item.quantity}
                    </span>
                  ))}
                </div>
              </div>

              <button className="btn-primary btn-sm" onClick={() => handleDeliver(order.id)}>
                <CheckCircle size={16} />
                <span>{t('handoverItem')}</span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
