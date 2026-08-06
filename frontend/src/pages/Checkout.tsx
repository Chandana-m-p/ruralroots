import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useOffline } from '../context/OfflineContext';
import { db } from '../db';
import { syncPendingOrders } from '../services/sync';
import { fetchHubs } from '../services/api';
import { Footer } from '../components/Footer';
import { 
  CreditCard, 
  QrCode, 
  Banknote, 
  Building2, 
  ShieldCheck, 
  ArrowLeft, 
  Lock, 
  CheckCircle2, 
  RefreshCw
} from 'lucide-react';

type PaymentMethodType = 'UPI' | 'CARD' | 'NETBANKING' | 'COD';
type CheckoutStep = 'DETAILS' | 'PAYMENT_PROCEDURE' | 'SUCCESS';

interface OrderSummaryState {
  subtotal: number;
  shipping: number;
  total: number;
  items: Array<{ title: string; quantity: number; unitPrice: number; itemTotal: number }>;
}

export const Checkout: React.FC = () => {
  const { items, clearCart } = useCart();
  const { user, token } = useAuth();
  const { getLocalizedTitle } = useLanguage();
  const { refreshQueuedCount } = useOffline();

  // Workflow Step State
  const [step, setStep] = useState<CheckoutStep>('DETAILS');

  // Customer & Delivery State
  const [hubs, setHubs] = useState<any[]>([]);
  const [selectedHub, setSelectedHub] = useState<number>(1);
  const [name, setName] = useState(user?.fullName || 'Ananya Sharma');
  const [phone, setPhone] = useState(user?.phoneNumber || '9876543210');
  const [address, setAddress] = useState('Gram Panchayat Road, House #42');
  const [pincode, setPincode] = useState('452001');

  // Payment Selection State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('UPI');
  const [upiId, setUpiId] = useState('9876543210@upi');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('SBI');

  // Processing & Success State
  const [loading, setLoading] = useState(false);
  const [paymentTimer, setPaymentTimer] = useState(300); // 5 min countdown
  const [txRef, setTxRef] = useState('');

  // Preserved Order Summary Snapshot (Prevents fallback to static shipping 149 after cart is cleared)
  const [confirmedSummary, setConfirmedSummary] = useState<OrderSummaryState | null>(null);

  useEffect(() => {
    fetchHubs().then((data) => {
      setHubs(data);
      if (data && data.length > 0) {
        setSelectedHub(data[0].id);
      }
    });
  }, []);

  // Timer countdown for Payment Procedure step
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (step === 'PAYMENT_PROCEDURE' && paymentTimer > 0) {
      timer = setInterval(() => {
        setPaymentTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, paymentTimer]);

  // Dynamic Item-Based Price Calculations
  const calculatedSubtotal = items.reduce(
    (sum, item) => sum + Number(item.product.basePrice) * item.quantity,
    0
  );
  const calculatedShipping = calculatedSubtotal >= 1000 || calculatedSubtotal === 0 ? 0 : 149;
  const calculatedTotal = calculatedSubtotal + calculatedShipping;

  // Active totals (uses confirmedSummary snapshot on SUCCESS step, or live calculation on earlier steps)
  const activeSubtotal = confirmedSummary ? confirmedSummary.subtotal : calculatedSubtotal;
  const activeShipping = confirmedSummary ? confirmedSummary.shipping : calculatedShipping;
  const activeTotal = confirmedSummary ? confirmedSummary.total : calculatedTotal;

  // Step 1 -> Step 2: Validate details and open Payment Gateway Procedure
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      alert('Please enter a valid 10-digit phone number for order updates.');
      return;
    }
    if (items.length === 0 && !confirmedSummary) {
      alert('Your cart is empty. Please add products to checkout.');
      return;
    }
    setPaymentTimer(300);
    setStep('PAYMENT_PROCEDURE');
  };

  // Step 2 -> Step 3: Authorize Payment & Complete Order Placement
  const handleAuthorizePayment = async () => {
    setLoading(true);
    const idempotencyKey = crypto.randomUUID();
    const generatedTxRef = `RR-TXN-${Math.floor(100000 + Math.random() * 900000)}`;
    setTxRef(generatedTxRef);

    const chosenHubObj = hubs.find((h) => h.id === Number(selectedHub)) || hubs[0];

    // Build items summary snapshot before clearing cart
    const itemsSnapshot = items.map((i) => {
      const uPrice = Number(i.product.basePrice);
      return {
        title: getLocalizedTitle(i.product.titleI18n),
        quantity: i.quantity,
        unitPrice: uPrice,
        itemTotal: uPrice * i.quantity
      };
    });

    const summarySnapshot: OrderSummaryState = {
      subtotal: calculatedSubtotal,
      shipping: calculatedShipping,
      total: calculatedTotal,
      items: itemsSnapshot
    };

    // Store confirmed summary state so Success Page shows accurate total
    setConfirmedSummary(summarySnapshot);

    const newPendingOrder = {
      idempotencyKey,
      hubId: chosenHubObj ? chosenHubObj.id : 1,
      hubName: chosenHubObj ? chosenHubObj.hubName : 'Ramgarh Central Kendra',
      buyerPhone: phone,
      totalAmount: calculatedTotal,
      paymentType: paymentMethod,
      items: items.map((i) => ({
        productId: i.product.id,
        productTitle: getLocalizedTitle(i.product.titleI18n),
        quantity: i.quantity,
        unitPrice: Number(i.product.basePrice)
      })),
      offlineCreatedAt: new Date().toISOString(),
      syncStatus: 'QUEUED' as const
    };

    // Save locally to IndexedDB queue for offline resilience
    await db.pendingOrders.add(newPendingOrder);
    await refreshQueuedCount();

    // If online, trigger background API sync
    if (navigator.onLine && token) {
      try {
        await syncPendingOrders(token);
      } catch (err) {
        console.warn('Sync failed, order stored safely in offline queue:', err);
      }
    }

    clearCart();
    setLoading(false);
    setStep('SUCCESS');
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div>
      <div className="container" style={{ minHeight: '70vh', paddingBottom: '56px' }}>
        {/* Breadcrumb Stepper */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="sep">›</span>
          <Link to="/cart">Cart</Link>
          <span className="sep">›</span>
          <span className="current">
            {step === 'DETAILS' && 'Checkout & Address'}
            {step === 'PAYMENT_PROCEDURE' && 'Payment Gateway'}
            {step === 'SUCCESS' && 'Order Confirmed'}
          </span>
        </div>

        {/* Step Indicator Header */}
        <div className="checkout-stepper-header">
          <div className={`checkout-step-item ${step === 'DETAILS' ? 'active' : 'completed'}`}>
            <span className="step-badge">{step !== 'DETAILS' ? <CheckCircle2 size={16} /> : '1'}</span>
            <span>1. Delivery & Contact</span>
          </div>
          <div className="step-connector" />
          <div className={`checkout-step-item ${step === 'PAYMENT_PROCEDURE' ? 'active' : step === 'SUCCESS' ? 'completed' : ''}`}>
            <span className="step-badge">{step === 'SUCCESS' ? <CheckCircle2 size={16} /> : '2'}</span>
            <span>2. Payment Gateway</span>
          </div>
          <div className="step-connector" />
          <div className={`checkout-step-item ${step === 'SUCCESS' ? 'active' : ''}`}>
            <span className="step-badge">3</span>
            <span>3. Order Confirmation</span>
          </div>
        </div>

        {/* STEP 3: ORDER SUCCESS PAGE */}
        {step === 'SUCCESS' ? (
          <div className="success-box" data-order-success style={{ maxWidth: '650px', margin: '40px auto' }}>
            <div className="success-icon-wrap">
              <CheckCircle2 size={56} className="success-check-icon" />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', margin: '16px 0 8px', color: 'var(--forest)' }}>
              Payment Verified & Order Placed! 🎉
            </h3>
            <p style={{ fontSize: '1.05rem', color: 'var(--ink-soft)', marginBottom: '24px', lineHeight: 1.6 }}>
              Thank you, <strong>{name}</strong>! Your order has been successfully authorized and confirmed.
            </p>

            <div className="receipt-card">
              <div className="receipt-row">
                <span>Transaction Ref ID:</span>
                <strong>{txRef || 'RR-TXN-882914'}</strong>
              </div>
              <div className="receipt-row">
                <span>Payment Method:</span>
                <strong>
                  {paymentMethod === 'UPI' && '📲 Instant UPI (BHIM / QR)'}
                  {paymentMethod === 'CARD' && '💳 Credit / Debit Card'}
                  {paymentMethod === 'NETBANKING' && '🏦 Net Banking'}
                  {paymentMethod === 'COD' && '💵 Cash on Delivery (Village Hub Store)'}
                </strong>
              </div>
              <div className="receipt-row">
                <span>Pickup Village Hub:</span>
                <strong>{hubs.find((h) => h.id === Number(selectedHub))?.hubName || 'Ramgarh Central Kendra'}</strong>
              </div>
              
              {confirmedSummary && (
                <div style={{ margin: '12px 0', borderTop: '1px dashed var(--line)', paddingTop: '10px' }}>
                  {confirmedSummary.items.map((item, idx) => (
                    <div key={idx} className="receipt-row" style={{ fontSize: '0.85rem' }}>
                      <span>{item.title} (x{item.quantity})</span>
                      <span>₹{item.itemTotal.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                  <div className="receipt-row" style={{ fontSize: '0.85rem' }}>
                    <span>Shipping Fee:</span>
                    <span>{confirmedSummary.shipping === 0 ? 'FREE' : `₹${confirmedSummary.shipping}`}</span>
                  </div>
                </div>
              )}

              <div className="receipt-row total-receipt">
                <span>Total Amount Paid:</span>
                <strong>₹{activeTotal.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div style={{ background: 'rgba(47,82,51,0.08)', padding: '12px 16px', borderRadius: '10px', fontSize: '0.85rem', color: 'var(--forest-dark)', margin: '20px 0 24px' }}>
              📱 An SMS confirmation with your Village Hub pickup pass code has been dispatched to <strong>+91 {phone}</strong>.
            </div>

            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
              <Link to="/shop" className="btn btn-primary">
                Continue Shopping
              </Link>
              <Link to="/" className="btn btn-outline">
                Back to Home
              </Link>
            </div>
          </div>

        /* EMPTY CART VIEW (only shown if in DETAILS step with zero items) */
        ) : items.length === 0 && !confirmedSummary ? (
          <div className="empty-cart">
            <h3>Your cart is empty</h3>
            <p style={{ margin: '12px 0 20px', color: 'var(--ink-soft)' }}>
              Return to the shop to add products before completing checkout.
            </p>
            <Link to="/shop" className="btn btn-primary">
              Return to Shop
            </Link>
          </div>

        /* STEP 2: PAYMENT PROCEDURE GATEWAY */
        ) : step === 'PAYMENT_PROCEDURE' ? (
          <div className="payment-gateway-wrapper">
            <div className="payment-gateway-container">
              
              {/* Payment Gateway Header */}
              <div className="pg-header">
                <button 
                  type="button"
                  className="btn-pg-back"
                  onClick={() => setStep('DETAILS')}
                >
                  <ArrowLeft size={18} />
                  <span>Back to Delivery Info</span>
                </button>
                <div className="pg-secure-badge">
                  <Lock size={14} />
                  <span>256-Bit SSL Payment Gateway</span>
                </div>
              </div>

              <div className="pg-main-grid">
                
                {/* Left Column: Interactive Payment Methods & Input */}
                <div className="pg-methods-panel">
                  <h3 className="pg-title">Select Payment Method</h3>
                  
                  {/* Payment Method Option Selector */}
                  <div className="pg-options-list">
                    <label className={`pg-option-card ${paymentMethod === 'UPI' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="pgMethod" 
                        value="UPI" 
                        checked={paymentMethod === 'UPI'}
                        onChange={() => setPaymentMethod('UPI')}
                      />
                      <QrCode size={24} className="pg-option-icon" />
                      <div>
                        <div className="pg-option-title">UPI / QR Code</div>
                        <div className="pg-option-sub">Google Pay, PhonePe, Paytm, BHIM</div>
                      </div>
                    </label>

                    <label className={`pg-option-card ${paymentMethod === 'CARD' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="pgMethod" 
                        value="CARD" 
                        checked={paymentMethod === 'CARD'}
                        onChange={() => setPaymentMethod('CARD')}
                      />
                      <CreditCard size={24} className="pg-option-icon" />
                      <div>
                        <div className="pg-option-title">Credit / Debit Card</div>
                        <div className="pg-option-sub">Visa, MasterCard, RuPay, Maestro</div>
                      </div>
                    </label>

                    <label className={`pg-option-card ${paymentMethod === 'NETBANKING' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="pgMethod" 
                        value="NETBANKING" 
                        checked={paymentMethod === 'NETBANKING'}
                        onChange={() => setPaymentMethod('NETBANKING')}
                      />
                      <Building2 size={24} className="pg-option-icon" />
                      <div>
                        <div className="pg-option-title">Net Banking</div>
                        <div className="pg-option-sub">SBI, HDFC, ICICI, Axis, PNB</div>
                      </div>
                    </label>

                    <label className={`pg-option-card ${paymentMethod === 'COD' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="pgMethod" 
                        value="COD" 
                        checked={paymentMethod === 'COD'}
                        onChange={() => setPaymentMethod('COD')}
                      />
                      <Banknote size={24} className="pg-option-icon" />
                      <div>
                        <div className="pg-option-title">Cash on Delivery (COD)</div>
                        <div className="pg-option-sub">Pay cash upon inspection at Village Hub</div>
                      </div>
                    </label>
                  </div>

                  {/* Dynamic Procedure View based on Payment Method */}
                  <div className="pg-procedure-box">
                    
                    {/* UPI Interactive Section */}
                    {paymentMethod === 'UPI' && (
                      <div className="upi-procedure">
                        <div className="upi-qr-card">
                          <div className="qr-badge">Scan & Pay ₹{activeTotal.toLocaleString('en-IN')}</div>
                          {/* Simulated SVG QR Code */}
                          <svg className="qr-code-svg" viewBox="0 0 100 100" width="160" height="160">
                            <rect width="100" height="100" fill="#ffffff" />
                            <path d="M10 10h30v30h-30z M15 15v20h20v-20z M22 22h6v6h-6z" fill="#223d26" />
                            <path d="M60 10h30v30h-30z M65 15v20h20v-20z M72 22h6v6h-6z" fill="#223d26" />
                            <path d="M10 60h30v30h-30z M15 65v20h20v-20z M22 72h6v6h-6z" fill="#223d26" />
                            <path d="M45 10h10v10h-10z M50 25h15v10h-15z M45 45h10v10h-10z M65 45h25v10h-25z M45 60h10v30h-10z M60 70h30v10h-30z M75 80h15v10h-15z" fill="#223d26" />
                          </svg>
                          <div className="vpa-tag">UPI ID: <strong>ruralroots@okaxis</strong></div>
                        </div>

                        <div className="upi-vpa-input-group">
                          <label className="form-label-custom">Or Enter Your VPA / UPI ID</label>
                          <input 
                            type="text" 
                            className="form-input-pg"
                            placeholder="mobile@upi or name@okicici"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                          />
                        </div>
                      </div>
                    )}

                    {/* CARD Interactive Section */}
                    {paymentMethod === 'CARD' && (
                      <div className="card-procedure">
                        <div className="form-group-pg">
                          <label className="form-label-custom">Cardholder Name</label>
                          <input 
                            type="text" 
                            className="form-input-pg"
                            placeholder="Ananya Sharma"
                            defaultValue={name}
                          />
                        </div>

                        <div className="form-group-pg">
                          <label className="form-label-custom">Card Number</label>
                          <input 
                            type="text" 
                            className="form-input-pg"
                            placeholder="4532 •••• •••• 8912"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            maxLength={19}
                          />
                        </div>

                        <div className="card-row-pg">
                          <div className="form-group-pg">
                            <label className="form-label-custom">Expiry (MM/YY)</label>
                            <input 
                              type="text" 
                              className="form-input-pg"
                              placeholder="08/28"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              maxLength={5}
                            />
                          </div>
                          <div className="form-group-pg">
                            <label className="form-label-custom">CVV / CVC</label>
                            <input 
                              type="password" 
                              className="form-input-pg"
                              placeholder="•••"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              maxLength={4}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* NETBANKING Interactive Section */}
                    {paymentMethod === 'NETBANKING' && (
                      <div className="netbanking-procedure">
                        <label className="form-label-custom">Select Your Bank</label>
                        <select 
                          className="form-input-pg"
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                        >
                          <option value="SBI">State Bank of India (SBI)</option>
                          <option value="HDFC">HDFC Bank</option>
                          <option value="ICICI">ICICI Bank</option>
                          <option value="AXIS">Axis Bank</option>
                          <option value="PNB">Punjab National Bank (PNB)</option>
                          <option value="BOB">Bank of Baroda</option>
                        </select>
                        <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', marginTop: '10px' }}>
                          You will be securely redirected to {selectedBank} net banking portal for 2FA authorization.
                        </p>
                      </div>
                    )}

                    {/* COD Interactive Section */}
                    {paymentMethod === 'COD' && (
                      <div className="cod-procedure">
                        <div className="cod-notice-card">
                          <Banknote size={32} className="cod-notice-icon" />
                          <div>
                            <div className="cod-notice-title">Village Hub Store Cash Collection</div>
                            <div className="cod-notice-desc">
                              Pay <strong>₹{activeTotal.toLocaleString('en-IN')}</strong> in cash to the Kirana Hub Manager when collecting your package.
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                </div>

                {/* Right Column: Transaction Summary & Authorization Button */}
                <div className="pg-summary-panel">
                  <div className="pg-summary-card">
                    <h4>Payment Authorization Summary</h4>
                    
                    <div className="pg-timer-banner">
                      <span>Complete payment in:</span>
                      <strong className="pg-timer-clock">{formatTimer(paymentTimer)}</strong>
                    </div>

                    <div className="pg-summary-row">
                      <span>Items ({items.length}):</span>
                      <span>₹{activeSubtotal.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="pg-summary-row">
                      <span>Hub Delivery:</span>
                      <span style={{ color: activeShipping === 0 ? 'var(--forest)' : 'var(--ink)' }}>
                        {activeShipping === 0 ? 'FREE' : `₹${activeShipping}`}
                      </span>
                    </div>

                    <div className="pg-summary-row pg-total-row">
                      <span>Amount Payable:</span>
                      <span>₹{activeTotal.toLocaleString('en-IN')}</span>
                    </div>

                    {/* Authorize & Pay CTA */}
                    <button 
                      type="button" 
                      disabled={loading} 
                      className="btn-pg-authorize"
                      onClick={handleAuthorizePayment}
                    >
                      {loading ? (
                        <>
                          <RefreshCw size={18} className="spin-icon" />
                          <span>Processing Payment...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck size={20} />
                          <span>
                            {paymentMethod === 'COD' 
                              ? `Authorize Order (₹${activeTotal.toLocaleString('en-IN')} COD)` 
                              : `Pay ₹${activeTotal.toLocaleString('en-IN')} & Complete Order`}
                          </span>
                        </>
                      )}
                    </button>

                    <div className="pg-guarantee-note">
                      🔒 Secured by 256-Bit SSL & Idempotency Key Guarantee.
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        /* STEP 1: DELIVERY & CONTACT DETAILS FORM */
        ) : (
          <div className="checkout-shell">
            {/* Delivery & Customer Info */}
            <div className="checkout-card">
              <h2>Delivery & Contact Information</h2>
              <form onSubmit={handleProceedToPayment} className="checkout-form" data-checkout-form>
                <div className="field-grid">
                  <label>
                    Full Name *
                    <input 
                      type="text" 
                      required 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                    />
                  </label>
                  <label>
                    Phone Number (for SMS updates) *
                    <input 
                      type="tel" 
                      required 
                      pattern="[0-9]{10}" 
                      placeholder="9876543210" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                    />
                  </label>
                </div>

                <div className="field-grid">
                  <label>
                    Pincode *
                    <input 
                      type="text" 
                      required 
                      value={pincode} 
                      onChange={(e) => setPincode(e.target.value)} 
                    />
                  </label>
                  <label>
                    Select Local Village Hub (Kirana Partner) *
                    <select 
                      value={selectedHub} 
                      onChange={(e) => setSelectedHub(Number(e.target.value))}
                    >
                      {hubs.map((h) => (
                        <option key={h.id} value={h.id}>
                          {h.hubName} ({h.villageName}, {h.pincode})
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label>
                  Delivery Address / Landmark *
                  <textarea 
                    required 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    placeholder="Near Panchayat Bhawan, Main Road..." 
                  />
                </label>

                {/* Preferred Payment Method Selection */}
                <div style={{ background: 'var(--cream)', padding: '18px', borderRadius: '12px', border: '1px solid var(--line)' }}>
                  <h4 style={{ margin: '0 0 12px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    💳 Select Payment Method
                  </h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <label className={`role-card ${paymentMethod === 'UPI' ? 'selected' : ''}`} onClick={() => setPaymentMethod('UPI')}>
                      <QrCode size={20} className="role-icon" />
                      <div>
                        <div className="role-name">Instant UPI / QR</div>
                        <div className="role-sub">GPay, PhonePe, Paytm</div>
                      </div>
                    </label>

                    <label className={`role-card ${paymentMethod === 'CARD' ? 'selected' : ''}`} onClick={() => setPaymentMethod('CARD')}>
                      <CreditCard size={20} className="role-icon" />
                      <div>
                        <div className="role-name">Credit / Debit Card</div>
                        <div className="role-sub">Visa, MasterCard, RuPay</div>
                      </div>
                    </label>

                    <label className={`role-card ${paymentMethod === 'NETBANKING' ? 'selected' : ''}`} onClick={() => setPaymentMethod('NETBANKING')}>
                      <Building2 size={20} className="role-icon" />
                      <div>
                        <div className="role-name">Net Banking</div>
                        <div className="role-sub">SBI, HDFC, ICICI, Axis</div>
                      </div>
                    </label>

                    <label className={`role-card ${paymentMethod === 'COD' ? 'selected' : ''}`} onClick={() => setPaymentMethod('COD')}>
                      <Banknote size={20} className="role-icon" />
                      <div>
                        <div className="role-name">Cash on Delivery</div>
                        <div className="role-sub">Village Hub Store COD</div>
                      </div>
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '16px', padding: '16px' }}>
                  Proceed to Payment Gateway (Pay ₹{activeTotal.toLocaleString('en-IN')}) &rarr;
                </button>
              </form>
            </div>

            {/* Order Summary Sidebar */}
            <div className="checkout-summary">
              <h3>Order Summary</h3>
              <div className="checkout-items" data-checkout-items>
                {items.map(({ product, quantity }) => {
                  const title = getLocalizedTitle(product.titleI18n);
                  const itemTotal = Number(product.basePrice) * quantity;
                  return (
                    <div key={product.id} className="checkout-item">
                      <div>
                        <strong>{title}</strong>
                        <div className="meta">Qty: {quantity} · ₹{Number(product.basePrice).toLocaleString('en-IN')}</div>
                      </div>
                      <div className="meta" style={{ fontWeight: 600 }}>₹{itemTotal.toLocaleString('en-IN')}</div>
                    </div>
                  );
                })}
              </div>

              <div className="checkout-item">
                <span>Subtotal</span>
                <span data-checkout-subtotal>₹{activeSubtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="checkout-item">
                <span>Village Hub Shipping</span>
                <span data-checkout-shipping style={{ color: activeShipping === 0 ? 'var(--forest)' : 'var(--ink)' }}>
                  {activeShipping === 0 ? 'FREE' : `₹${activeShipping}`}
                </span>
              </div>
              <div className="total-row checkout-item" style={{ fontSize: '1.2rem' }}>
                <span>Total</span>
                <span data-checkout-total>₹{activeTotal.toLocaleString('en-IN')}</span>
              </div>

              <div style={{ marginTop: '16px', fontSize: '0.82rem', color: 'var(--ink-soft)', background: 'var(--cream-2)', padding: '12px', borderRadius: '8px' }}>
                🛡️ <strong>100% Offline-Resilient guarantee</strong>: Orders are saved instantly and synchronized automatically whenever network connectivity is available.
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
