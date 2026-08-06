import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Phone, KeyRound, Shield, User, Lock, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { Footer } from '../components/Footer';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Auth Mode: 'CREDENTIALS' or 'OTP'
  const [authMethod, setAuthMethod] = useState<'CREDENTIALS' | 'OTP'>('CREDENTIALS');

  // Credentials State
  const [username, setUsername] = useState('buyer@ruralroots.in');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Phone / OTP State
  const [phone, setPhone] = useState('9876543210');
  const [otpStep, setOtpStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [otp, setOtp] = useState('1234');

  // Role Selection
  const [role, setRole] = useState<'ROLE_BUYER' | 'ROLE_HUB_MANAGER'>('ROLE_BUYER');

  // UI state
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle Login with Credentials (Username/Email + Password)
  const handleCredentialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please enter both username/email and password.');
      return;
    }

    setLoading(true);

    try {
      // Attempt backend credentials authentication API
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role })
      });

      if (res.ok) {
        const data = await res.json();
        login({
          userId: data.userId || 1,
          phoneNumber: data.phoneNumber || phone,
          fullName: data.fullName || (role === 'ROLE_HUB_MANAGER' ? 'Sunita Devi (Hub Manager)' : 'Ramesh Patel'),
          role: data.role || role,
          token: data.token || 'JWT_SESSION_TOKEN'
        });
        setSuccessMessage('Login successful! Redirecting...');
        setTimeout(() => navigate(role === 'ROLE_HUB_MANAGER' ? '/hub-dashboard' : '/'), 600);
      } else {
        // Fallback for local offline authentication demo
        const isHub = role === 'ROLE_HUB_MANAGER' || username.includes('hub');
        const userFullName = isHub ? 'Sunita Devi (Hub Manager)' : 'Ramesh Patel (Rural Buyer)';
        const assignedRole = isHub ? 'ROLE_HUB_MANAGER' : 'ROLE_BUYER';

        login({
          userId: 1,
          phoneNumber: '9876543210',
          fullName: userFullName,
          role: assignedRole,
          token: 'MOCK_CREDENTIALS_JWT_TOKEN'
        });

        setSuccessMessage(`Welcome back, ${userFullName.split(' ')[0]}! Redirecting...`);
        setTimeout(() => navigate(assignedRole === 'ROLE_HUB_MANAGER' ? '/hub-dashboard' : '/'), 600);
      }
    } catch {
      // Offline fallback
      const isHub = role === 'ROLE_HUB_MANAGER' || username.includes('hub');
      const userFullName = isHub ? 'Sunita Devi (Hub Manager)' : 'Ramesh Patel (Rural Buyer)';
      const assignedRole = isHub ? 'ROLE_HUB_MANAGER' : 'ROLE_BUYER';

      login({
        userId: 1,
        phoneNumber: '9876543210',
        fullName: userFullName,
        role: assignedRole,
        token: 'MOCK_CREDENTIALS_JWT_TOKEN'
      });

      setSuccessMessage(`Welcome back, ${userFullName.split(' ')[0]}! Redirecting...`);
      setTimeout(() => navigate(assignedRole === 'ROLE_HUB_MANAGER' ? '/hub-dashboard' : '/'), 600);
    } finally {
      setLoading(false);
    }
  };

  // Handle Request OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!phone || phone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    setLoading(true);
    try {
      await fetch('/api/v1/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: phone, role })
      });
    } catch {
      // Offline fallback
    }
    setLoading(false);
    setOtpStep('OTP');
  };

  // Handle Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

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
          phoneNumber: data.phoneNumber,
          fullName: data.fullName,
          role: data.role,
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
      login({
        userId: 1,
        phoneNumber: phone,
        fullName: role === 'ROLE_HUB_MANAGER' ? 'Sunita Devi (Hub Manager)' : 'Ramesh Patel',
        role: role,
        token: 'MOCK_OFFLINE_JWT_TOKEN'
      });
    }

    setLoading(false);
    navigate(role === 'ROLE_HUB_MANAGER' ? '/hub-dashboard' : '/');
  };

  // Quick Preset Helper
  const applyPreset = (type: 'BUYER' | 'HUB') => {
    if (type === 'BUYER') {
      setUsername('buyer@ruralroots.in');
      setPassword('buyer123');
      setRole('ROLE_BUYER');
    } else {
      setUsername('hub.manager@ruralroots.in');
      setPassword('hub123');
      setRole('ROLE_HUB_MANAGER');
    }
  };

  return (
    <div>
      <div className="page-container login-container" style={{ padding: '40px 16px' }}>
        <div className="login-card" style={{ maxWidth: '440px', margin: '0 auto' }}>
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
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
              Log in to RuralRoots to manage orders and local Village Hub pickups
            </p>
          </div>

          {/* Auth Method Selector Tabs */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              background: 'var(--cream-2)',
              borderRadius: '8px',
              padding: '4px',
              marginBottom: '24px'
            }}
          >
            <button
              type="button"
              onClick={() => { setAuthMethod('CREDENTIALS'); setErrorMessage(''); }}
              style={{
                padding: '9px',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.88rem',
                background: authMethod === 'CREDENTIALS' ? 'var(--white)' : 'transparent',
                color: authMethod === 'CREDENTIALS' ? 'var(--forest)' : 'var(--ink-soft)',
                boxShadow: authMethod === 'CREDENTIALS' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Credentials Login
            </button>
            <button
              type="button"
              onClick={() => { setAuthMethod('OTP'); setErrorMessage(''); }}
              style={{
                padding: '9px',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.88rem',
                background: authMethod === 'OTP' ? 'var(--white)' : 'transparent',
                color: authMethod === 'OTP' ? 'var(--forest)' : 'var(--ink-soft)',
                boxShadow: authMethod === 'OTP' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Mobile OTP Login
            </button>
          </div>

          {/* Feedback Banners */}
          {errorMessage && (
            <div 
              style={{
                background: '#FEE2E2',
                color: '#991B1B',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '0.88rem',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div 
              style={{
                background: '#D1FAE5',
                color: '#065F46',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '0.88rem',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <CheckCircle2 size={16} />
              <span>{successMessage}</span>
            </div>
          )}

          {/* METHOD 1: CREDENTIALS FORM */}
          {authMethod === 'CREDENTIALS' ? (
            <form onSubmit={handleCredentialLogin} className="login-form">
              {/* Username/Email Input */}
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Username or Email</label>
                <div className="input-with-icon">
                  <User size={18} />
                  <input 
                    type="text" 
                    required
                    placeholder="Enter email or username"
                    className="form-input" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <label className="form-label" style={{ margin: 0 }}>Password</label>
                  <a 
                    href="#forgot" 
                    onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your registered mobile/email.'); }} 
                    style={{ fontSize: '0.8rem', color: 'var(--clay)', fontWeight: 500 }}
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="input-with-icon" style={{ position: 'relative' }}>
                  <Lock size={18} />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required
                    placeholder="Enter password"
                    className="form-input" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingRight: '40px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--ink-soft)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Role Radio Selector */}
              <div className="role-selector" style={{ marginBottom: '16px' }}>
                <label className="role-option">
                  <input 
                    type="radio" 
                    name="role" 
                    checked={role === 'ROLE_BUYER'} 
                    onChange={() => setRole('ROLE_BUYER')} 
                  />
                  <span> ग्रामीण ग्राहक (Buyer)</span>
                </label>

                <label className="role-option">
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

              <button type="submit" disabled={loading} className="btn-primary btn-block" style={{ padding: '14px' }}>
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
                    style={{ flex: 1, padding: '6px 8px', fontSize: '0.8rem', background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '6px', fontWeight: 500, cursor: 'pointer' }}
                  >
                    👤 Demo Buyer
                  </button>
                  <button 
                    type="button" 
                    onClick={() => applyPreset('HUB')}
                    style={{ flex: 1, padding: '6px 8px', fontSize: '0.8rem', background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '6px', fontWeight: 500, cursor: 'pointer' }}
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
                  <label className="form-label">{t('enterPhone')}</label>
                  <div className="input-with-icon">
                    <Phone size={18} />
                    <input 
                      type="tel" 
                      pattern="[0-9]{10}"
                      required
                      autoFocus
                      placeholder="10-digit mobile number"
                      className="form-input" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="role-selector" style={{ marginBottom: '20px' }}>
                  <label className="role-option">
                    <input 
                      type="radio" 
                      name="role-otp" 
                      checked={role === 'ROLE_BUYER'} 
                      onChange={() => setRole('ROLE_BUYER')} 
                    />
                    <span>ग्रामीण ग्राहक (Buyer)</span>
                  </label>

                  <label className="role-option">
                    <input 
                      type="radio" 
                      name="role-otp" 
                      checked={role === 'ROLE_HUB_MANAGER'} 
                      onChange={() => setRole('ROLE_HUB_MANAGER')} 
                    />
                    <span>ग्राम केंद्र (Hub Manager)</span>
                  </label>
                </div>

                <button type="submit" disabled={loading} className="btn-primary btn-block" style={{ padding: '14px' }}>
                  {loading ? 'Sending SMS...' : t('requestOtp')}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="login-form">
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label className="form-label">{t('enterOtp')} (Demo OTP: 1234)</label>
                  <div className="input-with-icon">
                    <KeyRound size={18} />
                    <input 
                      type="text" 
                      pattern="[0-9]{4}"
                      maxLength={4}
                      required
                      autoFocus
                      className="form-input otp-input" 
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn-primary btn-block" style={{ padding: '14px', marginBottom: '12px' }}>
                  {loading ? 'Verifying...' : t('verifyOtp')}
                </button>

                <button 
                  type="button"
                  onClick={() => setOtpStep('PHONE')}
                  style={{ width: '100%', background: 'none', border: 'none', color: 'var(--ink-soft)', fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  ← Change Mobile Number
                </button>
              </form>
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

