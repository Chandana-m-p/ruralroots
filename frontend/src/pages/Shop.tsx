import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { fetchProducts, getProductCategory } from '../services/api';
import { LocalProduct } from '../db';
import { ProductCard } from '../components/ProductCard';
import { Footer } from '../components/Footer';
import { CategorySelector, CategoryOption } from '../components/CategorySelector';
import { useLanguage } from '../context/LanguageContext';

import { 
  LayoutGrid, 
  Shirt, 
  Utensils, 
  HeartPulse, 
  Smartphone, 
  Home, 
  ShoppingBag, 
  Coffee, 
  TreePine, 
  Leaf, 
  Gem, 
  Palette,
  SlidersHorizontal,
  Tag,
  Coins,
  IndianRupee,
  Sparkles
} from 'lucide-react';

const CATEGORIES: Omit<CategoryOption, 'count'>[] = [
  { id: 'all', name: 'All Categories', icon: <LayoutGrid size={20} color="#2F5233" /> },
  { id: 'clothing', name: 'Clothing & Apparel', icon: <Shirt size={20} color="#E63946" /> },
  { id: 'food', name: 'Food & Organic Grocery', icon: <Utensils size={20} color="#D97706" /> },
  { id: 'healthcare', name: 'Healthcare & Wellness', icon: <HeartPulse size={20} color="#10B981" /> },
  { id: 'electronics', name: 'Electronics & Smart Tech', icon: <Smartphone size={20} color="#2563EB" /> },
  { id: 'appliances', name: 'Home Appliances & Living', icon: <Home size={20} color="#8B5CF6" /> },
  { id: 'baskets', name: 'Handwoven Baskets', icon: <ShoppingBag size={20} color="#B45309" /> },
  { id: 'pottery', name: 'Pottery & Terracotta', icon: <Coffee size={20} color="#EA580C" /> },
  { id: 'wood', name: 'Wooden Crafts', icon: <TreePine size={20} color="#854D0E" /> },
  { id: 'bamboo', name: 'Bamboo Products', icon: <Leaf size={20} color="#059669" /> },
  { id: 'jewelry', name: 'Handmade Jewelry', icon: <Gem size={20} color="#EC4899" /> },
  { id: 'decor', name: 'Home Decor & Textiles', icon: <Palette size={20} color="#06B6D4" /> },
];

const PRICE_OPTIONS = [
  { id: 'all', label: 'All Prices', icon: <SlidersHorizontal size={20} color="#2F5233" /> },
  { id: 'under500', label: 'Under ₹500', icon: <Tag size={20} color="#10B981" /> },
  { id: '500-1000', label: '₹500 – ₹1,000', icon: <Coins size={20} color="#D97706" /> },
  { id: '1000-2000', label: '₹1,000 – ₹2,000', icon: <IndianRupee size={20} color="#2563EB" /> },
  { id: 'above2000', label: 'Above ₹2,000', icon: <Sparkles size={20} color="#8B5CF6" /> },
];

export const Shop: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get('search') || '';
  const initialCat = searchParams.get('cat') || 'all';

  const [products, setProducts] = useState<LocalProduct[]>([]);
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('featured');

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('cat') || 'all';
    const searchVal = params.get('search') || '';
    setSelectedCategory(cat);
    setSearch(searchVal);
  }, [location.search]);

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const params = new URLSearchParams(location.search);
    if (categoryId === 'all') {
      params.delete('cat');
    } else {
      params.set('cat', categoryId);
    }
    navigate({ search: params.toString() }, { replace: true });
  };

  const handleClearAllFilters = () => {
    setSelectedCategory('all');
    setSearch('');
    setPriceFilter('all');
    navigate('/shop', { replace: true });
  };

  const matchCategory = (product: LocalProduct, catId: string): boolean => {
    if (!catId || catId === 'all') return true;
    const prodCategory = getProductCategory(product).toLowerCase();
    const targetCat = catId.toLowerCase();

    if (prodCategory === targetCat) return true;

    if (targetCat === 'electronics' && (prodCategory === 'electronics' || prodCategory.includes('elec') || prodCategory.includes('tech'))) return true;
    if (targetCat === 'appliances' && (prodCategory === 'appliances' || prodCategory.includes('appliance') || prodCategory.includes('kitchen') || prodCategory.includes('living'))) return true;
    if (targetCat === 'clothing' && (prodCategory === 'clothing' || prodCategory.includes('cloth') || prodCategory.includes('apparel'))) return true;
    if (targetCat === 'food' && (prodCategory === 'food' || prodCategory.includes('food') || prodCategory.includes('grocery'))) return true;
    if (targetCat === 'healthcare' && (prodCategory === 'healthcare' || prodCategory.includes('health') || prodCategory.includes('wellness'))) return true;

    return false;
  };

  const categoriesWithCounts: CategoryOption[] = CATEGORIES.map((cat) => {
    const count = products.filter((p) => matchCategory(p, cat.id)).length;
    return { ...cat, count };
  });

  const filteredProducts = products.filter((p) => {
    // Multi-field & Multi-lingual Search
    let matchesSearch = true;
    if (search && search.trim() !== '') {
      const searchClean = search.toLowerCase().trim();
      const words = searchClean.split(/\s+/).filter(Boolean);

      const titleRaw = typeof p.titleI18n === 'string' ? p.titleI18n : JSON.stringify(p.titleI18n || '');
      const descRaw = typeof p.descriptionI18n === 'string' ? p.descriptionI18n : JSON.stringify(p.descriptionI18n || '');
      const skuStr = (p.sku || '').toLowerCase();
      const catStr = (p.category || '').toLowerCase();

      const fullTextBuffer = `${titleRaw} ${descRaw} ${skuStr} ${catStr}`.toLowerCase();
      matchesSearch = words.some((word) => fullTextBuffer.includes(word));
    }

    const matchesCategory = matchCategory(p, selectedCategory);

    let matchesPrice = true;
    if (priceFilter === 'under500') matchesPrice = p.basePrice < 500;
    else if (priceFilter === '500-1000') matchesPrice = p.basePrice >= 500 && p.basePrice <= 1000;
    else if (priceFilter === '1000-2000') matchesPrice = p.basePrice > 1000 && p.basePrice <= 2000;
    else if (priceFilter === 'above2000') matchesPrice = p.basePrice > 2000;

    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    if (sortOption === 'low-high') return a.basePrice - b.basePrice;
    if (sortOption === 'high-low') return b.basePrice - a.basePrice;
    return a.id - b.id;
  });

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div>
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">{t('home')}</Link>
          <span className="sep">›</span>
          <Link to="/shop">{t('shop')}</Link>
          {selectedCategory !== 'all' && (
            <>
              <span className="sep">›</span>
              <span className="current">{activeCategoryObj?.name}</span>
            </>
          )}
        </div>

        {/* Active Category Banner */}
        {selectedCategory !== 'all' && (
          <div className="active-category-banner">
            <div>
              <span className="active-category-tag">Active Category</span>
              <h3 className="active-category-title">{activeCategoryObj?.name}</h3>
              <p className="active-category-desc">
                Showing {filteredProducts.length} handcrafted products in this category.
              </p>
            </div>
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => handleSelectCategory('all')}
            >
              Show All Categories ✕
            </button>
          </div>
        )}

        {/* Shop Layout */}
        <div className="shop-layout">
          {/* Sidebar Filters */}
          <aside>
            <CategorySelector
              categories={categoriesWithCounts}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />

            <div className="filter-box price-selector-container">
              <div className="price-header">
                <h5 style={{ margin: 0 }}>{t('priceRange')}</h5>
                {priceFilter !== 'all' && (
                  <button
                    type="button"
                    className="btn-clear-price"
                    onClick={() => setPriceFilter('all')}
                  >
                    Clear ({t('allPrices')})
                  </button>
                )}
              </div>

              <div className="price-option-group" role="radiogroup" aria-label="Price Range Selection">
                {PRICE_OPTIONS.map((opt) => {
                  const isSelected = priceFilter === opt.id;
                  return (
                    <label
                      key={opt.id}
                      className={`price-option-label ${isSelected ? 'selected' : ''}`}
                      onClick={() => setPriceFilter(opt.id)}
                    >
                      <input
                        type="radio"
                        name="price-range-selection"
                        value={opt.id}
                        checked={isSelected}
                        onChange={() => setPriceFilter(opt.id)}
                        className="price-radio-input"
                      />
                      <span className="price-icon">
                        {opt.icon}
                      </span>
                      <span className="price-name">{opt.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main Shop Catalog Grid */}
          <section>
            <div className="shop-toolbar">
              <span style={{ color: 'var(--ink-soft)', fontSize: '0.9rem' }}>
                {t('showingProducts').replace('{{count}}', String(filteredProducts.length)).replace('{{total}}', String(products.length))}
              </span>
              <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="featured">{t('sortBy')} {t('sortFeatured')}</option>
                <option value="low-high">{t('sortPriceLowHigh')}</option>
                <option value="high-low">{t('sortPriceHighLow')}</option>
              </select>
            </div>

            {/* Active Filter Pills */}
            {(selectedCategory !== 'all' || search) && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', fontWeight: 600 }}>Active Filters:</span>
                {selectedCategory !== 'all' && (
                  <span 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 10px',
                      background: 'var(--forest)',
                      color: 'var(--white)',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}
                  >
                    Category: {activeCategoryObj?.name}
                    <button 
                      onClick={() => handleSelectCategory('all')} 
                      style={{ background: 'none', border: 'none', color: 'var(--white)', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      ✕
                    </button>
                  </span>
                )}
                {search && (
                  <span 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 10px',
                      background: 'var(--clay)',
                      color: 'var(--white)',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}
                  >
                    Search: "{search}"
                    <button 
                      onClick={() => { setSearch(''); navigate('/shop', { replace: true }); }} 
                      style={{ background: 'none', border: 'none', color: 'var(--white)', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      ✕
                    </button>
                  </span>
                )}
                <button 
                  onClick={handleClearAllFilters}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--forest)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Product Grid or Empty State */}
            {filteredProducts.length > 0 ? (
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--white)', borderRadius: '12px', border: '1px dashed var(--line)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔍</div>
                <h3 style={{ margin: '0 0 8px 0', color: 'var(--ink)' }}>{t('noProductsFound')}</h3>
                <button 
                  onClick={handleClearAllFilters} 
                  className="btn btn-primary"
                  style={{ marginTop: '16px' }}
                >
                  View All Products
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};
