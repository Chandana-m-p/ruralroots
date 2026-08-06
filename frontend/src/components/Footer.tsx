import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <h5>{t('appName')}</h5>
          <p>{t('footerMission')}</p>
        </div>
        <div>
          <h5>{t('shop')}</h5>
          <Link to="/shop">{t('allProducts')}</Link><br/>
          <Link to="/artisans">{t('artisans')}</Link><br/>
          <Link to="/shop?cat=baskets">{t('categories')}</Link><br/>
          <Link to="/shop">{t('bestSellersHeader')}</Link>
        </div>
        <div>
<<<<<<< HEAD
          <h5>{t('companyHeader')}</h5>
          <Link to="/about">{t('ourStory')}</Link><br/>
          <Link to="/blog">{t('blog')}</Link><br/>
          <Link to="/contact">{t('contact')}</Link><br/>
          <Link to="/hub-dashboard">{t('villageHubPortalLink')}</Link>
=======
          <h5>Company</h5>
          <Link to="/our-story">Our Story</Link><br/>
          <Link to="/blog">Blog</Link><br/>
          <Link to="/contact">Contact</Link><br/>
          <Link to="/hub-dashboard">Village Hub Portal</Link>
>>>>>>> bb47bee993ff0ce233311e7ca24db9ee4b2afd2e
        </div>
        <div>
          <h5>{t('stayConnectedHeader')}</h5>
          <p>{t('stayConnectedDesc')}</p>
          <form className="search-bar" style={{ maxWidth: '100%', marginTop: '10px' }} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder={t('yourEmailPlaceholder')} aria-label="Your email" />
            <button type="submit">→</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        {t('copyrightText')}
      </div>
    </footer>
  );
};
