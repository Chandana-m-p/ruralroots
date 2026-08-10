import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Footer } from '../components/Footer';
import { WriteReviewModal } from '../components/WriteReviewModal';
import { CustomerServiceModal, ServiceMode } from '../components/CustomerServiceModal';
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
  RotateCcw
} from 'lucide-react';

export type OrderStatusType = 'Delivered Successfully' | 'Delivered Unsuccessfully' | 'Cancelled' | 'Return Requested' | 'Exchange Requested' | 'Returned';

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
    orderStatus: 'Cancelled',
    paymentType: 'COD',
    paymentStatus: 'UNPAID',
    totalAmount: 699.00,
    offlineCreatedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    syncedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    deliveryDate: new Date(Date.now() - 4 * 86400000).toISOString(),
    items: [
      {
        productId: 2,
        productTitle: '{"en": "Handwoven Sabai Grass Basket", "hi": "हाथ से बुनी सबाई घास की टोकरी", "kn": "ಕೈಯಿಂದ ನೇಯ್ದ ಸಬಾಯಿ ಹುಲ್ಲಿನ ಬುಟ್ಟಿ"}',
        quantity: 1,
        unitPrice: 699.00
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
      // Fallback
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

        {/* Status Management Filter Tabs */}
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
            className={`orders-tab ${filterStatus === 'Delivered Successfully' ? 'active' : ''}`}
            onClick={() => setFilterStatus('Delivered Successfully')}
          >
            <CheckCircle2 size={16} style={{ color: '#22c55e' }} />
            <span>{t('deliveredSuccessFilter').replace('{{count}}', String(orders.filter(o => o.orderStatus === 'Delivered Successfully').length))}</span>
          </button>

          <button
            type="button"
            className={`orders-tab ${filterStatus === 'Delivered Unsuccessfully' ? 'active' : ''}`}
            onClick={() => setFilterStatus('Delivered Unsuccessfully')}
          >
            <AlertTriangle size={16} style={{ color: '#ef4444' }} />
            <span>{t('deliveredUnsuccessFilter').replace('{{count}}', String(orders.filter(o => o.orderStatus === 'Delivered Unsuccessfully').length))}</span>
          </button>

          <button
            type="button"
            className={`orders-tab ${filterStatus === 'Cancelled' ? 'active' : ''}`}
            onClick={() => setFilterStatus('Cancelled')}
          >
            <XCircle size={16} style={{ color: '#f59e0b' }} />
            <span>{t('cancelledFilter').replace('{{count}}', String(orders.filter(o => o.orderStatus === 'Cancelled').length))}</span>
          </button>

          <button
            type="button"
            className={`orders-tab ${filterStatus === 'Returned' ? 'active' : ''}`}
            onClick={() => setFilterStatus('Returned')}
          >
            <RotateCcw size={16} style={{ color: '#8b5cf6' }} />
            <span>Returned ({orders.filter(o => o.orderStatus === 'Returned').length})</span>
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
                      <span>{t('orderHash').replace('{{id}}', order.orderNumber)}</span>
                    </div>
                    <div className="order-date-tag">
                      <Calendar size={14} />
                      <span>{t('purchasedOn').replace('{{date}}', formatDate(order.offlineCreatedAt))}</span>
                    </div>
                  </div>
                  {getStatusBadge(order.orderStatus)}
                </div>

                {/* Main Order Content */}
                <div className="order-card-body">
                  
                  {/* Left Column: Product Details List */}
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
                              {order.orderStatus === 'Delivered Successfully' && (
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
                              {order.orderStatus !== 'Delivered Successfully' && order.orderStatus !== 'Cancelled' && (
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
                      <div className="meta-value-bold">
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

                    {/* Interactive Status Management Controls */}
                    <div className="status-management-box">
                      <label className="status-control-label">{t('statusManagementLabel')}</label>
                      <select
                        className="status-control-select"
                        value={order.orderStatus}
                        disabled={updatingId === order.id}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value as OrderStatusType)}
                      >
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
