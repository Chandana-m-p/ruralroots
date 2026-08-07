import React, { useState } from 'react';
import { Star, Upload, CheckCircle, X, ShieldCheck } from 'lucide-react';
import { submitProductReview } from '../services/api';

interface WriteReviewModalProps {
  productId: number;
  productTitle: string;
  orderId?: number;
  onClose: () => void;
  onSuccess: () => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  productId,
  productTitle,
  orderId = 1,
  onClose,
  onSuccess
}) => {
  const [overallRating, setOverallRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [qualityScore, setQualityScore] = useState<number>(5);
  const [authenticityScore, setAuthenticityScore] = useState<number>(5);
  const [valueScore, setValueScore] = useState<number>(5);
  const [samplePhotoAttached, setSamplePhotoAttached] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !comment.trim()) return;

    setIsSubmitting(true);
    const mediaList = samplePhotoAttached
      ? [{ mediaType: 'IMAGE', url: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80' }]
      : [];

    const attributes = [
      { attributeName: 'quality', ratingScore: qualityScore },
      { attributeName: 'material_authenticity', ratingScore: authenticityScore },
      { attributeName: 'value_for_money', ratingScore: valueScore }
    ];

    await submitProductReview({
      productId,
      orderId,
      overallRating,
      title: title.trim(),
      comment: comment.trim(),
      attributes,
      mediaList
    });

    setIsSubmitting(false);
    onSuccess();
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: '18px',
          maxWidth: '560px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)',
          position: 'relative'
        }}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--cream-2)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--ink-soft)'
          }}
        >
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <ShieldCheck size={20} color="#10B981" />
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Verified Buyer Review
          </span>
        </div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--forest-dark)', margin: '0 0 16px 0' }}>
          Review "{productTitle}"
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Star Rating */}
          <div style={{ marginBottom: '20px', textAlign: 'center', background: 'var(--cream)', padding: '16px', borderRadius: '12px' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '8px' }}>
              Overall Rating
            </label>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
              {[1, 2, 3, 4, 5].map((star) => {
                const isActive = (hoverRating || overallRating) >= star;
                return (
                  <Star
                    key={star}
                    size={32}
                    style={{ cursor: 'pointer', transition: 'transform 0.15s ease' }}
                    color={isActive ? '#F59E0B' : '#CBD5E1'}
                    fill={isActive ? '#F59E0B' : 'transparent'}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setOverallRating(star)}
                  />
                );
              })}
            </div>
          </div>

          {/* Granular Attribute Ratings */}
          <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>🎨 Craftsmanship & Detail</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setQualityScore(val)}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      border: val <= qualityScore ? '1.5px solid #2F5233' : '1px solid var(--line)',
                      background: val <= qualityScore ? 'rgba(47, 82, 51, 0.12)' : 'transparent',
                      color: val <= qualityScore ? '#2F5233' : 'var(--ink-soft)',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>🌿 Material Authenticity</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAuthenticityScore(val)}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      border: val <= authenticityScore ? '1.5px solid #059669' : '1px solid var(--line)',
                      background: val <= authenticityScore ? 'rgba(5, 150, 105, 0.12)' : 'transparent',
                      color: val <= authenticityScore ? '#059669' : 'var(--ink-soft)',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>💰 Value for Money</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setValueScore(val)}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      border: val <= valueScore ? '1.5px solid #D97706' : '1px solid var(--line)',
                      background: val <= valueScore ? 'rgba(217, 119, 6, 0.12)' : 'transparent',
                      color: val <= valueScore ? '#D97706' : 'var(--ink-soft)',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Review Title */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '6px' }}>
              Review Title *
            </label>
            <input
              type="text"
              required
              placeholder="Summarize your experience (e.g. Beautiful handmade quality!)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid var(--line)',
                fontSize: '0.9rem'
              }}
            />
          </div>

          {/* Review Written Text */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '6px' }}>
              Detailed Feedback *
            </label>
            <textarea
              required
              rows={4}
              placeholder="What did you love about the craft, texture, packaging, or artisan story?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid var(--line)',
                fontSize: '0.9rem',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Photo / Media Attachment */}
          <div style={{ marginBottom: '20px' }}>
            <button
              type="button"
              onClick={() => setSamplePhotoAttached(!samplePhotoAttached)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 14px',
                borderRadius: '8px',
                border: samplePhotoAttached ? '1.5px solid var(--forest)' : '1px dashed var(--line)',
                background: samplePhotoAttached ? 'rgba(47, 82, 51, 0.08)' : 'var(--cream)',
                color: samplePhotoAttached ? 'var(--forest-dark)' : 'var(--ink-soft)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                width: '100%',
                justifyContent: 'center'
              }}
            >
              {samplePhotoAttached ? (
                <>
                  <CheckCircle size={18} color="#10B981" /> Photo Attached (Craft Evidence)
                </>
              ) : (
                <>
                  <Upload size={18} /> Attach Photo / Video Evidence
                </>
              )}
            </button>
          </div>

          {/* Submit CTAs */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              className="btn btn-outline"
              style={{ flex: 1 }}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ flex: 2 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Publishing...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
