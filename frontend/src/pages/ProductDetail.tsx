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
  const { getLocalizedTitle, getLocalizedDesc, t } = useLanguage();
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
  const desc = getLocalizedDesc(product.descriptionI18n);
  const isFav = isInWishlist(product.id);

  return (
    <div>
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">{t('home')}</Link>
          <span className="sep">›</span>
          <Link to="/shop">{t('shop')}</Link>
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
          </div>

          {/* Main Image */}
          <div className="main-image">
            <img src={selectedImage || product.thumbnailUrl} alt={title} data-main-image />
          </div>

          {/* Product Info */}
          <div className="pd-info">
            <h1>{title}</h1>
            <div className="by">
              Crafted by <Link to="/artisans">{product.artisanName || 'Master Artisan'} ({product.artisanRegion || 'Rural Village Cluster'})</Link>
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
            <img src={product.thumbnailUrl} alt={product.artisanName || 'Artisan'} style={{ borderRadius: '50%', width: '64px', height: '64px', objectFit: 'cover' }} />
            <div>
              <h4>{product.artisanName || 'Master Artisan'}</h4>
              <div className="loc">📍 {product.artisanRegion || 'Rural Village Cluster'}</div>
            </div>
          </div>
          <p>
            {product.artisanName || 'This master artisan'} has been practicing authentic traditional handcrafting for over 15 years. They lead a self-help cluster of rural artisan families, preserving age-old heritage techniques while using eco-friendly natural materials.
          </p>
          <div className="stat-row">
            <div className="stat"><b>15+ Yrs</b> Experience</div>
            <div className="stat"><b>1,800+</b> Pieces Crafted</div>
            <div className="stat"><b>15</b> Families Empowered</div>
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
