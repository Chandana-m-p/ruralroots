import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, ShieldCheck, Key, ShieldAlert, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';

export const AuthWorkflow: React.FC = () => {
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  // Multi-stage State Tracker
  const [stage, setStage] = useState<'LOGIN' | 'DASHBOARD' | 'VERIFY_PAGE'>('LOGIN');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Form Inputs
  const [accountName, setAccountName] = useState('');
  const [accountRole, setAccountRole] = useState<'Standard User' | 'Administrator'>('Standard User');
  const [verifyName, setVerifyName] = useState('');
  const [verifyPin, setVerifyPin] = useState(['', '', '', '']);

  // Feedback Messages
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Stage 1: Login Handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!accountName.trim()) {
      setErrorMsg('Please enter a valid unique account name.');
      return;
    }

    login({
      userId: 99,
      phoneNumber: '9876543210',
      fullName: accountName.trim(),
      role: accountRole === 'Administrator' ? 'ROLE_ADMIN' : 'ROLE_BUYER',
      token: 'mock-auth-token'
    });

    localStorage.setItem('rr_user_name', accountName.trim());
    setStage('DASHBOARD');
  };

  // Stage 2: Trigger Modal
  const handleTriggerLogout = () => {
    setShowLogoutModal(true);
  };

  // Stage 2: Logout Selected in Modal -> Redirect to Stage 3 Dedicated Verification Page
  const handleConfirmLogoutModal = () => {
    setShowLogoutModal(false);
    setStage('VERIFY_PAGE');
  };

  // Stage 3: PIN Input Change
  const handlePinChange = (idx: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newPin = [...verifyPin];
    newPin[idx] = val;
    setVerifyPin(newPin);

    if (val && idx < 3) {
      const nextInput = document.getElementById(`pin-input-${idx + 1}`);
      nextInput?.focus();
    }
  };

  // Stage 3: Verification Submit
  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (verifyName.trim().toLowerCase() !== accountName.trim().toLowerCase()) {
      setErrorMsg(`Account name mismatch! Entered "${verifyName}", expected "${accountName}".`);
      return;
    }

    const pinCode = verifyPin.join('');
    if (pinCode.length < 4) {
      setErrorMsg('Please enter your 4-digit security PIN to complete logout.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg('✅ Logout verification verified successfully! Destroying session...');

      setTimeout(() => {
        logout();
        setAccountName('');
        setVerifyName('');
        setVerifyPin(['', '', '', '']);
        setStage('LOGIN');
      }, 1500);
    }, 1000);
  };

  return (
    <div style={{
      minHeight: '85vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)'
    }}>
      
      {/* STAGE TRACKER BADGES */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div style={{
          padding: '8px 16px',
          borderRadius: '9999px',
          background: stage === 'LOGIN' ? 'rgba(37, 99, 235, 0.25)' : 'rgba(255, 255, 255, 0.08)',
          border: stage === 'LOGIN' ? '1px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.15)',
          color: stage === 'LOGIN' ? '#60a5fa' : '#94a3b8',
          fontSize: '0.825rem',
          fontWeight: 700
        }}>
          1. Login Page
        </div>

        <div style={{
          padding: '8px 16px',
          borderRadius: '9999px',
          background: showLogoutModal ? 'rgba(234, 179, 8, 0.25)' : 'rgba(255, 255, 255, 0.08)',
          border: showLogoutModal ? '1px solid #eab308' : '1px solid rgba(255, 255, 255, 0.15)',
          color: showLogoutModal ? '#fde047' : '#94a3b8',
          fontSize: '0.825rem',
          fontWeight: 700
        }}>
          2. Logout Confirmation Dialog
        </div>

        <div style={{
          padding: '8px 16px',
          borderRadius: '9999px',
          background: stage === 'VERIFY_PAGE' ? 'rgba(220, 38, 38, 0.25)' : 'rgba(255, 255, 255, 0.08)',
          border: stage === 'VERIFY_PAGE' ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.15)',
          color: stage === 'VERIFY_PAGE' ? '#fca5a5' : '#94a3b8',
          fontSize: '0.825rem',
          fontWeight: 700
        }}>
          3. Logout Verification Page
        </div>
      </div>

      {/* STAGE 1: LOGIN PAGE */}
      {stage === 'LOGIN' && (
        <div style={{
          maxWidth: '460px',
          width: '100%',
          background: '#ffffff',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#eff6ff',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <User size={28} />
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
              Stage 1: Login / Register
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
              Enter a unique account name to serve as your primary account identifier.
            </p>
          </div>

          {errorMsg && (
            <div style={{ padding: '12px 16px', background: '#fef2f2', border: '1px solid #fca5a5', color: '#b91c1c', borderRadius: '12px', marginBottom: '16px', fontSize: '0.85rem' }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#334155', marginBottom: '6px' }}>
                Unique Account Name
              </label>
              <input 
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Enter unique account handle (e.g. Alex_Chandana)"
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '12px',
                  border: '1.5px solid #cbd5e1',
                  background: '#f8fafc',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#334155', marginBottom: '6px' }}>
                Account Type
              </label>
              <select
                value={accountRole}
                onChange={(e) => setAccountRole(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '12px',
                  border: '1.5px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              >
                <option value="Standard User">Standard User</option>
                <option value="Administrator">Administrator</option>
              </select>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                border: 'none',
                background: '#2563eb',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)'
              }}
            >
              <span>Authenticate Account</span>
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      )}

      {/* DASHBOARD VIEW (LOGGED IN) */}
      {stage === 'DASHBOARD' && (
        <div style={{
          maxWidth: '460px',
          width: '100%',
          background: '#ffffff',
          borderRadius: '24px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <ShieldCheck size={32} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
            Welcome, {accountName}!
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '24px' }}>
            You are logged in with unique identifier <strong>{accountName}</strong>.
          </p>

          <button
            onClick={handleTriggerLogout}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              background: '#dc2626',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)'
            }}
          >
            <LogOut size={18} />
            <span>Initiate Logout Workflow</span>
          </button>
        </div>
      )}

      {/* STAGE 2: LOGOUT CONFIRMATION MODAL */}
      {showLogoutModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999
        }}>
          <div style={{
            maxWidth: '420px',
            width: '100%',
            background: '#ffffff',
            borderRadius: '20px',
            padding: '32px',
            textAlign: 'center',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#fef2f2', color: '#dc2626', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <AlertTriangle size={28} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              Stage 2: Logout Confirmation
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '24px' }}>
              Are you sure you want to logout?
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowLogoutModal(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  background: '#f1f5f9',
                  color: '#334155',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogoutModal}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#dc2626',
                  color: '#ffffff',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)'
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 3: LOGOUT VERIFICATION PAGE */}
      {stage === 'VERIFY_PAGE' && (
        <div style={{
          maxWidth: '460px',
          width: '100%',
          background: '#ffffff',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#fee2e2',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <ShieldAlert size={28} />
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
              Stage 3: Logout Verification
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
              Please re-enter your account handle (<strong>{accountName}</strong>) and 4-digit security PIN to complete logout.
            </p>
          </div>

          {errorMsg && (
            <div style={{ padding: '12px 16px', background: '#fef2f2', border: '1px solid #fca5a5', color: '#b91c1c', borderRadius: '12px', marginBottom: '16px', fontSize: '0.85rem' }}>
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div style={{ padding: '12px 16px', background: '#f0fdf4', border: '1px solid #86efac', color: '#15803d', borderRadius: '12px', marginBottom: '16px', fontSize: '0.85rem' }}>
              {successMsg}
            </div>
          )}

          <form onSubmit={handleVerifySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#334155', marginBottom: '6px' }}>
                Re-enter Account Name
              </label>
              <input 
                type="text"
                value={verifyName}
                onChange={(e) => setVerifyName(e.target.value)}
                placeholder={`Confirm account name (${accountName})`}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '12px',
                  border: '1.5px solid #cbd5e1',
                  background: '#f8fafc',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#334155', marginBottom: '6px', textAlign: 'center' }}>
                4-Digit Security PIN
              </label>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                {verifyPin.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`pin-input-${idx}`}
                    type="password"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handlePinChange(idx, e.target.value)}
                    style={{
                      width: '54px',
                      height: '56px',
                      textAlign: 'center',
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      borderRadius: '12px',
                      border: '1.5px solid #cbd5e1',
                      background: '#ffffff'
                    }}
                    required
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                border: 'none',
                background: '#dc2626',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)'
              }}
            >
              <LogOut size={18} />
              <span>{isLoading ? 'Verifying...' : 'Verify & Complete Logout'}</span>
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
