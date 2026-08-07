import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { OfflineProvider } from './context/OfflineContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { Navbar } from './components/Navbar';
import { OfflineBanner } from './components/OfflineBanner';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Artisans } from './pages/Artisans';
import { Wishlist } from './pages/Wishlist';
import { About } from './pages/About';
import { OurStory } from './pages/OurStory';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { HubDashboard } from './pages/HubDashboard';
import { Login } from './pages/Login';
import { MyOrders } from './pages/MyOrders';
import { AdminDashboard } from './pages/AdminDashboard';
import { AuthWorkflow } from './pages/AuthWorkflow';

export const App: React.FC = () => {
  return (
    <Router>
      <LanguageProvider>
        <OfflineProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                  <OfflineBanner />
                  <Navbar />
                  <main style={{ flex: 1 }}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/admin" element={<AdminDashboard />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/artisans" element={<Artisans />} />
                      <Route path="/wishlist" element={<Wishlist />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/our-story" element={<OurStory />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/order-success" element={<OrderSuccess />} />
                      <Route path="/hub-dashboard" element={<HubDashboard />} />
                      <Route path="/my-orders" element={<MyOrders />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/auth-flow" element={<AuthWorkflow />} />
                    </Routes>
                  </main>
                </div>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </OfflineProvider>
      </LanguageProvider>
    </Router>
  );
};
