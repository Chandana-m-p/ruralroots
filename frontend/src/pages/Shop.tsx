import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import { LocalProduct } from '../db';
import { ProductCard } from '../components/ProductCard';
import { Footer } from '../components/Footer';

export const Shop: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get('search') || '';
  const initialCat = searchParams.get('cat') || '';

  const [products, setProducts] = useState<LocalProduct[]>([]);
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCat ? [initialCat] : []);
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('featured');

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const handleCategoryToggle = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = !search || p.titleI18n.toLowerCase().includes(search.toLowerCase());
    
    // Price range matching
    let matchesPrice = true;
    if (priceFilter === 'under500') matchesPrice = p.basePrice < 500;
    else if (priceFilter === '500-1000') matchesPrice = p.basePrice >= 500 && p.basePrice <= 1000;
    else if (priceFilter === '1000-2000') matchesPrice = p.basePrice > 1000 && p.basePrice <= 2000;
    else if (priceFilter === 'above2000') matchesPrice = p.basePrice > 2000;

    return matchesSearch && matchesPrice;
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
              <h5>Category</h5>
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

            <div className="product-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="empty-cart" style={{ marginTop: '24px' }}>
                No products found matching your search or filters. Try clearing your search parameters.
              </div>
            )}
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};
