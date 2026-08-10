import React from 'react';
import { LocalAddress } from '../db';
import { MapPin, Plus, CheckCircle2, Edit2, Trash2, Star } from 'lucide-react';

interface SavedAddressSelectorProps {
  addresses: LocalAddress[];
  selectedAddressId?: number;
  onSelectAddress: (address: LocalAddress) => void;
  onAddNew: () => void;
  onEdit: (address: LocalAddress) => void;
  onDelete: (addressId: number) => void;
  onSetDefault: (addressId: number) => void;
}

export const SavedAddressSelector: React.FC<SavedAddressSelectorProps> = ({
  addresses,
  selectedAddressId,
  onSelectAddress,
  onAddNew,
  onEdit,
  onDelete,
  onSetDefault
}) => {
  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MapPin size={18} className="text-forest" />
          Select Delivery Address ({addresses.length})
        </h4>
        <button
          type="button"
          onClick={onAddNew}
          className="btn btn-secondary"
          style={{ padding: '6px 14px', fontSize: '0.84rem', display: 'flex', alignItems: 'center', gap: '6px', borderRadius: '20px' }}
        >
          <Plus size={15} /> Add New Address
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
        {addresses.map((addr) => {
          const isSelected = selectedAddressId === addr.id;
          return (
            <div
              key={addr.id}
              onClick={() => onSelectAddress(addr)}
              style={{
                border: isSelected ? '2px solid var(--forest)' : '1px solid var(--line)',
                background: isSelected ? 'var(--cream-2)' : 'var(--white)',
                borderRadius: '12px',
                padding: '16px',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? '0 4px 12px rgba(46, 83, 57, 0.08)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      background: 'var(--forest)',
                      color: 'var(--white)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '10px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {addr.label || 'Home'}
                  </span>
                  {addr.isDefault && (
                    <span
                      style={{
                        background: '#fef3c7',
                        color: '#92400e',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}
                    >
                      <Star size={10} /> Default
                    </span>
                  )}
                </div>

                {isSelected && <CheckCircle2 size={20} style={{ color: 'var(--forest)' }} />}
              </div>

              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)', marginBottom: '4px' }}>
                {addr.fullName} <span style={{ fontWeight: 500, color: 'var(--ink-soft)', fontSize: '0.85rem' }}>({addr.phoneNumber})</span>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', lineHeight: 1.4, marginBottom: '12px' }}>
                {addr.addressLine}, {addr.villageOrCity}, {addr.district}, {addr.state} - <strong>{addr.pincode}</strong>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  borderTop: '1px solid var(--line)',
                  paddingTop: '8px',
                  fontSize: '0.78rem'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {!addr.isDefault && (
                  <button
                    type="button"
                    onClick={() => addr.id && onSetDefault(addr.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--forest)', fontWeight: 600, cursor: 'pointer', padding: 0 }}
                  >
                    Set Default
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onEdit(addr)}
                  style={{ background: 'none', border: 'none', color: 'var(--ink-soft)', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: 0 }}
                >
                  <Edit2 size={13} /> Edit
                </button>
                {addresses.length > 1 && (
                  <button
                    type="button"
                    onClick={() => addr.id && onDelete(addr.id)}
                    style={{ background: 'none', border: 'none', color: '#dc2626', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: 0 }}
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
