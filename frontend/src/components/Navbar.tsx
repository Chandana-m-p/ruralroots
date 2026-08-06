import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { VoiceSearch } from './VoiceSearch';
import { Heart, ShoppingBag, User, LogOut, ChevronDown } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const { items } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');

  const totalCartCount = items.reduce((sum, i) => sum + i.quantity, 0);

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
                <Link to={user.role === 'ROLE_HUB_MANAGER' ? '/hub-dashboard' : '/cart'} className="user-chip">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=faces" alt={user.fullName} />
                  <span>Hi, {user.fullName.split(' ')[0]}</span>
                </Link>
                <button onClick={() => { logout(); navigate('/'); }} className="icon-btn" title="Logout" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
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
          <div className="cat-dropdown" onClick={() => navigate('/shop')}>
            ☰ Categories ▾
          </div>
          <ul className="nav-links">
            <li><Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
            <li><Link to="/shop" className={isActive('/shop') ? 'active' : ''}>Shop</Link></li>
            <li><Link to="/artisans" className={isActive('/artisans') ? 'active' : ''}>Artisans</Link></li>
            <li><Link to="/about" className={isActive('/about') ? 'active' : ''}>Our Story</Link></li>
            <li><Link to="/blog" className={isActive('/blog') ? 'active' : ''}>Blog</Link></li>
            <li><Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link></li>
          </ul>
        </div>
      </nav>
    </>
  );
};
