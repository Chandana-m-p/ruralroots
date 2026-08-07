import React, { useState, useRef } from 'react';
import { Star, Upload, X, ShieldCheck, Camera, Image as ImageIcon, Trash2, Plus } from 'lucide-react';
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
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const SAMPLE_PHOTOS = [
    'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80',
    'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80',
    'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=800&q=80'
  ];

  const handleFiles = (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (validFiles.length === 0) return;

    const remainingSlots = 5 - uploadedPhotos.length;
    const filesToProcess = validFiles.slice(0, remainingSlots);

    filesToProcess.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setUploadedPhotos(prev => {
            if (prev.length >= 5) return prev;
            return [...prev, e.target!.result as string];
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
      e.target.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const addSamplePhoto = () => {
    if (uploadedPhotos.length >= 5) return;
    const nextSample = SAMPLE_PHOTOS[uploadedPhotos.length % SAMPLE_PHOTOS.length];
    setUploadedPhotos(prev => [...prev, nextSample]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !comment.trim()) return;

    setIsSubmitting(true);
    const mediaList = uploadedPhotos.map(url => ({
      mediaType: 'IMAGE',
      url
    }));

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
          maxWidth: '580px',
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

          {/* Product Photo Upload Section */}
          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', fontWeight: 600, color: 'var(--ink)' }}>
                <Camera size={16} color="var(--forest-dark)" /> Product Photos ({uploadedPhotos.length}/5)
              </label>
              <button
                type="button"
                onClick={addSamplePhoto}
                disabled={uploadedPhotos.length >= 5}
                style={{
                  background: 'none',
                  border: 'none',
                  color: uploadedPhotos.length >= 5 ? '#94A3B8' : 'var(--forest-dark)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: uploadedPhotos.length >= 5 ? 'not-allowed' : 'pointer',
                  textDecoration: 'underline',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Plus size={14} /> Quick Sample Photo
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              multiple
              style={{ display: 'none' }}
            />

            {/* Dropzone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => {
                if (uploadedPhotos.length < 5) {
                  fileInputRef.current?.click();
                }
              }}
              style={{
                border: isDragging ? '2px dashed #2F5233' : '2px dashed var(--line)',
                background: isDragging ? 'rgba(47, 82, 51, 0.06)' : 'var(--cream)',
                borderRadius: '12px',
                padding: '20px 16px',
                textAlign: 'center',
                cursor: uploadedPhotos.length >= 5 ? 'default' : 'pointer',
                transition: 'all 0.2s ease',
                marginBottom: uploadedPhotos.length > 0 ? '12px' : '0'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                <div style={{ background: 'rgba(47, 82, 51, 0.1)', padding: '10px', borderRadius: '50%', color: 'var(--forest-dark)' }}>
                  <Upload size={20} />
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '0.88rem', fontWeight: 600, color: 'var(--ink)' }}>
                {uploadedPhotos.length >= 5
                  ? 'Maximum 5 photos reached'
                  : 'Click or drag & drop product photos here'}
              </p>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.78rem', color: 'var(--ink-soft)' }}>
                Upload photos of the physical item, craft details, or packaging received (PNG, JPG, WEBP)
              </p>
            </div>

            {/* Thumbnail Preview Grid */}
            {uploadedPhotos.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                {uploadedPhotos.map((url, idx) => (
                  <div
                    key={idx}
                    style={{
                      position: 'relative',
                      aspectRatio: '1',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '1.5px solid var(--line)',
                      background: '#F8FAFC'
                    }}
                  >
                    <img
                      src={url}
                      alt={`Product upload ${idx + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removePhoto(idx);
                      }}
                      title="Remove photo"
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        background: 'rgba(0, 0, 0, 0.65)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease'
                      }}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
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

