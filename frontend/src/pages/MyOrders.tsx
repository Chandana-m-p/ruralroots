import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Footer } from '../components/Footer';
import { 
  PackageCheck, 
  PackageX, 
  Ban, 
  Calendar, 
  Store, 
  RefreshCw, 
  ShoppingBag,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronRight
} from 'lucide-react';

export type OrderStatusType = 'Delivered Successfully' | 'Delivered Unsuccessfully' | 'Cancelled';

export interface OrderItemDetail {
  productId: number;
  productTitle: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderEntry {
  id: number;
  orderNumber: string;
  idempotencyKey: string;
  buyerPhone: string;
  buyerName: string;
  hubName: string;
  hubLandmark: string;
  orderStatus: OrderStatusType;
  paymentType: string;
  paymentStatus: string;
  totalAmount: number;
  offlineCreatedAt: string;
  syncedAt: string;
  deliveryDate: string;
  items: OrderItemDetail[];
}

const FALLBACK_DEMO_ORDERS: OrderEntry[] = [
  {
    id: 1,
    orderNumber: 'RR-889101',
    idempotencyKey: 'a1111111-1111-1111-1111-111111111111',
    buyerPhone: '9876543210',
    buyerName: 'Ananya Sharma',
    hubName: 'Ramgarh Central Kendra (Kalyan Store)',
    hubLandmark: 'Near Panchayat Bhawan',
    orderStatus: 'Delivered Successfully',
    paymentType: 'UPI',
    paymentStatus: 'PAID',
    totalAmount: 1150.00,
    offlineCreatedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    syncedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    deliveryDate: new Date(Date.now() - 1 * 86400000).toISOString(),
    items: [
      {
        productId: 4,
        productTitle: '{"en": "Carved Sheesham Wooden Jewelry Box", "hi": "नक्काशीदार शीशम की लकड़ी का आभूषण डिब्बा"}',
        quantity: 1,
        unitPrice: 1150.00
      }
    ]
  },
  {
    id: 2,
    orderNumber: 'RR-889102',
    idempotencyKey: 'a2222222-2222-2222-2222-222222222222',
    buyerPhone: '9876543210',
    buyerName: 'Ananya Sharma',
    hubName: 'Ramgarh Central Kendra (Kalyan Store)',
    hubLandmark: 'Near Panchayat Bhawan',
    orderStatus: 'Delivered Unsuccessfully',
    paymentType: 'COD',
    paymentStatus: 'UNPAID',
    totalAmount: 899.00,
    offlineCreatedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    syncedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    deliveryDate: new Date(Date.now() - 2 * 86400000).toISOString(),
    items: [
      {
        productId: 1,
        productTitle: '{"en": "Handpainted Terracotta Vase", "hi": "हाथ से चित्रित टेराकोटा फूलदान"}',
        quantity: 1,
        unitPrice: 899.00
      }
    ]
  },
  {
    id: 3,
    orderNumber: 'RR-889103',
    idempotencyKey: 'a3333333-3333-3333-3333-333333333333',
    buyerPhone: '9876543210',
    buyerName: 'Ananya Sharma',
    hubName: 'Chandanpur Rural Hub (Gupta General)',
    hubLandmark: 'Opposite Bus Stand',
    orderStatus: 'Cancelled',
    paymentType: 'CARD',
    paymentStatus: 'REFUNDED',
    totalAmount: 699.00,
    offlineCreatedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    syncedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    deliveryDate: new Date(Date.now() - 4 * 86400000).toISOString(),
    items: [
      {
        productId: 2,
        productTitle: '{"en": "Handwoven Sabai Grass Basket", "hi": "हाथ से बुनी सबाई घास की टोकरी"}',
        quantity: 1,
        unitPrice: 699.00
      }
    ]
  }
];

export const MyOrders: React.FC = () => {
  const { user, token } = useAuth();
  const { getLocalizedTitle } = useLanguage();

  const [orders, setOrders] = useState<OrderEntry[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchUserOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/orders/my-orders', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setOrders(data);
          setLoading(false);
          return;
        }
      }
    } catch {
      // Offline fallback
    }

    setOrders(FALLBACK_DEMO_ORDERS);
    setLoading(false);
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const handleUpdateStatus = async (orderId: number, newStatus: OrderStatusType) => {
    setUpdatingId(orderId);
    try {
      await fetch(`/api/v1/orders/${orderId}/status?status=${encodeURIComponent(newStatus)}`, {
        method: 'PUT',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
    } catch {
      // Fallback local update
    }

    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, orderStatus: newStatus } : ord))
    );
    setUpdatingId(null);
  };

  const filteredOrders = orders.filter((o) => {
    if (filterStatus === 'ALL') return true;
    return o.orderStatus === filterStatus;
  });

  const getStatusBadge = (status: OrderStatusType) => {
    switch (status) {
      case 'Delivered Successfully':
        return (
          <span className="order-status-pill status-success">
            <CheckCircle2 size={15} />
            <span>Delivered Successfully</span>
          </span>
        );
      case 'Delivered Unsuccessfully':
        return (
          <span className="order-status-pill status-failed">
            <AlertTriangle size={15} />
            <span>Delivered Unsuccessfully</span>
          </span>
        );
      case 'Cancelled':
        return (
          <span className="order-status-pill status-cancelled">
            <XCircle size={15} />
            <span>Cancelled</span>
          </span>
        );
      default:
        return (
          <span className="order-status-pill status-success">
            <CheckCircle2 size={15} />
            <span>{status}</span>
          </span>
        );
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div>
      <div className="container" style={{ minHeight: '70vh', paddingBottom: '56px' }}>
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="sep">›</span>
          <span className="current">My Orders</span>
        </div>

        <div className="section-head" style={{ marginBottom: '24px' }}>
          <h2>My Order History</h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: '0.95rem' }}>
            Track product details, prices, delivery dates & status management for your RuralRoots orders.
          </p>
        </div>

        {/* Status Management Filter Tabs */}
        <div className="orders-filter-tabs">
          <button
            type="button"
            className={`orders-tab ${filterStatus === 'ALL' ? 'active' : ''}`}
            onClick={() => setFilterStatus('ALL')}
          >
            <ShoppingBag size={16} />
            <span>All Orders ({orders.length})</span>
          </button>

          <button
            type="button"
            className={`orders-tab ${filterStatus === 'Delivered Successfully' ? 'active' : ''}`}
            onClick={() => setFilterStatus('Delivered Successfully')}
          >
            <CheckCircle2 size={16} style={{ color: '#22c55e' }} />
            <span>Delivered Successfully ({orders.filter(o => o.orderStatus === 'Delivered Successfully').length})</span>
          </button>

          <button
            type="button"
            className={`orders-tab ${filterStatus === 'Delivered Unsuccessfully' ? 'active' : ''}`}
            onClick={() => setFilterStatus('Delivered Unsuccessfully')}
          >
            <AlertTriangle size={16} style={{ color: '#ef4444' }} />
            <span>Delivered Unsuccessfully ({orders.filter(o => o.orderStatus === 'Delivered Unsuccessfully').length})</span>
          </button>

          <button
            type="button"
            className={`orders-tab ${filterStatus === 'Cancelled' ? 'active' : ''}`}
            onClick={() => setFilterStatus('Cancelled')}
          >
            <XCircle size={16} style={{ color: '#f59e0b' }} />
            <span>Cancelled ({orders.filter(o => o.orderStatus === 'Cancelled').length})</span>
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <RefreshCw size={32} className="spin-icon" style={{ color: 'var(--forest)' }} />
            <p style={{ marginTop: '12px', color: 'var(--ink-soft)' }}>Loading your order history...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="empty-cart" style={{ textAlign: 'center', padding: '48px 24px' }}>
            <h3>No orders found in this category</h3>
            <p style={{ margin: '12px 0 20px', color: 'var(--ink-soft)' }}>
              Try selecting another status tab or place a new order from our shop.
            </p>
            <Link to="/shop" className="btn btn-primary">
              Browse Handmade Catalog
            </Link>
          </div>
        ) : (
          <div className="my-orders-list">
            {filteredOrders.map((order) => (
              <div key={order.id} className="order-history-card">
                
                {/* Order Top Bar Header */}
                <div className="order-card-header">
                  <div className="order-header-main">
                    <div className="order-num-tag">
                      <span>Order #</span>
                      <strong>{order.orderNumber}</strong>
                    </div>
                    <div className="order-date-tag">
                      <Calendar size={14} />
                      <span>Purchased: {formatDate(order.offlineCreatedAt)}</span>
                    </div>
                  </div>
                  {getStatusBadge(order.orderStatus)}
                </div>

                {/* Main Order Content */}
                <div className="order-card-body">
                  
                  {/* Left Column: Product Details List */}
                  <div className="order-products-section">
                    <h4 className="section-subtitle">Product Details</h4>
                    <div className="order-items-list">
                      {order.items && order.items.map((item, idx) => {
                        const title = getLocalizedTitle(item.productTitle);
                        const itemPrice = Number(item.unitPrice);
                        const itemTotal = itemPrice * item.quantity;

                        return (
                          <div key={idx} className="order-product-row">
                            <div className="order-product-info">
                              <div className="product-title-text">{title}</div>
                              <div className="product-qty-meta">
                                Qty: <strong>{item.quantity}</strong> &bull; Unit Price: <strong>₹{itemPrice.toLocaleString('en-IN')}</strong>
                              </div>
                            </div>
                            <div className="product-item-total">
                              ₹{itemTotal.toLocaleString('en-IN')}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Order Summary, Hub & Delivery Date */}
                  <div className="order-meta-section">
                    
                    <div className="meta-box">
                      <div className="meta-label">
                        <Calendar size={15} />
                        <span>Delivery Date</span>
                      </div>
                      <div className="meta-value-bold">
                        {formatDate(order.deliveryDate)}
                      </div>
                    </div>

                    <div className="meta-box">
                      <div className="meta-label">
                        <Store size={15} />
                        <span>Village Hub Partner</span>
                      </div>
                      <div className="meta-value-sub">
                        {order.hubName}
                      </div>
                    </div>

                    <div className="meta-box total-box">
                      <div className="meta-label">
                        <span>Total Price</span>
                      </div>
                      <div className="total-amount-display">
                        ₹{Number(order.totalAmount).toLocaleString('en-IN')}
                      </div>
                    </div>

                    {/* Interactive Status Management Controls */}
                    <div className="status-management-box">
                      <label className="status-control-label">Status Management</label>
                      <select
                        className="status-control-select"
                        value={order.orderStatus}
                        disabled={updatingId === order.id}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value as OrderStatusType)}
                      >
                        <option value="Delivered Successfully">🟢 Delivered Successfully</option>
                        <option value="Delivered Unsuccessfully">🔴 Delivered Unsuccessfully</option>
                        <option value="Cancelled">🟡 Cancelled</option>
                      </select>
                    </div>

                  </div>

                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
