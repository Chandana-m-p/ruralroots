import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Footer } from '../components/Footer';
import { 
  Phone, 
  Lock, 
  KeyRound, 
  Eye, 
  EyeOff, 
  ShoppingBag, 
  User, 
  ShieldCheck, 
  MessageSquare,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const Login: React.FC = () => {
  const { loginWithCredentials, requestOtp, verifyOtp, loginAsDemo } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [authMode, setAuthMode] = useState<'CREDENTIALS' | 'OTP'>('CREDENTIALS');
  const [phone, setPhone] = useState('9876543210');
  const [password, setPassword] = useState('Password123!');
  const [role, setRole] = useState<'ROLE_BUYER' | 'ROLE_HUB_MANAGER'>('ROLE_BUYER');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // OTP State
  const [otpStep, setOtpStep] = useState<'PHONE' | 'VERIFY'>('PHONE');
  const [otp, setOtp] = useState('');
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '']);
  const [smsNotification, setSmsNotification] = useState<{ code: string; time: string } | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const digitRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  const applyPreset = (roleType: 'BUYER' | 'HUB') => {
    if (roleType === 'BUYER') {
      setPhone('9876543210');
      setPassword('Password123!');
      setRole('ROLE_BUYER');
    } else {
      setPhone('9876543211');
      setPassword('ManagerPass123!');
      setRole('ROLE_HUB_MANAGER');
    }
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      await loginWithCredentials(phone, password, role);
      navigate('/');
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed. Please check phone number and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const generatedCode = await requestOtp(phone, role);
      setSmsNotification({ code: generatedCode, time: new Date().toLocaleTimeString() });
      setOtpStep('VERIFY');
      setOtpDigits(['1', '2', '3', '4']);
      setOtp('1234');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    const finalOtp = otpDigits.join('') || otp;

    try {
      await verifyOtp(phone, finalOtp);
      navigate('/');
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid OTP code.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (selectedRole: 'ROLE_BUYER' | 'ROLE_HUB_MANAGER') => {
    setLoading(true);
    setTimeout(() => {
      loginAsDemo(selectedRole);
      setLoading(false);
      navigate('/');
    }, 400);
  };

  const fillOtpFromSms = () => {
    if (smsNotification) {
      const code = smsNotification.code;
      const digits = code.split('').slice(0, 4);
      setOtpDigits(digits);
      setOtp(code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleDigitChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);
    setOtp(newDigits.join(''));

    if (value && index < 3) {
      digitRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      digitRefs[index - 1].current?.focus();
    }
  };

  return (
    <div>
      <div className="container" style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
        <div 
          style={{
            maxWidth: '440px',
            width: '100%',
            background: '#FFFFFF',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(30, 62, 43, 0.08), 0 4px 12px rgba(0,0,0,0.04)',
            border: '1px solid #EAE4D8',
            padding: '32px 28px',
            boxSizing: 'border-box'
          }}
        >
          {/* LOGO & TITLE HEADER */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '54px', height: '54px', background: 'var(--cream-2)', borderRadius: '50%', marginBottom: '12px' }}>
              <span style={{ fontSize: '1.8rem' }}>🌱</span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1C3C27', margin: '0 0 6px 0' }}>
              {t('login')} to RuralRoots
            </h2>
            <p style={{ color: '#6B7280', fontSize: '0.9rem', margin: 0 }}>
              Connecting Rural Artisans to Homes Nationwide
            </p>
          </div>

          {/* AUTHENTICATION METHOD TAB SELECTOR */}
          <div 
            style={{
              display: 'flex',
              background: '#F3EFE6',
              padding: '4px',
              borderRadius: '12px',
              marginBottom: '24px'
            }}
          >
            <button
              type="button"
              onClick={() => { setAuthMode('CREDENTIALS'); setErrorMsg(''); }}
              style={{
                flex: 1,
                padding: '10px 12px',
                fontSize: '0.85rem',
                fontWeight: 700,
                border: 'none',
                borderRadius: '9px',
                cursor: 'pointer',
                background: authMode === 'CREDENTIALS' ? '#FFFFFF' : 'transparent',
                color: authMode === 'CREDENTIALS' ? '#1C3C27' : '#6B7280',
                boxShadow: authMode === 'CREDENTIALS' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              Password Login
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('OTP'); setErrorMsg(''); }}
              style={{
                flex: 1,
                padding: '10px 12px',
                fontSize: '0.85rem',
                fontWeight: 700,
                border: 'none',
                borderRadius: '9px',
                cursor: 'pointer',
                background: authMode === 'OTP' ? '#FFFFFF' : 'transparent',
                color: authMode === 'OTP' ? '#1C3C27' : '#6B7280',
                boxShadow: authMode === 'OTP' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              SMS OTP Login
            </button>
          </div>

          {/* ERROR ALERT BANNER */}
          {errorMsg && (
            <div 
              style={{
                background: '#FEF2F2',
                border: '1px solid #FCA5A5',
                color: '#991B1B',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* AUTH FORM MODE 1: PASSWORD CREDENTIALS */}
          {authMode === 'CREDENTIALS' ? (
            <form onSubmit={handleCredentialsSubmit}>
              {/* MOBILE PHONE INPUT */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#4B5563', marginBottom: '6px', display: 'block' }}>
                  Mobile Phone Number
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                  <input
                    type="tel"
                    pattern="[0-9]{10}"
                    required
                    placeholder="10-digit phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px 12px 42px', fontSize: '0.95rem', borderRadius: '10px', border: '1px solid #D1D5DB', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* PASSWORD INPUT */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#4B5563', marginBottom: '6px', display: 'block' }}>
                  Account Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '100%', padding: '12px 42px 12px 42px', fontSize: '0.95rem', borderRadius: '10px', border: '1px solid #D1D5DB', outline: 'none', boxSizing: 'border-box' }}
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
                <a href="#" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your mobile number.'); }} style={{ color: '#274E32', fontWeight: 700, textDecoration: 'none' }}>
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

              <div style={{ textAlign: 'center', marginTop: '14px' }}>
                <button
                  type="button"
                  onClick={() => setAuthMode('OTP')}
                  style={{ background: 'none', border: 'none', color: '#274E32', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}
                >
                  or log in with OTP instead
                </button>
              </div>
            </form>
          ) : (
            /* AUTH FORM MODE 2: OTP FORM */
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
          <div style={{ background: '#FAF7F2', borderRadius: '16px', padding: '18px 16px', border: '1px solid #EAE4D8', marginTop: '24px', marginBottom: '24px' }}>
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

          {/* SECURITY FOOTER DISCLAIMER */}
          <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#9CA3AF', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            <ShieldCheck size={14} color="#10B981" />
            <span>Your account is protected with secure encryption</span>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};
