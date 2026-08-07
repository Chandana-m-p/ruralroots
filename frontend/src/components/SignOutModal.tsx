import React from 'react';
import { LogOut, AlertTriangle, ShieldCheck, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SignOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSignOut: () => void;
}

export const SignOutModal: React.FC<SignOutModalProps> = ({ isOpen, onClose, onConfirmSignOut }) => {
  const { user } = useAuth();

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(4px)',
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }} onClick={onClose}>
      <div style={{
        background: '#FFFFFF',
        maxWidth: '460px',
        width: '100%',
        borderRadius: '20px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
        padding: '32px',
        position: 'relative',
        textAlign: 'center',
        border: '1px solid rgba(0,0,0,0.06)'
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* CLOSE X BUTTON */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'var(--cream)',
            border: 'none',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} color="var(--ink)" />
        </button>

        {/* LOGOUT ICON BADGE */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: '#FEE2E2',
          color: '#DC2626',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          boxShadow: '0 8px 20px rgba(220, 38, 38, 0.15)'
        }}>
          <LogOut size={28} />
        </div>

        {/* TITLE */}
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '10px' }}>
          Are you sure you want to sign out?
        </h3>

        {/* DESCRIPTION */}
        <p style={{ fontSize: '0.92rem', color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: '24px' }}>
          Signing out will end your current session for <strong>{user?.fullName || 'Rural User'}</strong> (+91 {user?.phoneNumber || '9876543210'}). Your pending offline cart and orders will remain safely stored on this device.
        </p>

        {/* SECURITY & DEVICE NOTE */}
        <div style={{
          background: 'var(--cream)',
          padding: '12px',
          borderRadius: '10px',
          fontSize: '0.82rem',
          color: 'var(--forest)',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          marginBottom: '24px'
        }}>
          <ShieldCheck size={16} /> Offline IndexedDB cart items remain saved locally.
        </div>

        {/* ACTION BUTTONS */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={onClose}
            className="btn-secondary"
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '0.95rem',
              fontWeight: 600,
              borderRadius: '10px'
            }}
          >
            Cancel
          </button>

          <button
            onClick={onConfirmSignOut}
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '0.95rem',
              fontWeight: 700,
              color: '#FFFFFF',
              background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(220, 38, 38, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <LogOut size={16} /> Yes, Sign Out
          </button>
        </div>

      </div>
    </div>
  );
};
