import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import { LocalProduct } from '../db';
import { ProductCard } from '../components/ProductCard';
import { Footer } from '../components/Footer';
import { CategorySelector, CategoryOption } from '../components/CategorySelector';

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
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get('search') || '';
  const initialCat = searchParams.get('cat') || 'all';

  const [products, setProducts] = useState<LocalProduct[]>([]);
  const [search, setSearch] = useState(initialSearch);
  
  // Mutually Exclusive Category State: Only ONE string can be active at a time
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('featured');

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  // Update selectedCategory when URL query param changes
  useEffect(() => {
    const cat = new URLSearchParams(location.search).get('cat');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [location.search]);

  // Mutually Exclusive Handler: Selecting a category replaces any previously selected category
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Sync with URL query parameter
    if (categoryId === 'all') {
      navigate('/shop', { replace: true });
    } else {
      navigate(`/shop?cat=${categoryId}`, { replace: true });
    }
  };

  const matchCategory = (product: LocalProduct, catId: string): boolean => {
    if (catId === 'all') return true;
    const sku = product.sku.toUpperCase();
    const title = product.titleI18n.toLowerCase();

    if (catId === 'baskets') return sku.includes('BASKET') || title.includes('basket') || title.includes('टोकरी');
    if (catId === 'pottery') return sku.includes('VASE') || sku.includes('BOWL') || title.includes('terracotta') || title.includes('clay') || title.includes('फूलदान') || title.includes('कटोरा');
    if (catId === 'wood') return sku.includes('WOOD') || title.includes('wooden') || title.includes('शीशम');
    if (catId === 'bamboo') return sku.includes('BAMBOO') || title.includes('bamboo') || title.includes('बांस');
    if (catId === 'jewelry') return sku.includes('JEWELRY') || title.includes('jewelry') || title.includes('earring') || title.includes('झुमके');
    if (catId === 'decor') return sku.includes('STOLE') || sku.includes('CUSHION') || title.includes('stole') || title.includes('cushion') || title.includes('स्टोल') || title.includes('कुशन');

    return true;
  };

  // Compute category counts dynamically
  const categoriesWithCounts: CategoryOption[] = CATEGORIES.map((cat) => {
    const count = products.filter((p) => matchCategory(p, cat.id)).length;
    return { ...cat, count };
  });

  const filteredProducts = products.filter((p) => {
    const matchesSearch = !search || p.titleI18n.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = matchCategory(p, selectedCategory);

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

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div>
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="sep">›</span>
          <Link to="/shop">Shop</Link>
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
            {/* Reusable Mutually Exclusive Category Selection Component */}
            <CategorySelector
              categories={categoriesWithCounts}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />

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

            <div className="product-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="empty-cart" style={{ marginTop: '24px', textAlign: 'center', padding: '40px' }}>
                <h4>No products found in "{activeCategoryObj?.name}"</h4>
                <p style={{ color: 'var(--ink-soft)', margin: '12px 0 20px' }}>
                  Try switching to another category or clearing your price filters.
                </p>
                <button className="btn btn-primary" onClick={() => handleSelectCategory('all')}>
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
