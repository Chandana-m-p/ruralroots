import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { fetchProducts, getProductCategory } from '../services/api';
import { LocalProduct } from '../db';
import { ProductCard } from '../components/ProductCard';
import { Footer } from '../components/Footer';

const CATEGORY_MAP: Record<string, string> = {
  baskets: 'Handwoven Baskets',
  pottery: 'Pottery & Terracotta',
  wood: 'Wooden Crafts',
  bamboo: 'Bamboo Products',
  jewelry: 'Handmade Jewelry',
  decor: 'Home Decor & Textiles'
};

export const Shop: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get('search') || '';
  const initialCat = searchParams.get('cat') || '';

  const [products, setProducts] = useState<LocalProduct[]>([]);
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('featured');

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  // Sync state when URL search params change
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('cat');
    const searchVal = params.get('search') || '';
    setSearch(searchVal);

    if (cat) {
      const catsArray = cat.split(',').map((c) => c.trim().toLowerCase());
      setSelectedCategories(catsArray);
    } else {
      setSelectedCategories([]);
    }
  }, [location.search]);

  const handleCategoryToggle = (cat: string) => {
    const nextCategories = selectedCategories.includes(cat)
      ? selectedCategories.filter((c) => c !== cat)
      : [...selectedCategories, cat];

    setSelectedCategories(nextCategories);
    
    // Update URL query parameters
    const params = new URLSearchParams(location.search);
    if (nextCategories.length > 0) {
      params.set('cat', nextCategories.join(','));
    } else {
      params.delete('cat');
    }
    navigate({ search: params.toString() }, { replace: true });
  };

  const handleClearAllCategories = () => {
    setSelectedCategories([]);
    const params = new URLSearchParams(location.search);
    params.delete('cat');
    navigate({ search: params.toString() }, { replace: true });
  };

  const filteredProducts = products.filter((p) => {
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

    // Price range matching
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

  return (
    <div>
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="sep">›</span>
          <span className="current">Shop</span>
        </div>

        {/* Shop Layout */}
        <div className="shop-layout">
          {/* Sidebar Filters */}
          <aside>
            <div className="filter-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h5 style={{ margin: 0 }}>Category</h5>
                {selectedCategories.length > 0 && (
                  <button 
                    onClick={handleClearAllCategories}
                    style={{ background: 'none', border: 'none', color: 'var(--clay)', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}
                  >
                    Clear All
                  </button>
                )}
              </div>
              <label>
                <input 
                  type="checkbox" 
                  checked={selectedCategories.includes('baskets')} 
                  onChange={() => handleCategoryToggle('baskets')}
                /> Handwoven Baskets
              </label>
              <label>
                <input 
                  type="checkbox" 
                  checked={selectedCategories.includes('pottery')} 
                  onChange={() => handleCategoryToggle('pottery')}
                /> Pottery & Terracotta
              </label>
              <label>
                <input 
                  type="checkbox" 
                  checked={selectedCategories.includes('wood')} 
                  onChange={() => handleCategoryToggle('wood')}
                /> Wooden Crafts
              </label>
              <label>
                <input 
                  type="checkbox" 
                  checked={selectedCategories.includes('bamboo')} 
                  onChange={() => handleCategoryToggle('bamboo')}
                /> Bamboo Products
              </label>
              <label>
                <input 
                  type="checkbox" 
                  checked={selectedCategories.includes('jewelry')} 
                  onChange={() => handleCategoryToggle('jewelry')}
                /> Handmade Jewelry
              </label>
              <label>
                <input 
                  type="checkbox" 
                  checked={selectedCategories.includes('decor')} 
                  onChange={() => handleCategoryToggle('decor')}
                /> Home Decor & Textiles
              </label>
            </div>

            <div className="filter-box">
              <h5>Price Range</h5>
              <label>
                <input 
                  type="radio" 
                  name="price" 
                  checked={priceFilter === 'all'}
                  onChange={() => setPriceFilter('all')}
                /> All Prices
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

            <div className="filter-box">
              <h5>Region</h5>
              <label><input type="checkbox" defaultChecked /> Rajasthan</label>
              <label><input type="checkbox" defaultChecked /> Andhra Pradesh</label>
              <label><input type="checkbox" defaultChecked /> Madhya Pradesh</label>
              <label><input type="checkbox" defaultChecked /> Maharashtra</label>
              <label><input type="checkbox" defaultChecked /> Assam</label>
            </div>
          </aside>

          {/* Main Shop Catalog Grid */}
          <section>
            <div className="shop-toolbar">
              <span style={{ color: 'var(--ink-soft)', fontSize: '0.9rem' }}>
                Showing {filteredProducts.length} of {products.length} products
              </span>
              <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="featured">Sort: Featured</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {/* Active Filter Pills */}
            {(selectedCategories.length > 0 || search) && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', fontWeight: 600 }}>Active Filters:</span>
                {selectedCategories.map((cat) => (
                  <span 
                    key={cat}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 10px',
                      background: 'var(--forest)',
                      color: 'var(--white)',
                      borderRadius: '16px',
                      fontSize: '0.82rem',
                      fontWeight: 500
                    }}
                  >
                    {CATEGORY_MAP[cat] || cat}
                    <button 
                      onClick={() => handleCategoryToggle(cat)}
                      style={{ background: 'none', border: 'none', color: 'var(--white)', cursor: 'pointer', padding: 0, fontSize: '0.9rem', lineHeight: 1 }}
                    >
                      ✕
                    </button>
                  </span>
                ))}
                {search && (
                  <span 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 10px',
                      background: 'var(--clay)',
                      color: 'var(--white)',
                      borderRadius: '16px',
                      fontSize: '0.82rem',
                      fontWeight: 500
                    }}
                  >
                    Search: "{search}"
                    <button 
                      onClick={() => {
                        setSearch('');
                        const params = new URLSearchParams(location.search);
                        params.delete('search');
                        navigate({ search: params.toString() }, { replace: true });
                      }}
                      style={{ background: 'none', border: 'none', color: 'var(--white)', cursor: 'pointer', padding: 0, fontSize: '0.9rem', lineHeight: 1 }}
                    >
                      ✕
                    </button>
                  </span>
                )}
                <button 
                  onClick={handleClearAllCategories}
                  style={{ background: 'none', border: 'none', color: 'var(--clay)', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600, textDecoration: 'underline', marginLeft: '6px' }}
                >
                  Clear All Filters
                </button>
              </div>
            )}

            <div className="product-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="empty-cart" style={{ marginTop: '24px', padding: '36px', textAlign: 'center', background: 'var(--white)', borderRadius: 'var(--radius)', border: '1px solid var(--line)' }}>
                <h4 style={{ marginBottom: '8px' }}>No products found</h4>
                <p style={{ color: 'var(--ink-soft)', fontSize: '0.95rem' }}>
                  No products matched your selected category filters or search keywords. Try selecting different categories or clearing your active filters.
                </p>
                <button 
                  onClick={handleClearAllCategories}
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

