import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useLanguage } from '../context/LanguageContext';
import { VoiceSearch } from './VoiceSearch';
import { ImageSearch } from './ImageSearch';
import { SignOutModal } from './SignOutModal';
import {
  ShoppingBag,
  Heart,
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  Search,
  Mic,
  LogOut,
  SlidersHorizontal,
  Package,
  Layers,
  ArrowRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { totalCartCount } = useCart();
  const { wishlist } = useWishlist();
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target as Node)) {
        setShowCategoryDropdown(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleVoiceSearchResult = (text: string) => {
    setSearchQuery(text);
    navigate(`/shop?search=${encodeURIComponent(text)}`);
  };

  const handleImageSearchResult = (keyword: string) => {
    setSearchQuery(keyword);
    navigate(`/shop?search=${encodeURIComponent(keyword)}`);
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

          {/* Search Bar with Voice Input & Camera Visual Search */}
          <form className="search-bar" onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search handmade products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search"
            />
            <div style={{ paddingRight: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}>
              <VoiceSearch onResult={handleVoiceSearchResult} />
              <ImageSearch onResult={handleImageSearchResult} />
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
                <option value="kn">ಕನ್ನಡ (Kannada) ▾</option>
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

            {/* User Auth Profile Dropdown */}
            {user ? (
              <div ref={userDropdownRef} style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'var(--cream-2)',
                    border: '1px solid var(--line)',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--forest)'
                  }}
                >
                  <UserIcon size={16} />
                  <span>{user.fullName || 'Member'}</span>
                  <ChevronDown size={14} />
                </button>

                {showUserDropdown && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '110%',
                      background: 'var(--white)',
                      boxShadow: 'var(--shadow-lg)',
                      borderRadius: 'var(--radius)',
                      width: '200px',
                      zIndex: 1000,
                      padding: '8px 0',
                      border: '1px solid var(--line)'
                    }}
                  >
                    <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--line)', fontSize: '0.8rem', color: 'var(--ink-soft)' }}>
                      Signed in as<br /><strong>{user.phoneNumber}</strong>
                    </div>
                    <Link
                      to="/admin"
                      onClick={() => setShowUserDropdown(false)}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', color: 'var(--ink)', textDecoration: 'none', fontSize: '0.88rem' }}
                    >
                      <Layers size={16} /> {t('adminPortal')}
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setShowUserDropdown(false);
                        setShowSignOutModal(true);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        width: '100%',
                        textAlign: 'left',
                        padding: '10px 16px',
                        background: 'none',
                        border: 'none',
                        color: '#dc2626',
                        cursor: 'pointer',
                        fontSize: '0.88rem',
                        borderTop: '1px solid var(--line)'
                      }}
                    >
                      <LogOut size={16} /> {t('logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--forest)',
                  color: 'var(--white)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}
              >
                <UserIcon size={15} /> {t('hiGuest')}
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Navigation Bar */}
      <nav className="navbar">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Artisanal Categories Dropdown */}
          <div ref={categoryDropdownRef} style={{ position: 'relative' }}>
            <button
              type="button"
              className="cat-dropdown-trigger"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--cream-2)',
                border: '1px solid var(--line)',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                color: 'var(--forest)',
                fontSize: '0.9rem'
              }}
            >
              <SlidersHorizontal size={16} />
              <span>{t('categories')}</span>
              <ChevronDown size={14} style={{ transform: showCategoryDropdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            {showCategoryDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: '110%',
                  left: 0,
                  width: '260px',
                  background: 'var(--white)',
                  boxShadow: 'var(--shadow-lg)',
                  borderRadius: 'var(--radius)',
                  zIndex: 999,
                  padding: '8px 0',
                  border: '1px solid var(--line)'
                }}
              >
                <div style={{ padding: '8px 16px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--clay)', textTransform: 'uppercase' }}>
                  {t('browseCategories')}
                </div>
                {[
                  { id: 'clothing', label: 'Clothing & Apparel', icon: '👕' },
                  { id: 'food', label: 'Food & Organic Grocery', icon: '🍲' },
                  { id: 'healthcare', label: 'Healthcare & Wellness', icon: '🩺' },
                  { id: 'electronics', label: 'Electronics & Smart Tech', icon: '⚡' },
                  { id: 'appliances', label: 'Home Appliances & Living', icon: '🏠' },
                  { id: 'baskets', label: 'Handwoven Baskets', icon: '🧺' },
                  { id: 'pottery', label: 'Pottery & Terracotta', icon: '🏺' },
                  { id: 'wood', label: 'Wooden Crafts', icon: '🪵' },
                  { id: 'bamboo', label: 'Bamboo Products', icon: '🎋' },
                  { id: 'jewelry', label: 'Handmade Jewelry', icon: '💍' },
                  { id: 'decor', label: 'Home Decor & Textiles', icon: '🛋️' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.id)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 16px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.88rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: 'var(--ink)'
                    }}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
                <div style={{ borderTop: '1px solid var(--line)', marginTop: '6px', paddingTop: '6px', padding: '0 8px' }}>
                  <button
                    type="button"
                    onClick={() => { setShowCategoryDropdown(false); navigate('/shop'); }}
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
                    <span>{t('viewAllProducts')}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <ul className="nav-links">
            <li><Link to="/" className={isActive('/') ? 'active' : ''}>{t('home')}</Link></li>
            <li><Link to="/shop" className={isActive('/shop') ? 'active' : ''}>{t('shop')}</Link></li>
            <li><Link to="/my-orders" className={isActive('/my-orders') ? 'active' : ''}>{t('myOrders')}</Link></li>
            <li><Link to="/artisans" className={isActive('/artisans') ? 'active' : ''}>{t('artisans')}</Link></li>
            <li><Link to="/about" className={isActive('/about') ? 'active' : ''}>{t('ourStory')}</Link></li>
            <li><Link to="/blog" className={isActive('/blog') ? 'active' : ''}>{t('blog')}</Link></li>
            <li><Link to="/contact" className={isActive('/contact') ? 'active' : ''}>{t('contact')}</Link></li>
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
