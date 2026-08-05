import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import { LocalProduct } from '../db';
import { ProductCard } from '../components/ProductCard';
import { ArtisanCard, Artisan } from '../components/ArtisanCard';
import { Footer } from '../components/Footer';

const mockArtisans: Artisan[] = [
  {
    id: 'artisan-1',
    name: 'Ananya Sharma',
    location: 'Rajasthan',
    craft: 'Terracotta Pottery',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=faces',
    rating: 4.9,
    productCount: 24
  },
  {
    id: 'artisan-2',
    name: 'Lalitha Devi',
    location: 'Andhra Pradesh',
    craft: 'Handwoven Baskets',
    photo: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=300&fit=crop&crop=faces',
    rating: 4.8,
    productCount: 32
  },
  {
    id: 'artisan-3',
    name: 'Ramesh Kumar',
    location: 'Madhya Pradesh',
    craft: 'Carved Woodwork',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop&crop=faces',
    rating: 4.7,
    productCount: 18
  },
  {
    id: 'artisan-4',
    name: 'Meena Bai',
    location: 'Assam',
    craft: 'Bamboo Weaving',
    photo: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=300&h=300&fit=crop&crop=faces',
    rating: 4.9,
    productCount: 29
  }
];

const heroSlides = [
  'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1000&h=600&fit=crop',
  'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=1000&h=600&fit=crop',
  'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=1000&h=600&fit=crop'
];

export const Home: React.FC = () => {
  const [products, setProducts] = useState<LocalProduct[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-copy">
            <h2>Bringing Rural<br/>Craftsmanship to<br/>Every Home.</h2>
            <p>Discover unique handmade products crafted with love by rural artisans — delivered straight to your door.</p>
            <div className="hero-actions">
              <Link to="/shop" className="btn btn-primary">Shop Now</Link>
              <Link to="/artisans" className="btn btn-outline">Meet Artisans</Link>
            </div>
          </div>
          <div className="hero-img-wrap">
            <img 
              src={heroSlides[currentSlide]} 
              alt="Rural craftsmanship showcase" 
              style={{ transition: 'opacity 0.5s ease' }}
            />
            <button 
              className="hero-nav-btn prev" 
              aria-label="Previous slide"
              onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            >
              ‹
            </button>
            <button 
              className="hero-nav-btn next" 
              aria-label="Next slide"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
            >
              ›
            </button>
            <div className="hero-dots">
              {heroSlides.map((_, idx) => (
                <span 
                  key={idx} 
                  className={currentSlide === idx ? 'active' : ''}
                  onClick={() => setCurrentSlide(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="trust-strip">
        <div className="container">
          <div className="trust-item"><span className="ic">🤝</span> Handmade with Love</div>
          <div className="trust-item"><span className="ic">🧑‍🤝‍🧑</span> Support Local Artisans</div>
          <div className="trust-item"><span className="ic">🍃</span> Eco-friendly Products</div>
          <div className="trust-item"><span className="ic">✅</span> Secure Payment</div>
          <div className="trust-item"><span className="ic">🔁</span> Easy Returns</div>
        </div>
      </section>

      {/* Value Proposition Cards */}
      <section className="section" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div className="section-head">
            <h2>Why shoppers choose RuralRoots</h2>
          </div>
          <div className="product-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
            <div className="product-card" style={{ padding: '18px' }}>
              <div className="info">
                <h4>Craft with story</h4>
                <div className="price" style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
                  Every product is tied to a real artisan family and a meaningful origin story.
                </div>
              </div>
            </div>
            <div className="product-card" style={{ padding: '18px' }}>
              <div className="info">
                <h4>Better than mass-market</h4>
                <div className="price" style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
                  Hand-finished details, natural materials, and thoughtful gifting makes every order feel premium.
                </div>
              </div>
            </div>
            <div className="product-card" style={{ padding: '18px' }}>
              <div className="info">
                <h4>Trust-first checkout</h4>
                <div className="price" style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
                  Clear order summary, transparent hub shipping, and a smoother purchase journey for shoppers.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Shop by Categories</h2>
            <Link to="/shop" className="view-all">View All →</Link>
          </div>
          <div className="cat-scroll">
            <Link className="cat-card" to="/shop?cat=baskets">
              <img src="https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=300&h=300&fit=crop" alt="Handwoven Baskets" />
              <div className="label">Handwoven Baskets</div>
            </Link>
            <Link className="cat-card" to="/shop?cat=pottery">
              <img src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=300&h=300&fit=crop" alt="Pottery" />
              <div className="label">Pottery</div>
            </Link>
            <Link className="cat-card" to="/shop?cat=wood">
              <img src="https://images.unsplash.com/photo-1611486212557-88be5ff6f941?w=300&h=300&fit=crop" alt="Wooden Crafts" />
              <div className="label">Wooden Crafts</div>
            </Link>
            <Link className="cat-card" to="/shop?cat=bamboo">
              <img src="https://images.unsplash.com/photo-1596496181848-3091d4878b24?w=300&h=300&fit=crop" alt="Bamboo Products" />
              <div className="label">Bamboo Products</div>
            </Link>
            <Link className="cat-card" to="/shop?cat=jewelry">
              <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop" alt="Handmade Jewelry" />
              <div className="label">Handmade Jewelry</div>
            </Link>
            <Link className="cat-card" to="/shop?cat=decor">
              <img src="https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=300&h=300&fit=crop" alt="Home Decor" />
              <div className="label">Home Decor</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Artisans */}
      <section className="section" style={{ background: 'var(--cream-2)' }}>
        <div className="container">
          <div className="section-head">
            <h2>Featured Artisans</h2>
            <Link to="/artisans" className="view-all">View All →</Link>
          </div>
          <div className="artisan-grid">
            {mockArtisans.map((artisan) => (
              <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Trending Handmade Products</h2>
            <Link to="/shop" className="view-all">View All →</Link>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
