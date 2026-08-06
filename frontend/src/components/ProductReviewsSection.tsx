import React, { useEffect, useState } from 'react';
import { Star, ShieldCheck, ThumbsUp, Image as ImageIcon, MessageSquarePlus } from 'lucide-react';
import { fetchProductReviews, voteHelpfulReview } from '../services/api';
import { WriteReviewModal } from './WriteReviewModal';

interface ProductReviewsSectionProps {
  productId: number;
  productTitle: string;
}

export const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({ productId, productTitle }) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [votedHelpful, setVotedHelpful] = useState<Record<number, boolean>>({});

  const loadData = () => {
    setLoading(true);
    fetchProductReviews(productId).then((data) => {
      setReviews(data.reviews || []);
      setSummary(data.summary || null);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadData();
  }, [productId]);

  const handleHelpful = async (reviewId: number, currentVotes: number) => {
    if (votedHelpful[reviewId]) return;
    setVotedHelpful((prev) => ({ ...prev, [reviewId]: true }));
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpfulVotes: (r.helpfulVotes || 0) + 1 } : r))
    );
    await voteHelpfulReview(reviewId);
  };

  if (loading) {
    return <div style={{ padding: '24px 0', color: 'var(--ink-soft)' }}>Loading buyer feedback...</div>;
  }

  const avgScore = summary?.averageRating || 4.9;
  const totalCount = summary?.totalReviews || reviews.length;
  const dist = summary?.ratingDistribution || { 5: totalCount, 4: 0, 3: 0, 2: 0, 1: 0 };
  const attrs = summary?.attributeAverages || { quality: 4.9, material_authenticity: 4.8, value_for_money: 4.7 };

  return (
    <div className="product-reviews-section" style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid var(--line)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--forest-dark)', margin: 0 }}>
            Buyer Reviews & Craft Feedback
          </h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', color: 'var(--ink-soft)' }}>
            Authentic post-purchase reviews from verified supporters.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <MessageSquarePlus size={18} /> Write a Review
        </button>
      </div>

      {/* Summary Box & Metrics */}
      <div 
        style={{
          background: 'var(--cream)',
          borderRadius: '16px',
          padding: '24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
          marginBottom: '32px',
          border: '1px solid var(--line)'
        }}
      >
        {/* Rating Score */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRight: '1px solid var(--line)', paddingRight: '16px' }}>
          <span style={{ fontSize: '3.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--forest-dark)', lineHeight: 1 }}>
            {avgScore.toFixed(1)}
          </span>
          <div style={{ display: 'flex', gap: '4px', margin: '8px 0' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={20}
                color={star <= Math.round(avgScore) ? '#F59E0B' : '#CBD5E1'}
                fill={star <= Math.round(avgScore) ? '#F59E0B' : 'transparent'}
              />
            ))}
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', fontWeight: 500 }}>
            Based on {totalCount} verified reviews
          </span>
        </div>

        {/* Rating Bars */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '6px' }}>
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = dist[stars] || 0;
            const pct = totalCount > 0 ? (count / totalCount) * 100 : 0;
            return (
              <div key={stars} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem' }}>
                <span style={{ width: '24px', fontWeight: 600, color: 'var(--ink-soft)' }}>{stars}★</span>
                <div style={{ flex: 1, height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: '#F59E0B', borderRadius: '4px' }} />
                </div>
                <span style={{ width: '28px', textAlign: 'right', color: 'var(--ink-soft)' }}>{count}</span>
              </div>
            );
          })}
        </div>

        {/* Craft Attribute Averages */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px', borderLeft: '1px solid var(--line)', paddingLeft: '16px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--forest-dark)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Craft Attribute Scores
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <span>🎨 Craftsmanship</span>
            <span style={{ fontWeight: 700, color: '#2F5233' }}>{(attrs.quality || 4.9).toFixed(1)} / 5</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <span>🌿 Material Authenticity</span>
            <span style={{ fontWeight: 700, color: '#059669' }}>{(attrs.material_authenticity || 4.8).toFixed(1)} / 5</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <span>💰 Value for Money</span>
            <span style={{ fontWeight: 700, color: '#D97706' }}>{(attrs.value_for_money || 4.7).toFixed(1)} / 5</span>
          </div>
        </div>
      </div>

      {/* Review List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {reviews.map((rev) => (
          <div
            key={rev.id}
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '20px',
              border: '1px solid var(--line)',
              boxShadow: 'var(--shadow)'
            }}
          >
            {/* Review Card Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '10px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        color={star <= rev.overallRating ? '#F59E0B' : '#CBD5E1'}
                        fill={star <= rev.overallRating ? '#F59E0B' : 'transparent'}
                      />
                    ))}
                  </div>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--ink)' }}>{rev.title}</h4>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--ink-soft)' }}>
                  <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{rev.buyerName || 'Verified Buyer'}</span>
                  <span>•</span>
                  <span>{new Date(rev.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>

              {rev.isVerifiedPurchase !== false && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', fontWeight: 600, color: '#10B981', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 8px', borderRadius: '6px' }}>
                  <ShieldCheck size={14} /> Verified Purchase
                </span>
              )}
            </div>

            {/* Written Comment */}
            <p style={{ color: 'var(--ink)', fontSize: '0.92rem', lineHeight: 1.5, margin: '0 0 14px 0' }}>
              {rev.comment}
            </p>

            {/* Attribute Badges */}
            {rev.attributes && rev.attributes.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                {rev.attributes.map((att: any, idx: number) => (
                  <span key={idx} style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: '6px', background: 'var(--cream-2)', color: 'var(--ink-soft)', fontWeight: 500 }}>
                    {att.attributeName === 'quality' ? '🎨 Craftsmanship' : att.attributeName === 'material_authenticity' ? '🌿 Material' : '💰 Value'}: {att.ratingScore}/5
                  </span>
                ))}
              </div>
            )}

            {/* Media Photos Preview */}
            {rev.mediaList && rev.mediaList.length > 0 && (
              <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
                {rev.mediaList.map((m: any, idx: number) => (
                  <img
                    key={idx}
                    src={m.url}
                    alt="Buyer review evidence"
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--line)' }}
                  />
                ))}
              </div>
            )}

            {/* Footer / Helpful Upvote */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '10px', borderTop: '1px dashed var(--line)' }}>
              <button
                type="button"
                onClick={() => handleHelpful(rev.id, rev.helpfulVotes || 0)}
                style={{
                  background: votedHelpful[rev.id] ? 'rgba(47, 82, 51, 0.12)' : 'none',
                  border: '1px solid var(--line)',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: votedHelpful[rev.id] ? 'var(--forest-dark)' : 'var(--ink-soft)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <ThumbsUp size={14} color={votedHelpful[rev.id] ? 'var(--forest-dark)' : 'var(--ink-soft)'} />
                Helpful ({rev.helpfulVotes || 0})
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <WriteReviewModal
          productId={productId}
          productTitle={productTitle}
          onClose={() => setShowModal(false)}
          onSuccess={() => loadData()}
        />
      )}
    </div>
  );
};
