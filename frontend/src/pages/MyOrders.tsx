import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Footer } from '../components/Footer';
import { WriteReviewModal } from '../components/WriteReviewModal';
import { CustomerServiceModal, ServiceMode } from '../components/CustomerServiceModal';
import { OrderDetailsModal, OrderDetailsData } from '../components/OrderDetailsModal';
import { db } from '../db';
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
  ChevronRight,
  Star,
  RotateCcw,
  Truck,
  Clock,
  MapPin,
  Eye
} from 'lucide-react';

export type OrderStatusType = 
  | 'ORDER_PLACED' 
  | 'Order Placed' 
  | 'DISPATCHED' 
  | 'Dispatched' 
  | 'IN_TRANSIT' 
  | 'In Transit' 
  | 'READY_FOR_PICKUP' 
  | 'Ready for Pickup' 
  | 'Delivered Successfully' 
  | 'DELIVERED' 
  | 'Delivered Unsuccessfully' 
  | 'Cancelled' 
  | 'CANCELLED' 
  | 'Return Requested' 
  | 'Exchange Requested' 
  | 'Returned';

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
    offlineCreatedAt: new Date(Date.now() - 12 * 86400000).toISOString(),
    syncedAt: new Date(Date.now() - 12 * 86400000).toISOString(),
    deliveryDate: new Date(Date.now() - 9 * 86400000).toISOString(),
    items: [
      {
        productId: 4,
        productTitle: '{"en": "Carved Sheesham Wooden Jewelry Box", "hi": "नक्काशीदार शीशम की लकड़ी का आभूषण डिब्बा", "kn": "ಕೆತ್ತಿದ ಶೀಶಮ್ ಮರದ ಆಭರಣ ಪೆಟ್ಟಿಗೆ"}',
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
    orderStatus: 'Delivered Successfully',
    paymentType: 'COD',
    paymentStatus: 'PAID',
    totalAmount: 899.00,
    offlineCreatedAt: new Date(Date.now() - 8 * 86400000).toISOString(),
    syncedAt: new Date(Date.now() - 8 * 86400000).toISOString(),
    deliveryDate: new Date(Date.now() - 5 * 86400000).toISOString(),
    items: [
      {
        productId: 1,
        productTitle: '{"en": "Handpainted Terracotta Vase", "hi": "हाथ से चित्रित टेराकोटा फूलदान", "kn": "ಕೈಯಿಂದ ಬಣ್ಣ ಬಳಿದ ಟೆರಾಕೋಟಾ ಹೂದಾನಿ"}',
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
    orderStatus: 'Delivered Unsuccessfully',
    paymentType: 'COD',
    paymentStatus: 'UNPAID',
    totalAmount: 699.00,
    offlineCreatedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    syncedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    deliveryDate: new Date(Date.now() - 2 * 86400000).toISOString(),
    items: [
      {
        productId: 2,
        productTitle: '{"en": "Handwoven Sabai Grass Basket", "hi": "हाथ से बुनी सबाई घास की टोकरी", "kn": "ಕೈयಿಂದ ನೇಯ್ದ ಸಬಾಯಿ ಹುಲ್ಲಿನ ಬುಟ್ಟಿ"}',
        quantity: 1,
        unitPrice: 699.00
      }
    ]
  },
  {
    id: 4,
    orderNumber: 'RR-889104',
    idempotencyKey: 'a4444444-4444-4444-4444-444444444444',
    buyerPhone: '9876543210',
    buyerName: 'Ananya Sharma',
    hubName: 'Ramgarh Central Kendra (Kalyan Store)',
    hubLandmark: 'Near Panchayat Bhawan',
    orderStatus: 'DISPATCHED',
    paymentType: 'UPI',
    paymentStatus: 'PAID',
    totalAmount: 1299.00,
    offlineCreatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    syncedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    deliveryDate: new Date(Date.now() + 1 * 86400000).toISOString(),
    items: [
      {
        productId: 5,
        productTitle: '{"en": "Handwoven Organic Cotton Stole", "hi": "हाथ से बुना ऑर्गेनिक कॉटन स्टोल", "kn": "ಕೈಯಿಂದ ನೇಯ್ದ ಸಾವಯವ ಹತ್ತಿ ಶಾಲು"}',
        quantity: 1,
        unitPrice: 1299.00
      }
    ]
  },
  {
    id: 5,
    orderNumber: 'RR-889105',
    idempotencyKey: 'a5555555-5555-5555-5555-555555555555',
    buyerPhone: '9876543210',
    buyerName: 'Ananya Sharma',
    hubName: 'Chandanpur Rural Hub (Gupta General)',
    hubLandmark: 'Opposite Bus Stand',
    orderStatus: 'Cancelled',
    paymentType: 'CARD',
    paymentStatus: 'REFUNDED',
    totalAmount: 450.00,
    offlineCreatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    syncedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    deliveryDate: new Date(Date.now() + 2 * 86400000).toISOString(),
    items: [
      {
        productId: 3,
        productTitle: '{"en": "Beaded Tribal Drop Earrings", "hi": "मनके वाले जनजातीय झुमके", "kn": "ಮಣಿಗಳುಳ್ಳ ಗಿರಿಜನ ಕಿವಿಯೋಲೆಗಳು"}',
        quantity: 1,
        unitPrice: 450.00
      }
    ]
  }
];

export const MyOrders: React.FC = () => {
  const { user, token } = useAuth();
  const { getLocalizedTitle, t } = useLanguage();

  const [orders, setOrders] = useState<OrderEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [reviewModalState, setReviewModalState] = useState<{ productId: number; productTitle: string; orderId: number } | null>(null);
  const [detailsModalData, setDetailsModalData] = useState<OrderDetailsData | null>(null);
  const [serviceModalState, setServiceModalState] = useState<{
    orderId: number;
    orderNumber: string;
    productId?: number;
    productTitle?: string;
    mode: ServiceMode;
  } | null>(null);

  const [inlineFormKey, setInlineFormKey] = useState<string | null>(null);
  const [inlineType, setInlineType] = useState<'RETURN' | 'EXCHANGE'>('RETURN');
  const [inlineReason, setInlineReason] = useState<string>('DAMAGED_IN_TRANSIT');
  const [inlineComment, setInlineComment] = useState<string>('');
  const [inlineSubmitting, setInlineSubmitting] = useState(false);

  const fetchUserOrders = async () => {
    setLoading(true);
    let combinedOrders: OrderEntry[] = [];

    // 1. Fetch remote orders from API
    try {
      const res = await fetch('/api/v1/orders/my-orders', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          combinedOrders = data;
        }
      }
    } catch (err) {
      console.warn('API order fetch warning:', err);
    }

    // 2. Fetch local pending orders from IndexedDB to ensure zero-latency display
    try {
      const pendingList = await db.pendingOrders.toArray();
      const currentUserPhone = user?.phoneNumber || '9876543210';
      const userPending = pendingList.filter((po) => !po.buyerPhone || po.buyerPhone === currentUserPhone);

      userPending.forEach((po) => {
        const exists = combinedOrders.some(
          (o) => o.idempotencyKey && po.idempotencyKey && o.idempotencyKey === po.idempotencyKey
        );
        if (!exists) {
          combinedOrders.unshift({
            id: po.id || Math.floor(Math.random() * 100000),
            orderNumber: po.orderNumber || `RR-${po.idempotencyKey.slice(0, 6).toUpperCase()}`,
            idempotencyKey: po.idempotencyKey,
            buyerPhone: po.buyerPhone,
            buyerName: user?.fullName || 'Ananya Sharma',
            hubName: po.hubName || 'Ramgarh Central Kendra (Kalyan Store)',
            hubLandmark: 'Near Panchayat Bhawan',
            orderStatus: (po.orderStatus as OrderStatusType) || 'ORDER_PLACED',
            paymentType: po.paymentType || 'COD',
            paymentStatus: po.syncStatus === 'QUEUED' ? 'PENDING_SYNC' : 'PAID',
            totalAmount: po.totalAmount,
            offlineCreatedAt: po.offlineCreatedAt || new Date().toISOString(),
            syncedAt: po.offlineCreatedAt || new Date().toISOString(),
            deliveryDate: po.deliveryDate || new Date(Date.now() + 3 * 86400000).toISOString(),
            items: po.items.map((it) => ({
              productId: it.productId,
              productTitle: typeof it.productTitle === 'string' ? it.productTitle : JSON.stringify(it.productTitle),
              quantity: it.quantity,
              unitPrice: it.unitPrice
            }))
          });
        }
      });
    } catch (err) {
      console.warn('IndexedDB pending orders fetch warning:', err);
    }

    if (combinedOrders.length === 0) {
      combinedOrders = FALLBACK_DEMO_ORDERS;
    }

    setOrders(combinedOrders);
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
    if (filterStatus === 'ACTIVE') {
      return o.orderStatus === 'ORDER_PLACED' || o.orderStatus === 'Order Placed' || o.orderStatus === 'DISPATCHED' || o.orderStatus === 'In Transit' || o.orderStatus === 'READY_FOR_PICKUP';
    }
    return o.orderStatus === filterStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ORDER_PLACED':
      case 'Order Placed':
      case 'CONFIRMED':
        return (
          <span className="order-status-pill" style={{ background: '#E0E7FF', color: '#3730A3', border: '1px solid #C7D2FE', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={15} />
            <span>Order Placed</span>
          </span>
        );
      case 'DISPATCHED':
      case 'Dispatched':
        return (
          <span className="order-status-pill" style={{ background: '#FEF3C7', color: '#B45309', border: '1px solid #FCD34D', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Truck size={15} />
            <span>Dispatched</span>
          </span>
        );
      case 'IN_TRANSIT':
      case 'In Transit':
        return (
          <span className="order-status-pill" style={{ background: '#DBEAFE', color: '#1E40AF', border: '1px solid #93C5FD', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Truck size={15} />
            <span>In Transit</span>
          </span>
        );
      case 'READY_FOR_PICKUP':
      case 'Ready for Pickup':
        return (
          <span className="order-status-pill" style={{ background: '#ECFDF5', color: '#047857', border: '1px solid #A7F3D0', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Store size={15} />
            <span>Ready for Pickup</span>
          </span>
        );
      case 'Delivered Successfully':
      case 'DELIVERED':
        return (
          <span className="order-status-pill status-success">
            <CheckCircle2 size={15} />
            <span>{t('deliveredSuccessFilter').replace(' ({{count}})', '')}</span>
          </span>
        );
      case 'Delivered Unsuccessfully':
        return (
          <span className="order-status-pill status-failed">
            <AlertTriangle size={15} />
            <span>{t('deliveredUnsuccessfulBadge')}</span>
          </span>
        );
      case 'Cancelled':
      case 'CANCELLED':
        return (
          <span className="order-status-pill" style={{ background: '#FEE2E2', color: '#991B1B', border: '1px solid #FCA5A5', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <XCircle size={15} />
            <span>Cancelled</span>
          </span>
        );
      case 'Returned':
        return (
          <span className="order-status-pill" style={{ background: '#F3E8FF', color: '#6B21A8', border: '1px solid #E9D5FF', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <RotateCcw size={15} />
            <span>Returned</span>
          </span>
        );
      case 'Return Requested':
        return (
          <span className="order-status-pill" style={{ background: '#FEF3C7', color: '#B45309', border: '1px solid #FCD34D', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <RotateCcw size={15} />
            <span>Return Requested</span>
          </span>
        );
      case 'Exchange Requested':
        return (
          <span className="order-status-pill" style={{ background: '#E0E7FF', color: '#3730A3', border: '1px solid #C7D2FE', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <RefreshCw size={15} />
            <span>Exchange Requested</span>
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

  const renderTrackingStepperProgress = (order: OrderEntry) => {
    const isCancelled = order.orderStatus === 'Cancelled' || order.orderStatus === 'CANCELLED';
    const isDelivered = order.orderStatus === 'Delivered Successfully' || order.orderStatus === 'DELIVERED';

    let activeStage = 1;
    if (isDelivered) {
      activeStage = 5;
    } else if (isCancelled) {
      activeStage = 0;
    } else {
      const elapsedMinutes = (Date.now() - new Date(order.offlineCreatedAt).getTime()) / (1000 * 60);
      if (elapsedMinutes > 60) activeStage = 4;
      else if (elapsedMinutes > 10) activeStage = 3;
      else if (elapsedMinutes > 2) activeStage = 2;
      else activeStage = 1;
    }

    const steps = [
      { label: 'Order Placed', desc: 'Received' },
      { label: 'Dispatched', desc: 'Kendra Origin' },
      { label: 'In Transit', desc: 'Logistics' },
      { label: 'At Village Hub', desc: 'Ready for Pickup' },
      { label: 'Delivered', desc: 'Handover Done' }
    ];

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px', textAlign: 'center', marginTop: '10px' }}>
        {steps.map((st, idx) => {
          const stepNum = idx + 1;
          const isDone = !isCancelled && stepNum <= activeStage;
          const isCurrent = !isCancelled && stepNum === activeStage;

          return (
            <div key={idx} style={{ position: 'relative' }}>
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: isCancelled ? '#EF4444' : isDone ? 'var(--forest)' : '#CBD5E1',
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 6px',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  border: isCurrent ? '3px solid #86EFAC' : 'none',
                  boxShadow: isCurrent ? '0 0 0 2px var(--forest)' : 'none'
                }}
              >
                {isDone ? '✓' : stepNum}
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: isCurrent ? 800 : 600, color: isCurrent ? 'var(--forest)' : 'var(--ink)' }}>
                {st.label}
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--ink-soft)' }}>{st.desc}</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <div className="container" style={{ minHeight: '70vh', paddingBottom: '56px' }}>
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">{t('home')}</Link>
          <span className="sep">›</span>
          <span className="current">{t('myOrders')}</span>
        </div>

        <div className="section-head" style={{ marginBottom: '24px' }}>
          <h2>{t('myOrderHistory')}</h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: '0.95rem' }}>
            {t('myOrderHistorySub')}
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="orders-filter-tabs">
          <button
            type="button"
            className={`orders-tab ${filterStatus === 'ALL' ? 'active' : ''}`}
            onClick={() => setFilterStatus('ALL')}
          >
            <ShoppingBag size={16} />
            <span>{t('allOrdersFilter').replace('{{count}}', String(orders.length))}</span>
          </button>

          <button
            type="button"
            className={`orders-tab ${filterStatus === 'ACTIVE' ? 'active' : ''}`}
            onClick={() => setFilterStatus('ACTIVE')}
          >
            <Truck size={16} style={{ color: '#3b82f6' }} />
            <span>Active Orders ({orders.filter(o => o.orderStatus === 'ORDER_PLACED' || o.orderStatus === 'Order Placed' || o.orderStatus === 'DISPATCHED' || o.orderStatus === 'In Transit' || o.orderStatus === 'READY_FOR_PICKUP').length})</span>
          </button>

          <button
            type="button"
            className={`orders-tab ${filterStatus === 'Delivered Successfully' ? 'active' : ''}`}
            onClick={() => setFilterStatus('Delivered Successfully')}
          >
            <CheckCircle2 size={16} style={{ color: '#22c55e' }} />
            <span>{t('deliveredSuccessFilter').replace('{{count}}', String(orders.filter(o => o.orderStatus === 'Delivered Successfully' || o.orderStatus === 'DELIVERED').length))}</span>
          </button>

          <button
            type="button"
            className={`orders-tab ${filterStatus === 'Cancelled' ? 'active' : ''}`}
            onClick={() => setFilterStatus('Cancelled')}
          >
            <XCircle size={16} style={{ color: '#f59e0b' }} />
            <span>{t('cancelledFilter').replace('{{count}}', String(orders.filter(o => o.orderStatus === 'Cancelled' || o.orderStatus === 'CANCELLED').length))}</span>
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <RefreshCw size={32} className="spin-icon" style={{ color: 'var(--forest)' }} />
            <p style={{ marginTop: '12px', color: 'var(--ink-soft)' }}>Loading your orders...</p>
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
                
                {/* Order Header */}
                <div className="order-card-header">
                  <div className="order-header-main">
                    <div className="order-num-tag">
                      <span>{t('orderHash').replace('{{id}}', order.orderNumber)}</span>
                    </div>
                    <div className="order-date-tag">
                      <Calendar size={14} />
                      <span>{t('purchasedOn').replace('{{date}}', formatDate(order.offlineCreatedAt))}</span>
                    </div>
                  </div>
                  {getStatusBadge(order.orderStatus)}
                </div>

                {/* Real-Time Logistics Tracking Banner */}
                <div style={{ background: 'var(--cream)', padding: '14px 18px', borderRadius: '12px', margin: '16px 20px 0', border: '1px solid var(--line)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--forest)' }}>
                      <Truck size={16} />
                      <span>Real-Time Tracking & Delivery Details</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--ink-soft)', fontWeight: 600 }}>Expected Delivery:</span>
                      <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--forest-dark)', background: '#DCFCE7', padding: '3px 10px', borderRadius: '6px', border: '1px solid #86EFAC' }}>
                        📅 {formatDate(order.deliveryDate)}
                      </span>
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        style={{ fontSize: '0.78rem', padding: '4px 10px', display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#fff' }}
                        onClick={() => setDetailsModalData({
                          id: order.id,
                          orderNumber: order.orderNumber,
                          idempotencyKey: order.idempotencyKey,
                          buyerName: order.buyerName,
                          buyerPhone: order.buyerPhone,
                          hubName: order.hubName,
                          hubLandmark: order.hubLandmark,
                          orderStatus: order.orderStatus,
                          paymentType: order.paymentType,
                          paymentStatus: order.paymentStatus,
                          totalAmount: order.totalAmount,
                          offlineCreatedAt: order.offlineCreatedAt,
                          syncedAt: order.syncedAt,
                          items: order.items.map(it => ({
                            productId: it.productId,
                            title: getLocalizedTitle(it.productTitle),
                            quantity: it.quantity,
                            unitPrice: Number(it.unitPrice)
                          }))
                        })}
                      >
                        <Eye size={13} /> Full Logistics View
                      </button>
                    </div>
                  </div>
                  {renderTrackingStepperProgress(order)}
                </div>

                {/* Main Order Content */}
                <div className="order-card-body">
                  
                  {/* Left Column: Products List */}
                  <div className="order-products-section">
                    <h4 className="section-subtitle">{t('productDetailsLabel')}</h4>
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
                                {t('qtyLabel').replace('{{qty}}', String(item.quantity)).replace('{{price}}', itemPrice.toLocaleString('en-IN'))}
                              </div>
                              {(order.orderStatus === 'Delivered Successfully' || order.orderStatus === 'DELIVERED') && (
                                <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
                                  <button
                                    type="button"
                                    className="btn btn-outline btn-sm"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', padding: '3px 8px' }}
                                    onClick={() => setReviewModalState({ productId: item.productId, productTitle: title, orderId: order.id })}
                                  >
                                    <Star size={13} color="#F59E0B" fill="#F59E0B" /> Write Review
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-outline btn-sm"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', padding: '3px 8px', color: 'var(--forest)' }}
                                    onClick={() => {
                                      const key = `${order.id}-${item.productId}`;
                                      setInlineFormKey((prev) => (prev === key ? null : key));
                                    }}
                                  >
                                    <RotateCcw size={13} /> {inlineFormKey === `${order.id}-${item.productId}` ? 'Hide Return/Exchange' : 'Return / Exchange'}
                                  </button>
                                </div>
                              )}

                              {inlineFormKey === `${order.id}-${item.productId}` && (
                                <div style={{ marginTop: '12px', background: 'var(--cream)', border: '1.5px solid var(--forest)', padding: '14px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                  <div style={{ fontWeight: 700, fontSize: '0.84rem', color: 'var(--forest-dark)' }}>
                                    Direct Return / Exchange Form
                                  </div>
                                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                    <button
                                      type="button"
                                      onClick={() => setInlineType('RETURN')}
                                      style={{
                                        padding: '6px 10px',
                                        fontSize: '0.8rem',
                                        fontWeight: 700,
                                        borderRadius: '6px',
                                        border: inlineType === 'RETURN' ? '2px solid var(--forest)' : '1px solid var(--line)',
                                        background: inlineType === 'RETURN' ? 'var(--cream-2)' : '#fff',
                                        color: inlineType === 'RETURN' ? 'var(--forest)' : 'var(--ink)',
                                        cursor: 'pointer'
                                      }}
                                    >
                                      ↩️ Return for Refund
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setInlineType('EXCHANGE')}
                                      style={{
                                        padding: '6px 10px',
                                        fontSize: '0.8rem',
                                        fontWeight: 700,
                                        borderRadius: '6px',
                                        border: inlineType === 'EXCHANGE' ? '2px solid var(--forest)' : '1px solid var(--line)',
                                        background: inlineType === 'EXCHANGE' ? 'var(--cream-2)' : '#fff',
                                        color: inlineType === 'EXCHANGE' ? 'var(--forest)' : 'var(--ink)',
                                        cursor: 'pointer'
                                      }}
                                    >
                                      🔄 Exchange Item
                                    </button>
                                  </div>

                                  <div>
                                    <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                                      Mandatory Reason *
                                    </label>
                                    <select
                                      value={inlineReason}
                                      onChange={(e) => setInlineReason(e.target.value)}
                                      style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '0.82rem', background: '#fff' }}
                                    >
                                      <option value="DAMAGED_IN_TRANSIT">Product damaged or broken during transit</option>
                                      <option value="DEFECTIVE_OR_NON_FUNCTIONAL">Product defective, cracked, or non-functional</option>
                                      <option value="ITEM_NOT_AS_DESCRIBED">Item differs significantly from photos/description</option>
                                      <option value="WRONG_ITEM_DELIVERED">Received wrong item or size</option>
                                      <option value="QUALITY_DISSATISFACTION">Dissatisfied with material quality</option>
                                    </select>
                                  </div>

                                  <div>
                                    <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                                      Detailed Remarks *
                                    </label>
                                    <textarea
                                      rows={2}
                                      value={inlineComment}
                                      onChange={(e) => setInlineComment(e.target.value)}
                                      placeholder="Describe reason for return/exchange..."
                                      style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '0.82rem', background: '#fff' }}
                                    />
                                  </div>

                                  <button
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                    style={{ alignSelf: 'flex-start', padding: '6px 14px', fontSize: '0.8rem', borderRadius: '6px' }}
                                    disabled={inlineSubmitting}
                                    onClick={async () => {
                                      setInlineSubmitting(true);
                                      const nextStatus = inlineType === 'EXCHANGE' ? 'Exchange Requested' : 'Returned';
                                      setOrders((prev) =>
                                        prev.map((o) => (o.id === order.id ? { ...o, orderStatus: nextStatus } : o))
                                      );
                                      setInlineFormKey(null);
                                      setInlineComment('');
                                      setInlineSubmitting(false);
                                    }}
                                  >
                                    {inlineSubmitting ? 'Submitting...' : 'Submit Request'}
                                  </button>
                                </div>
                              )}

                              {order.orderStatus !== 'Delivered Successfully' && order.orderStatus !== 'DELIVERED' && order.orderStatus !== 'Cancelled' && order.orderStatus !== 'CANCELLED' && (
                                <button
                                  type="button"
                                  className="btn btn-outline btn-sm"
                                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', padding: '3px 8px', marginTop: '6px', color: '#dc2626', borderColor: '#fca5a5' }}
                                  onClick={() =>
                                    setServiceModalState({
                                      orderId: order.id,
                                      orderNumber: order.orderNumber,
                                      productId: item.productId,
                                      productTitle: title,
                                      mode: 'CANCELLATION'
                                    })
                                  }
                                >
                                  <PackageX size={13} /> Cancel Order
                                </button>
                              )}
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
                        <span>{t('deliveryDateLabel')}</span>
                      </div>
                      <div className="meta-value-bold" style={{ color: 'var(--forest-dark)' }}>
                        {formatDate(order.deliveryDate)}
                      </div>
                    </div>

                    <div className="meta-box">
                      <div className="meta-label">
                        <Store size={15} />
                        <span>{t('villageHubPartnerLabel')}</span>
                      </div>
                      <div className="meta-value-sub">
                        {order.hubName}
                      </div>
                    </div>

                    <div className="meta-box total-box">
                      <div className="meta-label">
                        <span>{t('totalPriceLabel')}</span>
                      </div>
                      <div className="total-amount-display">
                        ₹{Number(order.totalAmount).toLocaleString('en-IN')}
                      </div>
                    </div>

                    {/* Interactive Status Control */}
                    <div className="status-management-box">
                      <label className="status-control-label">{t('statusManagementLabel')}</label>
                      <select
                        className="status-control-select"
                        value={order.orderStatus}
                        disabled={updatingId === order.id}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value as OrderStatusType)}
                      >
                        <option value="ORDER_PLACED">🔵 Order Placed</option>
                        <option value="DISPATCHED">🚚 Dispatched</option>
                        <option value="IN_TRANSIT">📦 In Transit</option>
                        <option value="Delivered Successfully">🟢 {t('deliveredSuccessFilter').replace(' ({{count}})', '')}</option>
                        <option value="Delivered Unsuccessfully">🔴 {t('deliveredUnsuccessfulBadge')}</option>
                        <option value="Cancelled">🟡 {t('cancelledBadge')}</option>
                        <option value="Returned">🟣 Returned</option>
                      </select>
                    </div>

                  </div>

                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {detailsModalData && (
        <OrderDetailsModal
          order={detailsModalData}
          onClose={() => setDetailsModalData(null)}
          onCancelOrder={async (orderId, reason) => {
            setOrders((prev) =>
              prev.map((o) => (o.id === Number(orderId) || o.orderNumber === String(orderId) ? { ...o, orderStatus: 'Cancelled' } : o))
            );
            fetchUserOrders();
          }}
        />
      )}

      {reviewModalState && (
        <WriteReviewModal
          productId={reviewModalState.productId}
          productTitle={reviewModalState.productTitle}
          orderId={reviewModalState.orderId}
          onClose={() => setReviewModalState(null)}
          onSuccess={() => {
            fetchUserOrders();
          }}
        />
      )}

      {serviceModalState && (
        <CustomerServiceModal
          isOpen={true}
          onClose={() => setServiceModalState(null)}
          orderId={serviceModalState.orderId}
          orderNumber={serviceModalState.orderNumber}
          productId={serviceModalState.productId}
          productTitle={serviceModalState.productTitle}
          mode={serviceModalState.mode}
          onSuccess={(reqType) => {
            const nextStatus: OrderStatusType =
              reqType === 'CANCELLATION' ? 'Cancelled' : reqType === 'EXCHANGE' ? 'Exchange Requested' : 'Returned';
            setOrders((prev) =>
              prev.map((o) => (o.id === serviceModalState.orderId ? { ...o, orderStatus: nextStatus } : o))
            );
            fetchUserOrders();
          }}
        />
      )}

      <Footer />
    </div>
  );
};
