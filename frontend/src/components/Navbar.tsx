import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Language } from '../i18n/translations';
import { ShoppingBag, User, LogOut, Store, Sprout } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const { items } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <Link to="/" className="brand-logo">
          <Sprout className="logo-icon" size={28} />
          <div>
            <h1 className="brand-name">{t('appName')}</h1>
            <span className="brand-sub">{t('appSubtitle')}</span>
          </div>
        </Link>

        <div className="navbar-actions">
          {/* Language Switcher */}
          <div className="lang-switcher">
            <button 
              className={`lang-btn ${lang === 'hi' ? 'active' : ''}`} 
              onClick={() => setLang('hi')}
            >
              हिं
            </button>
            <button 
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`} 
              onClick={() => setLang('en')}
            >
              EN
            </button>
            <button 
              className={`lang-btn ${lang === 'mr' ? 'active' : ''}`} 
              onClick={() => setLang('mr')}
            >
              मरा
            </button>
            <button 
              className={`lang-btn ${lang === 'gu' ? 'active' : ''}`} 
              onClick={() => setLang('gu')}
            >
              ગુજ
            </button>
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="icon-badge-btn" aria-label="Cart">
            <ShoppingBag size={24} />
            {totalItems > 0 && <span className="badge">{totalItems}</span>}
          </Link>

          {/* User/Hub Dashboard Link */}
          {user ? (
            <div className="user-menu">
              {user.role === 'ROLE_HUB_MANAGER' && (
                <Link to="/hub-dashboard" className="hub-link-btn" title="Hub Dashboard">
                  <Store size={20} />
                  <span className="hide-mobile">Hub</span>
                </Link>
              )}
              <button onClick={() => { logout(); navigate('/'); }} className="icon-btn" title={t('logout')}>
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="login-btn">
              <User size={18} />
              <span>{t('login')}</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
