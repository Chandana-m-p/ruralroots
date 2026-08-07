import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import { LocalProduct } from '../db';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Footer } from '../components/Footer';
import { Star, MessageSquare, ThumbsUp, CheckCircle, User, Send } from 'lucide-react';

interface Review {
  id: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  helpfulCount: number;
  isVerifiedBuyer: boolean;
}

const DEFAULT_REVIEWS: Review[] = [
  {
    id: 1,
    userName: 'Meera Deshmukh',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=faces',
    rating: 5,
    date: '3 Aug 2026',
    title: 'Exquisite authentic craftsmanship!',
    comment: 'The terracotta finish is smooth and earthy. Delivered safely to our local Village Hub within 3 days. Truly supporting authentic rural artisans!',
    helpfulCount: 14,
    isVerifiedBuyer: true
  },
  {
    id: 2,
    userName: 'Rajesh Sharma',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces',
    rating: 5,
    date: '28 Jul 2026',
    title: 'High quality & sturdy packaging',
    comment: 'Beautiful colors and natural mineral paint. Loved the COD pickup experience at Ramgarh Kalyan Kendra. Highly recommend to everyone!',
    helpfulCount: 8,
    isVerifiedBuyer: true
  },
  {
    id: 3,
    userName: 'Kavita Patel',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces',
    rating: 4,
    date: '15 Jul 2026',
    title: 'Great handmade product',
    comment: 'Slight natural color variation which proves it is genuinely hand-painted. Loved the artisan story attached with the product!',
    helpfulCount: 5,
    isVerifiedBuyer: true
  }
];

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getLocalizedTitle } = useLanguage();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const [product, setProduct] = useState<LocalProduct | null>(null);
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>('');

  // Reviews State
  const [reviewsList, setReviewsList] = useState<Review[]>(DEFAULT_REVIEWS);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    fetchProducts().then((list) => {
      const found = list.find((p) => String(p.id) === String(id));
      if (found) {
        setProduct(found);
        setSelectedImage(found.thumbnailUrl);
      } else if (list.length > 0) {
        setProduct(list[0]);
        setSelectedImage(list[0].thumbnailUrl);
      }
    });
  }, [id]);

  if (!product) {
    return <div className="container" style={{ padding: '40px 0' }}>Loading product details...</div>;
  }

  const title = getLocalizedTitle(product.titleI18n);
  const desc = getLocalizedTitle(product.descriptionI18n);
  const isFav = isInWishlist(product.id);

  // Compute average rating
  const avgRating = (reviewsList.reduce((acc, r) => acc + r.rating, 0) / reviewsList.length).toFixed(1);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;

    const newRev: Review = {
      id: Date.now(),
      userName: reviewerName.trim(),
      rating: reviewRating,
      date: 'Just now',
      title: reviewTitle.trim() || 'Wonderful craft',
      comment: reviewComment.trim(),
      helpfulCount: 0,
      isVerifiedBuyer: true
    };

    setReviewsList([newRev, ...reviewsList]);
    setReviewerName('');
    setReviewTitle('');
    setReviewComment('');
    setReviewRating(5);
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  return (
    <div>
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="sep">›</span>
          <Link to="/shop">Shop</Link>
          <span className="sep">›</span>
          <span className="current">{title}</span>
        </div>

        {/* Product Detail Layout */}
        <div className="product-detail">
          {/* Thumbnail Column */}
          <div className="thumb-col">
            <img 
              src={product.thumbnailUrl} 
              alt={title} 
              className={selectedImage === product.thumbnailUrl ? 'active' : ''}
              onClick={() => setSelectedImage(product.thumbnailUrl)}
            />
            <img 
              src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=300&h=300&fit=crop" 
              alt="Alternate view" 
              className={selectedImage.includes('1610701596007') ? 'active' : ''}
              onClick={() => setSelectedImage('https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&h=800&fit=crop')}
            />
          </div>

          {/* Main Image */}
          <div className="main-image">
            <img src={selectedImage || product.thumbnailUrl} alt={title} data-main-image />
          </div>

          {/* Product Info */}
          <div className="pd-info">
            <h1>{title}</h1>
            <div className="by">
              Crafted by <Link to="/artisans">Ananya Sharma (Master Artisan)</Link>
            </div>
            
            <div className="pd-rating" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', color: '#F59E0B' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={18} fill={star <= Math.round(Number(avgRating)) ? '#F59E0B' : 'none'} color="#F59E0B" />
                ))}
              </div>
              <span style={{ color: 'var(--ink)', fontWeight: 700 }}>{avgRating} rating</span>
              <span style={{ color: 'var(--ink-soft)' }}>({reviewsList.length} customer reviews)</span>
            </div>

            <div className="pd-price">
              ₹{Number(product.basePrice).toLocaleString('en-IN')}
              <small>Inclusive of all taxes & direct fair-share artisan income</small>
            </div>

            <p className="pd-desc">{desc}</p>

            {/* Quantity */}
            <div className="qty-row">
              <label>Quantity:</label>
              <div className="qty-control">
                <button onClick={() => setQty(Math.max(1, qty - 1))} data-qty-minus>-</button>
                <span data-qty-value>{qty}</span>
                <button onClick={() => setQty(qty + 1)} data-qty-plus>+</button>
              </div>
            </div>

            {/* Actions */}
            <div className="pd-actions">
              <button 
                className="btn btn-primary"
                data-add-to-cart
                onClick={() => {
                  for (let i = 0; i < qty; i++) addToCart(product);
                }}
              >
                Add to Cart
              </button>

              <button 
                className={`btn-icon ${isFav ? 'active' : ''}`}
                data-wishlist
                onClick={() => toggleWishlist(product)}
                title="Wishlist"
                aria-label="Wishlist"
              >
                {isFav ? '♥' : '♡'}
              </button>
            </div>

            <button 
              className="btn btn-clay btn-block pd-buy"
              onClick={() => {
                addToCart(product);
                navigate('/checkout');
              }}
            >
              Buy Now (Village Hub COD)
            </button>

            <div className="badge-row">
              <span>🤝 Handmade</span>
              <span>🍃 Natural Materials</span>
              <span>🏬 Village Hub COD</span>
              <span>✅ Quality Checked</span>
            </div>
          </div>
        </div>

        {/* Artisan Panel */}
        <div className="artisan-panel">
          <h3>Meet the Artisan</h3>
          <div className="artisan-head">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces" alt="Ananya Sharma" />
            <div>
              <h4>Ananya Sharma</h4>
              <div className="loc">📍 Jaipur, Rajasthan · Terracotta & Pottery Master</div>
            </div>
          </div>
          <p>
            Ananya has been practicing traditional terracotta pottery for over 18 years. She leads a self-help cluster of 20 rural artisan families, reviving age-old pottery techniques while utilizing eco-friendly natural pigments.
          </p>
          <div className="stat-row">
            <div className="stat"><b>18+ Yrs</b> Experience</div>
            <div className="stat"><b>2,400+</b> Pieces Crafted</div>
            <div className="stat"><b>20</b> Families Empowered</div>
          </div>
        </div>

        {/* Story & Specifications Panel */}
        <div className="story-panel" style={{ marginBottom: '30px' }}>
          <h3>Craft Story & Product Care</h3>
          <p>
            Each piece is individually shaped on a manual potter's wheel and sun-dried before being kiln-fired with organic husk. Hand-painted using natural minerals, slight variations in color and texture are a testament to authentic artisanal craftsmanship.
          </p>
          <div className="spec-row">
            <div className="spec"><b>Material</b> 100% Natural Terracotta Clay</div>
            <div className="spec"><b>Dimensions</b> 10" H x 6" W</div>
            <div className="spec"><b>Origin</b> Jaipur, Rajasthan</div>
            <div className="spec"><b>Care</b> Clean with dry soft cloth</div>
          </div>
        </div>

        {/* CUSTOMER REVIEWS & RATINGS SECTION */}
        <div style={{
          background: 'var(--white)',
          borderRadius: '16px',
          padding: '32px',
          border: '1px solid var(--line)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '60px'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--forest)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MessageSquare size={24} /> Customer Reviews & Ratings
          </h3>

          {/* RATING OVERVIEW BAR */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            background: 'var(--cream)',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid var(--line)',
            marginBottom: '32px'
          }}>
            <div style={{ textAlign: 'center', borderRight: '1px solid var(--line)', paddingRight: '20px' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--forest)', lineHeight: 1 }}>{avgRating}</div>
              <div style={{ display: 'flex', justifyContent: 'center', color: '#F59E0B', margin: '8px 0' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={20} fill={star <= Math.round(Number(avgRating)) ? '#F59E0B' : 'none'} color="#F59E0B" />
                ))}
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--ink-soft)', fontWeight: 600 }}>
                Based on {reviewsList.length} customer reviews
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = reviewsList.filter((r) => r.rating === stars).length;
                const pct = Math.round((count / reviewsList.length) * 100) || 0;
                return (
                  <div key={stars} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                    <span style={{ width: '40px', fontWeight: 600, color: 'var(--ink)' }}>{stars} ★</span>
                    <div style={{ flex: 1, height: '8px', background: 'var(--line)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: '#F59E0B', borderRadius: '4px' }} />
                    </div>
                    <span style={{ width: '36px', textAlign: 'right', color: 'var(--ink-soft)' }}>{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* WRITE A REVIEW FORM */}
          <form onSubmit={handleAddReview} style={{
            background: 'var(--cream-2)',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid var(--line)',
            marginBottom: '32px'
          }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--forest)', marginBottom: '16px' }}>
              Write a Product Review
            </h4>

            {reviewSubmitted && (
              <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={18} /> Thank you! Your review has been submitted successfully.
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Harshini S."
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--line)', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                  Overall Rating *
                </label>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', height: '40px' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setReviewRating(s)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}
                    >
                      <Star size={24} fill={s <= reviewRating ? '#F59E0B' : 'none'} color="#F59E0B" />
                    </button>
                  ))}
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', marginLeft: '6px', color: '#F59E0B' }}>
                    {reviewRating} Stars
                  </span>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                Review Title
              </label>
              <input
                type="text"
                placeholder="Summarize your experience (e.g. Stunning terracotta craft!)"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--line)', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                Detailed Feedback *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Share details about quality, packaging, delivery to Village Hub..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--line)', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '10px 24px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
              <Send size={16} /> Submit Customer Review
            </button>
          </form>

          {/* REVIEWS LIST */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {reviewsList.map((rev) => (
              <div key={rev.id} style={{
                background: 'var(--cream)',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid var(--line)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {rev.userAvatar ? (
                      <img src={rev.userAvatar} alt={rev.userName} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--forest)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                        {rev.userName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {rev.userName}
                        {rev.isVerifiedBuyer && (
                          <span style={{ fontSize: '0.72rem', background: '#D1FAE5', color: '#065F46', padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>
                            ✓ Verified Buyer
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--ink-soft)' }}>{rev.date}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', color: '#F59E0B' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={16} fill={star <= rev.rating ? '#F59E0B' : 'none'} color="#F59E0B" />
                    ))}
                  </div>
                </div>

                <div style={{ fontWeight: 700, color: 'var(--forest)', marginBottom: '4px' }}>
                  {rev.title}
                </div>

                <p style={{ color: 'var(--ink)', fontSize: '0.92rem', lineHeight: 1.5, margin: 0 }}>
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};
