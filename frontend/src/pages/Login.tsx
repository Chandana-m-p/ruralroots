import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
<<<<<<< HEAD
import { Phone, KeyRound, User, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, Shield } from 'lucide-react';
=======
import { User, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, Sparkles, MessageSquare, ArrowRight, ShieldCheck, Truck, ShoppingBag, Heart, Phone, Users, MapPin, Star, Check } from 'lucide-react';
>>>>>>> bb47bee993ff0ce233311e7ca24db9ee4b2afd2e
import { Footer } from '../components/Footer';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/';

  // Auth Mode: 'CREDENTIALS' or 'OTP'
  const [authMode, setAuthMode] = useState<'CREDENTIALS' | 'OTP'>('CREDENTIALS');

  // Form Fields
  const [username, setUsername] = useState('harshini_03');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // OTP State
  const [phone, setPhone] = useState('9876543210');
  const [otpStep, setOtpStep] = useState<'PHONE' | 'VERIFY'>('PHONE');
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '']);
  const [dispatchedOtp, setDispatchedOtp] = useState<string | null>(null);
  const [smsNotification, setSmsNotification] = useState<{ phone: string; code: string } | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Status messages
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

<<<<<<< HEAD
  // Handle Login with Credentials
  const handleCredentialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
=======
  // Refs for OTP digits
  const digitRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];
>>>>>>> bb47bee993ff0ce233311e7ca24db9ee4b2afd2e

  // Handle Credentials Submit
  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please enter both username/mobile and password.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        const data = await res.json();
        login({
          userId: data.userId || 1,
          phoneNumber: data.phoneNumber || '9876543210',
          fullName: data.fullName || 'Harshini Patel',
          role: data.role || 'ROLE_BUYER',
          token: data.token || 'JWT_SESSION_TOKEN'
        });
        setSuccessMessage('Welcome back! Logging in...');
        setTimeout(() => navigate(redirectPath), 500);
      } else {
<<<<<<< HEAD
        const isHub = role === 'ROLE_HUB_MANAGER' || username.includes('hub');
        const userFullName = isHub ? 'Sunita Devi (Hub Manager)' : 'Ramesh Patel (Rural Buyer)';
        const assignedRole = isHub ? 'ROLE_HUB_MANAGER' : 'ROLE_BUYER';

=======
        // Fallback login
>>>>>>> bb47bee993ff0ce233311e7ca24db9ee4b2afd2e
        login({
          userId: 1,
          phoneNumber: '9876543210',
          fullName: 'Harshini Patel',
          role: 'ROLE_BUYER',
          token: 'MOCK_CREDENTIALS_JWT_TOKEN'
        });
        setSuccessMessage('Welcome back! Logging in...');
        setTimeout(() => navigate(redirectPath), 500);
      }
    } catch {
<<<<<<< HEAD
      const isHub = role === 'ROLE_HUB_MANAGER' || username.includes('hub');
      const userFullName = isHub ? 'Sunita Devi (Hub Manager)' : 'Ramesh Patel (Rural Buyer)';
      const assignedRole = isHub ? 'ROLE_HUB_MANAGER' : 'ROLE_BUYER';

=======
>>>>>>> bb47bee993ff0ce233311e7ca24db9ee4b2afd2e
      login({
        userId: 1,
        phoneNumber: '9876543210',
        fullName: 'Harshini Patel',
        role: 'ROLE_BUYER',
        token: 'MOCK_CREDENTIALS_JWT_TOKEN'
      });
      setSuccessMessage('Welcome back! Logging in...');
      setTimeout(() => navigate(redirectPath), 500);
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP Request
  const handleRequestOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');
<<<<<<< HEAD

    if (!phone || phone.length < 10) {
=======
    setSuccessMessage('');

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
>>>>>>> bb47bee993ff0ce233311e7ca24db9ee4b2afd2e
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    let finalOtp = Math.floor(1000 + Math.random() * 9000).toString();

    try {
      const res = await fetch('/api/v1/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: cleanPhone, role: 'ROLE_BUYER' })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.otp) finalOtp = data.otp;
      }
    } catch {
      // Offline fallback
    }

<<<<<<< HEAD
=======
    setDispatchedOtp(finalOtp);
    setSmsNotification({ phone: cleanPhone, code: finalOtp });
    setOtpDigits(['', '', '', '']);
>>>>>>> bb47bee993ff0ce233311e7ca24db9ee4b2afd2e
    setLoading(false);
    setOtpStep('VERIFY');
    setSuccessMessage(`📱 SMS OTP sent to +91 ${cleanPhone}`);

    setTimeout(() => {
      digitRefs[0].current?.focus();
    }, 100);
  };

  // Handle Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    if (otp.length < 4) {
      setErrorMessage('Please enter the full 4-digit OTP.');
=======
    const entered = otpDigits.join('');

    if (entered.length < 4) {
      setErrorMessage('Please enter the full 4-digit OTP code.');
      return;
    }

    if (dispatchedOtp && entered !== dispatchedOtp) {
      setErrorMessage(`Invalid OTP code "${entered}". Please enter the exact OTP code (${dispatchedOtp}) shown in your SMS notification.`);
>>>>>>> bb47bee993ff0ce233311e7ca24db9ee4b2afd2e
      return;
    }

    setLoading(true);
    setErrorMessage('');

<<<<<<< HEAD
    try {
      const res = await fetch('/api/v1/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: phone, otp })
      });

      if (res.ok) {
        const data = await res.json();
        login({
          userId: data.userId,
          phoneNumber: data.phoneNumber || phone,
          fullName: data.fullName || (role === 'ROLE_HUB_MANAGER' ? 'Sunita Devi (Hub Manager)' : 'Ramesh Patel'),
          role: data.role || role,
          token: data.token
        });
      } else {
        login({
          userId: 1,
          phoneNumber: phone,
          fullName: role === 'ROLE_HUB_MANAGER' ? 'Sunita Devi (Hub Manager)' : 'Ramesh Patel',
          role: role,
          token: 'MOCK_OFFLINE_JWT_TOKEN'
        });
      }
    } catch {
=======
    setTimeout(() => {
>>>>>>> bb47bee993ff0ce233311e7ca24db9ee4b2afd2e
      login({
        userId: 1,
        phoneNumber: phone,
        fullName: 'Harshini Patel',
        role: 'ROLE_BUYER',
        token: 'MOCK_OTP_JWT_TOKEN'
      });
      setSuccessMessage('OTP Verified Successfully! Redirecting...');
      setTimeout(() => navigate(redirectPath), 500);
      setLoading(false);
    }, 400);
  };

  // Handle Quick Demo Login Buttons
  const handleDemoLogin = (roleType: 'ROLE_BUYER' | 'ROLE_HUB_MANAGER') => {
    const isHub = roleType === 'ROLE_HUB_MANAGER';
    const userFullName = isHub ? 'Sunita Devi (Hub Manager)' : 'Harshini Patel (Buyer)';
    const phoneNum = isHub ? '9876543211' : '9876543210';

    login({
      userId: isHub ? 2 : 1,
      phoneNumber: phoneNum,
      fullName: userFullName,
      role: roleType,
      token: 'DEMO_LOGIN_TOKEN'
    });

    setSuccessMessage(`Signed in as ${userFullName}! Redirecting...`);
    setTimeout(() => navigate(isHub ? '/hub-dashboard' : redirectPath), 500);
  };

  const handleDigitChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = val.slice(-1);
    setOtpDigits(newDigits);
    if (val && index < 3) digitRefs[index + 1].current?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      digitRefs[index - 1].current?.focus();
    }
  };

  const fillOtpFromSms = () => {
    if (smsNotification) {
      setOtpDigits(smsNotification.code.split(''));
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
<<<<<<< HEAD
    <div>
      <div className="page-container login-container" style={{ padding: '40px 16px' }}>
        <div className="login-card" style={{ maxWidth: '440px', margin: '0 auto', border: '1px solid var(--line)', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', background: 'var(--white)', padding: '28px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div 
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'var(--cream-2)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
                color: 'var(--forest)'
              }}
            >
              <Shield size={32} />
            </div>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '6px' }}>Account Sign In</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', margin: 0 }}>
              Log in to RuralRoots to manage orders and local Village Hub pickups
            </p>
          </div>
=======
    <div style={{
      background: '#F6F3ED',
      backgroundImage: 'radial-gradient(#E8E3D8 1px, transparent 1px)',
      backgroundSize: '24px 24px',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
        
        {/* CENTERED LOGIN MODAL CONTAINER (EXACT MATCH TO IMAGE) */}
        <div style={{
          maxWidth: '960px',
          width: '100%',
          background: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.1)',
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 440px) 1fr',
          overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.06)'
        }}>
>>>>>>> bb47bee993ff0ce233311e7ca24db9ee4b2afd2e

          {/* ========================================================================= */}
          {/* LEFT COLUMN: GREEN BRAND PANEL WITH HERO ARTWORK & STATS BOX */}
          {/* ========================================================================= */}
          <div style={{
            background: 'linear-gradient(180deg, #1C3C27 0%, #152E1E 100%)',
            color: '#FFFFFF',
            padding: '36px 30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative'
          }}>
            <div>
              {/* WELCOME BADGE */}
              <div style={{ fontSize: '0.85rem', color: '#A7F3D0', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                🌿 Welcome to
              </div>

              {/* RURALROOTS TITLE */}
              <h3 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                RuralRoots <span style={{ fontSize: '1.2rem' }}>🌿</span>
              </h3>

              {/* SERIF HERO HEADLINE */}
              <h1 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '2.1rem',
                fontWeight: 800,
                color: '#F4EAD2',
                lineHeight: 1.25,
                marginBottom: '14px'
              }}>
                Support Local,<br />Empower Villages
              </h1>

              {/* SUBTITLE */}
              <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.82)', lineHeight: 1.6, marginBottom: '20px' }}>
                Connecting rural artisans to a world of opportunities. Every purchase makes a real impact.
              </p>
            </div>

            {/* ARTISAN & FARMER HERO ILLUSTRATION */}
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              height: '190px',
              marginBottom: '20px',
              position: 'relative',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <img
                src="https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=700&q=80"
                alt="Rural Artisans & Farmers"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(21, 46, 30, 0.6) 0%, transparent 60%)'
              }} />
            </div>

            {/* 4 FEATURE RIBBON ITEMS */}
            <div style={{
              background: '#132B1C',
              borderRadius: '12px',
              padding: '12px 10px',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '4px',
              textAlign: 'center',
              marginBottom: '20px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <div>
                <div style={{ fontSize: '1.1rem', marginBottom: '2px' }}>🎯</div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#FFF' }}>Track Orders</div>
                <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.6)' }}>Stay updated</div>
              </div>
              <div>
                <div style={{ fontSize: '1.1rem', marginBottom: '2px' }}>🛡️</div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#FFF' }}>Secure Payments</div>
                <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.6)' }}>100% Protected</div>
              </div>
              <div>
                <div style={{ fontSize: '1.1rem', marginBottom: '2px' }}>🛍️</div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#FFF' }}>Cash on Delivery</div>
                <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.6)' }}>Hassle-free</div>
              </div>
              <div>
                <div style={{ fontSize: '1.1rem', marginBottom: '2px' }}>🤍</div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#FFF' }}>Save Wishlist</div>
                <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.6)' }}>Your favorites</div>
              </div>
            </div>

            {/* STATS & TESTIMONIAL BOX (CREAM CARD) */}
            <div style={{
              background: '#FAF7F2',
              color: '#1C3C27',
              borderRadius: '16px',
              padding: '18px 16px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
            }}>
              {/* 3 STATS COLUMNS */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center', paddingBottom: '14px', borderBottom: '1px solid #EAE4D8', marginBottom: '14px' }}>
                <div>
                  <div style={{ fontSize: '1.1rem', marginBottom: '2px' }}>👥</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1C3C27' }}>2,000+</div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#6B7280' }}>Artisans Empowered</div>
                </div>

<<<<<<< HEAD
          {/* METHOD 1: CREDENTIALS FORM */}
          {authMethod === 'CREDENTIALS' ? (
            <form onSubmit={handleCredentialLogin} className="login-form">
              {/* Username/Email Input */}
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label" style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '4px', display: 'block' }}>Username or Email</label>
                <div className="input-with-icon" style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-soft)' }} />
                  <input 
                    type="text" 
                    required
                    placeholder="Enter email or username"
                    className="form-input" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ width: '100%', paddingLeft: '40px', height: '42px', borderRadius: '6px', border: '1px solid var(--line)' }}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <label className="form-label" style={{ margin: 0, fontWeight: 600, fontSize: '0.88rem' }}>Password</label>
                  <a 
                    href="#forgot" 
                    onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your registered contact.'); }} 
                    style={{ fontSize: '0.8rem', color: 'var(--clay)', fontWeight: 500, textDecoration: 'none' }}
                  >
=======
                <div>
                  <div style={{ fontSize: '1.1rem', marginBottom: '2px' }}>🛍️</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1C3C27' }}>15,000+</div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#6B7280' }}>Handmade Products</div>
                </div>

                <div>
                  <div style={{ fontSize: '1.1rem', marginBottom: '2px' }}>📍</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1C3C27' }}>100+</div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#6B7280' }}>Village Hubs</div>
                </div>
              </div>

              {/* LAKSHMI ARTISAN TESTIMONIAL BAR */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=faces"
                  alt="Lakshmi Artisan"
                  style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #C48B3F', flexShrink: 0 }}
                />
                <div>
                  <div style={{ color: '#F59E0B', fontSize: '0.75rem', letterSpacing: '2px', marginBottom: '2px' }}>★★★★★</div>
                  <p style={{ fontSize: '0.75rem', color: '#374151', fontStyle: 'italic', lineHeight: 1.4, margin: '0 0 2px 0' }}>
                    "RuralRoots helped me sell my handmade baskets across India. It changed my life and my family's future."
                  </p>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#92400E' }}>
                    — Lakshmi, Artisan
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: WHITE FORM PANEL (EXACT MATCH TO SCREENSHOT) */}
          {/* ========================================================================= */}
          <div style={{ padding: '40px 38px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            
            {/* FORM HEADER */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#1C3C27', margin: '0 0 6px 0', fontFamily: 'Georgia, serif' }}>
                Welcome Back! 👋
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#6B7280', margin: 0 }}>
                Log in to continue your RuralRoots journey.
              </p>
            </div>

            {/* Error / Success Alerts */}
            {errorMessage && (
              <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '10px 14px', borderRadius: '10px', fontSize: '0.85rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #FCA5A5' }}>
                <AlertCircle size={16} /> <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div style={{ background: '#D1FAE5', color: '#065F46', padding: '10px 14px', borderRadius: '10px', fontSize: '0.85rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #6EE7B7' }}>
                <CheckCircle2 size={16} /> <span>{successMessage}</span>
              </div>
            )}

            {/* MODE 1: CREDENTIALS FORM */}
            {authMode === 'CREDENTIALS' ? (
              <form onSubmit={handleCredentialsSubmit}>
                
                {/* USERNAME / MOBILE INPUT */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#4B5563', marginBottom: '6px', display: 'block' }}>
                    Username or Mobile Number
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                    <input
                      type="text"
                      required
                      placeholder="Username or Mobile Number"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px 12px 42px',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: '#1F2937',
                        borderRadius: '10px',
                        border: '1px solid #D1D5DB',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* PASSWORD INPUT WITH EYE TOGGLE */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#4B5563', marginBottom: '6px', display: 'block' }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="•••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 42px 12px 42px',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: '#1F2937',
                        borderRadius: '10px',
                        border: '1px solid #D1D5DB',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* FORGOT PASSWORD & REMEMBER ME */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', fontSize: '0.85rem' }}>
                  <a href="#" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your registered mobile number.'); }} style={{ color: '#274E32', fontWeight: 700, textDecoration: 'none' }}>
>>>>>>> bb47bee993ff0ce233311e7ca24db9ee4b2afd2e
                    Forgot Password?
                  </a>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4B5563', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      style={{ accentColor: '#274E32' }}
                    />
                    Remember Me
                  </label>
                </div>
<<<<<<< HEAD
                <div className="input-with-icon" style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-soft)' }} />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required
                    placeholder="Enter password"
                    className="form-input" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '100%', paddingLeft: '40px', paddingRight: '40px', height: '42px', borderRadius: '6px', border: '1px solid var(--line)' }}
                  />
=======

                {/* PRIMARY SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    background: 'linear-gradient(135deg, #2D5837 0%, #1F3E28 100%)',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(45, 88, 55, 0.3)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  🌿 {loading ? 'Logging in...' : 'Log In'}
                </button>

                {/* SUB-LINK FOR OTP */}
                <div style={{ textAlign: 'center', marginTop: '14px' }}>
>>>>>>> bb47bee993ff0ce233311e7ca24db9ee4b2afd2e
                  <button
                    type="button"
                    onClick={() => setAuthMode('OTP')}
                    style={{ background: 'none', border: 'none', color: '#274E32', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}
                  >
                    or log in with OTP instead
                  </button>
                </div>

<<<<<<< HEAD
              {/* Role Radio Selector */}
              <div className="role-selector" style={{ marginBottom: '16px', display: 'flex', gap: '16px' }}>
                <label className="role-option" style={{ cursor: 'pointer', fontSize: '0.88rem' }}>
                  <input 
                    type="radio" 
                    name="role" 
                    checked={role === 'ROLE_BUYER'} 
                    onChange={() => setRole('ROLE_BUYER')} 
                  />
                  <span> ग्रामीण ग्राहक (Buyer)</span>
                </label>

                <label className="role-option" style={{ cursor: 'pointer', fontSize: '0.88rem' }}>
                  <input 
                    type="radio" 
                    name="role" 
                    checked={role === 'ROLE_HUB_MANAGER'} 
                    onChange={() => setRole('ROLE_HUB_MANAGER')} 
                  />
                  <span> ग्राम केंद्र (Hub Manager)</span>
                </label>
              </div>

              {/* Remember Me */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <input 
                  type="checkbox" 
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember" style={{ fontSize: '0.88rem', color: 'var(--ink-soft)', cursor: 'pointer' }}>
                  Remember my session on this browser
                </label>
              </div>

              <button type="submit" disabled={loading} className="btn-primary btn-block" style={{ padding: '14px', borderRadius: '8px', fontWeight: 600 }}>
                {loading ? 'Authenticating...' : 'Sign In with Credentials'}
              </button>

              {/* Quick Demo Credentials Bar */}
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--line)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--ink-soft)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>
                  Quick Demo Accounts (1-Click Fill)
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    type="button" 
                    onClick={() => applyPreset('BUYER')}
                    style={{ flex: 1, padding: '6px 8px', fontSize: '0.8rem', background: 'var(--cream-2)', border: '1px solid var(--line)', borderRadius: '6px', fontWeight: 500, cursor: 'pointer' }}
                  >
                    👤 Demo Buyer
                  </button>
                  <button 
                    type="button" 
                    onClick={() => applyPreset('HUB')}
                    style={{ flex: 1, padding: '6px 8px', fontSize: '0.8rem', background: 'var(--cream-2)', border: '1px solid var(--line)', borderRadius: '6px', fontWeight: 500, cursor: 'pointer' }}
                  >
                    🏪 Demo Hub Manager
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* METHOD 2: PHONE & SMS OTP FORM */
            otpStep === 'PHONE' ? (
              <form onSubmit={handleRequestOtp} className="login-form">
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '4px', display: 'block' }}>{t('enterPhone')}</label>
                  <div className="input-with-icon" style={{ position: 'relative' }}>
                    <Phone size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-soft)' }} />
                    <input 
                      type="tel" 
                      pattern="[0-9]{10}"
                      required
                      autoFocus
                      placeholder="10-digit mobile number"
                      className="form-input" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{ width: '100%', paddingLeft: '40px', height: '42px', borderRadius: '6px', border: '1px solid var(--line)' }}
                    />
                  </div>
                </div>

                <div className="role-selector" style={{ marginBottom: '20px', display: 'flex', gap: '16px' }}>
                  <label className="role-option" style={{ cursor: 'pointer', fontSize: '0.88rem' }}>
                    <input 
                      type="radio" 
                      name="role-otp" 
                      checked={role === 'ROLE_BUYER'} 
                      onChange={() => setRole('ROLE_BUYER')} 
                    />
                    <span>ग्रामीण ग्राहक (Buyer)</span>
                  </label>

                  <label className="role-option" style={{ cursor: 'pointer', fontSize: '0.88rem' }}>
                    <input 
                      type="radio" 
                      name="role-otp" 
                      checked={role === 'ROLE_HUB_MANAGER'} 
                      onChange={() => setRole('ROLE_HUB_MANAGER')} 
                    />
                    <span>ग्राम केंद्र (Hub Manager)</span>
                  </label>
                </div>

                <button type="submit" disabled={loading} className="btn-primary btn-block" style={{ padding: '14px', borderRadius: '8px', fontWeight: 600 }}>
                  {loading ? 'Sending SMS...' : t('requestOtp')}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="login-form">
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '4px', display: 'block' }}>{t('enterOtp')} (Demo OTP: 1234)</label>
                  <div className="input-with-icon" style={{ position: 'relative' }}>
                    <KeyRound size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-soft)' }} />
                    <input 
                      type="text" 
                      pattern="[0-9]{4}"
                      maxLength={4}
                      required
                      autoFocus
                      className="form-input otp-input" 
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      style={{ width: '100%', paddingLeft: '40px', height: '42px', borderRadius: '6px', border: '1px solid var(--line)', textAlign: 'center', letterSpacing: '4px', fontSize: '1.1rem' }}
                    />
=======
              </form>
            ) : (
              /* MODE 2: OTP FORM */
              <form onSubmit={otpStep === 'PHONE' ? handleRequestOtp : handleVerifyOtp}>

                {/* SMS NOTIFICATION TOAST CARD */}
                {smsNotification && (
                  <div
                    onClick={fillOtpFromSms}
                    style={{
                      background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
                      color: '#F8FAFC',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      marginBottom: '16px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <MessageSquare size={16} color="#38BDF8" />
                      <div>
                        <div style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>
                          📱 SMS NOTIFICATION GATEWAY
                        </div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFF' }}>
                          OTP Code: <span style={{ color: '#38BDF8', letterSpacing: '2px' }}>{smsNotification.code}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); fillOtpFromSms(); }}
                      style={{
                        background: copiedCode ? '#16A34A' : '#2563EB',
                        color: '#FFF',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {copiedCode ? 'Filled!' : 'Auto-fill'}
                    </button>
>>>>>>> bb47bee993ff0ce233311e7ca24db9ee4b2afd2e
                  </div>
                )}

                {otpStep === 'PHONE' ? (
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#4B5563', marginBottom: '8px', display: 'block' }}>
                      Enter 10-Digit Mobile Number
                    </label>
                    <div style={{ position: 'relative', marginBottom: '20px' }}>
                      <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: '#274E32' }}>
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        pattern="[0-9]{10}"
                        maxLength={10}
                        required
                        placeholder="Enter mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        style={{ width: '100%', padding: '12px 14px 12px 75px', fontSize: '1rem', fontWeight: 700, borderRadius: '10px', border: '1px solid #D1D5DB', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                    <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', fontSize: '1.05rem', fontWeight: 700, color: '#FFF', background: '#274E32', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>
                      {loading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                  </div>
                ) : (
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#4B5563', marginBottom: '10px', display: 'block', textAlign: 'center' }}>
                      Enter 4-Digit Verification Code
                    </label>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '14px' }}>
                      {otpDigits.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={digitRefs[idx]}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleDigitChange(idx, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(idx, e)}
                          style={{ width: '50px', height: '56px', fontSize: '1.5rem', fontWeight: 800, textAlign: 'center', borderRadius: '10px', border: digit ? '2px solid #274E32' : '1px solid #D1D5DB', outline: 'none' }}
                        />
                      ))}
                    </div>

                    <div style={{ background: '#FAF7F2', border: '1px solid #EAE4D8', borderRadius: '8px', padding: '8px 12px', fontSize: '0.75rem', color: '#6B7280', textAlign: 'center', marginBottom: '18px', lineHeight: 1.4 }}>
                      💡 <strong>Note:</strong> Real carrier SMS delivery requires active Twilio/Fast2SMS API keys in backend config. In <strong>Local Dev Mode</strong>, enter any 4-digit code (e.g. <code>1234</code>) to verify.
                    </div>

                    <button type="submit" disabled={loading || otpDigits.join('').length < 4} style={{ width: '100%', padding: '14px', fontSize: '1.05rem', fontWeight: 700, color: '#FFF', background: '#274E32', border: 'none', borderRadius: '10px', cursor: 'pointer', opacity: otpDigits.join('').length < 4 ? 0.6 : 1 }}>
                      {loading ? 'Verifying...' : 'Verify OTP & Sign In'}
                    </button>
                  </div>
                )}

                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                  <button
                    type="button"
                    onClick={() => setAuthMode('CREDENTIALS')}
                    style={{ background: 'none', border: 'none', color: '#274E32', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}
                  >
                    Log in with Password instead
                  </button>
                </div>
              </form>
            )}

            {/* QUICK 1-CLICK DEMO LOGINS SECTION */}
            <div style={{ background: '#FAF7F2', borderRadius: '16px', padding: '18px 16px', border: '1px solid #EAE4D8', marginBottom: '24px' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'center', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                ⚡ QUICK 1-CLICK DEMO LOGINS
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {/* BUYER DEMO CARD */}
                <div style={{ background: '#F0F7F3', borderRadius: '12px', padding: '14px', border: '1px solid #C8E6D3', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#274E32', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
                        <ShoppingBag size={14} />
                      </div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1C3C27' }}>Buyer Demo</div>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#6B7280', lineHeight: 1.3, marginBottom: '12px' }}>
                      Experience shopping as a buyer
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDemoLogin('ROLE_BUYER')}
                    style={{
                      width: '100%',
                      padding: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      background: '#274E32',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    Login as Buyer
                  </button>
                </div>

<<<<<<< HEAD
                <button type="submit" disabled={loading} className="btn-primary btn-block" style={{ padding: '14px', marginBottom: '12px', borderRadius: '8px', fontWeight: 600 }}>
                  {loading ? 'Verifying...' : t('verifyOtp')}
                </button>
=======
                {/* MANAGER DEMO CARD */}
                <div style={{ background: '#FDF7E7', borderRadius: '12px', padding: '14px', border: '1px solid #F3E3B8', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#C48B3F', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
                        <User size={14} />
                      </div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#92400E' }}>Manager Demo</div>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#6B7280', lineHeight: 1.3, marginBottom: '12px' }}>
                      Manage products & orders efficiently
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDemoLogin('ROLE_HUB_MANAGER')}
                    style={{
                      width: '100%',
                      padding: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      background: '#C48B3F',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    Login as Manager
                  </button>
                </div>
              </div>
            </div>

            {/* CREATE ACCOUNT LINK */}
            <div style={{ textAlign: 'center', fontSize: '0.88rem', color: '#4B5563', marginBottom: '12px' }}>
              New to RuralRoots?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Account registration is active! Log in via OTP or Credentials to automatically create your account.'); }} style={{ color: '#274E32', fontWeight: 800, textDecoration: 'none' }}>
                Create an Account →
              </a>
            </div>

            {/* SECURITY FOOTER DISCLAIMER */}
            <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#9CA3AF', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <ShieldCheck size={14} color="#10B981" />
              <span>Your account is protected with secure encryption</span>
            </div>

          </div>
>>>>>>> bb47bee993ff0ce233311e7ca24db9ee4b2afd2e

        </div>
      </div>
      <Footer />
    </div>
  );
};
