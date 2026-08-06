import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <h5>RuralRoots</h5>
          <p>Connecting India's rural artisans to homes everywhere. Every purchase supports a family and keeps a craft tradition alive.</p>
        </div>
        <div>
          <h5>Shop</h5>
          <Link to="/shop">All Products</Link><br/>
          <Link to="/artisans">Artisans</Link><br/>
          <Link to="/shop?cat=baskets">Categories</Link><br/>
          <Link to="/shop">Best Sellers</Link>
        </div>
        <div>
          <h5>Company</h5>
          <Link to="/our-story">Our Story</Link><br/>
          <Link to="/blog">Blog</Link><br/>
          <Link to="/contact">Contact</Link><br/>
          <Link to="/hub-dashboard">Village Hub Portal</Link>
        </div>
        <div>
          <h5>Stay Connected</h5>
          <p>Get updates on new artisans and collections.</p>
          <form className="search-bar" style={{ maxWidth: '100%', marginTop: '10px' }} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email" aria-label="Your email" />
            <button type="submit">→</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        © 2026 RuralRoots. Made with care for rural communities across India.
      </div>
    </footer>
  );
};
