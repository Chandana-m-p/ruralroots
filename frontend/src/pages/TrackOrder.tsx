import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Package, MapPin, Truck, CheckCircle2, Clock, XCircle, Printer, Phone, Shield, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Footer } from '../components/Footer';
import { OrderDetailsModal, OrderDetailsData } from '../components/OrderDetailsModal';
import { db } from '../db';

export const TrackOrder: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialNum = searchParams.get('id') || searchParams.get('num') || 'RR-889123';

  const [orderQuery, setOrderQuery] = useState(initialNum);
  const [searchedOrder, setSearchedOrder] = useState<OrderDetailsData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [searching, setSearching] = useState(false);

  // Sample Orders Lookup Database
  const sampleOrdersDatabase: Record<string, OrderDetailsData> = {
    'RR-889101': {
      id: 1,
      orderNumber: 'RR-889101',
      idempotencyKey: 'a1111111-1111-1111-1111-111111111111',
      buyerName: 'Ananya Sharma',
      buyerPhone: '9876543210',
      hubId: 1,
      hubName: 'Ramgarh Central Kendra (Kalyan Store)',
      hubLandmark: 'Near Panchayat Bhawan, Ramgarh Village Square',
      orderStatus: 'DELIVERED',
      paymentType: 'UPI',
      paymentStatus: 'PAID',
      totalAmount: 1150.00,
      createdAt: '29 Jul 2026, 11:20 AM',
      syncedAt: '29 Jul 2026, 11:20 AM',
      items: [
        {
          productId: 4,
          title: 'Carved Sheesham Wooden Jewelry Box',
          quantity: 1,
          unitPrice: 1150.00,
          thumbnailUrl: 'https://images.unsplash.com/photo-1611486212557-88be5ff6f941?w=400&q=80'
        }
      ]
    },
    'RR-889102': {
      id: 2,
      orderNumber: 'RR-889102',
      idempotencyKey: 'a2222222-2222-2222-2222-222222222222',
      buyerName: 'Ananya Sharma',
      buyerPhone: '9876543210',
      hubId: 1,
      hubName: 'Ramgarh Central Kendra (Kalyan Store)',
      hubLandmark: 'Near Panchayat Bhawan, Ramgarh Village Square',
      orderStatus: 'DELIVERED',
      paymentType: 'COD (Cash on Delivery)',
      paymentStatus: 'PAID',
      totalAmount: 899.00,
      createdAt: '2 Aug 2026, 04:15 PM',
      syncedAt: '2 Aug 2026, 04:15 PM',
      items: [
        {
          productId: 1,
          title: 'Handpainted Terracotta Vase',
          quantity: 1,
          unitPrice: 899.00,
          thumbnailUrl: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&q=80'
        }
      ]
    },
    'RR-889123': {
      id: 101,
      orderNumber: 'RR-889123',
      idempotencyKey: 'a8b9c7d6-e5f4-3210-9876-543210fedcba',
      buyerName: 'Ramesh Patel',
      buyerPhone: '9876543210',
      hubId: 1,
      hubName: 'Ramgarh Central Kendra (Kalyan Store)',
      hubLandmark: 'Near Panchayat Bhawan, Ramgarh Village Square',
      orderStatus: 'ORDER_PLACED',
      paymentType: 'COD (Cash on Delivery)',
      paymentStatus: 'PENDING_HANDOVER',
      totalAmount: 1598.00,
      createdAt: '10 Aug 2026, 10:15 AM',
      syncedAt: '10 Aug 2026, 10:15 AM',
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
      createdAt: '25 Jul 2026, 02:30 PM',
      syncedAt: '25 Jul 2026, 02:30 PM',
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

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = orderQuery.trim().toUpperCase();
    if (!clean) return;

    setSearching(true);
    setNotFound(false);

    if (sampleOrdersDatabase[clean]) {
      setSearchedOrder(sampleOrdersDatabase[clean]);
      setSearching(false);
      return;
    }

    try {
      const pendingList = await db.pendingOrders.toArray();
      const match = pendingList.find(
        (po) =>
          (po.orderNumber && po.orderNumber.toUpperCase() === clean) ||
          po.idempotencyKey.toUpperCase().includes(clean)
      );

      if (match) {
        setSearchedOrder({
          id: match.id,
          orderNumber: match.orderNumber || clean,
          idempotencyKey: match.idempotencyKey,
          buyerName: 'Valued Rural Buyer',
          buyerPhone: match.buyerPhone,
          hubName: match.hubName,
          hubLandmark: 'Village Kendra Station',
          orderStatus: match.orderStatus || 'ORDER_PLACED',
          paymentType: match.paymentType,
          totalAmount: match.totalAmount,
          offlineCreatedAt: match.offlineCreatedAt,
          syncedAt: match.offlineCreatedAt,
          items: match.items.map((it) => ({
            productId: it.productId,
            title: typeof it.productTitle === 'string' ? it.productTitle : 'Handcrafted Product',
            quantity: it.quantity,
            unitPrice: it.unitPrice
          }))
        });
        setSearching(false);
        return;
      }
    } catch (err) {
      console.warn('TrackOrder IndexedDB lookup warning:', err);
    }

    // Dynamic fallback order object for demo query
    setSearchedOrder({
      id: Date.now(),
      orderNumber: clean,
      idempotencyKey: 'c7d8e9f0-1234-5678-90ab-cdef12345678',
      buyerName: 'Valued Rural Buyer',
      buyerPhone: '9876543210',
      hubName: 'Nearest Village Hub Store',
      hubLandmark: 'Local Village Main Square',
      orderStatus: 'ORDER_PLACED',
      paymentType: 'COD (Cash on Delivery)',
      totalAmount: 799.00,
      syncedAt: 'Just Now',
      items: [
        {
          productId: 5,
          title: 'Handcrafted Rural Product',
          quantity: 1,
          unitPrice: 799.00,
          thumbnailUrl: 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=400&q=80'
        }
      ]
    });
    setSearching(false);
  };

  useEffect(() => {
    if (initialNum) handleSearch();
  }, []);

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* TRACKING HERO BANNER */}
      <section style={{
        background: 'linear-gradient(135deg, var(--forest) 0%, #152C1E 100%)',
        color: 'var(--white)',
        padding: '60px 20px 70px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '750px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.1)',
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

          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--sand)', marginBottom: '16px' }}>
            Track Your RuralRoots Order
          </h1>

          <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.6, marginBottom: '30px' }}>
            Enter your Order Number (e.g. <strong>RR-889123</strong> or <strong>RR-772109</strong>) to inspect live progress, pickup Kendra location, and cash handover status.
          </p>

          {/* SEARCH FORM */}
          <form onSubmit={handleSearch} style={{ maxWidth: '550px', margin: '0 auto', display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <input
                type="text"
                required
                placeholder="Enter Order # (e.g. RR-889123)"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 18px 14px 44px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '1.05rem',
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

      {/* SEARCH RESULT CONTENT */}
      <section style={{ maxWidth: '900px', margin: '-30px auto 60px', padding: '0 20px', width: '100%', boxSizing: 'border-box', flex: 1 }}>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--forest)', margin: 0 }}>
                    Order #{searchedOrder.orderNumber}
                  </h2>
                  <span style={{
                    background: searchedOrder.orderStatus === 'DELIVERED' ? '#D1FAE5' : '#FEF3C7',
                    color: searchedOrder.orderStatus === 'DELIVERED' ? '#065F46' : '#92400E',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}>
                    {searchedOrder.orderStatus === 'DELIVERED' ? '✓ Delivered & Cash Collected' : '⏱ In Transit to Hub'}
                  </span>
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--ink-soft)', marginTop: '4px' }}>
                  Placed on {searchedOrder.syncedAt} • Idempotency Key: <span style={{ fontFamily: 'monospace' }}>{searchedOrder.idempotencyKey?.slice(0, 14)}...</span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', fontWeight: 600 }}>Total COD Amount</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--forest)' }}>
                  ₹{Number(searchedOrder.totalAmount).toFixed(2)}
                </div>
              </div>
            </div>

            {/* PROGRESS TIMELINE */}
            <div style={{ background: 'var(--cream-2)', padding: '24px', borderRadius: '16px', border: '1px solid var(--line)' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--forest)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} /> Live Order Progress
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', textAlign: 'center' }}>
                <div>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--forest)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontWeight: 800 }}>✓</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink)' }}>Order Created</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>Saved & Synced</div>
                </div>

                <div>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--forest)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontWeight: 800 }}>✓</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink)' }}>Dispatched</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>Consignment Route</div>
                </div>

                <div>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: searchedOrder.orderStatus === 'DELIVERED' ? 'var(--forest)' : '#F59E0B', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontWeight: 800 }}>3</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink)' }}>At Village Hub</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>Ready for Pickup</div>
                </div>

                <div>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: searchedOrder.orderStatus === 'DELIVERED' ? '#16A34A' : '#CBD5E1', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontWeight: 800 }}>4</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink)' }}>Cash Handover</div>
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

            {/* ITEMIZED ITEMS */}
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

      <Footer />
    </div>
  );
};
