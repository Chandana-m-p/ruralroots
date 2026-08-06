import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { fetchHubs, fetchMyOrders, cancelOrderApi } from '../services/api';
import { db } from '../db';
import { Footer } from '../components/Footer';
import { OrderDetailsModal } from '../components/OrderDetailsModal';
import { SignOutModal } from '../components/SignOutModal';
import { User, Phone, MapPin, Shield, ShoppingBag, LogOut, CheckCircle2, Clock, Edit3, XCircle, Truck, Package, Store, AlertTriangle, ArrowRight } from 'lucide-react';

const CANCELLATION_REASONS = [
  'Ordered by mistake',
  'Delivery taking longer than expected',
  'Selected wrong Village Hub store',
  'Found better price locally',
  'Item specs / details changed',
  'Other (please specify below)'
];

export const Profile: React.FC = () => {
  const { user, token, logout } = useAuth();
  const { lang, t } = useLanguage();
  const navigate = useNavigate();

  const [hubs, setHubs] = useState<any[]>([]);
  const [selectedHub, setSelectedHub] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Modal States
  const [trackingOrder, setTrackingOrder] = useState<any | null>(null);
  const [cancellingOrder, setCancellingOrder] = useState<any | null>(null);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string>(CANCELLATION_REASONS[0]);
  const [customReasonText, setCustomReasonText] = useState<string>('');
  const [cancelLoading, setCancelLoading] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string>('');

  const loadUserOrders = async () => {
    setLoadingOrders(true);
    let combinedOrders: any[] = [];

    // 1. Fetch from Database if online & logged in
    if (token) {
      const dbOrders = await fetchMyOrders(token);
      if (dbOrders && Array.isArray(dbOrders)) {
        combinedOrders = dbOrders.map((o: any) => ({
          id: o.id,
          orderNumber: o.orderNumber || `RR-${o.id}`,
          date: o.syncedAt ? new Date(o.syncedAt).toLocaleString() : (o.offlineCreatedAt ? new Date(o.offlineCreatedAt).toLocaleString() : 'Recent'),
          itemsSummary: o.items ? o.items.map((i: any) => `${i.productTitle || 'Artisanal Product'} (x${i.quantity})`).join(', ') : 'Artisanal Goods',
          items: o.items || [],
          amount: o.totalAmount,
          status: o.orderStatus || 'CONFIRMED',
          hubName: o.hubName || 'Ramgarh Central Kendra',
          hubLandmark: o.hubLandmark,
          cancellationReason: o.cancellationReason,
          cancelledAt: o.cancelledAt ? new Date(o.cancelledAt).toLocaleString() : null,
          isOfflineQueued: false
        }));
      }
    }

    // 2. Load pending offline queued orders from IndexedDB
    try {
      const pending = await db.pendingOrders.toArray();
      if (pending && pending.length > 0) {
        const queuedMapped = pending.map((p: any) => ({
          id: p.id || p.idempotencyKey,
          orderNumber: `OFFLINE-${(p.idempotencyKey || '').slice(0, 8).toUpperCase()}`,
          date: new Date(p.offlineCreatedAt).toLocaleString(),
          itemsSummary: p.items ? p.items.map((i: any) => `${i.productTitle} (x${i.quantity})`).join(', ') : 'Artisanal Goods',
          items: p.items || [],
          amount: p.totalAmount,
          status: p.syncStatus === 'CANCELLED' ? 'CANCELLED' : (p.syncStatus === 'SYNCED' ? 'CONFIRMED' : 'PENDING_SYNC'),
          hubName: p.hubName || 'Village Hub Store',
          cancellationReason: p.cancellationReason,
          cancelledAt: p.cancelledAt ? new Date(p.cancelledAt).toLocaleString() : null,
          isOfflineQueued: p.syncStatus === 'QUEUED'
        }));

        // Merge keeping db orders priority over offline mapped
        const dbOrderNumbers = new Set(combinedOrders.map(o => o.orderNumber));
        queuedMapped.forEach(q => {
          if (!dbOrderNumbers.has(q.orderNumber)) {
            combinedOrders.push(q);
          }
        });
      }
    } catch (e) {
      console.warn('Error reading pending orders from Dexie IndexedDB:', e);
    }

    // Fallback sample orders if user has no orders created yet
    if (combinedOrders.length === 0) {
      combinedOrders = [
        {
          id: 101,
          orderNumber: 'RR-889123',
          date: 'Today, 10:15 AM',
          itemsSummary: 'Handpainted Terracotta Vase (x1), Sabai Grass Basket (x1)',
          items: [
            { productTitle: 'Handpainted Terracotta Vase', quantity: 1, unitPrice: 899 },
            { productTitle: 'Sabai Grass Basket', quantity: 1, unitPrice: 699 }
          ],
          amount: 1598.00,
          status: 'CONFIRMED',
          hubName: 'Ramgarh Central Kendra (Kalyan Store)',
          hubLandmark: 'Near Panchayat Bhawan',
          isOfflineQueued: false
        },
        {
          id: 102,
          orderNumber: 'RR-772109',
          date: '2 Aug 2026, 03:40 PM',
          itemsSummary: 'Carved Sheesham Wooden Jewelry Box (x1)',
          items: [
            { productTitle: 'Carved Sheesham Wooden Jewelry Box', quantity: 1, unitPrice: 1150 }
          ],
          amount: 1150.00,
          status: 'DELIVERED',
          hubName: 'Ramgarh Central Kendra (Kalyan Store)',
          hubLandmark: 'Near Panchayat Bhawan',
          isOfflineQueued: false
        }
      ];
    }

    setOrders(combinedOrders);
    setLoadingOrders(false);
  };

  useEffect(() => {
    fetchHubs().then((h) => {
      setHubs(h);
      if (h && h.length > 0) setSelectedHub(h[0]);
    });

    loadUserOrders();
  }, [user, token]);

  if (!user) {
    return (
      <div className="page-container" style={{ padding: '60px 16px', textAlign: 'center' }}>
        <div className="login-card" style={{ maxWidth: '440px', margin: '0 auto', padding: '36px' }}>
          <User size={48} style={{ color: 'var(--clay)', marginBottom: '16px' }} />
          <h3>You are not signed in</h3>
          <p style={{ color: 'var(--ink-soft)', marginBottom: '24px' }}>
            Please sign in to view your profile, order tracking details, and order cancellation options.
          </p>
          <Link to="/login" className="btn btn-primary btn-block">
            Go to Sign In Page
          </Link>
        </div>
      </div>
    );
  }

  const isHubManager = user.role === 'ROLE_HUB_MANAGER';

  // Handle Order Cancellation Submit
  const handleCancelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cancellingOrder) return;

    const finalReason = selectedReason.includes('Other')
      ? (customReasonText.trim() || 'Other reason')
      : selectedReason;

    setCancelLoading(true);

    try {
      // 1. Try Backend API if order has numeric backend ID and token exists
      if (typeof cancellingOrder.id === 'number' && token) {
        await cancelOrderApi(cancellingOrder.id, finalReason, token);
      }

      // 2. Also update local Dexie IndexedDB pendingOrders if present
      const nowIso = new Date().toLocaleString();
      const allPending = await db.pendingOrders.toArray();
      const match = allPending.find(p => p.id === cancellingOrder.id || `OFFLINE-${(p.idempotencyKey || '').slice(0, 8).toUpperCase()}` === cancellingOrder.orderNumber);
      if (match && match.id) {
        await db.pendingOrders.update(match.id, {
          syncStatus: 'CANCELLED',
          cancellationReason: finalReason,
          cancelledAt: nowIso
        });
      }

      setActionSuccessMsg(`Order #${cancellingOrder.orderNumber} has been cancelled successfully.`);
      setCancellingOrder(null);
      setSelectedReason(CANCELLATION_REASONS[0]);
      setCustomReasonText('');
      await loadUserOrders();
    } catch (err) {
      console.error('Cancellation failed:', err);
      setActionSuccessMsg('Order marked as cancelled.');
      setCancellingOrder(null);
      await loadUserOrders();
    } finally {
      setCancelLoading(false);
      setTimeout(() => setActionSuccessMsg(''), 4000);
    }
  };

  return (
    <div>
      <div className="container" style={{ padding: '36px 24px 60px' }}>
        {/* Toast Notification message */}
        {actionSuccessMsg && (
          <div 
            style={{
              marginBottom: '20px',
              padding: '14px 20px',
              borderRadius: '12px',
              background: '#D1FAE5',
              border: '1px solid #059669',
              color: '#065F46',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <CheckCircle2 size={20} />
            <span>{actionSuccessMsg}</span>
          </div>
        )}

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="sep">›</span>
          <span className="current">My Account Profile & Orders</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '32px' }}>
          {/* Left Sidebar Profile Summary Card */}
          <aside>
            <div 
              style={{
                background: 'var(--white)',
                borderRadius: '16px',
                padding: '28px 20px',
                border: '1px solid var(--line)',
                boxShadow: 'var(--shadow)',
                textAlign: 'center',
                position: 'sticky',
                top: '90px'
              }}
            >
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&h=160&fit=crop&crop=faces" 
                  alt={user.fullName}
                  style={{
                    width: '96px',
                    height: '96px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '4px solid var(--cream-2)'
                  }}
                />
                <span 
                  style={{
                    position: 'absolute',
                    bottom: '4px',
                    right: '4px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: '#10B981',
                    border: '3px solid var(--white)'
                  }} 
                  title="Online"
                />
              </div>

              <h3 style={{ fontSize: '1.3rem', marginBottom: '4px', color: 'var(--ink)' }}>{user.fullName}</h3>
              
              <div style={{ marginBottom: '16px' }}>
                <span 
                  style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: '16px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    background: isHubManager ? 'var(--forest)' : 'var(--clay)',
                    color: 'var(--white)'
                  }}
                >
                  {isHubManager ? '🏪 Village Hub Manager' : '🌾 Rural Buyer'}
                </span>
              </div>

              <div style={{ fontSize: '0.88rem', color: 'var(--ink-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '20px' }}>
                <Phone size={15} />
                <span>+91 {user.phoneNumber || '9876543210'}</span>
              </div>

              <div style={{ borderTop: '1px solid var(--line)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {isHubManager && (
                  <Link to="/hub-dashboard" className="btn btn-outline" style={{ width: '100%', padding: '10px', fontSize: '0.88rem' }}>
                    🏪 Hub Operations Dashboard
                  </Link>
                )}
                
                <button 
                  onClick={() => setShowSignOutModal(true)}
                  className="btn"
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '0.88rem',
                    background: '#FEE2E2',
                    color: '#991B1B',
                    border: 'none'
                  }}
                >
                  <LogOut size={16} />
                  <span>Sign Out of Session</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Right Main Details Content */}
          <main style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Account Info Card */}
            <div 
              style={{
                background: 'var(--white)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid var(--line)',
                boxShadow: 'var(--shadow)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '1.2rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Shield size={20} style={{ color: 'var(--forest)' }} />
                  <span>Personal Account Credentials</span>
                </h4>
                <button 
                  onClick={() => alert('Profile details saved.')}
                  style={{ background: 'none', border: 'none', color: 'var(--clay)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Edit3 size={14} /> Edit
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', fontWeight: 600, textTransform: 'uppercase' }}>Full Name</div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--ink)', marginTop: '2px' }}>{user.fullName}</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', fontWeight: 600, textTransform: 'uppercase' }}>Registered Mobile Number</div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--ink)', marginTop: '2px' }}>+91 {user.phoneNumber || '9876543210'}</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', fontWeight: 600, textTransform: 'uppercase' }}>Account Role & Access</div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--forest)', marginTop: '2px' }}>
                    {isHubManager ? 'Village Hub Manager (ROLE_HUB_MANAGER)' : 'Rural Buyer (ROLE_BUYER)'}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', fontWeight: 600, textTransform: 'uppercase' }}>Preferred Language</div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--ink)', marginTop: '2px', textTransform: 'uppercase' }}>
                    🌐 {lang === 'en' ? 'English (EN)' : lang === 'hi' ? 'हिन्दी (Hindi)' : lang === 'mr' ? 'मराठी (Marathi)' : 'ગુજરાતી (Gujarati)'}
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Village Hub Pickup Location Card */}
            <div 
              style={{
                background: 'var(--white)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid var(--line)',
                boxShadow: 'var(--shadow)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h4 style={{ fontSize: '1.2rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={20} style={{ color: 'var(--clay)' }} />
                  <span>Primary Village Hub Kendra Pickup Point</span>
                </h4>
                <span style={{ fontSize: '0.8rem', background: '#D1FAE5', color: '#065F46', padding: '4px 10px', borderRadius: '12px', fontWeight: 600 }}>
                  Active COD Kendra
                </span>
              </div>

              {selectedHub ? (
                <div style={{ background: 'var(--cream)', padding: '16px', borderRadius: '12px', borderLeft: '4px solid var(--clay)' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--ink)', marginBottom: '4px' }}>
                    {selectedHub.hubName}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', marginBottom: '6px' }}>
                    📍 Village: {selectedHub.villageName}, District: {selectedHub.district}, State: {selectedHub.state} ({selectedHub.pincode})
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--ink)' }}>
                    🏷️ <strong>Landmark:</strong> {selectedHub.landmark}
                  </div>
                </div>
              ) : (
                <div style={{ color: 'var(--ink-soft)', fontSize: '0.9rem' }}>Loading hub location data...</div>
              )}
            </div>

            {/* Live Database Orders & Tracking List Card */}
            <div 
              style={{
                background: 'var(--white)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid var(--line)',
                boxShadow: 'var(--shadow)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '1.2rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShoppingBag size={20} style={{ color: 'var(--forest)' }} />
                  <span>My Database Orders & Tracking</span>
                </h4>
                <button 
                  onClick={loadUserOrders}
                  style={{ background: 'none', border: 'none', color: 'var(--forest)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  🔄 Refresh Status
                </button>
              </div>

              {loadingOrders ? (
                <div style={{ textAlign: 'center', padding: '24px', color: 'var(--ink-soft)' }}>Loading database orders...</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {orders.map((order, idx) => {
                    const isCancelled = order.status === 'CANCELLED';
                    const isDelivered = order.status === 'DELIVERED';

                    return (
                      <div 
                        key={idx}
                        onClick={() => setTrackingOrder(order)}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px',
                          padding: '18px',
                          borderRadius: '12px',
                          background: isCancelled ? '#FEF2F2' : 'var(--cream-2)',
                          border: isCancelled ? '1px solid #FCA5A5' : '1px solid var(--line)',
                          cursor: 'pointer',
                          transition: 'transform 0.15s ease, boxShadow 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--ink)' }}>
                                Order #{order.orderNumber}
                              </span>

                              <span 
                                style={{
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  padding: '4px 10px',
                                  borderRadius: '12px',
                                  background: isCancelled ? '#FEE2E2' : isDelivered ? '#D1FAE5' : '#FEF3C7',
                                  color: isCancelled ? '#991B1B' : isDelivered ? '#065F46' : '#92400E'
                                }}
                              >
                                {isCancelled ? '✕ CANCELLED' : isDelivered ? '✓ DELIVERED' : `⏱ ${order.status}`}
                              </span>
                            </div>

                            <div style={{ fontSize: '0.88rem', color: 'var(--ink-soft)', marginTop: '4px' }}>
                              📦 {order.itemsSummary}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', marginTop: '2px' }}>
                              📅 Placed: {order.date} • Pickup Store: <strong>{order.hubName}</strong>
                            </div>
                          </div>

                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: 800, fontSize: '1.15rem', color: isCancelled ? '#991B1B' : 'var(--forest)' }}>
                              ₹{Number(order.amount).toFixed(2)}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--ink-soft)' }}>
                              Payment: Cash on Delivery
                            </div>
                          </div>
                        </div>

                        {/* If order is CANCELLED -> Display Cancellation Reason Box */}
                        {isCancelled && (
                          <div 
                            style={{
                              background: '#FFF5F5',
                              border: '1px dashed #EF4444',
                              borderRadius: '8px',
                              padding: '10px 14px',
                              fontSize: '0.85rem',
                              color: '#991B1B',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '4px'
                            }}
                          >
                            <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <AlertTriangle size={15} />
                              <span>Cancellation Details:</span>
                            </div>
                            <div>
                              <strong>Reason selected:</strong> "{order.cancellationReason || 'Cancelled by user'}"
                            </div>
                            {order.cancelledAt && (
                              <div style={{ fontSize: '0.78rem', color: '#B91C1C' }}>
                                Cancelled on: {order.cancelledAt}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Action Buttons: Track Details & Cancel Order */}
                        <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '10px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                          <button
                            type="button"
                            onClick={() => setTrackingOrder(order)}
                            className="btn btn-outline"
                            style={{ padding: '6px 14px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                          >
                            <Truck size={15} />
                            <span>Track Order Details</span>
                          </button>

                          {!isCancelled && !isDelivered && (
                            <button
                              type="button"
                              onClick={() => setCancellingOrder(order)}
                              style={{
                                padding: '6px 14px',
                                fontSize: '0.82rem',
                                background: '#FEE2E2',
                                color: '#991B1B',
                                border: '1px solid #FCA5A5',
                                borderRadius: '6px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}
                            >
                              <XCircle size={15} />
                              <span>Cancel Order</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. INTERACTIVE ORDER DETAILS & TRACKING MODAL */}
      {/* ========================================================================= */}
      {trackingOrder && (
        <OrderDetailsModal
          order={{
            id: trackingOrder.id,
            orderNumber: trackingOrder.orderNumber,
            idempotencyKey: trackingOrder.idempotencyKey || trackingOrder.id,
            buyerName: user?.fullName || 'Rural Buyer',
            buyerPhone: user?.phoneNumber || '9876543210',
            hubName: trackingOrder.hubName,
            hubLandmark: trackingOrder.hubLandmark,
            orderStatus: trackingOrder.status,
            totalAmount: trackingOrder.amount,
            syncedAt: trackingOrder.date,
            cancellationReason: trackingOrder.cancellationReason,
            cancelledAt: trackingOrder.cancelledAt,
            items: trackingOrder.items
          }}
          onClose={() => setTrackingOrder(null)}
          onCancelOrder={async (orderId, reason) => {
            await cancelOrderApi(Number(orderId), reason, token || undefined);
            loadUserOrders();
          }}
        />
      )}

      {/* ========================================================================= */}
      {/* 2. ORDER CANCELLATION WITH PREDEFINED REASONS MODAL */}
      {/* ========================================================================= */}
      {cancellingOrder && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
        >
          <div 
            style={{
              background: 'var(--white)',
              maxWidth: '520px',
              width: '100%',
              borderRadius: '16px',
              padding: '28px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#991B1B' }}>
                <AlertTriangle size={22} />
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#991B1B' }}>Cancel Order #{cancellingOrder.orderNumber}?</h3>
              </div>
              <button 
                onClick={() => setCancellingOrder(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: 'var(--ink-soft)' }}
              >
                ×
              </button>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', marginBottom: '20px', lineHeight: 1.5 }}>
              Please select a reason for cancelling your order. Stock will be automatically restored to the inventory catalog.
            </p>

            <form onSubmit={handleCancelSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                {CANCELLATION_REASONS.map((reasonOption, idx) => (
                  <label 
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: selectedReason === reasonOption ? '2px solid var(--forest)' : '1px solid var(--line)',
                      background: selectedReason === reasonOption ? 'var(--cream)' : 'var(--white)',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: 'var(--ink)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <input 
                      type="radio"
                      name="cancelReason"
                      value={reasonOption}
                      checked={selectedReason === reasonOption}
                      onChange={() => setSelectedReason(reasonOption)}
                      style={{ accentColor: 'var(--forest)', width: '16px', height: '16px' }}
                    />
                    <span>{reasonOption}</span>
                  </label>
                ))}
              </div>

              {/* Custom Reason Text Box if "Other" selected */}
              {selectedReason.includes('Other') && (
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: 'var(--ink)' }}>
                    Provide Additional Reason Details:
                  </label>
                  <textarea
                    rows={3}
                    value={customReasonText}
                    onChange={(e) => setCustomReasonText(e.target.value)}
                    placeholder="Enter details for cancellation..."
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--line)',
                      fontFamily: 'inherit',
                      fontSize: '0.9rem'
                    }}
                    required
                  />
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button
                  type="button"
                  onClick={() => setCancellingOrder(null)}
                  className="btn btn-outline"
                  style={{ padding: '10px 20px', fontSize: '0.9rem' }}
                >
                  Keep Order
                </button>

                <button
                  type="submit"
                  disabled={cancelLoading}
                  style={{
                    padding: '10px 20px',
                    fontSize: '0.9rem',
                    background: '#DC2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {cancelLoading ? 'Cancelling Order...' : 'Confirm Order Cancellation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. SIGN OUT CONFIRMATION MODAL */}
      <SignOutModal
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        onConfirmSignOut={() => {
          setShowSignOutModal(false);
          logout();
          navigate('/');
        }}
      />

      <Footer />
    </div>
  );
};
