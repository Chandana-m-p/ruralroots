import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { VoiceSearch } from './VoiceSearch';
import { Heart, ShoppingBag, User, LogOut, ChevronDown, Layers, ArrowRight } from 'lucide-react';
import { SignOutModal } from './SignOutModal';

const CATEGORIES_LIST = [
  { id: 'pottery', name: 'Pottery & Terracotta', icon: '🏺', desc: 'Handpainted Vases, Bowls & Clayware' },
  { id: 'baskets', name: 'Handwoven Baskets', icon: '🧺', desc: 'Natural Sabai Grass & Jute Fibers' },
  { id: 'wood', name: 'Wooden Crafts', icon: '🪵', desc: 'Carved Sheesham & Teak Wood' },
  { id: 'bamboo', name: 'Bamboo Products', icon: '🎋', desc: 'Handcrafted Trays, Baskets & Decor' },
  { id: 'jewelry', name: 'Handmade Jewelry', icon: '💍', desc: 'Recycled Glass & Beaded Tribal Art' },
  { id: 'decor', name: 'Home Decor & Textiles', icon: '🧵', desc: 'Indigo Block-Printed Cushion Covers' }
];

export const Navbar: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const { items } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const totalCartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  // Keep search bar in sync with URL parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const s = params.get('search') || '';
    setSearchQuery(s);
  }, [location.search]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleVoiceSearchResult = (text: string) => {
    setSearchQuery(text);
    navigate(`/shop?search=${encodeURIComponent(text)}`);
  };

  const handleCategorySelect = (catId: string) => {
    setShowCategoryDropdown(false);
    navigate(`/shop?cat=${catId}`);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Topbar */}
      <header className="topbar">
        <div className="container" style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" className="logo">
            <div className="logo-mark">🌱</div>
            <div className="logo-text">
              <h1>RuralRoots</h1>
              <span>Support Local, Buy Handmade</span>
            </div>
          </Link>

          {/* Search Bar with Voice Input Integration */}
          <form className="search-bar" onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center' }}>
            <input 
              type="text" 
              placeholder="Search handmade products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search"
            />
            <div style={{ paddingRight: '4px', display: 'flex', alignItems: 'center' }}>
              <VoiceSearch onResult={handleVoiceSearchResult} />
            </div>
            <button type="submit" aria-label="Search">🔍</button>
          </form>

          {/* Topbar Actions */}
          <div className="topbar-actions">
            {/* Language Dropdown Selector */}
            <div className="lang-select-wrapper" style={{ position: 'relative' }}>
              <select 
                className="lang-select" 
                value={lang} 
                onChange={(e) => setLang(e.target.value as any)}
                style={{ background: 'transparent', border: '1px solid var(--line)', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer' }}
              >
                <option value="en">English ▾</option>
                <option value="hi">हिन्दी (Hindi) ▾</option>
                <option value="mr">मराठी (Marathi) ▾</option>
                <option value="gu">ગુજરાતી (Gujarati) ▾</option>
              </select>
            </div>

            {/* Wishlist Link */}
            <Link to="/wishlist" className="icon-btn" aria-label="Wishlist">
              ♡
              {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
            </Link>

            {/* Cart Link */}
            <Link to="/cart" className="icon-btn" aria-label="Cart">
              🛒
              <span className="badge" data-cart-count>{totalCartCount}</span>
            </Link>

            {/* User Login/Profile */}
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Link to="/profile" className="user-chip" title="View My Account Profile">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=faces" alt={user.fullName} />
                  <span>Hi, {user.fullName.split(' ')[0]}</span>
                </Link>
                <button onClick={() => setShowSignOutModal(true)} className="icon-btn" title="Sign Out" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="user-chip">
                <User size={18} />
                <span>Hi, Guest</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Nav */}
      <nav className="navbar">
        <div className="container">
          {/* Interactive Category Dropdown Trigger */}
          <div 
            ref={dropdownRef}
            style={{ position: 'relative' }}
          >
            <button 
              className="cat-dropdown"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: showCategoryDropdown ? 'var(--forest)' : 'var(--cream)',
                color: showCategoryDropdown ? 'var(--white)' : 'var(--ink)',
                border: '1.5px solid var(--line)',
                borderRadius: '8px',
                padding: '9px 16px',
                fontWeight: 600,
                fontSize: '0.92rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Layers size={16} />
              <span>Categories</span>
              <ChevronDown size={16} style={{ transform: showCategoryDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
            </button>

            {/* Category Dropdown Menu */}
            {showCategoryDropdown && (
              <div 
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: 0,
                  width: '320px',
                  background: 'var(--white)',
                  borderRadius: '12px',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--line)',
                  padding: '8px',
                  zIndex: 999,
                  animation: 'fadeIn 0.2s ease-out'
                }}
              >
                <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--line)', marginBottom: '4px' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Browse Artisanal Categories
                  </div>
                </div>

                {CATEGORIES_LIST.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 12px',
                      border: 'none',
                      background: 'transparent',
                      borderRadius: '8px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--cream)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <span style={{ fontSize: '1.4rem' }}>{cat.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--ink)' }}>{cat.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>{cat.desc}</div>
                    </div>
                  </button>
                ))}

                <div style={{ borderTop: '1px solid var(--line)', marginTop: '4px', paddingTop: '4px' }}>
                  <button
                    onClick={() => {
                      setShowCategoryDropdown(false);
                      navigate('/shop');
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      border: 'none',
                      background: 'var(--cream-2)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      color: 'var(--forest)'
                    }}
                  >
                    <span>View All Products</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <ul className="nav-links">
            <li><Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
            <li><Link to="/shop" className={isActive('/shop') ? 'active' : ''}>Shop</Link></li>
            <li><Link to="/artisans" className={isActive('/artisans') ? 'active' : ''}>Artisans</Link></li>
            <li><Link to="/track-order" className={isActive('/track-order') ? 'active' : ''}>Track Order</Link></li>
            {user && <li><Link to="/profile" className={isActive('/profile') ? 'active' : ''}>My Profile</Link></li>}
            <li><Link to="/our-story" className={isActive('/our-story') ? 'active' : ''}>{t('ourStory')}</Link></li>
            <li><Link to="/blog" className={isActive('/blog') ? 'active' : ''}>{t('blog')}</Link></li>
            <li><Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link></li>
          </ul>
        </div>
      </nav>

      {/* SIGN OUT CONFIRMATION MODAL */}
      <SignOutModal
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        onConfirmSignOut={() => {
          setShowSignOutModal(false);
          logout();
          navigate('/');
        }}
      />
    </>
  );
};
