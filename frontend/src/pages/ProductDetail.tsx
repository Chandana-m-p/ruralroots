import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import { LocalProduct } from '../db';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Footer } from '../components/Footer';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getLocalizedTitle } = useLanguage();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const [product, setProduct] = useState<LocalProduct | null>(null);
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>('');

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
            
            <div className="pd-rating">
              <span className="stars">★★★★★</span>
              <span style={{ color: 'var(--ink-soft)' }}>(4.9 rating · 48 reviews)</span>
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
        <div className="story-panel">
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
      </div>

      <Footer />
    </div>
  );
};
