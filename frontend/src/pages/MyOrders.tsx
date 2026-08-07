import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Package, MapPin, Truck, Clock, Phone, ShoppingBag, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Footer } from '../components/Footer';
import { OrderDetailsData } from '../components/OrderDetailsModal';
import { db } from '../db';

export const MyOrders: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialNum = searchParams.get('id') || searchParams.get('num') || 'RR-889123';

  const [orderQuery, setOrderQuery] = useState(initialNum);
  const [searchedOrder, setSearchedOrder] = useState<OrderDetailsData | null>(null);
  const [searching, setSearching] = useState(false);
  const [historyOrders, setHistoryOrders] = useState<OrderDetailsData[]>([]);

  // Sample Orders Lookup Database
  const sampleOrdersDatabase: Record<string, OrderDetailsData> = {
    'RR-889123': {
      id: 101,
      orderNumber: 'RR-889123',
      idempotencyKey: 'a8b9c7d6-e5f4-3210-9876-543210fedcba',
      buyerName: 'Ramesh Patel',
      buyerPhone: '9876543210',
      hubId: 1,
      hubName: 'Ramgarh Central Kendra (Kalyan Store)',
      hubLandmark: 'Near Panchayat Bhawan, Ramgarh Village Square',
      orderStatus: 'CONFIRMED',
      paymentType: 'COD (Cash on Delivery)',
      paymentStatus: 'PENDING_HANDOVER',
      totalAmount: 1598.00,
      syncedAt: 'Today, 10:15 AM',
      items: [
        {
          productId: 1,
          title: 'Handpainted Terracotta Water Pitcher (Surahi)',
          quantity: 1,
          unitPrice: 899.00,
          thumbnailUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&q=80'
        },
        {
          productId: 2,
          title: 'Sabai Grass Woven Storage Basket',
          quantity: 1,
          unitPrice: 699.00,
          thumbnailUrl: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400&q=80'
        }
      ]
    },
    'RR-772109': {
      id: 102,
      orderNumber: 'RR-772109',
      idempotencyKey: 'b1c2d3e4-f5a6-7890-1234-567890abcdef',
      buyerName: 'Sunita Devi',
      buyerPhone: '9876543211',
      hubId: 1,
      hubName: 'Ramgarh Central Kendra (Kalyan Store)',
      hubLandmark: 'Near Panchayat Bhawan, Ramgarh Village Square',
      orderStatus: 'DELIVERED',
      paymentType: 'COD (Cash on Delivery)',
      paymentStatus: 'PAID_IN_CASH',
      totalAmount: 1150.00,
      syncedAt: '2 Aug 2026, 03:40 PM',
      items: [
        {
          productId: 4,
          title: 'Carved Sheesham Wooden Jewelry Box',
          quantity: 1,
          unitPrice: 1150.00,
          thumbnailUrl: 'https://images.unsplash.com/photo-1611486212557-88be5ff6f941?w=400&q=80'
        }
      ]
    }
  };

  // Load orders from IndexedDB pendingOrders + defaults
  useEffect(() => {
    async function loadOrders() {
      try {
        const localSyncList = await db.pendingOrders.toArray();
        const converted: OrderDetailsData[] = localSyncList.map((item) => {
          return {
            id: item.id || Date.now(),
            orderNumber: `RR-${Math.floor(100000 + Math.random() * 900000)}`,
            idempotencyKey: item.idempotencyKey,
            buyerName: 'Valued Rural Customer',
            buyerPhone: item.buyerPhone || '9876543210',
            hubName: item.hubName || 'Ramgarh Central Kendra',
            hubLandmark: 'Near Village Square',
            orderStatus: item.syncStatus === 'SYNCED' ? 'DELIVERED' : 'CONFIRMED',
            paymentType: item.paymentType || 'COD (Cash on Delivery)',
            totalAmount: item.totalAmount || 899,
            syncedAt: item.offlineCreatedAt ? new Date(item.offlineCreatedAt).toLocaleString() : 'Recent Order',
            items: (item.items || []).map((it) => ({
              productId: it.productId,
              title: it.productTitle,
              quantity: it.quantity,
              unitPrice: it.unitPrice,
              thumbnailUrl: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&q=80'
            }))
          };
        });

        const initialList = [...converted, ...Object.values(sampleOrdersDatabase)];
        setHistoryOrders(initialList);

        if (initialNum && sampleOrdersDatabase[initialNum]) {
          setSearchedOrder(sampleOrdersDatabase[initialNum]);
        } else if (initialList.length > 0) {
          setSearchedOrder(initialList[0]);
          setOrderQuery(initialList[0].orderNumber);
        }
      } catch (err) {
        console.warn('Failed reading Dexie orders:', err);
        setHistoryOrders(Object.values(sampleOrdersDatabase));
      }
    }
    loadOrders();
  }, []);

  const handleSearch = (e?: React.FormEvent, customNum?: string) => {
    if (e) e.preventDefault();
    const clean = (customNum || orderQuery).trim().toUpperCase();
    if (!clean) return;

    setSearching(true);
    setTimeout(() => {
      const match = historyOrders.find((o) => o.orderNumber.toUpperCase() === clean) || sampleOrdersDatabase[clean];
      if (match) {
        setSearchedOrder(match);
        setOrderQuery(match.orderNumber);
      } else {
        // Dynamic fallback order object for arbitrary query
        const dynamicOrder: OrderDetailsData = {
          id: Date.now(),
          orderNumber: clean,
          idempotencyKey: 'c7d8e9f0-1234-5678-90ab-cdef12345678',
          buyerName: 'Valued Rural Buyer',
          buyerPhone: '9876543210',
          hubName: 'Ramgarh Central Kendra (Kalyan Store)',
          hubLandmark: 'Near Panchayat Bhawan, Ramgarh Square',
          orderStatus: 'DISPATCHED',
          paymentType: 'COD (Cash on Delivery)',
          totalAmount: 1299.00,
          syncedAt: 'Recent Order',
          items: [
            {
              productId: 5,
              title: 'Handcrafted Rural Artisanal Craft',
              quantity: 1,
              unitPrice: 1299.00,
              thumbnailUrl: 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=400&q=80'
            }
          ]
        };
        setSearchedOrder(dynamicOrder);
      }
      setSearching(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* MY ORDERS HERO & LIVE TRACKER */}
      <section style={{
        background: 'linear-gradient(135deg, var(--forest) 0%, #152C1E 100%)',
        color: 'var(--white)',
        padding: '50px 20px 65px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '750px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.12)',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '0.85rem',
            color: 'var(--sand)',
            fontWeight: 600,
            marginBottom: '16px'
          }}>
            <Truck size={16} color="var(--clay)" />
            Live Logistics & Village Hub Pickup Tracking
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--sand)', marginBottom: '14px' }}>
            My Orders & Live Tracking
          </h1>

          <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.6, marginBottom: '28px' }}>
            Inspect your order history, live transit status, Village Hub pickup point, and cash collection updates.
          </p>

          {/* SEARCH ORDER FORM */}
          <form onSubmit={handleSearch} style={{ maxWidth: '550px', margin: '0 auto', display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <input
                type="text"
                required
                placeholder="Enter Order # (e.g. RR-889123 or RR-772109)"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 18px 14px 44px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '1.02rem',
                  fontWeight: 700,
                  outline: 'none',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  boxSizing: 'border-box'
                }}
              />
              <Search size={20} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-soft)' }} />
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '14px 28px', fontSize: '1rem', fontWeight: 700, borderRadius: '12px', background: '#FB641B', borderColor: '#FB641B' }}>
              {searching ? 'Searching...' : 'TRACK'}
            </button>
          </form>
        </div>
      </section>

      {/* TRACKING CARD RESULT */}
      <section style={{ maxWidth: '950px', margin: '-35px auto 40px', padding: '0 20px', width: '100%', boxSizing: 'border-box' }}>
        {searchedOrder && (
          <div style={{
            background: 'var(--white)',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 12px 36px rgba(44, 76, 56, 0.08)',
            border: '1px solid var(--line)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            {/* ORDER HEADER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid var(--line)', paddingBottom: '20px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--forest)', margin: 0 }}>
                    Order #{searchedOrder.orderNumber}
                  </h2>
                  <span style={{
                    background: searchedOrder.orderStatus === 'DELIVERED' ? '#D1FAE5' : '#FEF3C7',
                    color: searchedOrder.orderStatus === 'DELIVERED' ? '#065F46' : '#92400E',
                    padding: '5px 14px',
                    borderRadius: '20px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    {searchedOrder.orderStatus === 'DELIVERED' ? '✓ Delivered & Cash Collected' : '⏱ In Transit to Hub'}
                  </span>
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--ink-soft)', marginTop: '6px' }}>
                  Placed on {searchedOrder.syncedAt} • Idempotency Key: <span style={{ fontFamily: 'monospace' }}>{searchedOrder.idempotencyKey?.slice(0, 14)}...</span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', fontWeight: 600 }}>Total COD Amount</div>
                <div style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--forest)' }}>
                  ₹{Number(searchedOrder.totalAmount).toFixed(2)}
                </div>
              </div>
            </div>

            {/* LIVE STEPPER TIMELINE */}
            <div style={{ background: 'var(--cream-2)', padding: '24px', borderRadius: '16px', border: '1px solid var(--line)' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--forest)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} /> Live Order Progress
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', textAlign: 'center' }}>
                <div>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--forest)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontWeight: 800 }}>✓</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink)' }}>Order Created</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>Saved & Synced</div>
                </div>

                <div>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--forest)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontWeight: 800 }}>✓</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink)' }}>Dispatched</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>Consignment Route</div>
                </div>

                <div>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: searchedOrder.orderStatus === 'DELIVERED' ? 'var(--forest)' : '#F59E0B', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontWeight: 800 }}>3</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink)' }}>At Village Hub</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>Ready for Pickup</div>
                </div>

                <div>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: searchedOrder.orderStatus === 'DELIVERED' ? '#16A34A' : '#CBD5E1', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontWeight: 800 }}>4</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink)' }}>Cash Handover</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>COD Completed</div>
                </div>
              </div>
            </div>

            {/* HUB & BUYER DETAILS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div style={{ background: 'var(--cream)', padding: '20px', borderRadius: '12px', border: '1px solid var(--line)' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--clay)', textTransform: 'uppercase', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={16} /> Destination Pickup Hub
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)' }}>
                  {searchedOrder.hubName}
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--ink-soft)', marginTop: '4px' }}>
                  Landmark: {searchedOrder.hubLandmark}
                </div>
              </div>

              <div style={{ background: 'var(--cream)', padding: '20px', borderRadius: '12px', border: '1px solid var(--line)' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--clay)', textTransform: 'uppercase', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={16} /> Buyer Details
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)' }}>
                  {searchedOrder.buyerName}
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--ink-soft)', marginTop: '4px' }}>
                  Mobile: +91 {searchedOrder.buyerPhone}
                </div>
              </div>
            </div>

            {/* ITEMIZED ITEMS BREAKDOWN */}
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Package size={18} color="var(--forest)" /> Order Items Breakdown
              </h3>

              <div style={{ border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden' }}>
                {searchedOrder.items?.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: idx < (searchedOrder.items?.length || 0) - 1 ? '1px solid var(--line)' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <img src={item.thumbnailUrl} alt={item.title} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '0.95rem' }}>{item.title}</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--ink-soft)' }}>Quantity: {item.quantity} • Unit Price: ₹{item.unitPrice.toFixed(2)}</div>
                      </div>
                    </div>

                    <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--forest)' }}>
                      ₹{(item.unitPrice * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </section>

      {/* MY ORDER HISTORY LIST */}
      <section style={{ maxWidth: '950px', margin: '0 auto 60px', padding: '0 20px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--forest)', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={24} /> My Order History
          </h2>
          <span style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', fontWeight: 600 }}>
            {historyOrders.length} {historyOrders.length === 1 ? 'Order' : 'Orders'} Total
          </span>
        </div>

        {historyOrders.length === 0 ? (
          <div style={{ background: 'var(--white)', padding: '40px', borderRadius: '16px', textAlign: 'center', border: '1px solid var(--line)' }}>
            <Package size={48} color="var(--ink-soft)" style={{ marginBottom: '12px' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink)' }}>No past orders found</h3>
            <p style={{ color: 'var(--ink-soft)', margin: '8px 0 20px' }}>You haven't placed any artisanal orders yet.</p>
            <Link to="/shop" className="btn-primary" style={{ padding: '10px 24px', borderRadius: '8px' }}>
              Explore Shop & Crafts
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {historyOrders.map((ord) => (
              <div
                key={ord.orderNumber}
                style={{
                  background: 'var(--white)',
                  borderRadius: '16px',
                  padding: '20px 24px',
                  border: searchedOrder?.orderNumber === ord.orderNumber ? '2px solid var(--forest)' : '1px solid var(--line)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--forest)' }}>
                      #{ord.orderNumber}
                    </span>
                    <span style={{
                      background: ord.orderStatus === 'DELIVERED' ? '#D1FAE5' : '#FEF3C7',
                      color: ord.orderStatus === 'DELIVERED' ? '#065F46' : '#92400E',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 700
                    }}>
                      {ord.orderStatus === 'DELIVERED' ? '✓ Delivered' : '⏱ In Transit'}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', marginTop: '4px' }}>
                    Placed on {ord.syncedAt} • Hub: <strong>{(ord.hubName || 'Ramgarh Hub').split('(')[0]}</strong>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                    {ord.items?.slice(0, 3).map((it, idx) => (
                      <img key={idx} src={it.thumbnailUrl} alt={it.title} title={it.title} style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover', border: '1px solid var(--line)' }} />
                    ))}
                  </div>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--forest)' }}>
                    ₹{Number(ord.totalAmount).toFixed(2)}
                  </div>

                  <button
                    onClick={() => handleSearch(undefined, ord.orderNumber)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: searchedOrder?.orderNumber === ord.orderNumber ? 'var(--forest)' : 'var(--cream-2)',
                      color: searchedOrder?.orderNumber === ord.orderNumber ? 'var(--white)' : 'var(--forest)',
                      border: '1px solid var(--line)',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>Track Live Status</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};
