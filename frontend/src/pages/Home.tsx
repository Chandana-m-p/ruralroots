import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import { LocalProduct } from '../db';
import { ProductCard } from '../components/ProductCard';
import { VoiceSearch } from '../components/VoiceSearch';
import { useLanguage } from '../context/LanguageContext';
import { Sprout, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const Home: React.FC = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState<LocalProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const filteredProducts = products.filter(p => {
    const titleMatch = p.titleI18n.toLowerCase().includes(searchQuery.toLowerCase());
    const skuMatch = p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return titleMatch || skuMatch;
  });

  return (
    <div className="page-container">
      {/* Banner / Hero */}
      <section className="hero-banner">
        <div className="hero-content">
          <span className="hero-badge">
            <Sprout size={16} /> 100% Verified Rural Products
          </span>
          <h2 className="hero-title">{t('appName')}</h2>
          <p className="hero-desc">{t('appSubtitle')} - बिना इंटरनेट भी ऑर्डर करें</p>
        </div>
      </section>

      {/* Voice & Search */}
      <VoiceSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Value Badges */}
      <div className="trust-row">
        <div className="trust-item">
          <Truck size={18} />
          <span>ग्राम केंद्र डिलीवरी</span>
        </div>
        <div className="trust-item">
          <ShieldCheck size={18} />
          <span>कैश ऑन डिलीवरी</span>
        </div>
        <div className="trust-item">
          <RefreshCw size={18} />
          <span>ऑफलाइन सहायता</span>
        </div>
      </div>

      {/* Catalog Grid */}
      <section className="catalog-section">
        <div className="section-header">
          <h2 className="section-title">{t('allProducts')}</h2>
          <span className="count-tag">{filteredProducts.length} items</span>
        </div>

        {loading ? (
          <div className="loading-spinner">उत्पाद लोड हो रहे हैं...</div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
