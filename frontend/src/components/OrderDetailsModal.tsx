import React, { useState } from 'react';
import { X, MapPin, Package, Clock, CheckCircle2, AlertCircle, Printer, XCircle, Shield, Phone, Truck, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface OrderItem {
  id?: number;
  productId?: number;
  productName?: string;
  title?: string;
  quantity: number;
  unitPrice: number;
  price?: number;
  thumbnailUrl?: string;
  image?: string;
}

export interface OrderDetailsData {
  id?: number | string;
  orderNumber: string;
  idempotencyKey?: string;
  buyerName?: string;
  buyerPhone?: string;
  hubId?: number;
  hubName?: string;
  hubLandmark?: string;
  orderStatus: string;
  paymentType?: string;
  paymentStatus?: string;
  totalAmount: number;
  createdAt?: string;
  syncedAt?: string;
  offlineCreatedAt?: string;
  cancellationReason?: string;
  cancelledAt?: string;
  items?: OrderItem[];
}

interface OrderDetailsModalProps {
  order: OrderDetailsData;
  onClose: () => void;
  onCancelOrder?: (orderId: string | number, reason: string) => Promise<void>;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, onClose, onCancelOrder }) => {
  const { t } = useLanguage();
  const [showCancelPrompt, setShowCancelPrompt] = useState(false);
  const [cancelReason, setCancelReason] = useState('Change of plans');
  const [cancelling, setCancelling] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'DELIVERED':
      case 'COMPLETED':
        return { label: 'Delivered & Cash Collected', bg: '#D1FAE5', color: '#065F46', icon: <CheckCircle2 size={16} /> };
      case 'CANCELLED':
        return { label: 'Order Cancelled', bg: '#FEE2E2', color: '#991B1B', icon: <XCircle size={16} /> };
      case 'DISPATCHED':
      case 'IN_TRANSIT':
        return { label: 'In Transit to Hub', bg: '#DBEAFE', color: '#1E40AF', icon: <Truck size={16} /> };
      case 'PENDING_SYNC':
        return { label: 'Pending Offline Sync', bg: '#FEF3C7', color: '#92400E', icon: <Clock size={16} /> };
      default:
        return { label: 'Order Confirmed', bg: '#E0E7FF', color: '#3730A3', icon: <CheckCircle2 size={16} /> };
    }
  };

  const badge = getStatusBadge(order.orderStatus);

  const handlePrint = () => {
    window.print();
  };

  const handleConfirmCancel = async () => {
    if (!onCancelOrder || !order.id) return;
    setCancelling(true);
    try {
      await onCancelOrder(order.id, cancelReason);
      setShowCancelPrompt(false);
      onClose();
    } catch {
      // Error handling managed upstream
    } finally {
      setCancelling(false);
    }
  };

  // Sample fallback items if backend response only contained total
  const displayItems = order.items && order.items.length > 0 ? order.items : [
    {
      productId: 1,
      title: "Handpainted Terracotta Water Pitcher (Surahi)",
      quantity: 1,
      unitPrice: order.totalAmount || 650,
      thumbnailUrl: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&q=80"
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(5px)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }} onClick={onClose}>
      <div style={{
        background: 'var(--white)',
        maxWidth: '780px',
        width: '100%',
        maxHeight: '90vh',
        borderRadius: '20px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* MODAL HEADER */}
        <div style={{
          padding: '24px 28px',
          borderBottom: '1px solid var(--line)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--cream)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--forest)' }}>
                Order #{order.orderNumber}
              </h2>
              <div style={{
                background: badge.bg,
                color: badge.color,
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                {badge.icon} {badge.label}
              </div>
            </div>

            <div style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', marginTop: '4px' }}>
              Placed on {order.createdAt || order.syncedAt || order.offlineCreatedAt || 'Today'} • Idempotency UUID: <span style={{ fontFamily: 'monospace' }}>{order.idempotencyKey?.slice(0, 13) || 'LOCAL-SYNC-KEY'}...</span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'var(--white)',
              border: '1px solid var(--line)',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >
            <X size={20} color="var(--ink)" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* STATUS PROGRESS STEPPER */}
          <div style={{
            background: 'var(--cream-2)',
            padding: '20px',
            borderRadius: '14px',
            border: '1px solid var(--line)'
          }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--forest)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} /> Delivery Progress Timeline
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', textAlign: 'center', position: 'relative' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--forest)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px', fontWeight: 700, fontSize: '0.8rem' }}>1</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink)' }}>Order Placed</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--ink-soft)' }}>Offline/Synced</div>
              </div>

              <div>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: order.orderStatus === 'CANCELLED' ? '#EF4444' : 'var(--forest)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px', fontWeight: 700, fontSize: '0.8rem' }}>2</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink)' }}>Dispatched</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--ink-soft)' }}>Consignment</div>
              </div>

              <div>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: order.orderStatus === 'DELIVERED' ? 'var(--forest)' : '#CBD5E1', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px', fontWeight: 700, fontSize: '0.8rem' }}>3</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink)' }}>At Village Hub</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--ink-soft)' }}>Ready for Pickup</div>
              </div>

              <div>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: order.orderStatus === 'DELIVERED' ? '#16A34A' : '#CBD5E1', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px', fontWeight: 700, fontSize: '0.8rem' }}>4</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink)' }}>Cash Handover</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--ink-soft)' }}>COD Completed</div>
              </div>
            </div>
          </div>

          {/* VILLAGE HUB & BUYER INFO */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            <div style={{ background: 'var(--white)', padding: '18px', borderRadius: '12px', border: '1px solid var(--line)' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--clay)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={15} /> Pickup Village Hub
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink)' }}>
                {order.hubName || 'Ramgarh Village Hub (Kirana)'}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', marginTop: '4px' }}>
                Landmark: {order.hubLandmark || 'Near Banyan Tree, Main Square'}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--forest)', fontWeight: 600, marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Shield size={14} /> Cash on Delivery Handover Station
              </div>
            </div>

            <div style={{ background: 'var(--white)', padding: '18px', borderRadius: '12px', border: '1px solid var(--line)' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--clay)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={15} /> Buyer Information
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink)' }}>
                {order.buyerName || 'Ramesh Kumar'}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', marginTop: '4px' }}>
                Mobile: +91 {order.buyerPhone || '9876543210'}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', marginTop: '8px' }}>
                Payment Method: <strong>{order.paymentType || 'COD (Cash on Delivery)'}</strong>
              </div>
            </div>
          </div>

          {/* ITEMIZED PRODUCTS LIST */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Package size={18} color="var(--forest)" /> Itemized Products Breakdown
            </h3>

            <div style={{ border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: 'var(--cream)', borderBottom: '1px solid var(--line)' }}>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--forest)' }}>Product</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--forest)', textAlign: 'center' }}>Qty</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--forest)', textAlign: 'right' }}>Price</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--forest)', textAlign: 'right' }}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {displayItems.map((item, idx) => {
                    const price = item.unitPrice || item.price || 0;
                    const title = item.productName || item.title || "Handmade Product";
                    const thumb = item.thumbnailUrl || item.image || "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=200&q=80";

                    return (
                      <tr key={idx} style={{ borderBottom: idx < displayItems.length - 1 ? '1px solid var(--line)' : 'none' }}>
                        <td style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img src={thumb} alt={title} style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover' }} />
                          <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{title}</span>
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 700 }}>{item.quantity}</td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', color: 'var(--ink-soft)' }}>₹{price.toFixed(2)}</td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, color: 'var(--ink)' }}>₹{(price * item.quantity).toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ORDER SUMMARY TOTAL */}
          <div style={{
            background: 'var(--cream)',
            padding: '16px 20px',
            borderRadius: '12px',
            border: '1px solid var(--line)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.82rem', color: 'var(--ink-soft)' }}>Village Hub Delivery Fee: <strong style={{ color: '#16A34A' }}>FREE (₹0.00)</strong></div>
              <div style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', marginTop: '2px' }}>Payment Mode: <strong>Cash on Delivery (COD)</strong></div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', fontWeight: 600 }}>Grand Total</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--forest)' }}>
                ₹{order.totalAmount ? Number(order.totalAmount).toFixed(2) : '0.00'}
              </div>
            </div>
          </div>

          {/* CANCEL PROMPT DIALOG */}
          {showCancelPrompt && (
            <div style={{ background: '#FEF2F2', padding: '16px', borderRadius: '12px', border: '1px solid #FCA5A5' }}>
              <div style={{ fontWeight: 700, color: '#991B1B', marginBottom: '8px' }}>
                Cancel Order #{order.orderNumber}?
              </div>
              <label style={{ fontSize: '0.85rem', color: '#7F1D1D', display: 'block', marginBottom: '6px' }}>
                Select Cancellation Reason:
              </label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #FCA5A5', marginBottom: '12px' }}
              >
                <option value="Change of plans">Change of plans</option>
                <option value="Ordered by mistake">Ordered by mistake</option>
                <option value="Selected wrong Village Hub">Selected wrong Village Hub</option>
                <option value="Found alternative product">Found alternative product</option>
              </select>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button onClick={() => setShowCancelPrompt(false)} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                  Keep Order
                </button>
                <button onClick={handleConfirmCancel} disabled={cancelling} style={{ background: '#DC2626', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
                  {cancelling ? 'Cancelling...' : 'Confirm Cancellation'}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* MODAL FOOTER ACTIONS */}
        <div style={{
          padding: '16px 28px',
          borderTop: '1px solid var(--line)',
          background: 'var(--cream-2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button onClick={handlePrint} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', fontSize: '0.88rem' }}>
            <Printer size={16} /> Print Receipt
          </button>

          <div style={{ display: 'flex', gap: '12px' }}>
            {onCancelOrder && order.orderStatus !== 'CANCELLED' && order.orderStatus !== 'DELIVERED' && !showCancelPrompt && (
              <button onClick={() => setShowCancelPrompt(true)} style={{ background: '#FEE2E2', color: '#991B1B', border: '1px solid #FCA5A5', padding: '8px 16px', borderRadius: '8px', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <XCircle size={16} /> Cancel Order
              </button>
            )}
            <button onClick={onClose} className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.88rem' }}>
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
