import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { OfflineProvider } from './context/OfflineContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { OfflineBanner } from './components/OfflineBanner';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { HubDashboard } from './pages/HubDashboard';
import { Login } from './pages/Login';

export const App: React.FC = () => {
  return (
    <Router>
      <LanguageProvider>
        <OfflineProvider>
          <AuthProvider>
            <CartProvider>
              <div className="app-wrapper">
                <OfflineBanner />
                <Navbar />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    <Route path="/hub-dashboard" element={<HubDashboard />} />
                    <Route path="/login" element={<Login />} />
                  </Routes>
                </main>
              </div>
            </CartProvider>
          </AuthProvider>
        </OfflineProvider>
      </LanguageProvider>
    </Router>
  );
};

export default App;
