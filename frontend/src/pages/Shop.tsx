import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { fetchProducts, getProductCategory } from '../services/api';
import { LocalProduct } from '../db';
import { ProductCard } from '../components/ProductCard';
import { Footer } from '../components/Footer';
import { CategorySelector, CategoryOption } from '../components/CategorySelector';
import { useLanguage } from '../context/LanguageContext';

const CATEGORIES: Omit<CategoryOption, 'count'>[] = [
  { id: 'all', name: 'All Categories' },
  { id: 'baskets', name: 'Handwoven Baskets' },
  { id: 'pottery', name: 'Pottery & Terracotta' },
  { id: 'wood', name: 'Wooden Crafts' },
  { id: 'bamboo', name: 'Bamboo Products' },
  { id: 'jewelry', name: 'Handmade Jewelry' },
  { id: 'decor', name: 'Home Decor & Textiles' },
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
    return (product.category || '').toLowerCase() === catId.toLowerCase();
  };

  const categoriesWithCounts: CategoryOption[] = CATEGORIES.map((cat) => {
    const count = products.filter((p) => matchCategory(p, cat.id)).length;
    return { ...cat, count };
  });

  const filteredProducts = products.filter((p) => {
<<<<<<< HEAD
    const matchesSearch = !search || p.titleI18n.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = matchCategory(p, selectedCategory);
=======
    // Multi-field & Multi-lingual Search
    let matchesSearch = true;
    if (search && search.trim() !== '') {
      const searchClean = search.toLowerCase().trim();
      const words = searchClean.split(/\s+/).filter(Boolean);

      const titleRaw = typeof p.titleI18n === 'string' ? p.titleI18n : JSON.stringify(p.titleI18n || '');
      const descRaw = typeof p.descriptionI18n === 'string' ? p.descriptionI18n : JSON.stringify(p.descriptionI18n || '');
      const skuStr = (p.sku || '').toLowerCase();
      const catStr = (p.category || getProductCategory(p) || '').toLowerCase();

      // Full text buffer for keyword searching
      const fullTextBuffer = `${titleRaw} ${descRaw} ${skuStr} ${catStr}`.toLowerCase();

      // Check if at least one word from search query exists in the full text buffer
      matchesSearch = words.some((word) => fullTextBuffer.includes(word));
    }
    
    // Category matching using fallback deduction helper
    const pCategory = (p.category || getProductCategory(p)).toLowerCase();
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some((c) => c.toLowerCase() === pCategory);
>>>>>>> bb47bee993ff0ce233311e7ca24db9ee4b2afd2e

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

            <div className="filter-box">
              <h5>{t('priceRange')}</h5>
              <label>
                <input 
                  type="radio" 
                  name="price" 
                  checked={priceFilter === 'all'}
                  onChange={() => setPriceFilter('all')}
                /> {t('allPrices')}
              </label>
              <label>
                <input 
                  type="radio" 
                  name="price" 
                  checked={priceFilter === 'under500'}
                  onChange={() => setPriceFilter('under500')}
                /> Under ₹500
              </label>
              <label>
                <input 
                  type="radio" 
                  name="price" 
                  checked={priceFilter === '500-1000'}
                  onChange={() => setPriceFilter('500-1000')}
                /> ₹500 – ₹1,000
              </label>
              <label>
                <input 
                  type="radio" 
                  name="price" 
                  checked={priceFilter === '1000-2000'}
                  onChange={() => setPriceFilter('1000-2000')}
                /> ₹1,000 – ₹2,000
              </label>
              <label>
                <input 
                  type="radio" 
                  name="price" 
                  checked={priceFilter === 'above2000'}
                  onChange={() => setPriceFilter('above2000')}
                /> Above ₹2,000
              </label>
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
