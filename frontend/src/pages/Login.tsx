import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Phone, KeyRound, Shield } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [phone, setPhone] = useState('9876543210');
  const [role, setRole] = useState<'ROLE_BUYER' | 'ROLE_HUB_MANAGER'>('ROLE_BUYER');
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [otp, setOtp] = useState('1234');
  const [loading, setLoading] = useState(false);

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      alert('कृपया 10 अंकों का फोन नंबर दर्ज करें।');
      return;
    }
    setLoading(true);
    // Call Spring Boot API or simulate fast local OTP dispatch
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
    setStep('OTP');
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
        // Fallback local session creation for offline demo
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

  return (
    <div className="page-container login-container">
      <div className="login-card">
        <Shield size={48} className="login-icon" />
        <h2>{step === 'PHONE' ? t('login') : t('enterOtp')}</h2>

        {step === 'PHONE' ? (
          <form onSubmit={handleRequestOtp} className="login-form">
            <div className="form-group">
              <label className="form-label">{t('enterPhone')}</label>
              <div className="input-with-icon">
                <Phone size={18} />
                <input 
                  type="tel" 
                  pattern="[0-9]{10}"
                  required
                  autoFocus
                  className="form-input" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="role-selector">
              <label className="role-option">
                <input 
                  type="radio" 
                  name="role" 
                  checked={role === 'ROLE_BUYER'} 
                  onChange={() => setRole('ROLE_BUYER')} 
                />
                <span>ग्रामीण ग्राहक (Buyer)</span>
              </label>

              <label className="role-option">
                <input 
                  type="radio" 
                  name="role" 
                  checked={role === 'ROLE_HUB_MANAGER'} 
                  onChange={() => setRole('ROLE_HUB_MANAGER')} 
                />
                <span>ग्राम केंद्र प्रबंधक (Hub Manager)</span>
              </label>
            </div>

            <button type="submit" disabled={loading} className="btn-primary btn-block">
              {t('requestOtp')}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="login-form">
            <div className="form-group">
              <label className="form-label">{t('enterOtp')} (Demo: 1234)</label>
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

            <button type="submit" disabled={loading} className="btn-primary btn-block">
              {t('verifyOtp')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
