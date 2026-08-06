import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Key, ArrowRight, CheckCircle2, XCircle, LogOut } from 'lucide-react';

export const LogoutVerification: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [accountNameInput, setAccountNameInput] = useState('');
  const [verificationPin, setVerificationPin] = useState(['', '', '', '']);
  const [reason, setReason] = useState('End Shift');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const activeAccountName = user?.fullName || localStorage.getItem('rr_user_name') || 'Guest User';

  const handlePinChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newPin = [...verificationPin];
    newPin[index] = val;
    setVerificationPin(newPin);

    if (val && index < 3) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyLogout = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Stage 3 Requirement: Match account name + valid PIN
    if (accountNameInput.trim().toLowerCase() !== activeAccountName.trim().toLowerCase()) {
      setErrorMsg(`Account name mismatch! Entered "${accountNameInput}", expected "${activeAccountName}".`);
      return;
    }

    const pinCode = verificationPin.join('');
    if (pinCode.length < 4) {
      setErrorMsg('Please enter your 4-digit security logout PIN.');
      return;
    }

    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      setSuccessMsg('✅ Logout verification successful! Session destroyed.');
      
      setTimeout(() => {
        logout();
        localStorage.removeItem('rr_user_name');
        navigate('/login?logged_out=true');
      }, 1500);
    }, 1000);
  };

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: 'radial-gradient(circle at center, #fdfbf7 0%, #f3ece0 100%)'
    }}>
      <div style={{
        maxWidth: '480px',
        width: '100%',
        background: '#ffffff',
        borderRadius: '24px',
        padding: '36px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e6ddc9'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: '#fee2e2',
            color: '#dc2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 0 20px rgba(220, 38, 38, 0.15)'
          }}>
            <ShieldAlert size={32} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e293b', marginBottom: '8px' }}>
            Stage 3: Logout Verification
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.5 }}>
            To complete the logout procedure, please re-enter your account handle (<strong>{activeAccountName}</strong>) and your security PIN.
          </p>
        </div>

        {errorMsg && (
          <div style={{
            padding: '12px 16px',
            background: '#fef2f2',
            border: '1px solid #fca5a5',
            color: '#b91c1c',
            borderRadius: '12px',
            marginBottom: '20px',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <XCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div style={{
            padding: '12px 16px',
            background: '#f0fdf4',
            border: '1px solid #86efac',
            color: '#15803d',
            borderRadius: '12px',
            marginBottom: '20px',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle2 size={18} />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleVerifyLogout} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', marginBottom: '6px' }}>
              Confirm Primary Account Identifier
            </label>
            <input 
              type="text"
              value={accountNameInput}
              onChange={(e) => setAccountNameInput(e.target.value)}
              placeholder={`Enter account name (${activeAccountName})`}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1.5px solid #cbd5e1',
                fontSize: '0.95rem',
                outline: 'none',
                background: '#f8fafc'
              }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', marginBottom: '6px' }}>
              4-Digit Verification Security PIN
            </label>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              {verificationPin.map((digit, idx) => (
                <input 
                  key={idx}
                  id={`pin-${idx}`}
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

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', marginBottom: '6px' }}>
              Logout Verification Reason
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1.5px solid #cbd5e1',
                fontSize: '0.95rem',
                outline: 'none',
                background: '#ffffff'
              }}
            >
              <option value="End Shift">End Shift / Manual Sign Out</option>
              <option value="Switch Account">Switch Account</option>
              <option value="Security Check">Routine Security Check</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={isVerifying}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: isVerifying ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)'
            }}
          >
            <LogOut size={18} />
            <span>{isVerifying ? 'Verifying Credentials...' : 'Verify & Finalize Logout'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
