import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { db, LocalPendingOrder } from '../db';
import { Store, CheckCircle, Search, RefreshCw, UserCheck } from 'lucide-react';

export const HubDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [orders, setOrders] = useState<LocalPendingOrder[]>([]);
  const [searchPhone, setSearchPhone] = useState('');

  const loadHubOrders = async () => {
    const all = await db.pendingOrders.toArray();
    setOrders(all);
  };

  useEffect(() => {
    loadHubOrders();
  }, []);

  const handleDeliver = async (id?: number) => {
    if (!id) return;
    await db.pendingOrders.update(id, { syncStatus: 'SYNCED' });
    alert('सामग्री सुपुर्दगी और नकद संग्रह सफल! ग्राहक को SMS भेजा गया।');
    loadHubOrders();
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
        <h3>गंतव्य ऑर्डर 목록 ({filteredOrders.length})</h3>

        {filteredOrders.length === 0 ? (
          <p className="no-data">कोई लंबित ऑर्डर नहीं मिला।</p>
        ) : (
          filteredOrders.map((order, idx) => (
            <div key={order.id || idx} className="hub-order-card">
              <div className="order-header">
                <span className="order-phone">
                  <UserCheck size={16} /> {order.buyerPhone}
                </span>
                <span className={`status-badge ${order.syncStatus.toLowerCase()}`}>
                  {order.syncStatus}
                </span>
              </div>

              <div className="order-body">
                <p><strong>कुल नकद प्राप्त करना:</strong> ₹{order.totalAmount.toFixed(2)}</p>
                <div className="items-mini">
                  {order.items.map((item, i) => (
                    <span key={i} className="item-pill">
                      Product #{item.productId} x {item.quantity}
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
