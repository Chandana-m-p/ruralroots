import React, { useState, useEffect } from 'react';
import { LocalAddress } from '../db';
import { X, MapPin, Check } from 'lucide-react';

interface AddressManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (addressData: Omit<LocalAddress, 'id'>, editId?: number) => Promise<void>;
  editAddress?: LocalAddress | null;
}

export const AddressManagerModal: React.FC<AddressManagerModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editAddress
}) => {
  const [label, setLabel] = useState('Home');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [villageOrCity, setVillageOrCity] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editAddress) {
      setLabel(editAddress.label || 'Home');
      setFullName(editAddress.fullName || '');
      setPhoneNumber(editAddress.phoneNumber || '');
      setAddressLine(editAddress.addressLine || '');
      setVillageOrCity(editAddress.villageOrCity || '');
      setDistrict(editAddress.district || '');
      setState(editAddress.state || '');
      setPincode(editAddress.pincode || '');
      setIsDefault(Boolean(editAddress.isDefault));
    } else {
      setLabel('Home');
      setFullName('Ananya Sharma');
      setPhoneNumber('9876543210');
      setAddressLine('');
      setVillageOrCity('Ramgarh');
      setDistrict('Indore');
      setState('Madhya Pradesh');
      setPincode('452001');
      setIsDefault(false);
    }
  }, [editAddress, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNumber || !addressLine || !pincode) return;

    setSubmitting(true);
    try {
      await onSave(
        {
          label,
          fullName,
          phoneNumber,
          addressLine,
          villageOrCity: villageOrCity || 'Ramgarh',
          district: district || 'Indore',
          state: state || 'Madhya Pradesh',
          pincode,
          isDefault
        },
        editAddress?.id
      );
      onClose();
    } catch (err) {
      console.error('Failed to save address:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1100 }}>
      <div className="modal-content" style={{ maxWidth: '540px', padding: '24px', borderRadius: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MapPin className="text-forest" size={22} />
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>
              {editAddress ? 'Edit Address Profile' : 'Add Saved Address'}
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Label selector */}
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--ink-soft)', marginBottom: '6px', display: 'block' }}>Address Label</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['Home', 'Gram Panchayat', 'Farm', 'Work'].map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => setLabel(tag)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    border: '1px solid',
                    borderColor: label === tag ? 'var(--forest)' : 'var(--line)',
                    background: label === tag ? 'var(--cream-2)' : 'var(--white)',
                    color: label === tag ? 'var(--forest)' : 'var(--ink)',
                    fontWeight: label === tag ? 700 : 500,
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--ink-soft)' }}>Full Name *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Receiver Name"
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--line)', marginTop: '4px' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--ink-soft)' }}>Mobile Phone *</label>
              <input
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="10-digit number"
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--line)', marginTop: '4px' }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--ink-soft)' }}>Street Address / Landmark *</label>
            <input
              type="text"
              required
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
              placeholder="House/Plot No, Street, Landmark near Village Center"
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--line)', marginTop: '4px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--ink-soft)' }}>Village / Town</label>
              <input
                type="text"
                value={villageOrCity}
                onChange={(e) => setVillageOrCity(e.target.value)}
                placeholder="e.g. Ramgarh"
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--line)', marginTop: '4px' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--ink-soft)' }}>District</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="e.g. Indore"
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--line)', marginTop: '4px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--ink-soft)' }}>State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="State Name"
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--line)', marginTop: '4px' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--ink-soft)' }}>Pincode *</label>
              <input
                type="text"
                required
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="6-digit Pincode"
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--line)', marginTop: '4px' }}
              />
            </div>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginTop: '6px', fontSize: '0.88rem' }}>
            <input
              type="checkbox"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
            />
            <span>Set as default shipping address</span>
          </label>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{ padding: '10px 18px', borderRadius: '8px', border: '1px solid var(--line)', background: 'none', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary"
              style={{ padding: '10px 22px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Check size={16} />
              {submitting ? 'Saving...' : editAddress ? 'Update Address' : 'Save Address'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
